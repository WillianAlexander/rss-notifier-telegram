const RSSParser = require("rss-parser");
const config = require("./config");

const parser = new RSSParser();

async function fetchNewStories() {
  const feed = await parser.parseURL(config.rssUrl);
  return feed.items.map((item) => ({
    id: item.link || item.guid,
    title: item.title,
    link: item.link,
  }));
}

module.exports = { fetchNewStories };
