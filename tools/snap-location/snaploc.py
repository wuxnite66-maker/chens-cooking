#!/usr/bin/env python3
"""
snaploc — Setzt die GPS-Position eines laufenden Android-Emulators.

Damit kannst du in einer App (z. B. Snapchat), die IM EMULATOR laeuft, einen
beliebigen Standort auf der Erde vortaeuschen — per Koordinaten oder Ortsname.

Es wird ausschliesslich die dokumentierte Emulator-Konsole benutzt
(`geo fix <lon> <lat>`). Es werden KEINE Schutzmechanismen einer App umgangen.

Beispiele:
    python3 snaploc.py --place "Eiffelturm, Paris"
    python3 snaploc.py --lat 48.8584 --lon 2.2945
    python3 snaploc.py --lat 40.6892 --lon -74.0445 --alt 10

Hinweise:
    * Das Aendern des Standorts in Apps wie Snapchat verstoesst i. d. R. gegen
      deren Nutzungsbedingungen. Apps koennen Emulatoren/Spoofing erkennen.
      Nutze das nur fuer eigene, zulaessige Zwecke (Tests, Privatsphaere).
    * Voraussetzung: Ein laufender Android-Emulator (Android Studio / AVD).
"""

from __future__ import annotations

import argparse
import json
import os
import socket
import sys
import time
import urllib.parse
import urllib.request

DEFAULT_HOST = "127.0.0.1"
DEFAULT_PORT = 5554  # Standard-Konsolenport der ersten Emulator-Instanz
NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"


# --------------------------------------------------------------------------- #
# Geocoding: Ortsname  ->  (lat, lon)
# --------------------------------------------------------------------------- #
def geocode(place: str) -> tuple[float, float, str]:
    """Wandelt einen Ortsnamen ueber OpenStreetMap/Nominatim in Koordinaten um."""
    params = urllib.parse.urlencode({"q": place, "format": "json", "limit": 1})
    req = urllib.request.Request(
        f"{NOMINATIM_URL}?{params}",
        headers={"User-Agent": "snaploc/1.0 (personal location helper)"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except Exception as exc:  # noqa: BLE001
        raise SystemExit(f"Geocoding fehlgeschlagen: {exc}")

    if not data:
        raise SystemExit(f"Kein Ort gefunden fuer: {place!r}")

    hit = data[0]
    return float(hit["lat"]), float(hit["lon"]), hit.get("display_name", place)


# --------------------------------------------------------------------------- #
# Emulator-Konsole
# --------------------------------------------------------------------------- #
def read_auth_token() -> str | None:
    """Liest das Auth-Token der Emulator-Konsole (falls vorhanden)."""
    path = os.path.join(
        os.path.expanduser("~"), ".emulator_console_auth_token"
    )
    if os.path.isfile(path):
        with open(path, "r", encoding="utf-8") as fh:
            return fh.read().strip()
    return None


def _recv_until_prompt(sock: socket.socket, timeout: float = 5.0) -> str:
    """Liest von der Konsole bis zum 'OK'-Prompt oder Timeout."""
    sock.settimeout(timeout)
    buf = b""
    try:
        while True:
            chunk = sock.recv(4096)
            if not chunk:
                break
            buf += chunk
            if b"OK\r\n" in chunk or b"KO" in chunk:
                break
    except socket.timeout:
        pass
    return buf.decode("utf-8", errors="replace")


def send_geo_fix(
    lat: float,
    lon: float,
    alt: float,
    host: str,
    port: int,
) -> None:
    """Verbindet sich mit der Emulator-Konsole und setzt die Position."""
    try:
        sock = socket.create_connection((host, port), timeout=10)
    except OSError as exc:
        raise SystemExit(
            f"Keine Verbindung zur Emulator-Konsole auf {host}:{port} ({exc}).\n"
            "Laeuft ein Android-Emulator? Port pruefen mit: adb devices "
            "(z. B. 'emulator-5554' -> Konsolenport 5554)."
        )

    with sock:
        # Begruessung lesen
        _recv_until_prompt(sock, timeout=2.0)

        token = read_auth_token()
        if token:
            sock.sendall(f"auth {token}\r\n".encode("utf-8"))
            _recv_until_prompt(sock, timeout=2.0)

        # geo fix erwartet: longitude latitude [altitude]
        cmd = f"geo fix {lon} {lat} {alt}\r\n"
        sock.sendall(cmd.encode("utf-8"))
        time.sleep(0.2)
        reply = _recv_until_prompt(sock, timeout=3.0)

        if "KO" in reply:
            raise SystemExit(f"Emulator hat den Befehl abgelehnt:\n{reply.strip()}")

        sock.sendall(b"quit\r\n")


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def parse_args(argv: list[str]) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Setzt die GPS-Position eines laufenden Android-Emulators.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    src = p.add_mutually_exclusive_group(required=True)
    src.add_argument("--place", help='Ortsname, z. B. "Eiffelturm, Paris"')
    src.add_argument("--lat", type=float, help="Breitengrad (-90 bis 90)")

    p.add_argument("--lon", type=float, help="Laengengrad (-180 bis 180)")
    p.add_argument("--alt", type=float, default=0.0, help="Hoehe in Metern (optional)")
    p.add_argument("--host", default=DEFAULT_HOST, help="Konsolen-Host")
    p.add_argument(
        "--port", type=int, default=DEFAULT_PORT, help="Konsolen-Port (Standard 5554)"
    )
    args = p.parse_args(argv)

    if args.lat is not None and args.lon is None:
        p.error("--lat benoetigt auch --lon")
    return args


def validate_coords(lat: float, lon: float) -> None:
    if not -90.0 <= lat <= 90.0:
        raise SystemExit(f"Breitengrad ausserhalb des gueltigen Bereichs: {lat}")
    if not -180.0 <= lon <= 180.0:
        raise SystemExit(f"Laengengrad ausserhalb des gueltigen Bereichs: {lon}")


def main(argv: list[str]) -> int:
    args = parse_args(argv)

    if args.place:
        lat, lon, name = geocode(args.place)
        print(f"Ort gefunden: {name}")
    else:
        lat, lon, name = args.lat, args.lon, "manuell eingegeben"

    validate_coords(lat, lon)
    print(f"Setze Position -> Breitengrad {lat}, Laengengrad {lon}, Hoehe {args.alt} m")

    send_geo_fix(lat, lon, args.alt, args.host, args.port)

    print("Fertig. Der Emulator meldet jetzt diese Position.")
    print(
        "Tipp: In der App (z. B. Snapchat) die Karte/den Standort neu laden, "
        "damit die neue Position uebernommen wird."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
