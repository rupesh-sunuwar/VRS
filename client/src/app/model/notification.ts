// Define the enum for NotificationStatus
enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  READ = "READ",
  FAILED = "FAILED"
}

// Define the interface for Notification
interface Notification {
  id: number;
  // @ts-ignore
  title: string;
  message: string;
  notification_id: string;
  user_id: string;
  properties: { [key: string]: string };
  notification_status: NotificationStatus;
  notification_read_status: boolean;
  secured: boolean;
  notification_count: number;
}
