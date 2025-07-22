import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-cyan-400" />
              <span className="font-bold text-lg text-white">ShadowStack</span>
            </Link>
            <p className="text-gray-400 text-sm">Proactive Cybersecurity for the AI Era.</p>
            <p className="text-gray-400 text-sm mt-4">Contact: support@shadowstack.site</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="text-sm text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ShadowStack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
