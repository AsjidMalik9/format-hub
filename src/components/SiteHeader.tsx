import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell topbar">
        <Link href="/" className="brand">
          FormatHub
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/convert">Convert</Link>
          <Link href="/about">About</Link>
          <Link href="/press">Press</Link>
        </nav>
      </div>
    </header>
  );
}
