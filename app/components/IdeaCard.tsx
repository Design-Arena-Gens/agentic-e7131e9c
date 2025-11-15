import type { BusinessIdea } from "../data/ideas";

function renderInvestment(level: BusinessIdea["investmentLevel"]) {
  switch (level) {
    case "faible":
      return "Faible capital";
    case "moyen":
      return "Investissement modéré";
    case "élevé":
      return "Investissement conséquent";
    default:
      return level;
  }
}

type IdeaCardProps = {
  idea: BusinessIdea;
};

export function IdeaCard({ idea }: IdeaCardProps) {
  return (
    <article className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p className="section-title">{idea.sector}</p>
          <h3>{idea.title}</h3>
          <p style={{ marginTop: "0.55rem", fontSize: "0.98rem" }}>{idea.headline}</p>
        </div>
        <span className="badge">{renderInvestment(idea.investmentLevel)}</span>
      </div>

      <p>{idea.description}</p>

      <div>
        <strong>Monétisation :</strong>
        <p>{idea.monetization}</p>
      </div>

      <div>
        <strong>Lancement rapide :</strong>
        <p>{idea.quickLaunch}</p>
      </div>

      <div>
        <strong>Pérennité & impact :</strong>
        <p>{idea.sustainability}</p>
      </div>

      <div>
        <strong>Différenciation :</strong>
        <p>{idea.differentiation}</p>
      </div>

      <div>
        <strong>Compétences clés :</strong>
        <p>{idea.requiredSkills}</p>
      </div>

      <div>
        <strong>Partenaires potentiels :</strong>
        <p>{idea.localPartners}</p>
      </div>

      <div>
        <strong>Étapes actionnables :</strong>
        <ul className="list">
          {idea.actionSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Facteurs de demande :</strong>
        <ul className="list">
          {idea.demandDrivers.map((driver) => (
            <li key={driver}>{driver}</li>
          ))}
        </ul>
      </div>

      <div>
        {idea.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
