
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/context/QuizContext';
import Header from '@/components/Header';
import FacultyNavigation from '@/components/FacultyNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Question } from '@/types';

const CreateQuiz = () => {
  const { currentUser } = useAuth();
  const { addQuiz } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    }
  ]);
  
  const subjects = [
    'Web Development',
    'Database Systems',
    'Algorithm Design',
    'Machine Learning',
    'Software Engineering'
  ];
  
  const [subject, setSubject] = useState(currentUser?.subject || subjects[0]);
  
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `${questions.length + 1}`,
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1
      }
    ]);
  };
  
  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };
  
  const handleQuestionChange = (index: number, field: string, value: string | number) => {
    const updatedQuestions = [...questions];
    
    if (field === 'text') {
      updatedQuestions[index].text = value as string;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value as number;
    } else if (field === 'points') {
      updatedQuestions[index].points = Number(value);
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', ''));
      updatedQuestions[index].options[optionIndex] = value as string;
    }
    
    setQuestions(updatedQuestions);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !subject) {
      toast({
        title: "Error",
        description: "Please fill in all quiz details",
        variant: "destructive",
      });
      return;
    }
    
    // Validate questions
    for (const question of questions) {
      if (!question.text.trim()) {
        toast({
          title: "Error",
          description: "All questions must have text",
          variant: "destructive",
        });
        return;
      }
      
      for (const option of question.options) {
        if (!option.trim()) {
          toast({
            title: "Error",
            description: "All options must be filled out",
            variant: "destructive",
          });
          return;
        }
      }
    }
    
    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to create a quiz",
        variant: "destructive",
      });
      return;
    }
    
    // Create quiz
    const newQuiz = {
      id: `quiz_${Date.now()}`,
      title,
      description,
      subject,
      department: currentUser.department,
      facultyId: currentUser.id,
      timeLimit,
      questions,
      createdAt: new Date(),
      isActive: true
    };
    
    addQuiz(newQuiz);
    
    toast({
      title: "Success",
      description: "Quiz created successfully",
    });
    
    navigate('/faculty-quizzes');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6 text-college-primary">Create New Quiz</h1>
        
        <FacultyNavigation />
        
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Fill in the basic information about your quiz</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Quiz Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Web Development Fundamentals"
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this quiz is about"
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subj => (
                        <SelectItem key={subj} value={subj}>
                          {subj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="time-limit" className="block text-sm font-medium mb-1">
                    Time Limit (minutes)
                  </label>
                  <Input
                    id="time-limit"
                    type="number"
                    min="1"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="text-xl font-bold mb-4">Questions</h2>
          
          {questions.map((question, questionIndex) => (
            <Card key={question.id} className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                  
                  {questions.length > 1 && (
                    <Button 
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor={`question-${questionIndex}`} className="block text-sm font-medium mb-1">
                    Question Text
                  </label>
                  <Input
                    id={`question-${questionIndex}`}
                    value={question.text}
                    onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                    placeholder="Enter your question here"
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium">Options:</p>
                  
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`q${questionIndex}-option${optionIndex}`}
                        name={`correct-answer-${questionIndex}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                        className="h-4 w-4 text-college-primary"
                      />
                      <Input
                        value={option}
                        onChange={(e) => handleQuestionChange(questionIndex, `option${optionIndex}`, e.target.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                
                <div>
                  <label htmlFor={`points-${questionIndex}`} className="block text-sm font-medium mb-1">
                    Points
                  </label>
                  <Input
                    id={`points-${questionIndex}`}
                    type="number"
                    min="1"
                    value={question.points}
                    onChange={(e) => handleQuestionChange(questionIndex, 'points', e.target.value)}
                    className="w-32"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between mb-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddQuestion}
              className="border-college-primary text-college-primary hover:bg-college-primary/10"
            >
              Add Another Question
            </Button>
            
            <Button 
              type="submit"
              className="bg-college-primary hover:bg-college-primary/90"
            >
              Create Quiz
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateQuiz;
