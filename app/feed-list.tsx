"use client";

import { useState } from "react";

interface FeedItem {
  source: string;
  title: string;
  link: string;
  date: string;
  timestamp: number;
}

export function FeedList({
  items,
  sources,
}: {
  items: FeedItem[];
  sources: string[];
}) {
  const [activeSource, setActiveSource] = useState<string | null>(null);

  const filtered = activeSource
    ? items.filter((item) => item.source === activeSource)
    : items;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveSource(null)}
          className={`filter-pill ${activeSource === null ? "active" : ""}`}
        >
          All
          <span className="pill-count">{items.length}</span>
        </button>
        {sources.map((source) => {
          const count = items.filter((i) => i.source === source).length;
          return (
            <button
              key={source}
              onClick={() =>
                setActiveSource(activeSource === source ? null : source)
              }
              className={`filter-pill ${activeSource === source ? "active" : ""}`}
            >
              {source}
              <span className="pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="entry-list">
        {filtered.map((item, i) => (
          <a
            key={`${item.link}-${i}`}
            href={item.link}
            target="_blank"
            rel="noopener"
            className="entry"
          >
            <div className="entry-meta">
              <span className="entry-date">{item.date}</span>
              <span className="entry-source">{item.source}</span>
            </div>
            <span className="entry-title">{item.title}</span>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-[var(--muted)] mt-4">No entries found.</p>
      )}
    </>
  );
}
