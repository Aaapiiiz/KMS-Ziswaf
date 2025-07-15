// app/(dashboard)/knowledge-requests/page.tsx (FINAL CORRECTED VERSION)

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { KnowledgeRequestClient } from "./_components/knowledge-request-client";

export interface KnowledgeRequest {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  users: { name: string | null; avatar_url: string | null; } | null;
  knowledge_segments: { name: string | null; } | null;
  comment_count: number;
}

export default async function KnowledgeRequestsPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // ABANDON RPC. Use the direct query method, which is more reliable.
  const { data, error } = await supabase
    .from('knowledge_requests')
    .select(`*, users ( name, avatar_url ), knowledge_segments ( name )`)
    .order('created_at', { descending: true });

  if (error) { console.error("Error fetching knowledge requests:", error); }

  const knowledgeRequests = data?.map(request => ({
    ...request,
    requester_name: request.users?.name ?? 'Unknown User',
    requester_avatar: request.users?.avatar_url ?? null,
    segment_name: request.knowledge_segments?.name ?? 'Uncategorized',
    comment_count: 0, // Placeholder
  })) || [];
  
  return (
    <KnowledgeRequestClient initialRequests={knowledgeRequests as any} />
  );
}