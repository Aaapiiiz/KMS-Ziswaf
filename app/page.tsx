import { redirect } from "next/navigation"

export default function HomePage() {
  // Automatically redirect users from the root URL to the login page.
  redirect("/login")
}