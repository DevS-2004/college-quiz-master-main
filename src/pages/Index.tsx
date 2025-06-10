
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Index = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'faculty') {
        navigate('/faculty-dashboard');
      } else if (currentUser.role === 'student') {
        navigate('/student-dashboard');
      }
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="bg-college-primary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">College Quiz Master</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              The ultimate platform for educational assessments and testing.
              Secure quiz-taking for students and easy quiz creation for faculty.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/register')}
                size="lg"
                className="bg-college-secondary text-college-primary hover:bg-college-secondary/90 font-bold"
              >
                Register Now
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-college-primary"
              >
                Login
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-college-primary">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-college-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-college-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-college-primary">Secure Testing</h3>
              <p className="text-gray-600">
                Our platform prevents tab switching and ensures academic integrity during assessments.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-college-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-college-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-college-primary">Subject-Based Quizzes</h3>
              <p className="text-gray-600">
                Organize quizzes by subject and department for better educational management.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-college-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-college-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-college-primary">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track student performance with comprehensive reporting and analysis tools.
              </p>
            </div>
          </div>
        </section>
        
        {/* For Faculty & Students Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-college-primary">For Faculty & Students</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4 text-college-primary">For Faculty</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Create custom quizzes with multiple-choice questions</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Activate or deactivate quizzes as needed</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Review student performance and results</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Set time limits for quiz completion</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-4 text-college-primary">For Students</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Access quizzes for your enrolled courses</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Take quizzes in a secure, focused environment</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Track your performance across different subjects</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-500 mr-2 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>View detailed results after quiz completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-college-primary">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our platform today and transform the way you create and take assessments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-college-primary hover:bg-college-primary/90"
            >
              Register Now
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              size="lg"
              variant="outline"
              className="border-college-primary text-college-primary hover:bg-college-primary/10"
            >
              Login
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-college-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} College Quiz Master. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
