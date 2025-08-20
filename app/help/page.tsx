"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Shield, Zap, Users, Settings, ChevronRight } from "lucide-react"
import Link from "next/link"

const helpSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    description: "Learn the basics of ShadowStack",
    articles: [
      {
        id: "setup",
        title: "Setting up your first wallet monitoring",
        content:
          'To start monitoring your hot wallets:\n\n1. **Sign up and verify your account** - Create your ShadowStack account and verify your email address.\n\n2. **Navigate to Targets** - Go to Dashboard → Targets in the main navigation.\n\n3. **Add wallet address** - Click "Add Target" and paste your hot wallet address. Our system automatically detects the blockchain network (Bitcoin, Ethereum, Solana, TRON, or BSC).\n\n4. **Add a label** - Give your wallet a descriptive name like "Main Exchange Hot Wallet" or "Trading Bot Wallet" for easy identification.\n\n5. **Configure monitoring** - Choose your monitoring preferences:\n   - Real-time scanning (recommended for high-value wallets)\n   - Alert sensitivity (Critical, High, Medium, Low)\n   - Notification channels (email, webhook, Slack)\n\n6. **Verify setup** - Your wallet will appear in the monitoring dashboard within 2-3 minutes. You\'ll see a green "Active" status when monitoring begins.\n\n**Pro tip:** Start with your highest-value hot wallets first, then add others as needed.',
      },
      {
        id: "alerts",
        title: "Understanding security alerts",
        content:
          "ShadowStack provides four types of security alerts:\n\n**CRITICAL (Red)** - Immediate action required\n- Direct mentions of your wallet address in hacker channels\n- Confirmed targeting by known threat actors\n- Active attack discussions involving your assets\n- Response time: Within 5 minutes\n\n**HIGH (Orange)** - Urgent attention needed\n- Suspicious activity patterns detected\n- Your wallet mentioned in general threat discussions\n- Unusual transaction volume or patterns\n- Response time: Within 15 minutes\n\n**MEDIUM (Yellow)** - Monitor closely\n- General threats to your blockchain network\n- Increased chatter about similar exchanges\n- New attack methods being discussed\n- Response time: Within 1 hour\n\n**LOW (Blue)** - Informational\n- General security news and updates\n- New threat intelligence reports\n- Industry security recommendations\n- Response time: Review daily\n\nEach alert includes:\n- Timestamp and source channel\n- Threat description and context\n- Recommended actions\n- Related wallet addresses\n- Confidence score (1-100)",
      },
      {
        id: "notifications",
        title: "Configuring notification preferences",
        content:
          'Set up notifications to receive alerts instantly:\n\n**Email Notifications:**\n1. Go to Dashboard → Settings → Notifications\n2. Enter your email address (we recommend using a security team distribution list)\n3. Choose alert levels to receive (Critical and High recommended minimum)\n4. Set quiet hours if needed (alerts will queue and send after quiet period)\n5. Test notifications with the "Send Test Alert" button\n\n**Webhook Integration:**\n1. In Settings → Webhooks, click "Add Webhook"\n2. Enter your endpoint URL (must be HTTPS)\n3. Select events to receive (alerts, wallet_added, monitoring_status)\n4. Add webhook secret for payload verification\n5. Test the integration\n\n**Slack Integration:**\n1. Install our Slack app in your workspace\n2. Invite @ShadowStack to your security channel\n3. Use command `/shadowstack connect` to link your account\n4. Configure which alerts to post in channel settings\n\n**Discord Integration:**\n1. Add our Discord bot to your server\n2. Create a dedicated #security-alerts channel\n3. Use `!shadowstack setup` command to configure\n4. Set permissions for who can view alerts\n\n**Mobile Push (Coming Soon):**\n- iOS and Android apps in development\n- Push notifications for critical alerts\n- Biometric authentication required',
      },
      {
        id: "dashboard",
        title: "Dashboard overview and navigation",
        content:
          "Your ShadowStack dashboard provides a complete security overview:\n\n**Main Dashboard:**\n- **Threat Level Indicator** - Current overall threat level (Green/Yellow/Orange/Red)\n- **Active Alerts** - Recent security alerts requiring attention\n- **Monitored Assets** - Number of wallets and addresses being tracked\n- **24h Activity** - Alert volume and threat trends\n- **Quick Actions** - Add wallet, view alerts, check settings\n\n**Navigation Menu:**\n- **Dashboard** - Main overview and recent activity\n- **Targets** - Manage wallet addresses and monitoring settings\n- **Alerts** - View all security alerts with filtering options\n- **Settings** - Account, notifications, API keys, and integrations\n\n**Targets Page:**\n- Add/remove wallet addresses\n- View monitoring status for each wallet\n- Configure individual wallet alert settings\n- See recent activity per wallet\n- Export wallet list and activity reports\n\n**Alerts Page:**\n- Filter by severity, date, wallet, or source\n- Mark alerts as resolved or false positive\n- Export alert data for compliance reporting\n- View alert details and recommended actions\n- Set up alert rules and automation\n\n**Settings Page:**\n- Profile and account information\n- Notification preferences and channels\n- API key management\n- Webhook configuration\n- Billing and subscription details\n- Security settings (2FA, login history)",
      },
    ],
  },
  {
    id: "wallet-management",
    title: "Wallet Management",
    icon: Shield,
    description: "Managing your hot wallet addresses",
    articles: [
      {
        id: "add-wallets",
        title: "Adding wallet addresses to monitoring",
        content:
          'Add wallet addresses for comprehensive monitoring:\n\n**Supported Address Formats:**\n- **Bitcoin:** Legacy (1...), SegWit (3...), Bech32 (bc1...)\n- **Ethereum:** Standard addresses (0x...) and ENS domains\n- **Solana:** Base58 encoded addresses\n- **TRON:** TRX addresses (T...)\n- **BSC:** Same format as Ethereum (0x...)\n\n**Adding Process:**\n1. **Navigate to Targets** - Dashboard → Targets\n2. **Click "Add Target"** - Opens the wallet addition form\n3. **Enter wallet address** - Paste or type the full address\n4. **Auto-detection** - System automatically identifies the blockchain\n5. **Add label** - Descriptive name for easy identification\n6. **Set priority** - High, Medium, or Low monitoring intensity\n7. **Configure alerts** - Choose which alert types to receive\n8. **Save and activate** - Monitoring begins within 2-3 minutes\n\n**Best Practices:**\n- Use clear, descriptive labels ("Main Hot Wallet", "Trading Bot", "Customer Withdrawals")\n- Add wallets in order of importance (highest value first)\n- Group related wallets with consistent naming\n- Document wallet purposes in the notes field\n- Regular audit of monitored addresses\n\n**Bulk Import:**\n- Upload CSV file with addresses and labels\n- Maximum 100 addresses per import\n- Validation occurs before activation\n- Failed imports provide detailed error reports\n\n**Verification:**\n- Each address is validated against blockchain format\n- Balance and transaction history checked\n- Monitoring status confirmed before activation\n- Test alerts sent to verify notification channels',
      },
      {
        id: "blockchains",
        title: "Supported blockchain networks",
        content:
          "ShadowStack monitors threats across major blockchain networks:\n\n**Bitcoin (BTC)**\n- Address formats: Legacy, SegWit, Bech32\n- Monitoring: Transaction patterns, balance changes, threat mentions\n- Alert sources: Dark web forums, Telegram channels, Discord servers\n- Special features: UTXO tracking, mixing service detection\n\n**Ethereum (ETH)**\n- Address formats: Standard addresses, ENS domains\n- Monitoring: Smart contract interactions, token transfers, DeFi activity\n- Alert sources: MEV bot discussions, DeFi exploit channels, hacker forums\n- Special features: Gas price manipulation detection, front-running alerts\n\n**Binance Smart Chain (BSC)**\n- Address formats: Same as Ethereum (0x...)\n- Monitoring: BEP-20 token transfers, PancakeSwap activity\n- Alert sources: BSC-specific threat channels, bridge exploit discussions\n- Special features: Cross-chain bridge monitoring, validator tracking\n\n**Solana (SOL)**\n- Address formats: Base58 encoded addresses\n- Monitoring: SPL token transfers, program interactions\n- Alert sources: Solana developer channels, DeFi protocol discussions\n- Special features: Program upgrade monitoring, validator performance\n\n**TRON (TRX)**\n- Address formats: TRX addresses (T...)\n- Monitoring: TRC-20 token transfers, smart contract calls\n- Alert sources: Asian crypto channels, TRON-specific forums\n- Special features: Energy/bandwidth monitoring, freeze/unfreeze tracking\n\n**Coming Soon:**\n- Polygon (MATIC) - Q2 2024\n- Avalanche (AVAX) - Q2 2024\n- Cardano (ADA) - Q3 2024\n- Polkadot (DOT) - Q3 2024\n\n**Network-Specific Features:**\n- Real-time mempool monitoring\n- Large transaction alerts\n- Unusual activity pattern detection\n- Cross-chain bridge monitoring\n- DeFi protocol integration tracking",
      },
      {
        id: "validation",
        title: "Wallet validation and verification",
        content:
          "Our validation system ensures accurate monitoring:\n\n**Address Validation Process:**\n1. **Format Check** - Verifies address follows blockchain standards\n2. **Checksum Validation** - Confirms address integrity\n3. **Network Verification** - Ensures address exists on specified blockchain\n4. **Activity Check** - Confirms wallet has transaction history\n5. **Duplicate Detection** - Prevents monitoring same address twice\n\n**Validation Results:**\n- ✅ **Valid** - Address passes all checks, monitoring activated\n- ⚠️ **Warning** - Address valid but has issues (inactive, low balance)\n- ❌ **Invalid** - Address format incorrect or doesn't exist\n- 🔄 **Pending** - Validation in progress (usually 30-60 seconds)\n\n**Common Validation Issues:**\n- **Invalid format** - Address doesn't match blockchain standards\n- **Wrong network** - Address belongs to different blockchain\n- **Inactive address** - No transaction history found\n- **Already monitored** - Address already in your monitoring list\n- **Unsupported type** - Contract addresses or special wallet types\n\n**Manual Verification:**\n- Contact support for special address types\n- Provide transaction hash for verification\n- Include blockchain explorer link\n- Explain wallet type and usage\n\n**Verification Benefits:**\n- Prevents false alerts from invalid addresses\n- Ensures monitoring resources used efficiently\n- Reduces noise in alert system\n- Improves threat detection accuracy\n\n**Re-validation:**\n- Addresses re-validated every 24 hours\n- Inactive addresses flagged for review\n- Network changes automatically detected\n- Monitoring paused for invalid addresses",
      },
      {
        id: "remove-wallets",
        title: "Removing or pausing wallet monitoring",
        content:
          'Manage your monitored wallets effectively:\n\n**Pausing Monitoring:**\n1. Go to Dashboard → Targets\n2. Find the wallet you want to pause\n3. Click the toggle switch to "Paused"\n4. Monitoring stops immediately, but wallet remains in list\n5. Resume anytime by toggling back to "Active"\n\n**When to Pause:**\n- Wallet temporarily not in use\n- Maintenance or migration in progress\n- Reducing monitoring costs\n- Testing new wallet configurations\n\n**Removing Wallets:**\n1. Navigate to the wallet in Targets\n2. Click the three-dot menu (⋯)\n3. Select "Remove from monitoring"\n4. Confirm removal in popup dialog\n5. Wallet and all associated data deleted\n\n**When to Remove:**\n- Wallet permanently decommissioned\n- Address no longer belongs to your organization\n- Duplicate or incorrect addresses\n- Consolidating monitoring lists\n\n**Bulk Operations:**\n- Select multiple wallets using checkboxes\n- Use "Bulk Actions" dropdown\n- Choose pause, resume, or remove\n- Confirm operation for all selected wallets\n\n**Data Retention:**\n- Paused wallets: All historical data retained\n- Removed wallets: Data deleted after 30 days\n- Alert history: Preserved for compliance (1 year)\n- Export data before removal if needed\n\n**Recovery:**\n- Paused wallets: Resume instantly\n- Removed wallets: Re-add as new (loses history)\n- Deleted data: Cannot be recovered after 30 days\n- Contact support within 30 days for data recovery\n\n**Best Practices:**\n- Pause instead of remove when uncertain\n- Export important data before removal\n- Document reasons for removal\n- Regular cleanup of unused addresses',
      },
    ],
  },
  {
    id: "alerts-notifications",
    title: "Alerts & Notifications",
    icon: Zap,
    description: "Understanding and managing alerts",
    articles: [
      {
        id: "alert-types",
        title: "Types of security alerts",
        content:
          "ShadowStack provides comprehensive threat detection:\n\n**Direct Targeting Alerts:**\n- **Wallet Mention** - Your address discussed in threat channels\n- **Exchange Targeting** - Your domain/brand mentioned as target\n- **Insider Threat** - Employee information shared in criminal forums\n- **Social Engineering** - Phishing campaigns targeting your users\n\n**Transaction Pattern Alerts:**\n- **Large Outflow** - Unusual large transactions from monitored wallets\n- **Rapid Drainage** - Multiple quick withdrawals indicating compromise\n- **Mixing Service** - Funds sent to known cryptocurrency mixers\n- **Blacklisted Address** - Transactions with known criminal addresses\n\n**Network Threat Alerts:**\n- **New Attack Vector** - Novel attack methods discussed\n- **Vulnerability Disclosure** - Zero-day exploits affecting your blockchain\n- **Protocol Exploit** - DeFi protocol vulnerabilities that could affect you\n- **Bridge Compromise** - Cross-chain bridge security incidents\n\n**Intelligence Alerts:**\n- **Threat Actor Profiling** - Known hackers discussing your sector\n- **Tool Development** - New hacking tools targeting crypto exchanges\n- **Market Manipulation** - Coordinated attacks on token prices\n- **Regulatory Action** - Government actions affecting crypto security\n\n**Source Categories:**\n- **Dark Web Forums** - Hidden criminal marketplaces and forums\n- **Public Telegram** - Open cryptocurrency and hacking channels\n- **Discord Servers** - Gaming and crypto communities\n- **Social Media** - Twitter, Reddit threat discussions\n- **Code Repositories** - GitHub exploit code and tools\n\n**Alert Confidence Levels:**\n- **High (90-100%)** - Verified threats with strong evidence\n- **Medium (70-89%)** - Likely threats requiring investigation\n- **Low (50-69%)** - Possible threats worth monitoring\n- **Intelligence (30-49%)** - General threat information\n\n**Response Recommendations:**\nEach alert includes specific actions:\n- Immediate security measures\n- Investigation steps\n- Communication protocols\n- Recovery procedures",
      },
      {
        id: "email-setup",
        title: "Setting up email notifications",
        content:
          "Configure email alerts for instant threat notifications:\n\n**Basic Email Setup:**\n1. **Navigate to Settings** - Dashboard → Settings → Notifications\n2. **Add Email Address** - Enter primary security team email\n3. **Verify Email** - Check inbox and click verification link\n4. **Choose Alert Levels** - Select Critical, High, Medium, or Low\n5. **Set Frequency** - Instant, Hourly digest, or Daily summary\n6. **Test Notifications** - Send test alert to verify delivery\n\n**Advanced Configuration:**\n- **Multiple Recipients** - Add up to 10 email addresses\n- **Role-Based Routing** - Different alerts to different teams\n- **Escalation Rules** - Auto-escalate if no response within timeframe\n- **Quiet Hours** - Pause non-critical alerts during specified times\n- **Weekend Settings** - Reduced alerting on weekends\n\n**Email Templates:**\n- **Critical Alert** - Immediate action required format\n- **Daily Digest** - Summary of all alerts in 24 hours\n- **Weekly Report** - Comprehensive security overview\n- **Monthly Summary** - Trends and statistics\n\n**Delivery Options:**\n- **Instant** - Alerts sent immediately (recommended for Critical/High)\n- **Batched** - Group alerts every 15/30/60 minutes\n- **Digest** - Single email with multiple alerts\n- **Scheduled** - Send at specific times only\n\n**Email Security:**\n- **SPF/DKIM** - All emails properly authenticated\n- **Encryption** - TLS encryption for all email delivery\n- **No Sensitive Data** - Wallet addresses partially masked\n- **Unsubscribe** - Easy opt-out while maintaining security\n\n**Troubleshooting:**\n- **Not Receiving** - Check spam folder, verify email address\n- **Delayed Delivery** - Check email provider's filtering rules\n- **Missing Alerts** - Verify alert level settings match preferences\n- **Formatting Issues** - Try different email client or webmail\n\n**Best Practices:**\n- Use distribution lists for team notifications\n- Set up backup email addresses\n- Regular test of notification delivery\n- Monitor email delivery rates in dashboard\n- Keep contact information updated",
      },
      {
        id: "webhooks",
        title: "Webhook integrations (Slack, Discord)",
        content:
          "Integrate ShadowStack with your existing communication tools:\n\n**Slack Integration:**\n1. **Install App** - Add ShadowStack app from Slack App Directory\n2. **Authorize** - Grant permissions to post in channels\n3. **Choose Channel** - Select #security-alerts or similar\n4. **Configure Alerts** - Choose which alert types to post\n5. **Test Integration** - Send test message to verify setup\n\n**Slack Features:**\n- **Rich Formatting** - Color-coded alerts with severity indicators\n- **Interactive Buttons** - Mark as resolved, escalate, or investigate\n- **Thread Replies** - Team discussion on specific alerts\n- **Alert Summaries** - Daily/weekly digest posts\n- **Custom Channels** - Route different alerts to different channels\n\n**Discord Integration:**\n1. **Add Bot** - Invite ShadowStack bot to your Discord server\n2. **Set Permissions** - Grant message posting and embed permissions\n3. **Configure Channel** - Choose dedicated security channel\n4. **Customize Alerts** - Select alert types and formatting\n5. **Test Setup** - Verify bot can post messages\n\n**Discord Features:**\n- **Embed Messages** - Rich formatted alerts with images\n- **Role Mentions** - Tag security team for critical alerts\n- **Reaction Buttons** - Quick acknowledge/resolve actions\n- **Voice Alerts** - Optional voice channel notifications\n- **Bot Commands** - Query alert status and statistics\n\n**Custom Webhooks:**\n- **Endpoint Setup** - Provide HTTPS URL for webhook delivery\n- **Authentication** - Secure with API keys or signatures\n- **Payload Format** - JSON format with alert details\n- **Retry Logic** - Automatic retry on delivery failures\n- **Rate Limiting** - Respect your endpoint's rate limits\n\n**Integration Best Practices:**\n- Use dedicated channels for security alerts\n- Set up proper access controls\n- Test integrations regularly\n- Monitor delivery success rates\n- Have backup notification methods",
      },
      {
        id: "severity",
        title: "Alert severity levels and filtering",
        content:
          "Understand and manage alert priorities effectively:\n\n**Severity Levels:**\n\n**🔴 CRITICAL**\n- **Response Time:** Within 5 minutes\n- **Examples:** Direct wallet targeting, active attack in progress, confirmed breach\n- **Actions:** Immediate security measures, freeze affected wallets, alert all stakeholders\n- **Escalation:** Auto-escalate to senior security team if no response in 10 minutes\n\n**🟠 HIGH**\n- **Response Time:** Within 15 minutes\n- **Examples:** Suspicious activity patterns, threat actor mentions, vulnerability affecting your assets\n- **Actions:** Investigate immediately, increase monitoring, prepare defensive measures\n- **Escalation:** Escalate to security lead if no response in 30 minutes\n\n**🟡 MEDIUM**\n- **Response Time:** Within 1 hour\n- **Examples:** General threats to your blockchain, increased chatter about similar exchanges\n- **Actions:** Monitor closely, review security posture, document for analysis\n- **Escalation:** Include in daily security briefing\n\n**🔵 LOW**\n- **Response Time:** Review daily\n- **Examples:** Industry news, general security recommendations, threat intelligence updates\n- **Actions:** Review during regular security meetings, update procedures if needed\n- **Escalation:** Include in weekly security reports\n\n**Filtering Options:**\n\n**By Severity:**\n- Show only Critical and High alerts\n- Hide Low severity during business hours\n- Weekend filtering (Critical only)\n- Custom severity combinations\n\n**By Source:**\n- Dark web forums only\n- Public channels (Telegram, Discord)\n- Social media mentions\n- Code repositories and GitHub\n\n**By Wallet:**\n- Specific wallet addresses\n- Wallet groups or labels\n- High-value wallets only\n- Recently added wallets\n\n**By Time:**\n- Last 24 hours\n- Business hours only\n- Specific date ranges\n- Real-time vs historical\n\n**Advanced Filtering:**\n- **Keyword Filtering** - Include/exclude specific terms\n- **Confidence Threshold** - Only show alerts above certain confidence level\n- **Source Reputation** - Filter by source reliability score\n- **Geographic Filtering** - Alerts from specific regions only\n\n**Custom Alert Rules:**\n- **Auto-Acknowledge** - Automatically mark certain low-priority alerts as seen\n- **Auto-Escalate** - Escalate specific alert types immediately\n- **Suppress Duplicates** - Avoid multiple alerts for same threat\n- **Time-Based Rules** - Different handling for business vs after hours\n\n**Filter Management:**\n- **Save Filters** - Create and save custom filter combinations\n- **Share Filters** - Team members can use same filter settings\n- **Default Views** - Set default filters for different user roles\n- **Quick Filters** - One-click access to common filter combinations\n\n**Best Practices:**\n- Start with Critical and High alerts only\n- Gradually add Medium alerts as team capacity allows\n- Use time-based filtering to reduce alert fatigue\n- Regular review of filter effectiveness\n- Adjust filters based on threat landscape changes",
      },
    ],
  },
  {
    id: "account-billing",
    title: "Account & Billing",
    icon: Users,
    description: "Managing your account and subscription",
    articles: [
      {
        id: "plans",
        title: "Upgrading or downgrading your plan",
        content:
          "Manage your ShadowStack subscription to match your needs:\n\n**Available Plans:**\n\n**Starter ($49/month)**\n- 5 wallet addresses\n- Basic threat monitoring\n- Email notifications\n- 24/7 support\n- 30-day alert history\n\n**Growth ($149/month)**\n- 25 wallet addresses\n- Advanced threat intelligence\n- Slack/Discord integration\n- API access\n- 90-day alert history\n- Priority support\n\n**Enterprise ($499/month)**\n- Unlimited wallet addresses\n- Custom threat feeds\n- Dedicated account manager\n- SLA guarantees\n- 1-year alert history\n- Custom integrations\n\n**Upgrading Your Plan:**\n1. **Go to Settings** - Dashboard → Settings → Billing\n2. **View Current Plan** - See your current subscription details\n3. **Choose New Plan** - Select the plan you want to upgrade to\n4. **Review Changes** - See new features and pricing\n5. **Confirm Upgrade** - Changes take effect immediately\n6. **Pro-rated Billing** - You'll be charged the difference for the current period\n\n**Downgrading Your Plan:**\n1. **Navigate to Billing** - Settings → Billing\n2. **Select Lower Plan** - Choose the plan you want to downgrade to\n3. **Review Limitations** - Understand what features you'll lose\n4. **Confirm Downgrade** - Changes take effect at next billing cycle\n5. **Data Migration** - Excess wallets will be paused, not deleted\n\n**Plan Comparison:**\n- **Wallet Limits** - Number of addresses you can monitor\n- **Alert History** - How long alerts are stored\n- **Integration Options** - Available third-party integrations\n- **Support Level** - Response time and support channels\n- **API Access** - Programmatic access to alerts and data\n\n**Billing Cycle Changes:**\n- **Monthly to Annual** - Save 20% with annual billing\n- **Annual to Monthly** - Change at end of current annual period\n- **Pro-rated Adjustments** - Fair billing for mid-cycle changes\n\n**Enterprise Features:**\n- **Custom Threat Feeds** - Tailored intelligence for your industry\n- **Dedicated Support** - Direct line to security experts\n- **Custom Integrations** - Bespoke API integrations\n- **SLA Guarantees** - Uptime and response time commitments\n- **Compliance Reporting** - Detailed reports for audits\n\n**Downgrade Considerations:**\n- Excess wallets will be paused (not deleted)\n- Alert history beyond plan limits will be archived\n- Advanced features will be disabled\n- API access may be restricted\n- Support response times may increase\n\n**Need Help Choosing?**\n- Contact our sales team for plan recommendations\n- Free consultation to assess your security needs\n- Custom pricing for large enterprises\n- Trial periods available for higher-tier plans",
      },
      {
        id: "billing",
        title: "Managing billing and payment methods",
        content:
          'Handle your ShadowStack billing and payments:\n\n**Payment Methods:**\n- **Credit Cards** - Visa, Mastercard, American Express\n- **Debit Cards** - Most major debit cards accepted\n- **Bank Transfer** - Available for Enterprise plans\n- **PayPal** - Secure PayPal payments supported\n- **Cryptocurrency** - Bitcoin and Ethereum accepted (Enterprise only)\n\n**Adding Payment Method:**\n1. **Go to Billing** - Dashboard → Settings → Billing\n2. **Payment Methods** - Click "Add Payment Method"\n3. **Enter Details** - Provide card or account information\n4. **Verify Method** - Small authorization charge (refunded)\n5. **Set as Default** - Choose primary payment method\n\n**Updating Payment Information:**\n1. **Access Billing** - Settings → Billing → Payment Methods\n2. **Edit Existing** - Click edit on current payment method\n3. **Add New Method** - Add new card and set as default\n4. **Remove Old Method** - Delete outdated payment information\n5. **Test Payment** - Verify new method works correctly\n\n**Billing Cycle:**\n- **Monthly Plans** - Charged on the same date each month\n- **Annual Plans** - Charged once per year with 20% discount\n- **Pro-rated Charges** - Mid-cycle upgrades charged proportionally\n- **Automatic Renewal** - Plans renew automatically unless canceled\n\n**Invoice Management:**\n- **Download Invoices** - PDF invoices available in billing section\n- **Email Invoices** - Automatic email delivery to billing contact\n- **Accounting Integration** - Export to QuickBooks, Xero, etc.\n- **Tax Information** - VAT/GST handling for international customers\n\n**Failed Payment Handling:**\n- **Retry Attempts** - Automatic retry for 7 days\n- **Email Notifications** - Alerts sent for payment failures\n- **Grace Period** - 7-day grace period before service suspension\n- **Account Recovery** - Easy reactivation once payment resolved\n\n**Billing Support:**\n- **24/7 Billing Help** - Dedicated billing support team\n- **Live Chat** - Instant help with payment issues\n- **Phone Support** - Direct line for urgent billing matters\n- **Email Support** - billing@shadowsignals.live\n\n**Enterprise Billing:**\n- **Custom Terms** - Net 30, 60, or 90 payment terms\n- **Purchase Orders** - PO-based billing available\n- **Volume Discounts** - Discounts for large deployments\n- **Multi-year Contracts** - Additional savings for longer commitments\n\n**Security:**\n- **PCI Compliance** - All payment data securely processed\n- **Encryption** - End-to-end encryption for all transactions\n- **No Storage** - We don\'t store your payment information\n- **Fraud Protection** - Advanced fraud detection systems\n\n**Refund Policy:**\n- **30-Day Guarantee** - Full refund within 30 days\n- **Pro-rated Refunds** - Partial refunds for annual plans\n- **Service Credits** - Credits for service interruptions\n- **Cancellation** - No penalties for canceling subscription',
      },
      {
        id: "limits",
        title: "Understanding usage limits",
        content:
          "Know your plan limits and how to manage usage:\n\n**Wallet Address Limits:**\n- **Starter Plan:** 5 wallet addresses maximum\n- **Growth Plan:** 25 wallet addresses maximum\n- **Enterprise Plan:** Unlimited wallet addresses\n- **Overage Handling:** Excess wallets automatically paused\n\n**Alert Volume Limits:**\n- **Starter:** Up to 1,000 alerts per month\n- **Growth:** Up to 10,000 alerts per month\n- **Enterprise:** Unlimited alerts\n- **Overage:** Additional alerts at $0.10 each\n\n**API Rate Limits:**\n- **Starter:** 100 requests per hour\n- **Growth:** 1,000 requests per hour\n- **Enterprise:** 10,000 requests per hour\n- **Burst Limits:** 2x rate limit for short bursts\n\n**Data Retention Limits:**\n- **Starter:** 30 days of alert history\n- **Growth:** 90 days of alert history\n- **Enterprise:** 1 year of alert history\n- **Export Options:** Download data before expiration\n\n**Monitoring Frequency:**\n- **Starter:** Scans every 15 minutes\n- **Growth:** Scans every 5 minutes\n- **Enterprise:** Real-time scanning (30 seconds)\n- **Custom Intervals:** Available for Enterprise\n\n**Integration Limits:**\n- **Starter:** Email notifications only\n- **Growth:** Email + 2 webhook integrations\n- **Enterprise:** Unlimited integrations\n- **Custom Integrations:** Available for Enterprise\n\n**Support Limits:**\n- **Starter:** Email support (24-48 hour response)\n- **Growth:** Email + chat support (4-8 hour response)\n- **Enterprise:** Phone + dedicated support (1 hour response)\n\n**Usage Monitoring:**\n1. **Dashboard Overview** - Current usage vs limits\n2. **Usage Alerts** - Notifications at 80% and 95% of limits\n3. **Historical Usage** - Track usage patterns over time\n4. **Upgrade Prompts** - Suggestions when approaching limits\n\n**Managing Usage:**\n- **Prioritize Wallets** - Monitor most important addresses first\n- **Adjust Alert Sensitivity** - Reduce noise with higher thresholds\n- **Archive Old Data** - Export and remove old alerts\n- **Optimize API Calls** - Batch requests and cache responses\n\n**Overage Handling:**\n- **Soft Limits** - Grace period before enforcement\n- **Automatic Pausing** - Excess wallets paused, not deleted\n- **Upgrade Prompts** - Easy upgrade options when limits reached\n- **Usage Notifications** - Alerts before hitting limits\n\n**Enterprise Scaling:**\n- **Custom Limits** - Negotiate higher limits as needed\n- **Dedicated Resources** - Isolated infrastructure for large customers\n- **Performance SLAs** - Guaranteed response times and uptime\n- **Flexible Billing** - Usage-based pricing options available\n\n**Best Practices:**\n- Monitor usage regularly in dashboard\n- Set up usage alerts at 75% of limits\n- Plan upgrades before hitting limits\n- Use API efficiently to stay within rate limits\n- Archive old data to manage storage limits",
      },
      {
        id: "cancel",
        title: "Canceling your subscription",
        content:
          'Cancel your ShadowStack subscription when needed:\n\n**Before You Cancel:**\n- **Export Data** - Download all alerts and wallet information\n- **Review Alternatives** - Consider downgrading instead of canceling\n- **Contact Support** - We may be able to address your concerns\n- **Backup Integrations** - Save webhook URLs and API configurations\n\n**Cancellation Process:**\n1. **Go to Billing** - Dashboard → Settings → Billing\n2. **Cancel Subscription** - Click "Cancel Subscription" button\n3. **Reason Selection** - Help us improve by sharing why you\'re leaving\n4. **Confirm Cancellation** - Final confirmation required\n5. **Cancellation Email** - Confirmation sent to your email\n\n**Cancellation Timing:**\n- **Monthly Plans** - Cancel anytime, access until end of current month\n- **Annual Plans** - Cancel anytime, access until end of annual period\n- **Immediate Cancellation** - Contact support for immediate termination\n- **No Penalties** - No cancellation fees or penalties\n\n**What Happens After Cancellation:**\n- **Monitoring Stops** - All wallet monitoring ceases immediately\n- **Data Retention** - Account data kept for 90 days\n- **Alert History** - Alerts remain accessible for 30 days\n- **API Access** - API keys deactivated immediately\n- **Integrations** - Webhook and third-party integrations disabled\n\n**Data Export Options:**\n- **Alert History** - CSV export of all alerts\n- **Wallet List** - Export monitored addresses and labels\n- **Settings Backup** - Save notification and integration settings\n- **API Logs** - Download API usage history\n\n**Reactivation:**\n- **Within 90 Days** - Full account restoration with all data\n- **After 90 Days** - New account required, data permanently deleted\n- **Same Plan** - Resume with previous plan and settings\n- **Different Plan** - Choose new plan during reactivation\n\n**Partial Refunds:**\n- **Monthly Plans** - No refund for partial months\n- **Annual Plans** - Pro-rated refund for unused months\n- **First Month** - Full refund if canceled within 30 days\n- **Processing Time** - Refunds processed within 5-7 business days\n\n**Alternative Options:**\n- **Pause Account** - Temporarily suspend monitoring (up to 6 months)\n- **Downgrade Plan** - Reduce to lower-cost plan instead\n- **Seasonal Billing** - Pay only for months you need service\n- **Custom Arrangements** - Contact sales for special circumstances\n\n**Support During Cancellation:**\n- **Exit Interview** - Optional call to discuss your experience\n- **Feedback Survey** - Help us improve our service\n- **Future Offers** - Occasional updates about new features\n- **Re-engagement** - Special offers to return (opt-in only)\n\n**Enterprise Cancellations:**\n- **Contract Terms** - Review contract for specific cancellation terms\n- **Notice Period** - May require 30-90 days notice\n- **Data Migration** - Assistance with exporting large datasets\n- **Transition Support** - Help moving to alternative solutions\n\n**Final Steps:**\n- Confirm all data has been exported\n- Update any dependent systems or processes\n- Remove ShadowStack integrations from third-party tools\n- Keep cancellation confirmation email for records',
      },
    ],
  },
  {
    id: "api-integrations",
    title: "API & Integrations",
    icon: Settings,
    description: "Technical integration guides",
    articles: [
      {
        id: "api-auth",
        title: "API authentication and setup",
        content:
          'Set up secure API access to ShadowStack:\n\n**Getting Your API Key:**\n1. **Navigate to Settings** - Dashboard → Settings → API Keys\n2. **Generate New Key** - Click "Create API Key"\n3. **Name Your Key** - Give it a descriptive name (e.g., "Production Server")\n4. **Set Permissions** - Choose read-only or read-write access\n5. **Copy Key** - Save the key securely (shown only once)\n\n**Authentication Methods:**\n- **Bearer Token** - Include in Authorization header\n- **API Key Header** - Use X-API-Key header\n- **Query Parameter** - Include as ?api_key= (not recommended for production)\n\n**API Key Management:**\n- **Multiple Keys** - Create separate keys for different applications\n- **Key Rotation** - Regularly rotate keys for security\n- **Permissions** - Granular permissions per key\n- **Usage Tracking** - Monitor API usage per key\n- **Revocation** - Instantly revoke compromised keys\n\n**Base URL:**\n- **Production:** https://api.shadowstack.com/v1\n- **Sandbox:** https://sandbox-api.shadowstack.com/v1 (testing only)\n\n**Security Best Practices:**\n- Store API keys in environment variables\n- Use HTTPS for all API requests\n- Implement proper error handling\n- Log API usage for monitoring\n- Rotate keys regularly (every 90 days)\n\n**SDK Libraries:**\n- **Node.js** - npm install shadowstack-node\n- **Python** - pip install shadowstack-python\n- **PHP** - composer require shadowstack/php-sdk\n- **Go** - go get github.com/shadowstack/go-sdk',
      },
      {
        id: "webhook-format",
        title: "Webhook payload formats",
        content:
          "Understand webhook payloads for seamless integration:\n\n**Webhook Setup:**\n1. **Add Webhook URL** - Settings → Webhooks → Add Webhook\n2. **Choose Events** - Select which events to receive\n3. **Set Secret** - Optional secret for payload verification\n4. **Test Webhook** - Send test payload to verify setup\n\n**Supported Events:**\n- **alert.created** - New security alert generated\n- **alert.updated** - Alert status or details changed\n- **wallet.added** - New wallet address added to monitoring\n- **wallet.removed** - Wallet address removed from monitoring\n- **monitoring.status** - Monitoring status changes\n\n**Webhook Security:**\n- HTTPS Required - All webhook URLs must use HTTPS\n- Signature Verification - Verify payloads using webhook secret\n- IP Whitelist - Webhooks sent from specific IP ranges\n- Retry Logic - Failed deliveries retried up to 5 times",
      },
      {
        id: "rate-limits",
        title: "Rate limits and best practices",
        content:
          "Optimize your API usage within rate limits:\n\n**Rate Limit Tiers:**\n- **Starter Plan:** 100 requests/hour (1.67/minute)\n- **Growth Plan:** 1,000 requests/hour (16.67/minute)\n- **Enterprise Plan:** 10,000 requests/hour (166.67/minute)\n- **Burst Allowance:** 2x rate limit for 5-minute periods\n\n**Best Practices:**\n\n**1. Implement Exponential Backoff:**\nUse exponential backoff when receiving 429 responses\n\n**2. Batch Requests:**\nInstead of multiple single requests, use batch endpoints when available\n\n**3. Use Pagination Efficiently:**\nFetch data in appropriate page sizes (50-100 items per page)\n\n**4. Cache Responses:**\nImplement caching for frequently accessed data\n\n**5. Monitor Rate Limit Usage:**\nTrack your usage against limits and alert when approaching limits\n\n**Endpoint-Specific Limits:**\n- **GET /alerts** - Standard rate limit\n- **POST /alerts/acknowledge** - 2x standard rate limit\n- **GET /wallets** - Standard rate limit\n- **POST /wallets** - 0.5x standard rate limit (more expensive)\n- **DELETE /wallets** - 0.5x standard rate limit\n\n**Rate Limit Optimization:**\n- **Use webhooks** instead of polling for real-time data\n- **Implement caching** for frequently accessed data\n- **Batch operations** when possible\n- **Use appropriate page sizes** (50-100 items per page)\n- **Monitor usage** in dashboard\n\n**Enterprise Rate Limits:**\n- **Custom Limits** - Negotiate higher limits based on usage\n- **Dedicated Infrastructure** - Isolated rate limiting\n- **Burst Capacity** - Higher burst allowances\n- **Priority Processing** - Faster response times\n\n**Getting Help:**\n- Contact support for rate limit increases\n- Review usage patterns in dashboard\n- Optimize code with our SDK libraries\n- Schedule high-volume operations during off-peak hours",
      },
      {
        id: "examples",
        title: "Custom integration examples",
        content:
          "Real-world integration examples for common use cases:\n\n**1. Slack Alert Bot:**\nCreate a webhook endpoint that receives ShadowStack alerts and posts them to Slack with rich formatting and interactive buttons.\n\n**2. Email Alert System:**\nBuild a system that receives webhook alerts and sends formatted email notifications to your security team.\n\n**3. SIEM Integration (Splunk):**\nForward ShadowStack alerts to your SIEM system for correlation with other security events.\n\n**4. Custom Monitoring Dashboard:**\nUse the API to build your own dashboard with custom metrics and visualizations.\n\n**5. Automated Threat Response:**\nTrigger automated actions based on alert severity (e.g., freeze wallets, notify security team).\n\n**6. Compliance Reporting:**\nGenerate reports for regulatory compliance using alert data.\n\n**7. Threat Intelligence Enrichment:**\nCorrelate ShadowStack alerts with other threat intelligence feeds.\n\n**8. Vulnerability Scanning Integration:**\nLink alerts to vulnerability scan results for comprehensive security posture.\n\n**9. Incident Response Platform Integration:**\nCreate incidents in your incident response platform based on ShadowStack alerts.\n\n**10. Blockchain Analytics:**\nAnalyze transaction patterns and wallet activity using ShadowStack data.\n\nThese examples demonstrate the flexibility of the ShadowStack API and webhooks for building custom integrations to meet your specific security needs. Remember to follow security best practices when implementing these integrations, including proper authentication, signature verification, and error handling.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSections = helpSections
    .map((section) => ({
      ...section,
      articles: section.articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((section) => section.articles.length > 0)

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">How can we help?</h1>
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search for articles..."
              className="pl-10 pr-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredSections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {section.icon && <section.icon className="mr-2 h-5 w-5 text-gray-500" />}
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {section.articles.map((article) => (
                    <li key={article.id} className="mb-2">
                      <Link href={`#${article.id}`} className="flex items-center hover:text-indigo-500">
                        <ChevronRight className="mr-2 h-4 w-4 text-gray-400" />
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {helpSections.map((section) => (
          <div key={section.id} className="mt-16">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              {section.icon && <section.icon className="mr-2 h-6 w-6 text-gray-500" />}
              {section.title}
            </h2>
            {section.articles.map((article) => (
              <div key={article.id} id={article.id} className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <div className="text-gray-700 whitespace-pre-line">{article.content}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
