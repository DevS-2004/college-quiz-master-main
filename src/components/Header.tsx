
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-college-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">
            <a href="/">College Quiz Master</a>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline">
                {currentUser.name} ({currentUser.role})
              </span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="bg-transparent border-white text-white hover:bg-white hover:text-college-primary"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="bg-transparent border-white text-white hover:bg-white hover:text-college-primary"
              >
                Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/register')}
                className="bg-transparent border-white text-white hover:bg-white hover:text-college-primary"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
