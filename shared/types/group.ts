export interface Group {
  uuid: string;
  created_at: string;
  updated_at: string;
  owner_uuid: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  visibility: string;
}
