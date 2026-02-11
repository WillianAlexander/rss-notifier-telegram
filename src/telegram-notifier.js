const config = require("./config");

const BASE_URL = `https://api.telegram.org/bot${config.telegramBotToken}`;

async function sendStory(story) {
  const text = `📰 ${story.title}\n🔗 ${story.link}`;

  for (const chatId of config.telegramChatIds) {
    const res = await fetch(`${BASE_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: false,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Telegram API error for chat ${chatId}: ${res.status}: ${body}`);
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { sendStory, delay };
