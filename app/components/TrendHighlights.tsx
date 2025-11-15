const trendHighlights = [
  {
    title: "Tourisme expérientiel premium",
    description:
      "Les visiteurs recherchent des immersions authentiques mêlant nature, culture créole et contenus digitaux partagés en temps réel."
  },
  {
    title: "Digitalisation inclusive",
    description:
      "Services numériques en créole et français simplifié pour seniors, TPE et publics éloignés des outils digitaux."
  },
  {
    title: "Économie circulaire locale",
    description:
      "Valorisation des productions péi, upcycling textile, alimentation low waste et circuits courts soutenus par des outils data."
  },
  {
    title: "Bien-être holistique",
    description:
      "Retraites, nutrition, sport santé et téléconsultations répondent à la demande croissante d'équilibre mental et physique."
  }
];

export function TrendHighlights() {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <div className="trend-grid">
        {trendHighlights.map((trend) => (
          <article key={trend.title} className="trend-card">
            <h4>{trend.title}</h4>
            <p>{trend.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
