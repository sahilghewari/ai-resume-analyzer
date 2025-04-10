import Link from "next/link"
import { FileText, Twitter, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300 dark:bg-navy-950 transition-theme">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-brand-500" />
              <span className="ml-2 text-xl font-bold text-white">ResumeAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              Leverage the power of AI to build and optimize your resume for your dream job.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/analyzer" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Resume History
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Career Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Job Search Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-brand-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
