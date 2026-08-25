import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home/Home';
import Game from '@/pages/Game/Game';
import LeaderboardPage from '@/pages/Leaderboard/LeaderboardPage';
import About from '@/pages/About/About';
import Team from '@/pages/Team/Team';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}