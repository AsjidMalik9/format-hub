import Link from "next/link";
import type { ReactNode } from "react";

type ToolPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ToolPage({ title, description, children }: ToolPageProps) {
  return (
    <section className="tool-page shell">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <Link href="/tools">Tools</Link>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current" aria-current="page">{title}</span>
      </nav>
      <div className="page-head">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <article className="tool-surface">{children}</article>
    </section>
  );
}
