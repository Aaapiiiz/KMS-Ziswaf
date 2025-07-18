// app/(dashboard)/test-auth/page.tsx (FINAL FIX for ESLint)

/* eslint-disable react/no-unescaped-entities */

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default function TestAuthPage() {
      
  const testServerAction = async () => {
    "use server";
    console.log("--- [Server Action] testServerAction invoked ---");
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error("--- [Server Action] FAILED! getUser() returned null. ---");
    } else {
      console.log(`--- [Server Action] SUCCESS! User is: ${user.email} ---`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Halaman Tes Otentikasi Server Action</h1>
      <p className="mb-4">
        Tekan tombol di bawah ini. Lalu, periksa log di terminal Next.js Anda.
        Anda seharusnya melihat pesan 'SUCCESS! User is: [email anda]'.
        Jika Anda melihat 'FAILED!', maka masalahnya ada pada konfigurasi middleware atau Supabase SSR.
      </p>
      <form action={testServerAction}>
        <Button type="submit">
          Test Server Auth
        </Button>
      </form>
    </div>
  );
}