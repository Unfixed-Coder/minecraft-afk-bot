// Minecraft AFK Bot (Auto-Reconnect + Anti-AFK)
// Requires Node.js and mineflayer

const mineflayer = require('mineflayer');

// Bot Configuration
const botOptions = {
  host: 'lifestealevo.aternos.me', // Server IP
  port: 25565,               // Server Port
  username: 'EVO_BOT',       // Bot Username
  auth: 'offline'            // 'microsoft' for official servers
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('✅ Bot is online and AFK!');

    // Anti-AFK Movement
    setInterval(() => {
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 5 * 60 * 1000); // Every 5 minutes

    // Random Jump
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 10 * 60 * 1000); // Every 10 minutes

    // Sneak for Fun
    setInterval(() => {
      bot.setControlState('sneak', true);
      setTimeout(() => bot.setControlState('sneak', false), 3000);
    }, 15 * 60 * 1000); // Every 15 minutes
  });

  // Auto-Reconnect on Disconnect
  bot.on('end', () => {
    console.log('🔄 Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.error('⚠️ Bot Error:', err);
  });
}

// Start the bot
createBot();

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web server started'));

