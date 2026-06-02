import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function DocView({ title, body }: { title: string; body: string }) {
  return (
    <article className="prose-uitwijken">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-uitwijken)] mb-3 font-semibold">
        Wiki
      </div>
      <h1 className="font-sans font-bold text-4xl tracking-tight leading-[1.15] mb-6 text-[var(--color-ink)]">
        {title.replace(/-/g, " ")}
      </h1>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="font-sans font-bold text-[1.625rem] tracking-tight leading-snug mt-10 mb-3">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="font-sans font-bold text-[1.625rem] tracking-tight leading-snug mt-10 mb-3">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-sans font-bold text-[1.25rem] tracking-tight leading-snug mt-7 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="font-sans font-bold text-[1.0625rem] tracking-tight leading-snug mt-6 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-3 text-[16px] leading-[1.6] text-[#1a1a1a]">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc pl-6 text-[16px] leading-[1.6] text-[#1a1a1a]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal pl-6 text-[16px] leading-[1.6] text-[#1a1a1a]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="my-1 pl-1">{children}</li>,
          table: ({ children }) => (
            <table className="my-5 w-full border-collapse text-sm">{children}</table>
          ),
          th: ({ children }) => (
            <th className="border-b-2 border-[var(--color-ink)] px-3 py-2 text-left font-bold align-top">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[var(--color-rule)] px-3 py-2 align-top">{children}</td>
          ),
          code: ({ children }) => (
            <code className="rounded-sm bg-[#f1efe8] px-1.5 py-0.5 font-mono text-[13px]">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-sm border border-[var(--color-rule-soft)] bg-[#f1efe8] p-4 text-[13px]">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-[var(--color-uitwijken)] pl-4 font-serif italic text-[#4a4840]">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => {
            const h = href ?? "";
            const linkClass =
              "text-[var(--color-link)] underline underline-offset-2 decoration-1 hover:decoration-2 hover:text-[var(--color-link-hover)]";
            if (h.startsWith("/docs/")) {
              return (
                <Link href={h} className={linkClass}>
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={h}
                target={h.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={linkClass}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </article>
  );
}
