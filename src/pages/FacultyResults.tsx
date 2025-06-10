
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FacultyNavigation from '@/components/FacultyNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const FacultyResults = () => {
  const { currentUser } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();
  const [selectedQuiz, setSelectedQuiz] = useState<string>('all');
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'faculty') {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'faculty') {
    return null;
  }
  
  // Get quizzes created by this faculty
  const facultyQuizzes = quizzes.filter(quiz => quiz.facultyId === currentUser.id);
  
  // Get attempts for faculty's quizzes
  const quizAttempts = attempts.filter(attempt => 
    facultyQuizzes.some(quiz => quiz.id === attempt.quizId)
  );
  
  // Filter attempts by selected quiz
  const filteredAttempts = selectedQuiz === 'all'
    ? quizAttempts
    : quizAttempts.filter(attempt => attempt.quizId === selectedQuiz);
  
  // Calculate statistics
  const totalAttempts = filteredAttempts.length;
  const avgScore = filteredAttempts.length > 0
    ? filteredAttempts.reduce((sum, attempt) => sum + (attempt.score / attempt.maxScore) * 100, 0) / filteredAttempts.length
    : 0;
  
  const passingRate = filteredAttempts.length > 0
    ? (filteredAttempts.filter(attempt => (attempt.score / attempt.maxScore) >= 0.5).length / filteredAttempts.length) * 100
    : 0;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">Student Results</h1>
        
        <FacultyNavigation />
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium">Performance Analysis</h2>
            <p className="text-gray-500">
              Review how students performed on your quizzes
            </p>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={selectedQuiz} onValueChange={setSelectedQuiz}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by quiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quizzes</SelectItem>
                {facultyQuizzes.map(quiz => (
                  <SelectItem key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Attempts</CardTitle>
              <CardDescription>Number of quiz submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{totalAttempts}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
              <CardDescription>Across all attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{avgScore.toFixed(1)}%</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Passing Rate</CardTitle>
              <CardDescription>Students scoring 50% or higher</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-college-primary">{passingRate.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>
        
        <h3 className="text-xl font-medium mb-4">Individual Results</h3>
        
        {filteredAttempts.length > 0 ? (
          <div className="space-y-4">
            {filteredAttempts.map(attempt => {
              const quiz = quizzes.find(q => q.id === attempt.quizId);
              const scorePercentage = Math.round((attempt.score / attempt.maxScore) * 100);
              
              return (
                <Card key={attempt.id} className="p-6">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {quiz?.title || 'Unknown Quiz'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Student ID: {attempt.studentId} • Completed on {new Date(attempt.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          Score: {attempt.score}/{attempt.maxScore}
                        </p>
                        <p className={`text-sm font-medium ${
                          scorePercentage >= 70 ? 'text-green-600' :
                          scorePercentage >= 50 ? 'text-amber-500' : 'text-red-500'
                        }`}>
                          {scorePercentage}%
                        </p>
                      </div>
                    </div>
                    
                    <Progress 
                      value={scorePercentage} 
                      className={`h-2 ${
                        scorePercentage >= 70 ? 'bg-green-100' :
                        scorePercentage >= 50 ? 'bg-amber-100' : 'bg-red-100'
                      }`}
                      indicatorClassName={`${
                        scorePercentage >= 70 ? 'bg-green-500' :
                        scorePercentage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Results Found</h3>
            <p className="text-gray-500">
              {selectedQuiz === 'all'
                ? "No students have attempted your quizzes yet."
                : "No students have attempted this quiz yet."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FacultyResults;
