import { PageShell } from "@/components/site/page-shell";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
