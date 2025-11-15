'use client';

import { useMemo, useState } from "react";
import { Filters, type FilterState } from "./components/Filters";
import { IdeaCard } from "./components/IdeaCard";
import { InsightsPanel } from "./components/InsightsPanel";
import { TrendHighlights } from "./components/TrendHighlights";
import { businessIdeas } from "./data/ideas";

const initialFilters: FilterState = {
  search: "",
  tags: new Set(),
  investment: new Set()
};

export default function Page() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const filteredIdeas = useMemo(() => {
    return businessIdeas.filter((idea) => {
      const matchesSearch = filters.search
        ? [
            idea.title,
            idea.description,
            idea.sector,
            idea.headline,
            idea.monetization,
            idea.quickLaunch,
            idea.demandDrivers.join(" "),
            idea.tags.join(" ")
          ]
            .join(" ")
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        : true;

      const matchesTags = filters.tags.size
        ? Array.from(filters.tags).every((tag) => idea.tags.includes(tag))
        : true;

      const matchesInvestment = filters.investment.size
        ? filters.investment.has(idea.investmentLevel)
        : true;

      return matchesSearch && matchesTags && matchesInvestment;
    });
  }, [filters]);

  return (
    <main>
      <section className="hero">
        <h1>Opportunités business à La Réunion</h1>
        <p>
          Explorez des concepts rentables alignés avec les besoins des Réunionnais,
          l'attractivité touristique, la culture créole et les tendances actuelles :
          digital, écologie, bien-être. Activez les filtres pour révéler des niches
          inexploitées et des plans d'actions immédiats.
        </p>
      </section>

      <TrendHighlights />

      <InsightsPanel ideas={businessIdeas} />

      <Filters onChange={setFilters} />

      <p style={{ margin: "0 0 1.2rem", color: "var(--muted)" }}>
        {filteredIdeas.length} opportunit{filteredIdeas.length > 1 ? "és" : "é"} identifiées
        ({businessIdeas.length} au total)
      </p>

      <section className="card-grid">
        {filteredIdeas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </section>
    </main>
  );
}
