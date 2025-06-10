
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import StudentNavigation from '@/components/StudentNavigation';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

const StudentResults = () => {
  const { currentUser } = useAuth();
  const { quizzes, attempts } = useQuiz();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'student') {
    return null;
  }
  
  const studentAttempts = attempts.filter(attempt => attempt.studentId === currentUser.id);
  
  // Get unique subjects from attempts
  const subjects = Array.from(new Set(studentAttempts.map(attempt => attempt.subject)));
  
  // Filter attempts by selected subject
  const filteredAttempts = selectedSubject === 'all'
    ? studentAttempts
    : studentAttempts.filter(attempt => attempt.subject === selectedSubject);
  
  // Sort by completion date (newest first)
  const sortedAttempts = [...filteredAttempts].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">My Results</h1>
        
        <StudentNavigation />
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium">Quiz Performance</h2>
            <p className="text-gray-500">
              View and filter your quiz results
            </p>
          </div>
          
          <div className="w-full md:w-64">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {sortedAttempts.length > 0 ? (
          <div className="space-y-4">
            {sortedAttempts.map(attempt => {
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
                          {attempt.subject} • Completed on {new Date(attempt.completedAt).toLocaleDateString()}
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
              {selectedSubject === 'all'
                ? "You haven't completed any quizzes yet."
                : `You haven't completed any quizzes in ${selectedSubject}.`}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentResults;
