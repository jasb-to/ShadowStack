import type React from "react"
import { Shield, Target, BrainCircuit } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              About ShadowStack
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              We are your proactive defense in the digital shadows. ShadowStack provides continuous, real-time
              monitoring of breach chatter and open-source intelligence (OSINT) to protect your most critical digital
              assets.
            </p>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To empower fintech and crypto companies with the foresight to prevent security breaches before they
                happen.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <InfoCard
                icon={Target}
                title="Continuous Monitoring"
                description="Our systems relentlessly scan public Telegram channels, dark web forums, and paste sites for any mention of your assets—wallets, domains, emails, and more."
              />
              <InfoCard
                icon={Shield}
                title="Real-Time Alerts"
                description="The moment a potential threat is detected, you are notified instantly via email or webhook, allowing you to take immediate defensive action."
              />
              <InfoCard
                icon={BrainCircuit}
                title="Actionable Intelligence"
                description="We don't just send alerts. We provide context and actionable intelligence, helping you understand the threat and how to mitigate it effectively."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight">The ShadowStack Advantage</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                In a world of reactive security, we provide a proactive shield. Our specialized focus on the crypto and
                fintech sectors means we understand the unique threats you face.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="text-center p-6 rounded-lg bg-background">
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
