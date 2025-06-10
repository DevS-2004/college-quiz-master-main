
import React, { createContext, useContext, useState } from 'react';
import { Quiz, Question, QuizAttempt } from '@/types';

interface QuizContextType {
  quizzes: Quiz[];
  attempts: QuizAttempt[];
  addQuiz: (quiz: Quiz) => void;
  updateQuiz: (quiz: Quiz) => void;
  deleteQuiz: (id: string) => void;
  getQuizById: (id: string) => Quiz | undefined;
  addQuizAttempt: (attempt: QuizAttempt) => void;
  getStudentAttempts: (studentId: string) => QuizAttempt[];
  getFacultyQuizzes: (facultyId: string) => Quiz[];
  getDepartmentQuizzes: (department: string) => Quiz[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Mock quizzes for demo
const initialQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'Test your knowledge of HTML, CSS, and JavaScript',
    subject: 'Web Development',
    department: 'Computer Science',
    facultyId: '1',
    timeLimit: 30,
    questions: [
      {
        id: '1',
        text: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Hyper Transfer Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correctAnswer: 0,
        points: 1
      },
      {
        id: '2',
        text: 'Which property is used to change the background color in CSS?',
        options: [
          'color',
          'bgcolor',
          'background-color',
          'background'
        ],
        correctAnswer: 2,
        points: 1
      }
    ],
    createdAt: new Date(),
    isActive: true
  }
];

const initialAttempts: QuizAttempt[] = [];

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [attempts, setAttempts] = useState<QuizAttempt[]>(initialAttempts);

  const addQuiz = (quiz: Quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const updateQuiz = (quiz: Quiz) => {
    setQuizzes(quizzes.map(q => q.id === quiz.id ? quiz : q));
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(quizzes.filter(q => q.id !== id));
  };

  const getQuizById = (id: string) => {
    return quizzes.find(q => q.id === id);
  };

  const addQuizAttempt = (attempt: QuizAttempt) => {
    setAttempts([...attempts, attempt]);
  };

  const getStudentAttempts = (studentId: string) => {
    return attempts.filter(a => a.studentId === studentId);
  };

  const getFacultyQuizzes = (facultyId: string) => {
    return quizzes.filter(q => q.facultyId === facultyId);
  };

  const getDepartmentQuizzes = (department: string) => {
    return quizzes.filter(q => q.department === department);
  };

  return (
    <QuizContext.Provider 
      value={{ 
        quizzes, 
        attempts, 
        addQuiz, 
        updateQuiz, 
        deleteQuiz, 
        getQuizById, 
        addQuizAttempt, 
        getStudentAttempts, 
        getFacultyQuizzes, 
        getDepartmentQuizzes 
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
