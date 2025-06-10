
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FacultyNavigation from '@/components/FacultyNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FacultyDashboard = () => {
  const { currentUser } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'faculty') {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'faculty') {
    return null;
  }
  
  const facultyQuizzes = quizzes.filter(quiz => quiz.facultyId === currentUser.id);
  const totalAttempts = attempts.filter(attempt => 
    facultyQuizzes.some(quiz => quiz.id === attempt.quizId)
  ).length;
  
  const avgScore = attempts.length > 0
    ? attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.maxScore) * 100, 0) / attempts.length
    : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">Faculty Dashboard</h1>
        
        <FacultyNavigation />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Quizzes</CardTitle>
              <CardDescription>Your created quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{facultyQuizzes.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quiz Attempts</CardTitle>
              <CardDescription>Total student submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{totalAttempts}</p>
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
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Your latest created quizzes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {facultyQuizzes.length > 0 ? (
                facultyQuizzes.slice(0, 3).map(quiz => (
                  <div key={quiz.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <p className="text-sm text-gray-500">{quiz.subject} • {quiz.questions.length} questions</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No quizzes created yet.</p>
              )}
              
              <Button 
                onClick={() => navigate('/create-quiz')}
                className="w-full mt-4 bg-college-primary hover:bg-college-primary/90"
              >
                Create New Quiz
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common faculty tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button 
                  onClick={() => navigate('/create-quiz')}
                  className="w-full bg-college-primary hover:bg-college-primary/90"
                >
                  Create New Quiz
                </Button>
                <Button 
                  onClick={() => navigate('/faculty-quizzes')}
                  variant="outline"
                  className="w-full border-college-primary text-college-primary hover:bg-college-primary/10"
                >
                  View My Quizzes
                </Button>
                <Button 
                  onClick={() => navigate('/faculty-results')}
                  variant="outline"
                  className="w-full border-college-primary text-college-primary hover:bg-college-primary/10"
                >
                  Check Student Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
