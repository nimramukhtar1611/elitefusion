// src/App.jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// PAGES
import Home from "./pages/Home";
import GameDevelopment from "./pages/GameDevelopment";
import Engineering from "./pages/engineering";
import ArtProduction from "./pages/artproduction";
import OurServices from "./pages/OurServices";
import Portfolio from './pages/Portfolio';
import AboutCompany from './pages/AboutCompany';
import OurWork from './pages/OurWork';
import Careers from './components/Career';
import GameJames from './pages/GameJames';
import UploadGames from './components/UploadGames';
import ContactForm from './components/Contact';
import GithubLoginButton from './pages/GithubLoginButton';
import Register from './pages/Register.jsx'
import Login from './pages/Login';
import BrowseGames from './pages/BrowseGames';
// (optional) if you added details page:
import GameDetails from './pages/GameDetails.jsx';
import FeedPage from './pages/FeedPage.jsx';
import CreatorDashboard from './pages/CreatorDashboard.jsx';

// COMPONENTS
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx';
import DevLogs from './pages/DevLogs.jsx';
import DevLogDetail from './pages/DevLogDetail.jsx';
import DevlogCreate from './pages/DevLogCreate.jsx';
import Jodas from './pages/Jodas.jsx';
import RegisterForm from './components/Auth/SignUp.jsx';

function Layout() {
  return <Outlet />;
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route element={<Layout />}>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/game-development" element={<GameDevelopment />} />
                    <Route path="/judasDetail" element={<Jodas />} />

          <Route path="/engineering" element={<Engineering />} />

          <Route path="/artproduction" element={<ArtProduction />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about-us" element={<AboutCompany />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/feed-page" element={<FeedPage />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />

          {/* public */}
          {/* Devlogs list (search, filters, tags, pagination). */}
          <Route path="/devlogs" element={<DevLogs />} />   
           {/*Devlog detail page (SEO-friendly slug).  */}
          <Route path="/devlog/:slug" element={<DevLogDetail />} />


          {/* Developer */}
          {/* New Devlog form (only for approved developers). */}
          <Route path="/devlog/new" element={<DevlogCreate />} />
          {/* My Devlogs (Draft | Pending | Published, edit/delete, resubmit). */}
          <Route path="/dashboard/devlogs" element={<DevLogs />} />


          {/* Admin */}
          {/* Moderation queue (Pending → Publish/Reject). */}
          <Route path="/admin/devlogs" element={<DevLogs />} />
          {/* Developer approvals. */}
          <Route path="/admin/developers" element={<DevLogs />} />
          {/* View user profile + NDA flag + activity. */}
          <Route path="/admin/users/:id" element={<DevLogs />} />


          {/* Game Jam Routes */}
          <Route path="/game-james" element={<GameJames />} />
          <Route path="/browse" element={<BrowseGames />} />
         
          <Route path="/games/:slug" element={<GameDetails />} />

          {/* Protected Upload Route */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadGames />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signupgithub" element={<GithubLoginButton />} />
          <Route path="/signup" element={<Register />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}
