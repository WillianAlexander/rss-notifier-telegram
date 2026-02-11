const config = require("./config");
const storage = require("./storage");
const { fetchNewStories } = require("./rss-poller");
const { sendStory, delay } = require("./telegram-notifier");

let timer = null;
let firstRun = true;

async function poll() {
  try {
    console.log(`[${new Date().toISOString()}] Polling RSS...`);
    const stories = await fetchNewStories();
    const newStories = stories.filter((s) => !storage.has(s.id));

    if (firstRun) {
      newStories.reverse();
      firstRun = false;
    }

    if (newStories.length === 0) {
      console.log("No new stories");
      return;
    }

    console.log(`Found ${newStories.length} new stories`);

    for (const story of newStories) {
      try {
        await sendStory(story);
        storage.add(story.id);
        console.log(`Sent: ${story.title}`);
      } catch (err) {
        console.error(`Failed to send "${story.title}":`, err.message);
      }
      await delay(config.sendDelayMs);
    }

    storage.save();
  } catch (err) {
    console.error("Poll error:", err.message);
  }
}

function shutdown() {
  console.log("\nShutting down...");
  clearInterval(timer);
  storage.save();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

storage.load();
console.log(`Starting Hacker News → Telegram bot (polling every ${config.pollIntervalMs / 1000}s)`);
poll();
timer = setInterval(poll, config.pollIntervalMs);
