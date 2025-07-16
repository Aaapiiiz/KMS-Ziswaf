"use client";

// This is a simplified toast implementation that uses browser alerts.
// In a real application, you would replace this with a full toast library like react-hot-toast
// and the associated Toaster components.

interface ToastProps {
    title: string;
    description: string;
    variant?: "default" | "destructive";
}

export const toast = ({ title, description, variant }: ToastProps) => {
  const message = `${title}\n${description}`;
  if (variant === "destructive") {
    // For errors, we can use console.error and an alert
    console.error(message);
    alert(`Error: ${description}`);
  } else {
    // For success/default, just an alert is fine for this mock
    alert(`Success: ${description}`);
  }
};