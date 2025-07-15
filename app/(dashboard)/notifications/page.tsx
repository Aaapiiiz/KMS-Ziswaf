// app/(dashboard)/notifications/page.tsx (FINAL, CORRECTED VERSION)

import { NotificationClient } from "./_components/notification-client";

// This page is now a simple wrapper. It doesn't need to be async
// and doesn't fetch any data itself.
export default function NotificationsPage() {
    return (
        <NotificationClient />
    );
}