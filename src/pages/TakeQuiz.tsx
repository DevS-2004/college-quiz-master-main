
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { lockScreen, unlockScreen, hasExceededWarnings } from '@/utils/screenLock';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TakeQuiz = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { currentUser } = useAuth();
  const { quizzes, addQuizAttempt } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  const quiz = quizzes.find(q => q.id === quizId);
  
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/login');
      return;
    }
    
    if (!quiz) {
      toast({
        title: "Error",
        description: "Quiz not found",
        variant: "destructive",
      });
      navigate('/available-quizzes');
      return;
    }
    
    // Initialize selected answers array
    if (quiz && selectedAnswers.length === 0) {
      setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    }
    
    // Set time limit
    if (quiz && !quizStarted && !quizSubmitted) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [currentUser, quiz, navigate, quizStarted, quizSubmitted]);
  
  // Timer effect
  useEffect(() => {
    let timerId: number;
    
    if (quizStarted && !quizSubmitted && timeLeft > 0) {
      timerId = window.setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timeLeft, quizStarted, quizSubmitted]);
  
  // Screen lock effect
  useEffect(() => {
    if (quizStarted && !quizSubmitted) {
      lockScreen();
    } else {
      unlockScreen();
    }
    
    return () => {
      unlockScreen();
    };
  }, [quizStarted, quizSubmitted]);
  
  // Check for tab switching warnings
  useEffect(() => {
    const checkWarnings = setInterval(() => {
      if (hasExceededWarnings()) {
        handleSubmitQuiz();
        clearInterval(checkWarnings);
      }
    }, 1000);
    
    return () => clearInterval(checkWarnings);
  }, [quizStarted]);
  
  const startQuiz = () => {
    setQuizStarted(true);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    if (!quiz || !currentUser) return;
    
    unlockScreen();
    setQuizSubmitted(true);
    
    // Calculate score
    let score = 0;
    let maxScore = 0;
    
    quiz.questions.forEach((question, index) => {
      maxScore += question.points;
      if (selectedAnswers[index] === question.correctAnswer) {
        score += question.points;
      }
    });
    
    // Create attempt record
    const attempt = {
      id: `attempt_${Date.now()}`,
      quizId: quiz.id,
      studentId: currentUser.id,
      answers: selectedAnswers,
      score,
      maxScore,
      completedAt: new Date(),
      subject: quiz.subject
    };
    
    addQuizAttempt(attempt);
    
    toast({
      title: "Quiz Submitted",
      description: "Your answers have been recorded",
    });
    
    // Redirect to results
    navigate('/student-results');
  };
  
  if (!quiz) {
    return <div>Loading...</div>;
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  
  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-lg">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-4 text-center text-college-primary">{quiz.title}</h1>
            <p className="mb-6 text-center">{quiz.description}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subject:</span>
                <span className="font-medium">{quiz.subject}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-medium">{quiz.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Time Limit:</span>
                <span className="font-medium">{quiz.timeLimit} minutes</span>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h3 className="font-medium text-yellow-800">Important Instructions:</h3>
              <ul className="ml-4 mt-1 text-sm text-yellow-700 list-disc">
                <li>This quiz will be timed. Once started, you must complete it within the time limit.</li>
                <li>Do not leave or refresh the page during the quiz.</li>
                <li>Switching tabs or windows will trigger warnings.</li>
                <li>After 3 warnings, your quiz will be automatically submitted.</li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={() => navigate('/available-quizzes')}
                variant="outline"
              >
                Cancel
              </Button>
              <Button 
                onClick={startQuiz}
                className="bg-college-primary hover:bg-college-primary/90"
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="sticky top-0 bg-white p-4 rounded-md shadow mb-6 z-10">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl text-college-primary">{quiz.title}</h1>
            <div className="text-right">
              <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse-slow' : ''}`}>
                Time Left: {formatTime(timeLeft)}
              </div>
              <div className="text-sm">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 p-0 ${
                  selectedAnswers[index] !== -1
                    ? 'bg-green-100 hover:bg-green-200 border-green-500'
                    : ''
                } ${currentQuestionIndex === index ? 'ring-2 ring-college-primary' : ''}`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium mb-4">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </h2>
            
            <div className="space-y-2">
              {currentQuestion.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-4 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    selectedAnswers[currentQuestionIndex] === optionIndex
                      ? 'border-college-primary bg-college-primary/10'
                      : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, optionIndex)}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedAnswers[currentQuestionIndex] === optionIndex
                        ? 'border-college-primary'
                        : ''
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === optionIndex && (
                        <div className="w-3 h-3 rounded-full bg-college-primary"></div>
                      )}
                    </div>
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button
              onClick={handleNextQuestion}
              className="bg-college-primary hover:bg-college-primary/90"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => setConfirmSubmit(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </div>
      
      <Dialog open={confirmSubmit} onOpenChange={setConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Quiz</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your quiz? You cannot change your answers once submitted.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              <strong>Questions answered:</strong> {selectedAnswers.filter(a => a !== -1).length} of {quiz.questions.length}
            </p>
            {selectedAnswers.filter(a => a === -1).length > 0 && (
              <p className="text-yellow-600 mt-2">
                Warning: You have {selectedAnswers.filter(a => a === -1).length} unanswered questions.
              </p>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmSubmit(false)}>
              Continue Quiz
            </Button>
            <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
              Submit Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TakeQuiz;
