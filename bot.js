// Minecraft AFK Bot with Auto-Reconnect + Anti-AFK
// Requires: mineflayer, express
// Install with: npm install mineflayer express

const mineflayer = require('mineflayer');
const express = require('express');

// 🔧 Bot Config
const botOptions = {
  host: 'lifestealevo.aternos.me',
  port: 47881, // Your actual server port from Aternos
  username: 'EVO_BOT',
  auth: 'offline' // Use 'microsoft' if using a premium account
  version: '1.20.1'
};

let bot;

function startBot() {
  bot = mineflayer.createBot(botOptions);

  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.');

    // Anti-AFK movement every 5 min
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 5 * 60 * 1000);

    // Sneak every 7 min
    setInterval(() => {
      bot.setControlState('sneak', true);
      setTimeout(() => bot.setControlState('sneak', false), 1000);
    }, 7 * 60 * 1000);
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Reconnecting in 10s...');
    setTimeout(startBot, 10000);
  });

  bot.on('kicked', (reason) => {
    console.log('🚫 Kicked from server:', reason);
  });

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message);
  });
}

startBot();

// 🌐 Keep Alive Express Web Server
const app = express();
app.get('/', (req, res) => res.send('✅ Bot is running.'));
app.listen(process.env.PORT || 3000, () => {
  console.log('🌐 Web server is live.');
});
