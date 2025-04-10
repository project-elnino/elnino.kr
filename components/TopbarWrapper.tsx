"use client"

//import { usePathname } from "next/navigation"
import Topbar from "@/components/Topbar"

export default function TopbarWrapper() {
  //const pathname = usePathname()
  //const variant = pathname === "/" ? "dark" : "light"

  return <Topbar variant="light" />
}
