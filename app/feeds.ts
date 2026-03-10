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
  {
    name: "Sentry",
    url: "https://blog.sentry.io",
    rss: "https://blog.sentry.io/feed.xml",
  },
  {
    name: "Canny",
    url: "https://canny.io/blog",
    rss: "https://canny.io/blog/feed/",
  },
  {
    name: "Fly.io",
    url: "https://fly.io/blog",
    rss: "https://fly.io/blog/feed.xml",
  },
];
