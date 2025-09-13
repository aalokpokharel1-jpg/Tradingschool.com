import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PersonalProgressDashboard from './pages/personal-progress-dashboard';
import TradingSimulatorPlatform from './pages/trading-simulator-platform';
import MarketAnalysisLab from './pages/market-analysis-lab-real-time-education';
import HomepageTradingEducationPlatform from './pages/homepage-trading-education-platform';
import CourseLibraryInteractiveLearning from './pages/course-library-interactive-learning';
import CommunityHubSocialLearning from './pages/community-hub-social-learning';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CommunityHubSocialLearning />} />
        <Route path="/personal-progress-dashboard" element={<PersonalProgressDashboard />} />
        <Route path="/trading-simulator-platform" element={<TradingSimulatorPlatform />} />
        <Route path="/market-analysis-lab-real-time-education" element={<MarketAnalysisLab />} />
        <Route path="/homepage-trading-education-platform" element={<HomepageTradingEducationPlatform />} />
        <Route path="/course-library-interactive-learning" element={<CourseLibraryInteractiveLearning />} />
        <Route path="/community-hub-social-learning" element={<CommunityHubSocialLearning />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
