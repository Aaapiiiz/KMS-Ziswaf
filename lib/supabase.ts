import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface User {
  id: string
  email: string
  name: string
  department: string
  role: "admin" | "user"
  status: "active" | "pending" | "inactive"
  avatar_url?: string
  created_at: string
  updated_at: string
  last_login?: string
}

export interface Document {
  id: string
  title: string
  description?: string
  file_url?: string
  external_url?: string
  document_type: "file" | "link"
  platform?: string
  file_type: string
  file_size?: number
  category: string
  department: string
  tags: string[]
  uploaded_by: string
  is_mandatory: boolean
  is_starred: boolean // Admin-controlled mandatory reading
  verification_status: "pending" | "approved" | "rejected" | "revision_requested"
  verified_by?: string
  verified_at?: string
  verification_requested_at?: string
  version: string
  location: string
  priority: "low" | "medium" | "high" | "critical"
  access_level: "departmental" | "organizational" | "public"
  language: string
  expiry_date?: string
  related_documents?: string
  author: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  type: "document_verification" | "read_request" | "read_confirmation" | "document_status"
  title: string
  message: string
  document_id?: string
  from_user_id?: string
  to_user_id: string
  is_read: boolean
  requires_action: boolean
  action_type?: "mark_as_read" | "verify_document" | "respond"
  metadata?: {
    verification_status?: "approved" | "rejected" | "revision_requested"
    priority?: "high" | "medium" | "low"
    deadline?: string
  }
  created_at: string
  updated_at: string
}

export interface NotificationPreferences {
  id: string
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  document_verification: boolean
  read_requests: boolean
  document_status: boolean
  created_at: string
  updated_at: string
}

export interface DocumentCategory {
  id: string
  name: string
  description?: string
  color: string
  icon?: string
  department?: string
  is_active: boolean
  created_at: string
}

export interface DocumentLocation {
  id: string
  path: string
  description?: string
  department?: string
  category?: string
  is_active: boolean
  created_at: string
}

export interface DocumentVersion {
  id: string
  document_id: string
  version: string
  file_url: string
  file_size: number
  change_notes?: string
  uploaded_by: string
  created_at: string
}

export interface DocumentComment {
  id: string
  document_id: string
  user_id: string
  comment: string
  comment_type: "feedback" | "revision_request" | "approval_note"
  is_internal: boolean
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  name: string
  description?: string
  status: "planning" | "active" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  start_date?: string
  end_date?: string
  progress: number
  budget: number
  target_beneficiaries: number
  current_beneficiaries: number
  tags: string[]
  departments: string[]
  participants: number
  created_by: string
  created_at: string
  updated_at: string
}

export interface ActivityParticipant {
  id: string
  activity_id: string
  user_id: string
  role: string
  joined_at: string
}

export interface ActivityMeeting {
  id: string
  activity_id: string
  title: string
  description?: string
  meeting_date: string
  duration_minutes: number
  attendees_count: number
  meeting_notes?: string
  created_by: string
  created_at: string
}

