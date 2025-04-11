"use client"

import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { User, LogIn } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold">R</span>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-[8px] text-primary font-bold">AI</span>
            </div>
          </div>
          <span className="font-bold text-lg">ResumeAI</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Blog
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Support
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" className="hidden md:flex">
            <LogIn className="mr-2 h-4 w-4" />
            Log In
          </Button>
          <Button size="sm">
            <User className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  )
}

