const RSSParser = require("rss-parser");
const config = require("./config");

const parser = new RSSParser();

const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours

async function fetchNewStories() {
  const feed = await parser.parseURL(config.rssUrl);
  const now = Date.now();

  return feed.items
    .filter((item) => {
      const pubDate = item.isoDate || item.pubDate;
      if (!pubDate) return true;
      return now - new Date(pubDate).getTime() <= MAX_AGE_MS;
    })
    .map((item) => ({
      id: item.link || item.guid,
      title: item.title,
      link: item.link,
    }));
}

module.exports = { fetchNewStories };
