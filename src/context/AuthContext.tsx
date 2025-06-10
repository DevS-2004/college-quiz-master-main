
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  subject?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'faculty@example.com',
    role: 'faculty',
    department: 'Computer Science',
    subject: 'Web Development'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'student@example.com',
    role: 'student',
    department: 'Computer Science'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('quizAppUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    const user = mockUsers.find(user => user.email === email);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('quizAppUser', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const userExists = mockUsers.some(user => user.email === userData.email);
    
    if (userExists) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      subject: userData.subject
    };
    
    // In a real app, we would save to a database
    mockUsers.push(newUser);
    
    // Log in the new user
    setCurrentUser(newUser);
    localStorage.setItem('quizAppUser', JSON.stringify(newUser));
    
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('quizAppUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
