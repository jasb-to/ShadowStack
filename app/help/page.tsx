"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Shield, Zap, Users, Settings, ChevronRight } from 'lucide-react'
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
        content: `To start monitoring your hot wallets:

1. **Sign up and verify your account** - Create your ShadowStack account and verify your email address.

2. **Navigate to Targets** - Go to Dashboard → Targets in the main navigation.

3. **Add wallet address** - Click "Add Target" and paste your hot wallet address. Our system automatically detects the blockchain network (Bitcoin, Ethereum, Solana, TRON, or BSC).

4. **Add a label** - Give your wallet a descriptive name like "Main Exchange Hot Wallet" or "Trading Bot Wallet" for easy identification.

5. **Configure monitoring** - Choose your monitoring preferences:
   - Real-time scanning (recommended for high-value wallets)
   - Alert sensitivity (Critical, High, Medium, Low)
   - Notification channels (email, webhook, Slack)

6. **Verify setup** - Your wallet will appear in the monitoring dashboard within 2-3 minutes. You'll see a green "Active" status when monitoring begins.

**Pro tip:** Start with your highest-value hot wallets first, then add others as needed.`
      },
      {
        id: "alerts",
        title: "Understanding security alerts",
        content: `ShadowStack provides four types of security alerts:

**CRITICAL (Red)** - Immediate action required
- Direct mentions of your wallet address in hacker channels
- Confirmed targeting by known threat actors
- Active attack discussions involving your assets
- Response time: Within 5 minutes

**HIGH (Orange)** - Urgent attention needed
- Suspicious activity patterns detected
- Your wallet mentioned in general threat discussions
- Unusual transaction volume or patterns
- Response time: Within 15 minutes

**MEDIUM (Yellow)** - Monitor closely
- General threats to your blockchain network
- Increased chatter about similar exchanges
- New attack methods being discussed
- Response time: Within 1 hour

**LOW (Blue)** - Informational
- General security news and updates
- New threat intelligence reports
- Industry security recommendations
- Response time: Review daily

Each alert includes:
- Timestamp and source channel
- Threat description and context
- Recommended actions
- Related wallet addresses
- Confidence score (1-100)`
      },
      {
        id: "notifications",
        title: "Configuring notification preferences",
        content: `Set up notifications to receive alerts instantly:

**Email Notifications:**
1. Go to Dashboard → Settings → Notifications
2. Enter your email address (we recommend using a security team distribution list)
3. Choose alert levels to receive (Critical and High recommended minimum)
4. Set quiet hours if needed (alerts will queue and send after quiet period)
5. Test notifications with the "Send Test Alert" button

**Webhook Integration:**
1. In Settings → Webhooks, click "Add Webhook"
2. Enter your endpoint URL (must be HTTPS)
3. Select events to receive (alerts, wallet_added, monitoring_status)
4. Add webhook secret for payload verification
5. Test the integration

**Slack Integration:**
1. Install our Slack app in your workspace
2. Invite @ShadowStack to your security channel
3. Use command \`/shadowstack connect\` to link your account
4. Configure which alerts to post in channel settings

**Discord Integration:**
1. Add our Discord bot to your server
2. Create a dedicated #security-alerts channel
3. Use \`!shadowstack setup\` command to configure
4. Set permissions for who can view alerts

**Mobile Push (Coming Soon):**
- iOS and Android apps in development
- Push notifications for critical alerts
- Biometric authentication required`
      },
      {
        id: "dashboard",
        title: "Dashboard overview and navigation",
        content: `Your ShadowStack dashboard provides a complete security overview:

**Main Dashboard:**
- **Threat Level Indicator** - Current overall threat level (Green/Yellow/Orange/Red)
- **Active Alerts** - Recent security alerts requiring attention
- **Monitored Assets** - Number of wallets and addresses being tracked
- **24h Activity** - Alert volume and threat trends
- **Quick Actions** - Add wallet, view alerts, check settings

**Navigation Menu:**
- **Dashboard** - Main overview and recent activity
- **Targets** - Manage wallet addresses and monitoring settings
- **Alerts** - View all security alerts with filtering options
- **Settings** - Account, notifications, API keys, and integrations

**Targets Page:**
- Add/remove wallet addresses
- View monitoring status for each wallet
- Configure individual wallet alert settings
- See recent activity per wallet
- Export wallet list and activity reports

**Alerts Page:**
- Filter by severity, date, wallet, or source
- Mark alerts as resolved or false positive
- Export alert data for compliance reporting
- View alert details and recommended actions
- Set up alert rules and automation

**Settings Page:**
- Profile and account information
- Notification preferences and channels
- API key management
- Webhook configuration
- Billing and subscription details
- Security settings (2FA, login history)`
      }
    ]
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
        content: `Add wallet addresses for comprehensive monitoring:

**Supported Address Formats:**
- **Bitcoin:** Legacy (1...), SegWit (3...), Bech32 (bc1...)
- **Ethereum:** Standard addresses (0x...) and ENS domains
- **Solana:** Base58 encoded addresses
- **TRON:** TRX addresses (T...)
- **BSC:** Same format as Ethereum (0x...)

**Adding Process:**
1. **Navigate to Targets** - Dashboard → Targets
2. **Click "Add Target"** - Opens the wallet addition form
3. **Enter wallet address** - Paste or type the full address
4. **Auto-detection** - System automatically identifies the blockchain
5. **Add label** - Descriptive name for easy identification
6. **Set priority** - High, Medium, or Low monitoring intensity
7. **Configure alerts** - Choose which alert types to receive
8. **Save and activate** - Monitoring begins within 2-3 minutes

**Best Practices:**
- Use clear, descriptive labels ("Main Hot Wallet", "Trading Bot", "Customer Withdrawals")
- Add wallets in order of importance (highest value first)
- Group related wallets with consistent naming
- Document wallet purposes in the notes field
- Regular audit of monitored addresses

**Bulk Import:**
- Upload CSV file with addresses and labels
- Maximum 100 addresses per import
- Validation occurs before activation
- Failed imports provide detailed error reports

**Verification:**
- Each address is validated against blockchain format
- Balance and transaction history checked
- Monitoring status confirmed before activation
- Test alerts sent to verify notification channels`
      },
      {
        id: "blockchains",
        title: "Supported blockchain networks",
        content: `ShadowStack monitors threats across major blockchain networks:

**Bitcoin (BTC)**
- Address formats: Legacy, SegWit, Bech32
- Monitoring: Transaction patterns, balance changes, threat mentions
- Alert sources: Dark web forums, Telegram channels, Discord servers
- Special features: UTXO tracking, mixing service detection

**Ethereum (ETH)**
- Address formats: Standard addresses, ENS domains
- Monitoring: Smart contract interactions, token transfers, DeFi activity
- Alert sources: MEV bot discussions, DeFi exploit channels, hacker forums
- Special features: Gas price manipulation detection, front-running alerts

**Binance Smart Chain (BSC)**
- Address formats: Same as Ethereum (0x...)
- Monitoring: BEP-20 token transfers, PancakeSwap activity
- Alert sources: BSC-specific threat channels, bridge exploit discussions
- Special features: Cross-chain bridge monitoring, validator tracking

**Solana (SOL)**
- Address formats: Base58 encoded addresses
- Monitoring: SPL token transfers, program interactions
- Alert sources: Solana developer channels, DeFi protocol discussions
- Special features: Program upgrade monitoring, validator performance

**TRON (TRX)**
- Address formats: TRX addresses (T...)
- Monitoring: TRC-20 token transfers, smart contract calls
- Alert sources: Asian crypto channels, TRON-specific forums
- Special features: Energy/bandwidth monitoring, freeze/unfreeze tracking

**Coming Soon:**
- Polygon (MATIC) - Q2 2024
- Avalanche (AVAX) - Q2 2024
- Cardano (ADA) - Q3 2024
- Polkadot (DOT) - Q3 2024

**Network-Specific Features:**
- Real-time mempool monitoring
- Large transaction alerts
- Unusual activity pattern detection
- Cross-chain bridge monitoring
- DeFi protocol integration tracking`
      },
      {
        id: "validation",
        title: "Wallet validation and verification",
        content: `Our validation system ensures accurate monitoring:

**Address Validation Process:**
1. **Format Check** - Verifies address follows blockchain standards
2. **Checksum Validation** - Confirms address integrity
3. **Network Verification** - Ensures address exists on specified blockchain
4. **Activity Check** - Confirms wallet has transaction history
5. **Duplicate Detection** - Prevents monitoring same address twice

**Validation Results:**
- ✅ **Valid** - Address passes all checks, monitoring activated
- ⚠️ **Warning** - Address valid but has issues (inactive, low balance)
- ❌ **Invalid** - Address format incorrect or doesn't exist
- 🔄 **Pending** - Validation in progress (usually 30-60 seconds)

**Common Validation Issues:**
- **Invalid format** - Address doesn't match blockchain standards
- **Wrong network** - Address belongs to different blockchain
- **Inactive address** - No transaction history found
- **Already monitored** - Address already in your monitoring list
- **Unsupported type** - Contract addresses or special wallet types

**Manual Verification:**
- Contact support for special address types
- Provide transaction hash for verification
- Include blockchain explorer link
- Explain wallet type and usage

**Verification Benefits:**
- Prevents false alerts from invalid addresses
- Ensures monitoring resources used efficiently
- Reduces noise in alert system
- Improves threat detection accuracy

**Re-validation:**
- Addresses re-validated every 24 hours
- Inactive addresses flagged for review
- Network changes automatically detected
- Monitoring paused for invalid addresses`
      },
      {
        id: "remove-wallets",
        title: "Removing or pausing wallet monitoring",
        content: `Manage your monitored wallets effectively:

**Pausing Monitoring:**
1. Go to Dashboard → Targets
2. Find the wallet you want to pause
3. Click the toggle switch to "Paused"
4. Monitoring stops immediately, but wallet remains in list
5. Resume anytime by toggling back to "Active"

**When to Pause:**
- Wallet temporarily not in use
- Maintenance or migration in progress
- Reducing monitoring costs
- Testing new wallet configurations

**Removing Wallets:**
1. Navigate to the wallet in Targets
2. Click the three-dot menu (⋯)
3. Select "Remove from monitoring"
4. Confirm removal in popup dialog
5. Wallet and all associated data deleted

**When to Remove:**
- Wallet permanently decommissioned
- Address no longer belongs to your organization
- Duplicate or incorrect addresses
- Consolidating monitoring lists

**Bulk Operations:**
- Select multiple wallets using checkboxes
- Use "Bulk Actions" dropdown
- Choose pause, resume, or remove
- Confirm operation for all selected wallets

**Data Retention:**
- Paused wallets: All historical data retained
- Removed wallets: Data deleted after 30 days
- Alert history: Preserved for compliance (1 year)
- Export data before removal if needed

**Recovery:**
- Paused wallets: Resume instantly
- Removed wallets: Re-add as new (loses history)
- Deleted data: Cannot be recovered after 30 days
- Contact support within 30 days for data recovery

**Best Practices:**
- Pause instead of remove when uncertain
- Export important data before removal
- Document reasons for removal
- Regular cleanup of unused addresses`
      }
    ]
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
        content: `ShadowStack provides comprehensive threat detection:

**Direct Targeting Alerts:**
- **Wallet Mention** - Your address discussed in threat channels
- **Exchange Targeting** - Your domain/brand mentioned as target
- **Insider Threat** - Employee information shared in criminal forums
- **Social Engineering** - Phishing campaigns targeting your users

**Transaction Pattern Alerts:**
- **Large Outflow** - Unusual large transactions from monitored wallets
- **Rapid Drainage** - Multiple quick withdrawals indicating compromise
- **Mixing Service** - Funds sent to known cryptocurrency mixers
- **Blacklisted Address** - Transactions with known criminal addresses

**Network Threat Alerts:**
- **New Attack Vector** - Novel attack methods discussed
- **Vulnerability Disclosure** - Zero-day exploits affecting your blockchain
- **Protocol Exploit** - DeFi protocol vulnerabilities that could affect you
- **Bridge Compromise** - Cross-chain bridge security incidents

**Intelligence Alerts:**
- **Threat Actor Profiling** - Known hackers discussing your sector
- **Tool Development** - New hacking tools targeting crypto exchanges
- **Market Manipulation** - Coordinated attacks on token prices
- **Regulatory Action** - Government actions affecting crypto security

**Source Categories:**
- **Dark Web Forums** - Hidden criminal marketplaces and forums
- **Public Telegram** - Open cryptocurrency and hacking channels
- **Discord Servers** - Gaming and crypto communities
- **Social Media** - Twitter, Reddit threat discussions
- **Code Repositories** - GitHub exploit code and tools

**Alert Confidence Levels:**
- **High (90-100%)** - Verified threats with strong evidence
- **Medium (70-89%)** - Likely threats requiring investigation
- **Low (50-69%)** - Possible threats worth monitoring
- **Intelligence (30-49%)** - General threat information

**Response Recommendations:**
Each alert includes specific actions:
- Immediate security measures
- Investigation steps
- Communication protocols
- Recovery procedures`
      },
      {
        id: "email-setup",
        title: "Setting up email notifications",
        content: `Configure email alerts for instant threat notifications:

**Basic Email Setup:**
1. **Navigate to Settings** - Dashboard → Settings → Notifications
2. **Add Email Address** - Enter primary security team email
3. **Verify Email** - Check inbox and click verification link
4. **Choose Alert Levels** - Select Critical, High, Medium, or Low
5. **Set Frequency** - Instant, Hourly digest, or Daily summary
6. **Test Notifications** - Send test alert to verify delivery

**Advanced Configuration:**
- **Multiple Recipients** - Add up to 10 email addresses
- **Role-Based Routing** - Different alerts to different teams
- **Escalation Rules** - Auto-escalate if no response within timeframe
- **Quiet Hours** - Pause non-critical alerts during specified times
- **Weekend Settings** - Reduced alerting on weekends

**Email Templates:**
- **Critical Alert** - Immediate action required format
- **Daily Digest** - Summary of all alerts in 24 hours
- **Weekly Report** - Comprehensive security overview
- **Monthly Summary** - Trends and statistics

**Delivery Options:**
- **Instant** - Alerts sent immediately (recommended for Critical/High)
- **Batched** - Group alerts every 15/30/60 minutes
- **Digest** - Single email with multiple alerts
- **Scheduled** - Send at specific times only

**Email Security:**
- **SPF/DKIM** - All emails properly authenticated
- **Encryption** - TLS encryption for all email delivery
- **No Sensitive Data** - Wallet addresses partially masked
- **Unsubscribe** - Easy opt-out while maintaining security

**Troubleshooting:**
- **Not Receiving** - Check spam folder, verify email address
- **Delayed Delivery** - Check email provider's filtering rules
- **Missing Alerts** - Verify alert level settings match preferences
- **Formatting Issues** - Try different email client or webmail

**Best Practices:**
- Use distribution lists for team notifications
- Set up backup email addresses
- Regular test of notification delivery
- Monitor email delivery rates in dashboard
- Keep contact information updated`
      },
      {
        id: "webhooks",
        title: "Webhook integrations (Slack, Discord)",
        content: `Integrate ShadowStack with your existing communication tools:

**Slack Integration:**
1. **Install App** - Add ShadowStack app from Slack App Directory
2. **Authorize** - Grant permissions to post in channels
3. **Choose Channel** - Select #security-alerts or similar
4. **Configure Alerts** - Choose which alert types to post
5. **Test Integration** - Send test message to verify setup

**Slack Features:**
- **Rich Formatting** - Color-coded alerts with severity indicators
- **Interactive Buttons** - Mark as resolved, escalate, or investigate
- **Thread Replies** - Team discussion on specific alerts
- **Alert Summaries** - Daily/weekly digest posts
- **Custom Channels** - Route different alerts to different channels

**Discord Integration:**
1. **Add Bot** - Invite ShadowStack bot to your Discord server
2. **Set Permissions** - Grant message posting and embed permissions
3. **Configure Channel** - Choose dedicated security channel
4. **Customize Alerts** - Select alert types and formatting
5. **Test Setup** - Verify bot can post messages

**Discord Features:**
- **Embed Messages** - Rich formatted alerts with images
- **Role Mentions** - Tag security team for critical alerts
- **Reaction Buttons** - Quick acknowledge/resolve actions
- **Voice Alerts** - Optional voice channel notifications
- **Bot Commands** - Query alert status and statistics

**Custom Webhooks:**
- **Endpoint Setup** - Provide HTTPS URL for webhook delivery
- **Authentication** - Secure with API keys or signatures
- **Payload Format** - JSON format with alert details
- **Retry Logic** - Automatic retry on delivery failures
- **Rate Limiting** - Respect your endpoint's rate limits

**Webhook Payload Example:**
\`\`\`json
{
  "alert_id": "alert_123456",
  "severity": "critical",
  "timestamp": "2024-01-15T10:30:00Z",
  "wallet_address": "1A1zP1...masked",
  "threat_type": "direct_targeting",
  "description": "Wallet address mentioned in hacker channel",
  "source": "telegram_channel_xyz",
  "confidence": 95,
  "recommended_actions": [
    "Monitor wallet activity closely",
    "Consider moving funds to cold storage",
    "Alert security team immediately"
  ]
}
\`\`\`

**Integration Best Practices:**
- Use dedicated channels for security alerts
- Set up proper access controls
- Test integrations regularly
- Monitor delivery success rates
- Have backup notification methods`
      },
      {
        id: "severity",
        title: "Alert severity levels and filtering",
        content: `Understand and manage alert priorities effectively:

**Severity Levels:**

**🔴 CRITICAL**
- **Response Time:** Within 5 minutes
- **Examples:** Direct wallet targeting, active attack in progress, confirmed breach
- **Actions:** Immediate security measures, freeze affected wallets, alert all stakeholders
- **Escalation:** Auto-escalate to senior security team if no response in 10 minutes

**🟠 HIGH**
- **Response Time:** Within 15 minutes
- **Examples:** Suspicious activity patterns, threat actor mentions, vulnerability affecting your assets
- **Actions:** Investigate immediately, increase monitoring, prepare defensive measures
- **Escalation:** Escalate to security lead if no response in 30 minutes

**🟡 MEDIUM**
- **Response Time:** Within 1 hour
- **Examples:** General threats to your blockchain, increased chatter about similar exchanges
- **Actions:** Monitor closely, review security posture, document for analysis
- **Escalation:** Include in daily security briefing

**🔵 LOW**
- **Response Time:** Review daily
- **Examples:** Industry news, general security recommendations, threat intelligence updates
- **Actions:** Review during regular security meetings, update procedures if needed
- **Escalation:** Include in weekly security reports

**Filtering Options:**

**By Severity:**
- Show only Critical and High alerts
- Hide Low severity during business hours
- Weekend filtering (Critical only)
- Custom severity combinations

**By Source:**
- Dark web forums only
- Public channels (Telegram, Discord)
- Social media mentions
- Code repositories and GitHub

**By Wallet:**
- Specific wallet addresses
- Wallet groups or labels
- High-value wallets only
- Recently added wallets

**By Time:**
- Last 24 hours
- Business hours only
- Specific date ranges
- Real-time vs historical

**Advanced Filtering:**
- **Keyword Filtering** - Include/exclude specific terms
- **Confidence Threshold** - Only show alerts above certain confidence level
- **Source Reputation** - Filter by source reliability score
- **Geographic Filtering** - Alerts from specific regions only

**Custom Alert Rules:**
- **Auto-Acknowledge** - Automatically mark certain low-priority alerts as seen
- **Auto-Escalate** - Escalate specific alert types immediately
- **Suppress Duplicates** - Avoid multiple alerts for same threat
- **Time-Based Rules** - Different handling for business vs after hours

**Filter Management:**
- **Save Filters** - Create and save custom filter combinations
- **Share Filters** - Team members can use same filter settings
- **Default Views** - Set default filters for different user roles
- **Quick Filters** - One-click access to common filter combinations

**Best Practices:**
- Start with Critical and High alerts only
- Gradually add Medium alerts as team capacity allows
- Use time-based filtering to reduce alert fatigue
- Regular review of filter effectiveness
- Adjust filters based on threat landscape changes`
      }
    ]
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
        content: `Manage your ShadowStack subscription to match your needs:

**Available Plans:**

**Starter ($49/month)**
- 5 wallet addresses
- Basic threat monitoring
- Email notifications
- 24/7 support
- 30-day alert history

**Growth ($149/month)**
- 25 wallet addresses
- Advanced threat intelligence
- Slack/Discord integration
- API access
- 90-day alert history
- Priority support

**Enterprise ($499/month)**
- Unlimited wallet addresses
- Custom threat feeds
- Dedicated account manager
- SLA guarantees
- 1-year alert history
- Custom integrations

**Upgrading Your Plan:**
1. **Go to Settings** - Dashboard → Settings → Billing
2. **View Current Plan** - See your current subscription details
3. **Choose New Plan** - Select the plan you want to upgrade to
4. **Review Changes** - See new features and pricing
5. **Confirm Upgrade** - Changes take effect immediately
6. **Pro-rated Billing** - You'll be charged the difference for the current period

**Downgrading Your Plan:**
1. **Navigate to Billing** - Settings → Billing
2. **Select Lower Plan** - Choose the plan you want to downgrade to
3. **Review Limitations** - Understand what features you'll lose
4. **Confirm Downgrade** - Changes take effect at next billing cycle
5. **Data Migration** - Excess wallets will be paused, not deleted

**Plan Comparison:**
- **Wallet Limits** - Number of addresses you can monitor
- **Alert History** - How long alerts are stored
- **Integration Options** - Available third-party integrations
- **Support Level** - Response time and support channels
- **API Access** - Programmatic access to alerts and data

**Billing Cycle Changes:**
- **Monthly to Annual** - Save 20% with annual billing
- **Annual to Monthly** - Change at end of current annual period
- **Pro-rated Adjustments** - Fair billing for mid-cycle changes

**Enterprise Features:**
- **Custom Threat Feeds** - Tailored intelligence for your industry
- **Dedicated Support** - Direct line to security experts
- **Custom Integrations** - Bespoke API integrations
- **SLA Guarantees** - Uptime and response time commitments
- **Compliance Reporting** - Detailed reports for audits

**Downgrade Considerations:**
- Excess wallets will be paused (not deleted)
- Alert history beyond plan limits will be archived
- Advanced features will be disabled
- API access may be restricted
- Support response times may increase

**Need Help Choosing?**
- Contact our sales team for plan recommendations
- Free consultation to assess your security needs
- Custom pricing for large enterprises
- Trial periods available for higher-tier plans`
      },
      {
        id: "billing",
        title: "Managing billing and payment methods",
        content: `Handle your ShadowStack billing and payments:

**Payment Methods:**
- **Credit Cards** - Visa, Mastercard, American Express
- **Debit Cards** - Most major debit cards accepted
- **Bank Transfer** - Available for Enterprise plans
- **PayPal** - Secure PayPal payments supported
- **Cryptocurrency** - Bitcoin and Ethereum accepted (Enterprise only)

**Adding Payment Method:**
1. **Go to Billing** - Dashboard → Settings → Billing
2. **Payment Methods** - Click "Add Payment Method"
3. **Enter Details** - Provide card or account information
4. **Verify Method** - Small authorization charge (refunded)
5. **Set as Default** - Choose primary payment method

**Updating Payment Information:**
1. **Access Billing** - Settings → Billing → Payment Methods
2. **Edit Existing** - Click edit on current payment method
3. **Add New Method** - Add new card and set as default
4. **Remove Old Method** - Delete outdated payment information
5. **Test Payment** - Verify new method works correctly

**Billing Cycle:**
- **Monthly Plans** - Charged on the same date each month
- **Annual Plans** - Charged once per year with 20% discount
- **Pro-rated Charges** - Mid-cycle upgrades charged proportionally
- **Automatic Renewal** - Plans renew automatically unless canceled

**Invoice Management:**
- **Download Invoices** - PDF invoices available in billing section
- **Email Invoices** - Automatic email delivery to billing contact
- **Accounting Integration** - Export to QuickBooks, Xero, etc.
- **Tax Information** - VAT/GST handling for international customers

**Failed Payment Handling:**
- **Retry Attempts** - Automatic retry for 7 days
- **Email Notifications** - Alerts sent for payment failures
- **Grace Period** - 7-day grace period before service suspension
- **Account Recovery** - Easy reactivation once payment resolved

**Billing Support:**
- **24/7 Billing Help** - Dedicated billing support team
- **Live Chat** - Instant help with payment issues
- **Phone Support** - Direct line for urgent billing matters
- **Email Support** - billing@shadowsignals.live

**Enterprise Billing:**
- **Custom Terms** - Net 30, 60, or 90 payment terms
- **Purchase Orders** - PO-based billing available
- **Volume Discounts** - Discounts for large deployments
- **Multi-year Contracts** - Additional savings for longer commitments

**Security:**
- **PCI Compliance** - All payment data securely processed
- **Encryption** - End-to-end encryption for all transactions
- **No Storage** - We don't store your payment information
- **Fraud Protection** - Advanced fraud detection systems

**Refund Policy:**
- **30-Day Guarantee** - Full refund within 30 days
- **Pro-rated Refunds** - Partial refunds for annual plans
- **Service Credits** - Credits for service interruptions
- **Cancellation** - No penalties for canceling subscription`
      },
      {
        id: "limits",
        title: "Understanding usage limits",
        content: `Know your plan limits and how to manage usage:

**Wallet Address Limits:**
- **Starter Plan:** 5 wallet addresses maximum
- **Growth Plan:** 25 wallet addresses maximum
- **Enterprise Plan:** Unlimited wallet addresses
- **Overage Handling:** Excess wallets automatically paused

**Alert Volume Limits:**
- **Starter:** Up to 1,000 alerts per month
- **Growth:** Up to 0,000 alerts per month
- **Enterprise:** Unlimited alerts
- **Overage:** Additional alerts at $0.10 each

**API Rate Limits:**
- **Starter:** 100 requests per hour
- **Growth:** 1,000 requests per hour
- **Enterprise:** 10,000 requests per hour
- **Burst Limits:** 2x rate limit for short bursts

**Data Retention Limits:**
- **Starter:** 30 days of alert history
- **Growth:** 90 days of alert history
- **Enterprise:** 1 year of alert history
- **Export Options:** Download data before expiration

**Monitoring Frequency:**
- **Starter:** Scans every 15 minutes
- **Growth:** Scans every 5 minutes
- **Enterprise:** Real-time scanning (30 seconds)
- **Custom Intervals:** Available for Enterprise

**Integration Limits:**
- **Starter:** Email notifications only
- **Growth:** Email + 2 webhook integrations
- **Enterprise:** Unlimited integrations
- **Custom Integrations:** Available for Enterprise

**Support Limits:**
- **Starter:** Email support (24-48 hour response)
- **Growth:** Email + chat support (4-8 hour response)
- **Enterprise:** Phone + dedicated support (1 hour response)

**Usage Monitoring:**
1. **Dashboard Overview** - Current usage vs limits
2. **Usage Alerts** - Notifications at 80% and 95% of limits
3. **Historical Usage** - Track usage patterns over time
4. **Upgrade Prompts** - Suggestions when approaching limits

**Managing Usage:**
- **Prioritize Wallets** - Monitor most important addresses first
- **Adjust Alert Sensitivity** - Reduce noise with higher thresholds
- **Archive Old Data** - Export and remove old alerts
- **Optimize API Calls** - Batch requests and cache responses

**Overage Handling:**
- **Soft Limits** - Grace period before enforcement
- **Automatic Pausing** - Excess wallets paused, not deleted
- **Upgrade Prompts** - Easy upgrade options when limits reached
- **Usage Notifications** - Alerts before hitting limits

**Enterprise Scaling:**
- **Custom Limits** - Negotiate higher limits as needed
- **Dedicated Resources** - Isolated infrastructure for large customers
- **Performance SLAs** - Guaranteed response times and uptime
- **Flexible Billing** - Usage-based pricing options available

**Best Practices:**
- Monitor usage regularly in dashboard
- Set up usage alerts at 75% of limits
- Plan upgrades before hitting limits
- Use API efficiently to stay within rate limits
- Archive old data to manage storage limits`
      },
      {
        id: "cancel",
        title: "Canceling your subscription",
        content: `Cancel your ShadowStack subscription when needed:

**Before You Cancel:**
- **Export Data** - Download all alerts and wallet information
- **Review Alternatives** - Consider downgrading instead of canceling
- **Contact Support** - We may be able to address your concerns
- **Backup Integrations** - Save webhook URLs and API configurations

**Cancellation Process:**
1. **Go to Billing** - Dashboard → Settings → Billing
2. **Cancel Subscription** - Click "Cancel Subscription" button
3. **Reason Selection** - Help us improve by sharing why you're leaving
4. **Confirm Cancellation** - Final confirmation required
5. **Cancellation Email** - Confirmation sent to your email

**Cancellation Timing:**
- **Monthly Plans** - Cancel anytime, access until end of current month
- **Annual Plans** - Cancel anytime, access until end of annual period
- **Immediate Cancellation** - Contact support for immediate termination
- **No Penalties** - No cancellation fees or penalties

**What Happens After Cancellation:**
- **Monitoring Stops** - All wallet monitoring ceases immediately
- **Data Retention** - Account data kept for 90 days
- **Alert History** - Alerts remain accessible for 30 days
- **API Access** - API keys deactivated immediately
- **Integrations** - Webhook and third-party integrations disabled

**Data Export Options:**
- **Alert History** - CSV export of all alerts
- **Wallet List** - Export monitored addresses and labels
- **Settings Backup** - Save notification and integration settings
- **API Logs** - Download API usage history

**Reactivation:**
- **Within 90 Days** - Full account restoration with all data
- **After 90 Days** - New account required, data permanently deleted
- **Same Plan** - Resume with previous plan and settings
- **Different Plan** - Choose new plan during reactivation

**Partial Refunds:**
- **Monthly Plans** - No refund for partial months
- **Annual Plans** - Pro-rated refund for unused months
- **First Month** - Full refund if canceled within 30 days
- **Processing Time** - Refunds processed within 5-7 business days

**Alternative Options:**
- **Pause Account** - Temporarily suspend monitoring (up to 6 months)
- **Downgrade Plan** - Reduce to lower-cost plan instead
- **Seasonal Billing** - Pay only for months you need service
- **Custom Arrangements** - Contact sales for special circumstances

**Support During Cancellation:**
- **Exit Interview** - Optional call to discuss your experience
- **Feedback Survey** - Help us improve our service
- **Future Offers** - Occasional updates about new features
- **Re-engagement** - Special offers to return (opt-in only)

**Enterprise Cancellations:**
- **Contract Terms** - Review contract for specific cancellation terms
- **Notice Period** - May require 30-90 days notice
- **Data Migration** - Assistance with exporting large datasets
- **Transition Support** - Help moving to alternative solutions

**Final Steps:**
- Confirm all data has been exported
- Update any dependent systems or processes
- Remove ShadowStack integrations from third-party tools
- Keep cancellation confirmation email for records`
      }
    ]
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
        content: `Set up secure API access to ShadowStack:

**Getting Your API Key:**
1. **Navigate to Settings** - Dashboard → Settings → API Keys
2. **Generate New Key** - Click "Create API Key"
3. **Name Your Key** - Give it a descriptive name (e.g., "Production Server")
4. **Set Permissions** - Choose read-only or read-write access
5. **Copy Key** - Save the key securely (shown only once)

**Authentication Methods:**
- **Bearer Token** - Include in Authorization header
- **API Key Header** - Use X-API-Key header
- **Query Parameter** - Include as ?api_key= (not recommended for production)

**Authentication Example:**
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.shadowstack.com/v1/alerts
\`\`\`

**API Key Management:**
- **Multiple Keys** - Create separate keys for different applications
- **Key Rotation** - Regularly rotate keys for security
- **Permissions** - Granular permissions per key
- **Usage Tracking** - Monitor API usage per key
- **Revocation** - Instantly revoke compromised keys

**Base URL:**
- **Production:** https://api.shadowstack.com/v1
- **Sandbox:** https://sandbox-api.shadowstack.com/v1 (testing only)

**Request Headers:**
\`\`\`
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
User-Agent: YourApp/1.0
\`\`\`

**Response Format:**
All responses are JSON with consistent structure:
\`\`\`json
{
  "success": true,
  "data": { ... },
  "pagination": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_123456"
  }
}
\`\`\`

**Error Handling:**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "The provided API key is invalid",
    "details": "Check your API key in dashboard settings"
  }
}
\`\`\`

**Rate Limiting:**
- **Headers Included** - X-RateLimit-Limit, X-RateLimit-Remaining
- **429 Status** - Returned when rate limit exceeded
- **Retry-After** - Header indicates when to retry
- **Exponential Backoff** - Recommended retry strategy

**Security Best Practices:**
- Store API keys in environment variables
- Use HTTPS for all API requests
- Implement proper error handling
- Log API usage for monitoring
- Rotate keys regularly (every 90 days)

**SDK Libraries:**
- **Node.js** - npm install shadowstack-node
- **Python** - pip install shadowstack-python
- **PHP** - composer require shadowstack/php-sdk
- **Go** - go get github.com/shadowstack/go-sdk

**Testing Your Setup:**
\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://api.shadowstack.com/v1/health
\`\`\`

Expected response:
\`\`\`json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0"
  }
}
\`\`\`
      },
      {
        id: "webhook-format",
        title: "Webhook payload formats",
        content: `Understand webhook payloads for seamless integration:

