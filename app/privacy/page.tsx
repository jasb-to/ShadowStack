"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-200 to-cyan-200 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-lg">Last updated: January 2024</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Account Information:</strong> When you create an account, we collect
                    your email address, name, and company information.
                  </p>
                  <p>
                    <strong className="text-white">Wallet Addresses:</strong> We collect the public wallet addresses you
                    choose to monitor. We never collect or store private keys.
                  </p>
                  <p>
                    <strong className="text-white">Usage Data:</strong> We collect information about how you use our
                    service, including login times, features accessed, and system performance data.
                  </p>
                  <p>
                    <strong className="text-white">Communication Data:</strong> When you contact us, we may keep records
                    of that communication.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                <div className="space-y-4 text-slate-300">
                  <p>We use your information to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and maintain our security monitoring services</li>
                    <li>Send you security alerts and notifications</li>
                    <li>Improve our service and develop new features</li>
                    <li>Communicate with you about your account and our services</li>
                    <li>Comply with legal obligations and protect against fraud</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information only in the following circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>To protect our rights, property, or safety, or that of our users</li>
                    <li>
                      With service providers who assist us in operating our platform (under strict confidentiality
                      agreements)
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                <div className="space-y-4 text-slate-300">
                  <p>We implement industry-standard security measures to protect your information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>All data is encrypted in transit and at rest using AES-256 encryption</li>
                    <li>We maintain SOC 2 Type II compliance</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Multi-factor authentication for all admin access</li>
                    <li>Zero-knowledge architecture for sensitive wallet data</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Retention</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We retain your information for as long as necessary to provide our services and comply with legal
                    obligations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Account data: Retained while your account is active and for 90 days after deletion</li>
                    <li>Monitoring data: Retained according to your subscription plan (7-90 days)</li>
                    <li>Security logs: Retained for 1 year for security and compliance purposes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                <div className="space-y-4 text-slate-300">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and download your personal data</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your account and associated data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Data portability (receive your data in a structured format)</li>
                  </ul>
                  <p>
                    To exercise these rights, contact us at{" "}
                    <a href="mailto:info@shadowsignals.live" className="text-emerald-400 hover:underline">
                      info@shadowsignals.live
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We use essential cookies to provide our service and optional analytics cookies to improve
                    performance. You can control cookie preferences in your browser settings.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. International Transfers</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Your data may be processed in countries outside your residence. We ensure appropriate safeguards are
                    in place for international data transfers, including Standard Contractual Clauses approved by the
                    European Commission.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of any material changes by
                    email and by posting the updated policy on our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
                <div className="space-y-4 text-slate-300">
                  <p>If you have any questions about this privacy policy or our data practices, please contact us:</p>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p>
                      <strong className="text-white">Email:</strong>{" "}
                      <a href="mailto:info@shadowsignals.live" className="text-emerald-400 hover:underline">
                        info@shadowsignals.live
                      </a>
                    </p>
                    <p>
                      <strong className="text-white">Address:</strong> Birmingham, United Kingdom
                    </p>
                    <p>
                      <strong className="text-white">Data Protection Officer:</strong>{" "}
                      <a href="mailto:dpo@shadowsignals.live" className="text-emerald-400 hover:underline">
                        dpo@shadowsignals.live
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
