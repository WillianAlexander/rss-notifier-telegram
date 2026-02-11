require("dotenv").config();

const required = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`);
    process.exit(1);
  }
}

module.exports = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID,
  pollIntervalMs: 5 * 60 * 1000,
  rssUrl: "https://news.ycombinator.com/rss",
  sendDelayMs: 1500,
};
