export interface Project {
  id: string;
  name: string;
  slug: string;
  moderator: Participant;
  participants: Participant[];
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  title: string;
  slug: string;
  order: number;
}

export interface Participant {
  id: string;
  email: string;
  avatar: string;
}
