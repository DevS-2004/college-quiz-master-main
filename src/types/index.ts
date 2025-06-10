
export type UserRole = 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  subject?: string; // Only for faculty
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  department: string;
  facultyId: string;
  timeLimit: number; // In minutes
  questions: Question[];
  createdAt: Date;
  isActive: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  answers: number[];
  score: number;
  maxScore: number;
  completedAt: Date;
  subject: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  departmentId: string;
}
