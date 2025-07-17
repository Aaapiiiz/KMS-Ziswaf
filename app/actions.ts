// app/actions.ts

"use server"; // This entire file contains Server Actions

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// This is an exported Server Action.
// It can be imported and called from any Client Component.
export async function getDynamicBreadcrumbLabel(segment: string, prevSegment?: string): Promise<string | null> {
  // We can expand this function to handle different types of dynamic routes
  if (prevSegment === 'documents' && segment.length > 20) {
    try {
      const supabase = createServerComponentClient({ cookies });
      
      // --- FIX IS HERE ---
      // Add this await to resolve the cookie access before querying data.
      await supabase.auth.getSession();

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

  // Example for another route: /activities/some-activity-slug
  if (prevSegment === 'activities') {
    // You would add logic here to fetch the activity name from its slug
    // For now, we just format it
    return segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  return null; // Return null if no match
}