export interface ActivityDiscussion {
  id: string
  activity_id: string
  user_id: string
  message: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface ActivityMilestone {
  id: string
  activity_id: string
  title: string
  description?: string
  target_date: string
  completion_date?: string
  status: "pending" | "active" | "completed" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}

export interface ZiswafReport {
  id: string
  area: string
  target_amount: number
  realized_amount: number
  percentage: number
  report_month: number
  report_year: number
  created_at: string
  updated_at: string
}

// Helper functions for database operations

// Document functions
export const markDocumentAsMandatory = async (documentId: string, userId: string) => {
  // Only admins can mark documents as mandatory
  const { data: user } = await supabase.from("users").select("role").eq("id", userId).single()

  if (user?.role !== "admin") {
    throw new Error("Only admins can mark documents as mandatory")
  }

  const { error } = await supabase
    .from("documents")
    .update({
      is_starred: true,
      is_mandatory: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const unmarkDocumentAsMandatory = async (documentId: string, userId: string) => {
  // Only admins can unmark documents as mandatory
  const { data: user } = await supabase.from("users").select("role").eq("id", userId).single()

  if (user?.role !== "admin") {
    throw new Error("Only admins can unmark documents as mandatory")
  }

  const { error } = await supabase
    .from("documents")
    .update({
      is_starred: false,
      is_mandatory: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const getMandatoryDocuments = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email)
    `)
    .eq("is_mandatory", true)
    .eq("is_starred", true)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Notification functions
export const getNotifications = async (userId: string, limit?: number) => {
  let query = supabase
    .from("notifications")
    .select(`
      *,
      from_user:users!notifications_from_user_id_fkey(id, name, avatar_url),
      document:documents(id, title)
    `)
    .eq("to_user_id", userId)
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) throw error
  return data as (Notification & {
    from_user?: Pick<User, "id" | "name" | "avatar_url">
    document?: Pick<Document, "id" | "title">
  })[]
}

export const getUnreadNotificationsCount = async (userId: string) => {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("to_user_id", userId)
    .eq("is_read", false)

  if (error) throw error
  return count || 0
}

export const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq("id", notificationId)

  if (error) throw error
}

export const markAllNotificationsAsRead = async (userId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true, updated_at: new Date().toISOString() })
    .eq("to_user_id", userId)
    .eq("is_read", false)

  if (error) throw error
}

export const createNotification = async (notificationData: Partial<Notification>) => {
  const { data, error } = await supabase.from("notifications").insert(notificationData).select().single()

  if (error) throw error
  return data as Notification
}

export const createDocumentReadNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
) => {
  return createNotification({
    type: "read_confirmation",
    title: "Konfirmasi Pembacaan",
    message: `Dokumen "${documentTitle}" telah dibaca`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: false,
    metadata: {
      priority: "medium",
    },
  })
}

export const createDocumentVerificationNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
) => {
  return createNotification({
    type: "document_verification",
    title: "Permintaan Verifikasi",
    message: `Dokumen baru memerlukan verifikasi: ${documentTitle}`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: true,
    action_type: "verify_document",
    metadata: {
      priority: "high",
    },
  })
}

export const createReadRequestNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
  deadline?: string,
) => {
  return createNotification({
    type: "read_request",
    title: "Permintaan Baca Dokumen",
    message: `Admin meminta Anda untuk membaca: ${documentTitle}`,
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: true,
    action_type: "mark_as_read",
    metadata: {
      priority: "high",
      deadline: deadline,
    },
  })
}

export const createDocumentStatusNotification = async (
  documentId: string,
  fromUserId: string,
  toUserId: string,
  documentTitle: string,
  verificationStatus: "approved" | "rejected" | "revision_requested",
) => {
  const messages = {
    approved: `Dokumen Anda "${documentTitle}" telah disetujui`,
    rejected: `Dokumen Anda "${documentTitle}" ditolak`,
    revision_requested: `Dokumen Anda "${documentTitle}" memerlukan revisi`,
  }

  return createNotification({
    type: "document_status",
    title: "Status Verifikasi",
    message: messages[verificationStatus],
    document_id: documentId,
    from_user_id: fromUserId,
    to_user_id: toUserId,
    is_read: false,
    requires_action: verificationStatus === "revision_requested",
    action_type: verificationStatus === "revision_requested" ? "respond" : undefined,
    metadata: {
      verification_status: verificationStatus,
      priority: verificationStatus === "revision_requested" ? "medium" : "low",
    },
  })
}

export const getNotificationPreferences = async (userId: string) => {
  const { data, error } = await supabase.from("notification_preferences").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error
  return data as NotificationPreferences | null
}

export const updateNotificationPreferences = async (userId: string, preferences: Partial<NotificationPreferences>) => {
  const { data, error } = await supabase
    .from("notification_preferences")
    .upsert({
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data as NotificationPreferences
}

export const getUsers = async () => {
  const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as User[]
}

export const getDocuments = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email)
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getDocumentsByDepartment = async (department: string) => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email),
      document_versions(*)
    `)
    .eq("department", department)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getDocumentCategories = async (department?: string) => {
  let query = supabase.from("document_categories").select("*").eq("is_active", true)

  if (department) {
    query = query.eq("department", department)
  }

  const { data, error } = await query.order("name")

  if (error) throw error
  return data as DocumentCategory[]
}

export const getDocumentLocations = async (department?: string) => {
  let query = supabase.from("document_locations").select("*").eq("is_active", true)

  if (department) {
    query = query.eq("department", department)
  }

  const { data, error } = await query.order("path")

  if (error) throw error
  return data as DocumentLocation[]
}

export const createDocument = async (documentData: Partial<Document>) => {
  const { data, error } = await supabase.from("documents").insert(documentData).select().single()

  if (error) throw error
  return data as Document
}

export const createLinkDocument = async (documentData: Partial<Document>) => {
  const { data, error } = await supabase
    .from("documents")
    .insert({
      ...documentData,
      document_type: "link",
      file_size: null,
    })
    .select()
    .single()

  if (error) throw error
  return data as Document
}

export const createDocumentVersion = async (versionData: Partial<DocumentVersion>) => {
  const { data, error } = await supabase.from("document_versions").insert(versionData).select().single()

  if (error) throw error
  return data as DocumentVersion
}

export const getZiswafReports = async (year: number = new Date().getFullYear()) => {
  const { data, error } = await supabase
    .from("ziswaf_reports")
    .select("*")
    .eq("report_year", year)
    .order("report_month", { ascending: true })

  if (error) throw error
  return data as ZiswafReport[]
}

export const createZiswafReport = async (reportData: Partial<ZiswafReport>) => {
  const { data, error } = await supabase.from("ziswaf_reports").insert(reportData).select().single()

  if (error) throw error
  return data as ZiswafReport
}

export const getActivities = async () => {
  const { data, error } = await supabase
    .from("activities")
    .select(`
      *,
      created_by:users(name, email),
      activity_participants(
        user_id,
        role,
        users(name, email, department)
      )
    `)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export const getActivityById = async (id: string) => {
  const { data, error } = await supabase
    .from("activities")
    .select(`
      *,
      created_by:users(name, email),
      activity_participants(
        user_id,
        role,
        users(name, email, department, avatar_url)
      ),
      activity_meetings(*),
      activity_discussions(
        *,
        users(name, email)
      ),
      activity_milestones(*),
      activity_documents(
        documents(*)
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export const getDocumentsForVerification = async () => {
  const { data, error } = await supabase
    .from("documents")
    .select(`
      *,
      uploaded_by:users(name, email),
      verified_by:users(name, email),
      document_comments(*)
    `)
    .order("verification_requested_at", { ascending: true })

  if (error) throw error
  return data
}

export const updateDocumentVerification = async (
  documentId: string,
  status: string,
  verifiedBy: string,
  comment?: string,
) => {
  const { error } = await supabase
    .from("documents")
    .update({
      verification_status: status,
      verified_by: verifiedBy,
      verified_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error

  // Add comment if provided
  if (comment) {
    const { error: commentError } = await supabase.from("document_comments").insert({
      document_id: documentId,
      user_id: verifiedBy,
      comment: comment,
      comment_type: status === "approved" ? "approval_note" : "feedback",
    })

    if (commentError) throw commentError
  }
}

export const requestDocumentVerification = async (documentId: string) => {
  const { error } = await supabase
    .from("documents")
    .update({
      verification_requested_at: new Date().toISOString(),
    })
    .eq("id", documentId)

  if (error) throw error
}

export const joinActivity = async (activityId: string, userId: string, role = "Participant") => {
  const { error } = await supabase.from("activity_participants").insert({
    activity_id: activityId,
    user_id: userId,
    role: role,
  })

  if (error) throw error
}

export const addActivityDiscussion = async (activityId: string, userId: string, message: string, parentId?: string) => {
  const { error } = await supabase.from("activity_discussions").insert({
    activity_id: activityId,
    user_id: userId,
    message: message,
    parent_id: parentId,
  })

  if (error) throw error
}
