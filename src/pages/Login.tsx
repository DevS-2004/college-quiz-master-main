
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      // Redirect based on user role
      if (email === 'faculty@example.com') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/student-dashboard');
      }
      
      toast({
        title: "Success",
        description: "You have been logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
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
            College Quiz Master
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-college-primary hover:bg-college-primary/90" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm mb-2">
            Demo credentials:
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm w-full">
            <div className="border rounded p-2">
              <p><strong>Faculty:</strong></p>
              <p>faculty@example.com</p>
              <p>password</p>
            </div>
            <div className="border rounded p-2">
              <p><strong>Student:</strong></p>
              <p>student@example.com</p>
              <p>password</p>
            </div>
          </div>
          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a 
              onClick={() => navigate('/register')}
              className="text-college-accent font-medium hover:underline cursor-pointer"
            >
              Register
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
