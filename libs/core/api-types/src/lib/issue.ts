export interface Issue {
  id: string;
  title: string;
  description: string;
  column: string;
  order: number;
  tasks?: {
    id: string;
    text: string;
    isCompleted: boolean;
  }[];
  assignedTo?: {
    id: string;
    email: string;
    avatar: string;
  }[];
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
