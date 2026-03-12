import { feeds } from "./feeds";
import { FeedList } from "./feed-list";
import { ThemeToggle } from "./theme-toggle";
import Parser from "rss-parser";

interface FeedItem {
  source: string;
  title: string;
  link: string;
  date: string;
  timestamp: number;
}

async function fetchAllFeeds(): Promise<FeedItem[]> {
  const parser = new Parser();
  const items: FeedItem[] = [];

  for (const feed of feeds) {
    try {
      const result = await parser.parseURL(feed.rss);
      for (const entry of result.items) {
        const date = entry.pubDate ? new Date(entry.pubDate) : new Date();
        items.push({
          source: feed.name,
          title: entry.title || "Untitled",
          link: entry.link || "#",
          date: date.toISOString().split("T")[0],
          timestamp: date.getTime(),
        });
      }
    } catch {
      // skip feeds that fail to parse
    }
  }

  items.sort((a, b) => b.timestamp - a.timestamp);
  return items;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await fetchAllFeeds();
  const sources = [...new Set(items.map((i) => i.source))];

  return (
    <div className="max-w-[960px] mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-lg font-semibold tracking-wide uppercase">
            Digest
          </h1>
          <ThemeToggle />
        </div>
        <hr className="thick" />
        <div className="flex gap-6 mt-2">
          <span className="label">RSS Feed Reader</span>
          <span className="label">
            {sources.length} source{sources.length !== 1 && "s"}
          </span>
          <span className="label">{items.length} entries</span>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">
          Sources
        </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Feed</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {feeds.map((feed) => (
              <tr key={feed.rss}>
                <td className="font-medium">{feed.name}</td>
                <td className="text-[var(--muted)]">{feed.rss}</td>
                <td>
                  <a href={feed.url} target="_blank" rel="noopener">
                    {feed.url} ↗
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide">
            Feed
          </h2>
          <span className="label">Latest first</span>
        </div>

        <FeedList items={items} sources={sources} />
      </section>

      <footer className="mt-10 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between">
          <small className="label">Digest v0.1.0</small>
          <small className="label">Dynamic</small>
        </div>
      </footer>
    </div>
  );
}
