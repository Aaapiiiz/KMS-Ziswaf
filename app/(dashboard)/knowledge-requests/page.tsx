// ngejerwisokto/app/(dashboard)/knowledge-requests/page.tsx (Corrected)

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { KnowledgeRequestClient } from "./_components/knowledge-request-client";

export const dynamic = 'force-dynamic';

export interface KnowledgeRequest {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  comment_count: number;
  requester_name: string;
  requester_avatar: string | null;
  segment_name: string;
}

type KnowledgeRequestFromSupabase = {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  users: { name: string | null; avatar_url: string | null; } | null;
  knowledge_segments: { name: string | null; } | null;
};

async function getKnowledgeRequests(): Promise<KnowledgeRequestFromSupabase[]> {
  const supabase = await createSupabaseServerClient(); // <-- FIX: Add 'await' here

  const { data, error } = await supabase
    .from('knowledge_requests')
    .select(`*, users ( name, avatar_url ), knowledge_segments ( name )`)
    .order('created_at', { ascending: false });

  if (error) { 
    console.error("Error fetching knowledge requests:", error); 
    return [];
  }
  return (data as KnowledgeRequestFromSupabase[]) || [];
}

export default async function KnowledgeRequestsPage() {
  const data = await getKnowledgeRequests();

  const knowledgeRequests: KnowledgeRequest[] = data.map((request: KnowledgeRequestFromSupabase) => ({
    ...request,
    requester_name: request.users?.name ?? 'Unknown User',
    requester_avatar: request.users?.avatar_url ?? null,
    segment_name: request.knowledge_segments?.name ?? 'Uncategorized',
    comment_count: 0, // Placeholder
  }));
  
  return (
    <KnowledgeRequestClient initialRequests={knowledgeRequests} />
  );
}