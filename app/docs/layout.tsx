import { TopBar } from "../components/Nav";
import { DocsSidebar } from "./DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10">
        <DocsSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
