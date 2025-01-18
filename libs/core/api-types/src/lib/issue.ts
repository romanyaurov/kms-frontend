export interface Issue {
  id: string;
  title: string;
  description: string;
  column: string;
  order: number;
  tasks?: Task[];
  assignedTo?: AssignedTo[];
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

export interface AssignedTo {
  id: string;
  firstName: string,
  lastName: string,
  post: string,
  email: string;
  avatar: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  column: string;
  project: string;
  assignedTo?: string[];
  tasks?: string[];
  deadline?: string;
}