// app/(dashboard)/knowledge-requests/page.tsx (FINAL CORRECTED VERSION)

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { KnowledgeRequestClient } from "./_components/knowledge-request-client";

// This type now includes the nested objects from the direct query
export interface KnowledgeRequest {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  // Nested object for the user who made the request
  users: {
    name: string | null;
    avatar_url: string | null;
  } | null;
  // Nested object for the category
  knowledge_segments: {
    name: string | null;
  } | null;
  // This will need to be calculated differently, or we can omit it for now
  comment_count: number;
}

export default async function KnowledgeRequestsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Use the direct query method, which is more reliable.
  // The new RLS policies will allow this to work correctly.
  const { data, error } = await supabase
    .from('knowledge_requests')
    .select(`
      *,
      users ( name, avatar_url ),
      knowledge_segments ( name )
    `)
    .order('created_at', { descending: false });

  if (error) {
    console.error("Error fetching knowledge requests:", error);
  }

  // Map the data to the flat structure the client component expects
  const knowledgeRequests = data?.map(request => ({
    id: request.id,
    title: request.title,
    description: request.description,
    department: request.department,
    status: request.status,
    priority: request.priority,
    created_at: request.created_at,
    requester_name: request.users?.name ?? 'Unknown User',
    requester_avatar: request.users?.avatar_url ?? null,
    segment_name: request.knowledge_segments?.name ?? 'Uncategorized',
    comment_count: 0, // Placeholder, as counting comments with RLS is complex here
  })) || [];
  
  return (
    <KnowledgeRequestClient initialRequests={knowledgeRequests} />
  );
}