'use client';

import { useState } from "react";
import type { Tag } from "../data/ideas";

export type FilterState = {
  search: string;
  tags: Set<Tag>;
  investment: Set<string>;
};

const TAG_LABELS: Record<Tag, string> = {
  tourisme: "Tourisme",
  digital: "Digital",
  ecologie: "Écologie",
  'bien-etre': "Bien-être",
  'culture-creole': "Culture créole",
  'produits-locaux': "Produits locaux",
  services: "Services",
  b2b: "B2B",
  agritech: "Agritech",
  sante: "Santé",
  education: "Éducation",
  events: "Événementiel",
  artisanat: "Artisanat"
};

const INVESTMENTS = [
  { id: "faible", label: "Faible capital" },
  { id: "moyen", label: "Budget modéré" },
  { id: "élevé", label: "Investissement conséquent" }
];

type FiltersProps = {
  onChange: (next: FilterState) => void;
};

export function Filters({ onChange }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTags, setActiveTags] = useState<Set<Tag>>(new Set());
  const [investmentLevels, setInvestmentLevels] = useState<Set<string>>(new Set());

  const updateFilters = (
    updater: (current: {
      search: string;
      tags: Set<Tag>;
      investment: Set<string>;
    }) => {
      search: string;
      tags: Set<Tag>;
      investment: Set<string>;
    }
  ) => {
    const next = updater({
      search: searchTerm,
      tags: activeTags,
      investment: investmentLevels
    });
    setSearchTerm(next.search);
    setActiveTags(new Set(next.tags));
    setInvestmentLevels(new Set(next.investment));
    onChange({
      search: next.search,
      tags: new Set(next.tags),
      investment: new Set(next.investment)
    });
  };

  const toggleTag = (tag: Tag) => {
    updateFilters(({ search, tags, investment }) => {
      const nextTags = new Set(tags);
      if (nextTags.has(tag)) {
        nextTags.delete(tag);
      } else {
        nextTags.add(tag);
      }
      return { search, tags: nextTags, investment };
    });
  };

  const toggleInvestment = (level: string) => {
    updateFilters(({ search, tags, investment }) => {
      const nextInvestment = new Set(investment);
      if (nextInvestment.has(level)) {
        nextInvestment.delete(level);
      } else {
        nextInvestment.add(level);
      }
      return { search, tags, investment: nextInvestment };
    });
  };

  return (
    <section>
      <div className="filters" style={{ marginBottom: "1rem" }}>
        <input
          type="search"
          placeholder="Rechercher un secteur, une idée, un mot-clé…"
          value={searchTerm}
          onChange={(event) =>
            updateFilters(({ tags, investment }) => ({
              search: event.target.value,
              tags,
              investment
            }))
          }
          style={{
            flex: "1 1 260px",
            borderRadius: "14px",
            border: "1px solid var(--border)",
            padding: "0.6rem 1rem",
            fontSize: "0.95rem",
            boxShadow: "var(--shadow)",
            minWidth: "200px"
          }}
        />
      </div>
      <div className="filters" style={{ marginBottom: "1rem" }}>
        {Object.entries(TAG_LABELS).map(([tag, label]) => {
          const typedTag = tag as Tag;
          const isActive = activeTags.has(typedTag);
          return (
            <button
              key={tag}
              className={`filter-button${isActive ? " active" : ""}`}
              onClick={() => toggleTag(typedTag)}
              type="button"
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="filters">
        {INVESTMENTS.map((item) => {
          const isActive = investmentLevels.has(item.id);
          return (
            <button
              key={item.id}
              className={`filter-button${isActive ? " active" : ""}`}
              onClick={() => toggleInvestment(item.id)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
