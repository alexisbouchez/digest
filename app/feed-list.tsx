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
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) => {
    if (activeSource && item.source !== activeSource) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <>
      <input
        type="search"
        placeholder="Search entries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          marginBottom: 8,
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
      />

      <p style={{ lineHeight: 2 }}>
        <button
          onClick={() => setActiveSource(null)}
          style={{
            fontFamily: "inherit",
            fontSize: "inherit",
            cursor: "pointer",
          }}
        >
          {activeSource === null ? <b>All</b> : "All"}
        </button>{" "}
        {sources.map((source) => (
          <span key={source}>
            <button
              onClick={() =>
                setActiveSource(activeSource === source ? null : source)
              }
              style={{
                fontFamily: "inherit",
                fontSize: "inherit",
                cursor: "pointer",
              }}
            >
              {activeSource === source ? <b>{source}</b> : source}
            </button>{" "}
          </span>
        ))}
      </p>

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
