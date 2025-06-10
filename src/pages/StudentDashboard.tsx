
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StudentNavigation from '@/components/StudentNavigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();
  
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
  
  const avgScore = studentAttempts.length > 0
    ? studentAttempts.reduce((sum, attempt) => sum + (attempt.score / attempt.maxScore) * 100, 0) / studentAttempts.length
    : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">Student Dashboard</h1>
        
        <StudentNavigation />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Available Quizzes</CardTitle>
              <CardDescription>Ready to attempt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{availableQuizzes.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed Quizzes</CardTitle>
              <CardDescription>Your submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{studentAttempts.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
              <CardDescription>Across all quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{avgScore.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Available Quizzes</CardTitle>
              <CardDescription>Quizzes ready for you to take</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableQuizzes.length > 0 ? (
                availableQuizzes.slice(0, 3).map(quiz => (
                  <div key={quiz.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{quiz.subject} • {quiz.questions.length} questions • {quiz.timeLimit} min</p>
                    <Button 
                      onClick={() => navigate(`/take-quiz/${quiz.id}`)}
                      className="w-full bg-college-primary hover:bg-college-primary/90"
                      size="sm"
                    >
                      Start Quiz
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No quizzes available right now.</p>
              )}
              
              {availableQuizzes.length > 0 && (
                <Button 
                  onClick={() => navigate('/available-quizzes')}
                  variant="outline"
                  className="w-full mt-4 border-college-primary text-college-primary hover:bg-college-primary/10"
                >
                  View All Available Quizzes
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Your latest quiz scores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentAttempts.length > 0 ? (
                studentAttempts.slice(0, 3).map(attempt => (
                  <div key={attempt.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium">
                      {quizzes.find(q => q.id === attempt.quizId)?.title || 'Unknown Quiz'}
                    </h3>
                    <p className="text-sm text-gray-500">{attempt.subject}</p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm">Score: {attempt.score}/{attempt.maxScore}</p>
                      <p className="font-medium">
                        {Math.round((attempt.score / attempt.maxScore) * 100)}%
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">You haven't completed any quizzes yet.</p>
              )}
              
              {studentAttempts.length > 0 && (
                <Button 
                  onClick={() => navigate('/student-results')}
                  variant="outline"
                  className="w-full mt-4 border-college-primary text-college-primary hover:bg-college-primary/10"
                >
                  View All Results
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
