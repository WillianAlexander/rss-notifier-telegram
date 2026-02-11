const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");
const FILE_PATH = path.join(DATA_DIR, "sent-stories.json");

let sentIds = new Set();

function load() {
  try {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    sentIds = new Set(JSON.parse(raw));
    console.log(`Loaded ${sentIds.size} sent story IDs`);
  } catch {
    sentIds = new Set();
    console.log("No previous data found, starting fresh");
  }
}

function save() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify([...sentIds]));
}

function has(id) {
  return sentIds.has(id);
}

function add(id) {
  sentIds.add(id);
}

module.exports = { load, save, has, add };
