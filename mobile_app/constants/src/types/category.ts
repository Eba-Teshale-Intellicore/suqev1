export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent: string | null;
  subcategories_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
