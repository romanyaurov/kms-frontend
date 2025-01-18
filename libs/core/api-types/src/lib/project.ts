export interface Project {
  id: string;
  name: string;
  slug: string;
  moderator: Moderator;
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

export interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}

export interface CreateProjectRequest {
  name: string;
  columns: string[];
  participants?: string[];
}
