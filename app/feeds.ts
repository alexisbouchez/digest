export interface FeedSource {
  name: string;
  url: string;
  rss: string;
}

export const feeds: FeedSource[] = [
  {
    name: "Depot",
    url: "https://depot.dev",
    rss: "https://depot.dev/rss.xml",
  },
  {
    name: "Railway",
    url: "https://railway.com",
    rss: "https://blog.railway.com/rss.xml",
  },
];
