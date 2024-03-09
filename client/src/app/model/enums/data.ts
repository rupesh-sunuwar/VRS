interface UserAddress {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zipCode: string;
  mobile: string;
}

interface Notification {
  id: number;
  // @ts-ignore
  title: string;
  message: string;
  notification_id: string;
  user_id: string;
  notification_read_status: boolean;
  secured: boolean;
  notification_count: number;
}