**Webhook Setup:**
1. **Add Webhook URL** - Settings → Webhooks → Add Webhook
2. **Choose Events** - Select which events to receive
3. **Set Secret** - Optional secret for payload verification
4. **Test Webhook** - Send test payload to verify setup

**Supported Events:**
- **alert.created** - New security alert generated
- **alert.updated** - Alert status or details changed
- **wallet.added** - New wallet address added to monitoring
- **wallet.removed** - Wallet address removed from monitoring
- **monitoring.status** - Monitoring status changes

**Alert Created Payload:**
{
  "event": "alert.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "alert_id": "alert_123456",
    "severity": "critical",
    "title": "Wallet Address Mentioned in Threat Channel",
    "description": "Your wallet address was mentioned in a known hacker channel",
    "wallet_address": "1A1zP1...masked",
    "wallet_label": "Main Hot Wallet",
    "threat_type": "direct_targeting",
    "confidence": 95
  }
}

**Webhook Security:**
- HTTPS Required - All webhook URLs must use HTTPS
- Signature Verification - Verify payloads using webhook secret
- IP Whitelist - Webhooks sent from specific IP ranges
- Retry Logic - Failed deliveries retried up to 5 times`
      },
      {
        id: "rate-limits",
        title: "Rate limits and best practices",
        content: `Optimize your API usage within rate limits:

