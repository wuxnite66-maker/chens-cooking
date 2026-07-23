"use client";

import { useRef, useState } from "react";
import { fileToDataUrl } from "@/lib/vinted/imaging";

export function Uploader({
  onFiles,
}: {
  onFiles: (dataUrls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  async function handleFiles(list: FileList | null) {
    if (!list) return;
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));
    const urls = await Promise.all(files.map(fileToDataUrl));
    if (urls.length) onFiles(urls);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
        drag ? "border-teal-500 bg-teal-50" : "border-slate-300 bg-white hover:border-slate-400"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="text-4xl">📤</div>
      <p className="mt-3 font-semibold text-slate-800">
        Fotos hierher ziehen oder klicken
      </p>
      <p className="mt-1 text-sm text-slate-500">
        JPG oder PNG · mehrere Bilder möglich · bleibt alles im Browser
      </p>
    </div>
  );
}
