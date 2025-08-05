# ❤️ Subby

Subby is a full-featured Discord bot for verifying YouTube subscriptions via screenshot, built with [discord.js v14+](https://discord.js.org/), [mongoose](https://mongoosejs.com/), and [tesseract.js](https://tesseract.projectnaptha.com/).

## ✨ Features

- **YouTube Subscription Verification:** Users upload a screenshot of their YouTube subscription; Subby uses OCR to verify.
- **Automatic Role Assignment:** Verified users receive a configurable role.
- **Admin/Owner Commands:**  
  - `&purge` — Delete all messages in the current channel  
  - `&delete role` — Remove the subscriber role from all verified users  
  - `&verifiedusers` — List all verified users  
- **General Commands:**  
  - `&ping` — Show bot latency  
  - `&uptime` — Show bot uptime  
  - `&help` — Show all commands  
- **All bot messages use Discord embeds with a custom footer and bot avatar.**
- **Owner-only commands supported via OWNER_ID in `.env`.**
- **Bot activity set to "Streaming, NexR <3".**

## 🚀 Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/NexR75/Subby.git
   cd Subby
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values:
     ```
     BOT_TOKEN=your-bot-token-here
     MONGO_URI=your-mongodb-uri-here
     YT_CHANNEL_NAME=YourYouTubeChannelName
     PREFIX=&
     VERIFY_CHANNEL_ID=your-channel-id-here
     SUBSCRIBER_ROLE_ID=your-role-id-here
     OWNER_ID=your-discord-user-id-here
     ```

4. **Start the bot:**
   ```sh
   npm start
   ```

## 📜 Usage

- Users upload their YouTube subscription screenshot in the configured channel.
- Subby checks the screenshot and assigns the subscriber role if verified.
- Admin/owner commands are available for moderation and management.

## 🤖 Commands

| Command           | Description                                              | Permission         |
|-------------------|---------------------------------------------------------|--------------------|
| `&purge`          | Delete all messages in the channel                      | Admin/Owner        |
| `&delete role`    | Remove subscriber role from all verified users          | Admin/Owner        |
| `&verifiedusers`  | List all verified users                                 | Admin/Owner        |
| `&ping`           | Show bot latency                                        | Everyone           |
| `&uptime`         | Show bot uptime                                         | Everyone           |
| `&help`           | Show all commands                                       | Everyone           |

## Credits

- **Bot by:** NexR
- **Made with ❤️ by NexR**

---
