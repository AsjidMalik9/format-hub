import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-block footer-bottom">
          <Link href="/">Home</Link>
          <span className="footer-sep">·</span>
          <Link href="/tools">All tools</Link>
          <span className="footer-sep">·</span>
          <Link href="/convert">Convert</Link>
          <span className="footer-sep">·</span>
          <Link href="/press">Press</Link>
          <span className="footer-sep">·</span>
          <span className="footer-copy">© {new Date().getFullYear()} FormatHub</span>
        </div>
      </div>
    </footer>
  );
}
