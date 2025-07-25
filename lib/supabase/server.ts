// ngejerwisokto/lib/supabase/server.ts (ESLint fix)
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            // This is intentional and can be ignored
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            // This is intentional and can be ignored
          }
        },
      },
    }
  )
}