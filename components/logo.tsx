"use client"
import Link from "next/link"

interface LogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
  href?: string
}

export function Logo({ variant = "default", size = "md", showText = true, className = "", href = "/" }: LogoProps) {
  // Size configurations
  const sizes = {
    sm: { width: 32, height: 32, text: "text-base" },
    md: { width: 40, height: 40, text: "text-xl" },
    lg: { width: 48, height: 48, text: "text-2xl" },
  }

  // Text color based on variant
  const textColors = {
    default: "text-foreground",
    light: "text-white",
    dark: "text-black",
  }

  const config = sizes[size]
  const textColor = textColors[variant]

  const logoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Replace this with your actual logo image */}
      {/* <Image 
        src="/logo.png" 
        alt="Strong in 30 Logo" 
        width={config.width}
        height={config.height}
        className="object-contain"
      /> */}

      {/* Temporary text-based logo - replace with image above when you have logo */}
      <div
        className={`${config.width === 32 ? "w-8 h-8" : config.width === 40 ? "w-10 h-10" : "w-12 h-12"} bg-primary rounded-lg flex items-center justify-center`}
      >
        <span className={`font-bold ${config.text} text-white`}>S30</span>
      </div>

      {showText && <span className={`font-bold ${config.text} ${textColor}`}>Strong in 30</span>}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
