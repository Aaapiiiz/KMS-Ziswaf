// ngejerwisokto/middleware.ts (ESLint fix)
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  console.log(`[Middleware] Running for: ${request.method} ${request.nextUrl.pathname}`);
  
  // FIX: Ganti 'let' menjadi 'const' sesuai saran ESLint
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Buat Supabase client yang terikat pada request dan response ini
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          // Middleware dapat memodifikasi cookie pada request dan response
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          // Middleware dapat memodifikasi cookie pada request dan response
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Sangat penting: refresh session cookie jika sudah kedaluwarsa.
  // Ini akan menulis ulang cookie di 'response' jika perlu.
  await supabase.auth.getUser()

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|register).*)',
  ],
}