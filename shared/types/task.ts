import type { User } from "./auth/user";

export interface Task {
  uuid: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  due_date: string;
  assigned_to: User;
  assigned_by: User;
  status: string;
  priority: string;
  visibility: string;
  tags: string[];
}
