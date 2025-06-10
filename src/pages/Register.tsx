
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'faculty' | 'student'>('student');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock departments and subjects
  const departments = [
    'Computer Science', 
    'Mathematics', 
    'Physics', 
    'Chemistry', 
    'Biology'
  ];
  
  const subjects = [
    'Web Development',
    'Database Systems',
    'Algorithm Design',
    'Machine Learning',
    'Software Engineering'
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !department || (role === 'faculty' && !subject)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register({
        name,
        email,
        password,
        role,
        department,
        subject: role === 'faculty' ? subject : undefined
      });
      
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      
      // Redirect based on user role
      navigate(role === 'faculty' ? '/faculty-dashboard' : '/student-dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-college-primary">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to register
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as 'faculty' | 'student')}
                disabled={isSubmitting}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="faculty">Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <Select
                value={department}
                onValueChange={setDepartment}
                disabled={isSubmitting}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select your department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {role === 'faculty' && (
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Select
                  value={subject}
                  onValueChange={setSubject}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select your subject" />
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
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-college-primary hover:bg-college-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm w-full">
            Already have an account?{" "}
            <a 
              onClick={() => navigate('/login')}
              className="text-college-accent font-medium hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
