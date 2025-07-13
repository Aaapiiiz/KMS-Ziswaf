"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
}

export function BackButton({
  href = "/dashboard",
  label = "Kembali",
  variant = "outline",
  size = "sm",
  className = "",
  onClick,
}: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(href)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} className={`flex items-center gap-2 ${className}`}>
      <ArrowLeft className="w-4 h-4" />
      {label}
    </Button>
  )
}
