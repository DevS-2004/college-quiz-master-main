
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StudentNavigation from '@/components/StudentNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const AvailableQuizzes = () => {
  const { currentUser } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'student') {
    return null;
  }
  
  const studentAttempts = attempts.filter(attempt => attempt.studentId === currentUser.id);
  
  // Get available quizzes for student's department
  const availableQuizzes = quizzes.filter(quiz => 
    quiz.isActive && quiz.department === currentUser.department &&
    !studentAttempts.some(attempt => attempt.quizId === quiz.id)
  );
  
  // Filter quizzes by search query
  const filteredQuizzes = availableQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">Available Quizzes</h1>
        
        <StudentNavigation />
        
        <div className="mb-6">
          <Input
            placeholder="Search quizzes by title or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        {filteredQuizzes.length > 0 ? (
          <div className="space-y-4">
            {filteredQuizzes.map(quiz => (
              <Card key={quiz.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {quiz.subject} • {quiz.questions.length} questions • {quiz.timeLimit} minutes
                    </p>
                    <p className="text-sm">{quiz.description}</p>
                  </div>
                  
                  <Button 
                    onClick={() => navigate(`/take-quiz/${quiz.id}`)}
                    className="md:self-start bg-college-primary hover:bg-college-primary/90"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Available Quizzes</h3>
            <p className="text-gray-500">
              {searchQuery ? 'No quizzes match your search' : 'There are no quizzes available for you at the moment'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AvailableQuizzes;
