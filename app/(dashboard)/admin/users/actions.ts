"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Tipe ini bisa di-share jika perlu
type NewUser = {
  name: string;
  email: string;
  department: string;
  role: "admin" | "user";
  password: string;
};

export async function adminCreateUser(newUser: NewUser) {
  // Buat client Supabase khusus untuk admin di server
  // Perhatikan: ini menggunakan createClient biasa, bukan dari @supabase/ssr
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Gunakan kunci service_role di sini
    { auth: { autoRefreshToken: false, persistSession: false } } // Opsi penting!
  );

  // Buat user di Supabase Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: newUser.email,
    password: newUser.password,
    email_confirm: true, // Langsung konfirmasi emailnya
    user_metadata: {
      name: newUser.name,
      department: newUser.department,
    },
  });

  if (authError) {
    console.error("Error creating user with admin client:", authError.message);
    return { error: authError.message };
  }

  // Jika user berhasil dibuat di Auth, trigger RLS akan membuat entri di public.users
  // Sekarang kita hanya perlu meng-update rolenya jika admin
  if (authData.user && newUser.role === 'admin') {
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ role: 'admin' })
      .eq('id', authData.user.id);
    
    if (updateError) {
        console.error("User created, but failed to set admin role:", updateError.message);
        // Kita bisa mengabaikan error ini atau mengembalikannya
        return { error: "User created, but failed to set admin role." };
    }
  }

  // Revalidate path agar halaman admin me-refresh daftarnya
  revalidatePath('/admin/users');
  return { success: true };
}