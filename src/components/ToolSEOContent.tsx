import type { ToolSeoContent as SeoContent } from "@/data/toolSeoContent";

type Props = { content: SeoContent; toolName: string };

export function ToolSEOContent({ content, toolName }: Props) {
  return (
    <div className="tool-seo-content">
      <section className="seo-section" aria-labelledby="what-is">
        <h2 id="what-is">What is {toolName}?</h2>
        <p>{content.whatIs}</p>
      </section>

      <section className="seo-section" aria-labelledby="how-it-works">
        <h2 id="how-it-works">How it works</h2>
        <p>{content.howItWorks}</p>
      </section>

      {content.example && (
        <section className="seo-section" aria-labelledby="example">
          <h2 id="example">Example</h2>
          <p>{content.example}</p>
        </section>
      )}

      <section className="seo-section" aria-labelledby="use-cases">
        <h2 id="use-cases">Use cases</h2>
        <ul>
          {content.useCases.map((useCase, i) => (
            <li key={i}>{useCase}</li>
          ))}
        </ul>
      </section>

      <section className="seo-section seo-faq" aria-labelledby="faq">
        <h2 id="faq">FAQ</h2>
        <dl>
          {content.faq.map((item, i) => (
            <div key={i} className="faq-item">
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
