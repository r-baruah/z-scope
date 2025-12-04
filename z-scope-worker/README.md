# 🐳 Z-Scope Whale Monitor - Cloudflare Worker

<div align="center">

![Z-Scope Worker Badge](https://img.shields.io/badge/Status-Operational-brightgreen?style=for-the-badge)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=for-the-badge&logo=cloudflare)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

**Automated whale transaction monitoring for Zcash blockchain with Telegram alerts.**

[Live Status Check](https://long-art-bd4d.fi493072.workers.dev/health) • [Telegram Channel](https://t.me/zscope_alerts)

</div>

---

## 🎯 Features

- 🔍 **Real-time Monitoring**: Scans Zcash blockchain for large transactions (>$100k).
- 📢 **Instant Alerts**: Sends push notifications to Telegram channel.
- 🔒 **Privacy Awareness**: Distinguishes between transparent and shielded transactions.
- ⚡ **Serverless**: Runs on Cloudflare Workers for high availability and low cost.
- 🔄 **Cron Triggers**: Automated checks every 5 minutes.
- 💾 **Smart Deduplication**: Uses KV storage to prevent duplicate alerts.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [x] Telegram account (for bot creation)
- [x] Cloudflare account (free tier works!)
- [x] Node.js 18+ installed
- [x] Wrangler CLI (`npm install -g wrangler`)

---

## 🚀 Quick Setup Guide

### Part 1: Telegram Bot Setup (10 minutes)

#### Step 1: Create Your Bot
1. Open Telegram and search for **@BotFather**
2. Send command: `/newbot`
3. Choose a name: `Z-Scope Whale Alerts`
4. **SAVE YOUR TOKEN**: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

#### Step 2: Create Public Channel
1. Create a new **Channel** (e.g., `@zscope_alerts`)
2. Add your bot as an **Administrator** with "Post Messages" permission.

---

### Part 2: Cloudflare Worker Setup (15 minutes)

#### Step 1: Install & Login
```bash
cd z-scope-worker
npm install
wrangler login
```

#### Step 2: Create KV Namespace
```bash
wrangler kv:namespace create "WHALE_TRACKER"
# Copy the ID output (e.g., "abc123def456...")
```

#### Step 3: Configure `wrangler.toml`
Update your `wrangler.toml` with the KV ID:
```toml
[[kv_namespaces]]
binding = "WHALE_TRACKER"
id = "YOUR_KV_ID_HERE"
```

#### Step 4: Set Secrets
Securely store your Telegram credentials:
```bash
wrangler secret put TELEGRAM_BOT_TOKEN
# Paste your bot token

wrangler secret put TELEGRAM_CHANNEL_ID
# Paste your channel ID (e.g., @zscope_alerts)
```

#### Step 5: Deploy
```bash
wrangler deploy
```

---

## 🧪 Testing & Verification

### Manual Test Trigger
Force a check to verify alerts are working:
```bash
curl -X POST https://your-worker-url.workers.dev/test
```

### Health Check
Verify the worker is running:
```bash
curl https://your-worker-url.workers.dev/health
```
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-04T16:30:00.000Z",
  "service": "Z-Scope Whale Monitor"
}
```

### View Logs
Monitor real-time execution logs:
```bash
wrangler tail
```

---

## 📁 Project Structure

```
z-scope-worker/
├── whale-monitor.ts     # Main logic: Fetch -> Filter -> Alert
├── wrangler.toml        # Cloudflare config (Cron, KV, Secrets)
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── README.md           # This file
```

---

## 🔧 Configuration Details

### Environment Variables
- `TELEGRAM_BOT_TOKEN`: Bot API token.
- `TELEGRAM_CHANNEL_ID`: Channel username or ID.

### KV Namespace (`WHALE_TRACKER`)
- Stores processed transaction hashes with a 30-day TTL.
- Prevents the same transaction from triggering multiple alerts.

### Cron Schedule
- Default: `*/5 * * * *` (Every 5 minutes)
- Configurable in `wrangler.toml` under `[triggers]`.

---

## 🔐 Security

- ✅ **Secrets Management**: Credentials stored in Cloudflare Encrypted Secrets.
- ✅ **Rate Limiting**: Cron schedule prevents API abuse.
- ✅ **Data Privacy**: No sensitive user data is processed or stored.

---

<div align="center">

**Built with ❤️ for Zypherpunks Hackathon 2025**

</div>