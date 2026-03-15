import Link from "next/link";

type Props = { name: string; description: string };

export function ComingSoon({ name, description }: Props) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-inner">
        <span className="coming-soon-badge">Coming soon</span>
        <h2>{name}</h2>
        <p>{description}</p>
        <p className="coming-soon-note">
          This tool is not built yet. Check back later or explore other tools below.
        </p>
        <Link href="/tools" className="coming-soon-link">
          Browse all tools →
        </Link>
      </div>
    </div>
  );
}