**Rate Limit Tiers:**
- **Starter Plan:** 100 requests/hour (1.67/minute)
- **Growth Plan:** 1,000 requests/hour (16.67/minute)
- **Enterprise Plan:** 10,000 requests/hour (166.67/minute)
- **Burst Allowance:** 2x rate limit for 5-minute periods

**Rate Limit Headers:**
Every API response includes rate limit information:
\`\`\`
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000
X-RateLimit-Retry-After: 3600
\`\`\`

**Rate Limit Exceeded Response:**
\`\`\`json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "details": "You have exceeded your hourly rate limit of 1000 requests"
  },
  "retry_after": 3600
}
\`\`\`

**Best Practices:**

**1. Implement Exponential Backoff:**
\`\`\`javascript
async function apiRequest(url, options, retries = 3) {
  try {
    const response = await fetch(url, options);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, 4 - retries) * 1000;
      
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return apiRequest(url, options, retries - 1);
      }
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiRequest(url, options, retries - 1);
    }
    throw error;
  }
}
\`\`\`

**2. Batch Requests:**
Instead of multiple single requests:
\`\`\`javascript
// Don't do this
for (const walletId of walletIds) {
  await fetch(\`/api/wallets/\${walletId}\`);
}

// Do this instead
const response = await fetch('/api/wallets/batch', {
  method: 'POST',
  body: JSON.stringify({ wallet_ids: walletIds })
});
\`\`\`

**3. Use Pagination Efficiently:**
\`\`\`javascript
// Fetch all alerts efficiently
async function getAllAlerts() {
  const allAlerts = [];
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    const response = await fetch(`/api/alerts?page=${page}&limit=100`);
    const data = await response.json();
    
    allAlerts.push(...data.data);
    hasMore = data.pagination.has_more;
    page++;
    
    // Respect rate limits
    if (hasMore) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return allAlerts;
}
\`\`\`

**4. Cache Responses:**
\`\`\`javascript
const cache = new Map();

async function getCachedData(endpoint, ttl = 300000) { // 5 minutes
  const cached = cache.get(endpoint);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const response = await fetch(endpoint);
  const data = await response.json();
  
  cache.set(endpoint, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}
\`\`\`

**5. Monitor Rate Limit Usage:**
\`\`\`javascript
function trackRateLimit(response) {
  const limit = response.headers.get('X-RateLimit-Limit');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  
  console.log(`Rate limit: ${remaining}/${limit}, resets at ${new Date(reset * 1000)}`);
  
  // Alert when approaching limit
  if (remaining < limit * 0.1) {
    console.warn('Approaching rate limit!');
  }
}
\`\`\`

**Endpoint-Specific Limits:**
- **GET /alerts** - Standard rate limit
- **POST /alerts/acknowledge** - 2x standard rate limit
- **GET /wallets** - Standard rate limit
- **POST /wallets** - 0.5x standard rate limit (more expensive)
- **DELETE /wallets** - 0.5x standard rate limit

**Rate Limit Optimization:**
- **Use webhooks** instead of polling for real-time data
- **Implement caching** for frequently accessed data
- **Batch operations** when possible
- **Use appropriate page sizes** (50-100 items per page)
- **Monitor usage** in dashboard

**Enterprise Rate Limits:**
- **Custom Limits** - Negotiate higher limits based on usage
- **Dedicated Infrastructure** - Isolated rate limiting
- **Burst Capacity** - Higher burst allowances
- **Priority Processing** - Faster response times

**Rate Limit Monitoring:**
Dashboard shows:
- Current usage vs limits
- Historical usage patterns
- Peak usage times
- Rate limit violations
- Recommendations for optimization

**Troubleshooting:**
- **Unexpected 429s** - Check for concurrent requests
- **Slow Responses** - May indicate approaching limits
- **Failed Webhooks** - Don't count against rate limits
- **Cache Misses** - Frequent cache misses increase API usage
- **Batch Size** - Too small batches waste requests

**Getting Help:**
- Contact support for rate limit increases
- Review usage patterns in dashboard
- Optimize code with our SDK libraries
- Schedule high-volume operations during off-peak hours`
      },
      {
        id: "examples",
        title: "Custom integration examples",
        content: `Real-world integration examples for common use cases:

**1. Slack Alert Bot:**
\`\`\`javascript
const { WebClient } = require('@slack/web-api');
const express = require('express');
const crypto = require('crypto');

const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
const app = express();

app.use(express.json());

// Webhook endpoint for ShadowStack alerts
app.post('/webhook/shadowstack', (req, res) => {
  // Verify webhook signature
  const signature = req.headers['x-shadowstack-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifySignature(payload, signature)) {
    return res.status(401).send('Unauthorized');
  }
  
  const { event, data } = req.body;
  
  if (event === 'alert.created') {
    sendSlackAlert(data);
  }
  
  res.status(200).send('OK');
});

async function sendSlackAlert(alert) {
  const color = {
    critical: '#FF0000',
    high: '#FF8C00',
    medium: '#FFD700',
    low: '#00CED1'
  }[alert.severity];
  
  const blocks = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `🚨 ${alert.severity.toUpperCase()} Security Alert`
      }
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${alert.title}*\\n${alert.description}`
      }
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Wallet:*\\n${alert.wallet_label}`
        },
        {
          type: 'mrkdwn',
          text: `*Confidence:*\\n${alert.confidence}%`
        }
      ]
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: { type: 'plain_text', text: 'Acknowledge' },
          style: 'primary',
          value: alert.alert_id,
          action_id: 'acknowledge_alert'
        },
        {
          type: 'button',
          text: { type: 'plain_text', text: 'View Details' },
          url: `https://dashboard.shadowstack.com/alerts/${alert.alert_id}`
        }
      ]
    }
  ];
  
  await slack.chat.postMessage({
    channel: '#security-alerts',
    attachments: [{ color, blocks }]
  });
}

