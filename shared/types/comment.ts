import type { SimpleUser } from "./auth/simple-user";

export interface Comment {
  id: number;
  uuid: string;
  task_uuid: string;
  user: SimpleUser;
  content: string;
  isVisible: boolean;
  created_at?: string;
  updated_at?: string;
}
