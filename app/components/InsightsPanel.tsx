import type { BusinessIdea } from "../data/ideas";

function getTopSectors(ideas: BusinessIdea[]) {
  const counts = new Map<string, number>();
  ideas.forEach((idea) => {
    counts.set(idea.sector, (counts.get(idea.sector) ?? 0) + 1);
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
}

function getTagHeatmap(ideas: BusinessIdea[]) {
  const counts = new Map<string, number>();
  ideas.forEach((idea) => {
    idea.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

type InsightsPanelProps = {
  ideas: BusinessIdea[];
};

export function InsightsPanel({ ideas }: InsightsPanelProps) {
  const sectors = getTopSectors(ideas);
  const tags = getTagHeatmap(ideas);
  return (
    <aside
      style={{
        background: "white",
        borderRadius: "18px",
        border: "1px solid var(--border)",
        padding: "1.8rem",
        boxShadow: "var(--shadow)",
        marginBottom: "2.5rem"
      }}
    >
      <h2 style={{ fontSize: "1.4rem", marginBottom: "1.2rem" }}>
        Synthèse rapide
      </h2>
      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Secteurs porteurs
        </h3>
        <ul className="list">
          {sectors.map(([sector, count]) => (
            <li key={sector}>
              {sector} · <strong>{count}</strong> idée{count > 1 ? "s" : ""}
            </li>
          ))}
        </ul>
      </section>
      <section style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Opportunités express
        </h3>
        <ul className="list">
          <li>Tester offres pilotes via landing pages bilingues</li>
          <li>Capitaliser sur réseaux de diaspora pour préventes</li>
          <li>Miser sur financements publics transition écologique</li>
        </ul>
      </section>
      <section>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Tags les plus demandés
        </h3>
        <div>
          {tags.map(([tag]) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}
