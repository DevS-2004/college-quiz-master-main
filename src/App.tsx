
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FacultyDashboard from "./pages/FacultyDashboard";
import CreateQuiz from "./pages/CreateQuiz";
import FacultyQuizzes from "./pages/FacultyQuizzes";
import FacultyResults from "./pages/FacultyResults";
import StudentDashboard from "./pages/StudentDashboard";
import AvailableQuizzes from "./pages/AvailableQuizzes";
import TakeQuiz from "./pages/TakeQuiz";
import StudentResults from "./pages/StudentResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <QuizProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Faculty Routes */}
              <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/faculty-quizzes" element={<FacultyQuizzes />} />
              <Route path="/faculty-results" element={<FacultyResults />} />
              
              {/* Student Routes */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/available-quizzes" element={<AvailableQuizzes />} />
              <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
              <Route path="/student-results" element={<StudentResults />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QuizProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
