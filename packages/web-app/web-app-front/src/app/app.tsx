import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Spinner } from "../components/Spinner/Spinner";
const GlobalHeader = lazy(() => import("../components/GlobalHeader/GlobalHeader"));
const VideosPage = lazy(() => import("../pages/VideosPage/VideosPage"));
const VideoPage = lazy(() => import("../pages/Video/Video"));

const App: React.FC = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Suspense fallback={null}>
          <GlobalHeader />
        </Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
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
    </QueryClientProvider>
  );
};

export default App;