function verifySignature(payload, signature) {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expectedSignature}`)
  );
}

app.listen(3000);
\`\`\`

**2. Email Alert System:**
\`\`\`python
import requests
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook/shadowstack', methods=['POST'])
def handle_webhook():
    # Verify signature
    signature = request.headers.get('X-ShadowStack-Signature')
    payload = request.get_data()
    
    if not verify_signature(payload, signature):
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    
    if data['event'] == 'alert.created') {
        send_email_alert(data)
    
    return jsonify({'status': 'success'}), 200

def verify_signature(payload, signature):
    secret = bytes(app.config['WEBHOOK_SECRET'], 'utf-8')
    expected_signature = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_signature, signature)

def send_email_alert(alert_data):
    sender_email = app.config['SENDER_EMAIL']
    receiver_email = app.config['RECEIVER_EMAIL']
    subject = f"ShadowStack Security Alert: {alert_data['title']}"
    
    message = MIMEMultipart("alternative")
    message['Subject'] = subject
    message['From'] = sender_email
    message['To'] = receiver_email
    
    text = f"""\\
    ShadowStack Security Alert
    Severity: {alert_data['severity']}
    Title: {alert_data['title']}
    Description: {alert_data['description']}
    Wallet: {alert_data['wallet_label']}
    Confidence: {alert_data['confidence']}%
    """
    
    html = f"""\\
    <html>
      <body>
        <p>ShadowStack Security Alert</p>
        <p><strong>Severity:</strong> {alert_data['severity']}</p>
        <p><strong>Title:</strong> {alert_data['title']}</p>
        <p><strong>Description:</strong> {alert_data['description']}</p>
        <p><strong>Wallet:</strong> {alert_data['wallet_label']}</p>
        <p><strong>Confidence:</strong> {alert_data['confidence']}%</p>
      </body>
    </html>
    """
    
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")
    
    message.attach(part1)
    message.attach(part2)
    
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, app.config['SENDER_PASSWORD'])
            server.sendmail(sender_email, receiver_email, message.as_string())
        print("Email sent successfully")
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == '__main__':
    app.config['WEBHOOK_SECRET'] = 'YOUR_WEBHOOK_SECRET'
    app.config['SENDER_EMAIL'] = 'your_email@gmail.com'
    app.config['SENDER_PASSWORD'] = 'your_email_password'
    app.config['RECEIVER_EMAIL'] = 'security_team@example.com'
    app.run(debug=True, port=5000)
\`\`\`

**3. SIEM Integration (Splunk):**
\`\`\`python
import requests
import json
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhook/shadowstack', methods=['POST'])
def handle_webhook():
    # Verify signature
    signature = request.headers.get('X-ShadowStack-Signature')
    payload = request.get_data()
    
    if not verify_signature(payload, signature):
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    
    # Format data for Splunk
    splunk_event = {
        "time": data['timestamp'],
        "event": data,
        "sourcetype": "shadowstack:alerts",
        "host": "shadowstack.com"
    }
    
    # Send to Splunk HTTP Event Collector
    send_to_splunk(splunk_event)
    
    return jsonify({'status': 'success'}), 200

def verify_signature(payload, signature):
    secret = bytes(app.config['WEBHOOK_SECRET'], 'utf-8')
    expected_signature = hmac.new(secret, payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_signature, signature)

def send_to_splunk(event):
    splunk_url = app.config['SPLUNK_HEC_URL']
    splunk_token = app.config['SPLUNK_HEC_TOKEN']
    
    headers = {
        "Authorization": f"Splunk {splunk_token}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(splunk_url, data=json.dumps(event), headers=headers, verify=False)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        print(f"Successfully sent to Splunk. Status Code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending to Splunk: {e}")

if __name__ == '__main__':
    app.config['WEBHOOK_SECRET'] = 'YOUR_WEBHOOK_SECRET'
    app.config['SPLUNK_HEC_URL'] = 'https://your_splunk_instance:8088/services/collector'
    app.config['SPLUNK_HEC_TOKEN'] = 'YOUR_SPLUNK_HEC_TOKEN'
    app.run(debug=True, port=5000)
\`\`\`

**4. Custom Monitoring Dashboard:**
Use the API to build your own dashboard with custom metrics and visualizations.

**5. Automated Threat Response:**
Trigger automated actions based on alert severity (e.g., freeze wallets, notify security team).

**6. Compliance Reporting:**
Generate reports for regulatory compliance using alert data.

**7. Threat Intelligence Enrichment:**
Correlate ShadowStack alerts with other threat intelligence feeds.

**8. Vulnerability Scanning Integration:**
Link alerts to vulnerability scan results for comprehensive security posture.

**9. Incident Response Platform Integration:**
Create incidents in your incident response platform based on ShadowStack alerts.

**10. Blockchain Analytics:**
Analyze transaction patterns and wallet activity using ShadowStack data.

These examples demonstrate the flexibility of the ShadowStack API and webhooks for building custom integrations to meet your specific security needs. Remember to follow security best practices when implementing these integrations, including proper authentication, signature verification, and error handling.`
      }
    ]
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSections = helpSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.articles.length > 0)

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
                <p className="text-gray-700">{article.content}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
