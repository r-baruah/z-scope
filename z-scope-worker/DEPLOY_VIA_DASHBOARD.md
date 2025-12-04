# 🌐 Deploy Z-Scope Worker via Cloudflare Dashboard (Website)

**No CLI needed! Deploy directly through your browser in 10 minutes.**

---

## 🚀 Step-by-Step Web Deployment

### Step 1: Go to Cloudflare Dashboard (2 mins)

1. Open browser and go to: https://dash.cloudflare.com/
2. Sign up or login to your Cloudflare account
3. On the left sidebar, click **"Workers & Pages"**
4. Click **"Create"** button

### Step 2: Create Worker (3 mins)

1. Click **"Create Worker"**
2. You'll see a code editor with sample code
3. **Delete all the sample code**
4. Copy the entire contents of **`whale-monitor.js`** from this folder (use the .js file, NOT .ts)
5. Paste it into the editor
6. Click **"Save and Deploy"** button

**Worker URL**: You'll get something like:
`https://z-scope-whale-monitor.YOUR-SUBDOMAIN.workers.dev`

**Save this URL!** You'll need it later.

### Step 3: Add Environment Variables (3 mins)

1. On the worker page, click **"Settings"** tab
2. Scroll down to **"Environment Variables"**
3. Click **"Edit variables"**

Add these two secrets:

**First Secret:**
- Variable name: `TELEGRAM_BOT_TOKEN`
- Value: `8340887577:AAFZXe35uMQ_g6ufQYu3mYgimz9f0eIqBvc`
- Type: **Secret** (encrypted)
- Click "Add variable"

**Second Secret:**
- Variable name: `TELEGRAM_CHANNEL_ID`  
- Value: `@zscope_alerts`
- Type: **Secret** (encrypted)
- Click "Add variable"

Click **"Save and deploy"**

### Step 4: Create KV Namespace (2 mins)

1. Go back to left sidebar → **"Workers & Pages"**
2. Click **"KV"** tab (or find it in left menu)
3. Click **"Create a namespace"**
4. Name it: `WHALE_TRACKER`
5. Click **"Add"**

**Copy the Namespace ID** - it looks like: `abc123def456789...`

### Step 5: Bind KV to Worker (2 mins)

1. Go back to your worker (Workers & Pages → your worker name)
2. Click **"Settings"** tab
3. Scroll to **"Bindings"**
4. Click **"Add binding"**

Configure:
- Binding type: **KV Namespace**
- Variable name: `WHALE_TRACKER` (must match exactly)
- KV namespace: Select `WHALE_TRACKER` from dropdown
- Click **"Save"**

### Step 6: Add Cron Trigger (2 mins)

1. Still in **"Settings"** tab
2. Scroll to **"Triggers"**
3. Click **"Add Cron Trigger"**
4. Cron expression: `*/5 * * * *`
   (This means: every 5 minutes)
5. Click **"Add Trigger"**

### Step 7: Test It! (1 min)

Open a new browser tab and go to:
```
https://YOUR-WORKER-URL.workers.dev/test
```

Replace `YOUR-WORKER-URL` with your actual worker URL from Step 2.

**Expected Result:**
```json
{
  "success": true,
  "message": "Test alert sent successfully",
  "alert": {
    "hash": "test...",
    "amount": 3500,
    "amountUSD": 150500,
    ...
  }
}
```

**Check Your Telegram Channel** - You should see a whale alert! 🐳

---

## ✅ Verification Checklist

- [ ] Worker created and deployed
- [ ] TELEGRAM_BOT_TOKEN secret added
- [ ] TELEGRAM_CHANNEL_ID secret added
- [ ] KV namespace `WHALE_TRACKER` created
- [ ] KV binding added to worker
- [ ] Cron trigger set to `*/5 * * * *`
- [ ] Test endpoint returns success
- [ ] Test alert appears in Telegram

---

## 📊 Monitoring Your Worker

### View Logs
1. Go to your worker page
2. Click **"Logs"** tab (or "Real-time logs")
3. You'll see all execution logs here
4. Wait 5 minutes to see the cron job run

### Check Metrics
1. Click **"Metrics"** tab
2. See requests, errors, CPU time
3. Verify cron jobs are running

---

## 🐛 Common Issues

### "Failed to fetch"
- Check worker is deployed (green status)
- Verify URL is correct
- Try `/health` endpoint first

### No Telegram Messages
- Verify secrets are set correctly
- Check bot is admin in channel
- Ensure channel is PUBLIC
- Channel ID must include @ symbol

### KV Binding Error
- Variable name must be exactly `WHALE_TRACKER`
- KV namespace must be selected from dropdown
- Click "Save" after adding binding

### Cron Not Running
- Check Triggers section has the cron
- Syntax must be: `*/5 * * * *`
- Wait 5 minutes for first execution
- Check logs to verify

---

## 🎯 What You've Deployed

Your worker now:
- ✅ Runs every 5 minutes automatically
- ✅ Checks Zcash blockchain for whale transactions (>$100k)
- ✅ Sends alerts to your Telegram channel
- ✅ Stores processed transactions in KV to avoid duplicates
- ✅ Has a `/test` endpoint for manual testing
- ✅ Has a `/health` endpoint for monitoring

---

## 🔗 Next Steps

### 1. Update Frontend
Edit `z-scope/src/components/WhaleWatch.tsx` line 130:

Change:
```typescript
href="https://t.me/YOUR_CHANNEL_NAME"
```

To:
```typescript
href="https://t.me/zscope_alerts"
```

### 2. Save URLs
Add to your notes:
- Worker URL: `https://your-worker-url.workers.dev`
- Telegram Channel: `https://t.me/zscope_alerts`
- Health Check: `https://your-worker-url.workers.dev/health`

### 3. Deploy Frontend
Now that backend is ready, deploy your React app to Vercel!

---

## 💡 Pro Tips

1. **Bookmark worker dashboard** - Easy access to logs
2. **Pin the health check URL** - Quick status verification
3. **Join your Telegram channel** - See alerts in real-time
4. **Check logs after 5 minutes** - Verify cron is working

---

**Total Time: 10-15 minutes**  
**No terminal commands needed!**  
**Everything through web interface!** ✨

Done? Great! Now deploy your frontend and you're ready to submit! 🚀