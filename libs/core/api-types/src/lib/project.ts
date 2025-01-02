export interface Project {
  id: string;
  name: string;
  slug: string;
  moderator: {
    id: string;
    email: string;
    avatar: string;
  };
  participants: {
    id: string;
    email: string;
    avatar: string;
  }[];
  columns: {
    title: string;
    slug: string;
    order: number;
  }[];
  createdAt: string;
  updatedAt: string;
}