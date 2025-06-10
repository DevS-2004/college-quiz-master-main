
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const StudentNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Available Quizzes', path: '/available-quizzes' },
    { label: 'My Results', path: '/student-results' },
  ];
  
  return (
    <nav className="bg-college-light p-4 rounded-md shadow mb-6">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            onClick={() => navigate(item.path)}
            className={cn(
              "text-college-primary",
              location.pathname === item.path && "bg-college-primary/10"
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default StudentNavigation;
