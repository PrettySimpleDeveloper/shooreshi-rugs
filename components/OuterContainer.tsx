"use client"

import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation"

export default function OuterContainer({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  const isHomePage = path === "/"
  return (
    <div
      className={cn("flex min-h-screen flex-col", {
        // "pt-navMobile xl:pt-navWeb": !isHomePage,
      })}
    >
      {children}
    </div>
  )
}
