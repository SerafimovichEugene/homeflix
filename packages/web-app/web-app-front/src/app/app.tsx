import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomSpinner } from '../components/Spinner/Spinner';
import { VideosPageProvider } from '../pages/VideosPage/VidesPageContext/VideosPageProvider';

const Header = lazy(() => import('../components/Header/Header'));
const VideosPage = lazy(() => import('../pages/VideosPage/VideosPage'));
const VideoPage = lazy(() => import('../pages/VideoPage/VideoPage'));

const App: React.FC = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <VideosPageProvider>
        <Router>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<CustomSpinner />}>
                  <VideosPage />
                </Suspense>
              }
            />
            <Route
              path="/:id"
              element={
                <Suspense fallback={null}>
                  <VideoPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </VideosPageProvider>
    </QueryClientProvider>
  );
};

export default App;
