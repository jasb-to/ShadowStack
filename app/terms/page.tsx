"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Building2 } from "lucide-react"

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-slate-300 text-lg">Last updated: January 2024</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    By accessing and using ShadowStack ("the Service"), you accept and agree to be bound by the terms
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                <div className="space-y-4 text-slate-300">
                  <p>ShadowStack provides security monitoring services for cryptocurrency exchanges, including:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Real-time monitoring of hot wallet addresses</li>
                    <li>Anomaly detection and security alerts</li>
                    <li>Threat intelligence and risk assessment</li>
                    <li>Integration with communication platforms</li>
                    <li>Compliance and reporting tools</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts and Responsibilities</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Account Security:</strong> You are responsible for maintaining the
                    confidentiality of your account credentials and for all activities that occur under your account.
                  </p>
                  <p>
                    <strong className="text-white">Accurate Information:</strong> You agree to provide accurate,
                    current, and complete information during registration and to update such information as necessary.
                  </p>
                  <p>
                    <strong className="text-white">Prohibited Uses:</strong> You may not use the Service for any illegal
                    purposes or to violate any laws in your jurisdiction.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Subscription and Payment</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Subscription Plans:</strong> We offer various subscription plans with
                    different features and limitations as described on our pricing page.
                  </p>
                  <p>
                    <strong className="text-white">Payment Terms:</strong> Subscription fees are billed in advance on a
                    monthly or annual basis. All fees are non-refundable except as required by law.
                  </p>
                  <p>
                    <strong className="text-white">Free Trial:</strong> We may offer a free trial period. At the end of
                    the trial, your subscription will automatically convert to a paid plan unless cancelled.
                  </p>
                  <p>
                    <strong className="text-white">Price Changes:</strong> We reserve the right to change our pricing
                    with 30 days' notice to existing subscribers.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Service Availability and Performance</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Uptime:</strong> We strive to maintain 99.9% uptime but do not
                    guarantee uninterrupted service availability.
                  </p>
                  <p>
                    <strong className="text-white">Maintenance:</strong> We may perform scheduled maintenance that
                    temporarily affects service availability. We will provide advance notice when possible.
                  </p>
                  <p>
                    <strong className="text-white">Service Limitations:</strong> Our service monitors public blockchain
                    data only. We do not guarantee detection of all security threats.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data and Privacy</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Data Collection:</strong> We collect and process data as described in
                    our Privacy Policy.
                  </p>
                  <p>
                    <strong className="text-white">Data Security:</strong> We implement industry-standard security
                    measures to protect your data.
                  </p>
                  <p>
                    <strong className="text-white">Data Ownership:</strong> You retain ownership of your data. We do not
                    claim ownership of wallet addresses or other information you provide.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    The Service and its original content, features, and functionality are owned by ShadowStack and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Service Limitations:</strong> Our service is provided "as is" without
                    warranties of any kind. We do not guarantee that our service will prevent all security incidents.
                  </p>
                  <p>
                    <strong className="text-white">Liability Cap:</strong> Our total liability to you for any claims
                    arising from your use of the Service shall not exceed the amount you paid us in the 12 months
                    preceding the claim.
                  </p>
                  <p>
                    <strong className="text-white">Excluded Damages:</strong> We shall not be liable for any indirect,
                    incidental, special, consequential, or punitive damages.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    You agree to indemnify and hold harmless ShadowStack from any claims, damages, or expenses arising
                    from your use of the Service or violation of these terms.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    <strong className="text-white">Termination by You:</strong> You may cancel your subscription at any
                    time through your account settings.
                  </p>
                  <p>
                    <strong className="text-white">Termination by Us:</strong> We may terminate your account for
                    violation of these terms or for any reason with 30 days' notice.
                  </p>
                  <p>
                    <strong className="text-white">Effect of Termination:</strong> Upon termination, your access to the
                    Service will cease, and we may delete your data according to our retention policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of England and Wales,
                    without regard to its conflict of law provisions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    We reserve the right to modify these terms at any time. We will notify users of material changes via
                    email and by posting the updated terms on our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Contact Information</h2>
                <div className="space-y-4 text-slate-300">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
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
