// ngejerwisokto/app/actions.ts (Corrected)
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDynamicBreadcrumbLabel(segment: string, prevSegment?: string): Promise<string | null> {
  if (prevSegment === 'documents' && segment.length > 20) {
    try {
      const supabase = await createSupabaseServerClient(); // <-- FIX: Add 'await' here

      const { data, error } = await supabase
        .from('documents')
        .select('title')
        .eq('id', segment)
        .single();
      
      if (error) return null;
      return data.title;
    } 
      catch {
      return null;
    }
  }

  if (prevSegment === 'activities') {
    return segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  return null;
}