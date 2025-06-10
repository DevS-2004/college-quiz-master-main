
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FacultyNavigation from '@/components/FacultyNavigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const FacultyQuizzes = () => {
  const { currentUser } = useAuth();
  const { quizzes, updateQuiz, deleteQuiz } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!currentUser || currentUser.role !== 'faculty') {
    navigate('/login');
    return null;
  }
  
  const facultyQuizzes = quizzes.filter(quiz => quiz.facultyId === currentUser.id);
  
  const handleToggleActive = (quizId: string, currentStatus: boolean) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      const updatedQuiz = { ...quiz, isActive: !currentStatus };
      updateQuiz(updatedQuiz);
      
      toast({
        title: updatedQuiz.isActive ? "Quiz Activated" : "Quiz Deactivated",
        description: `${quiz.title} has been ${updatedQuiz.isActive ? 'activated' : 'deactivated'}.`,
      });
    }
  };
  
  const handleDeleteQuiz = (quizId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteQuiz(quizId);
      
      toast({
        title: "Quiz Deleted",
        description: `${title} has been deleted.`,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">My Quizzes</h1>
        
        <FacultyNavigation />
        
        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => navigate('/create-quiz')}
            className="bg-college-primary hover:bg-college-primary/90"
          >
            Create New Quiz
          </Button>
        </div>
        
        {facultyQuizzes.length > 0 ? (
          <div className="space-y-4">
            {facultyQuizzes.map(quiz => (
              <Card key={quiz.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">{quiz.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {quiz.subject} • {quiz.questions.length} questions • {quiz.timeLimit} minutes
                    </p>
                    <p className="text-sm">{quiz.description}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 md:self-start">
                    <Button 
                      onClick={() => handleToggleActive(quiz.id, quiz.isActive)} 
                      variant={quiz.isActive ? "outline" : "default"}
                      className={quiz.isActive 
                        ? "border-college-primary text-college-primary hover:bg-college-primary/10" 
                        : "bg-college-primary hover:bg-college-primary/90"}
                    >
                      {quiz.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button 
                      onClick={() => handleDeleteQuiz(quiz.id, quiz.title)} 
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Quizzes Created Yet</h3>
            <p className="text-gray-500 mb-6">Create your first quiz to get started</p>
            <Button 
              onClick={() => navigate('/create-quiz')}
              className="bg-college-primary hover:bg-college-primary/90"
            >
              Create New Quiz
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FacultyQuizzes;
