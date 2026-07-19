import { CurtainProvider } from "@/components/PageTransition";

/**
 * Locale-wide layout: every page under /at and /hu navigates through the
 * gold-line curtain (close on leave, open on arrival).
 */
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <CurtainProvider>{children}</CurtainProvider>;
}
