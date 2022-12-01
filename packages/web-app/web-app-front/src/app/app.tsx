import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Spinner } from "../components/Spinner/Spinner";
const Header = lazy(() => import("../components/Header/Header"));
const VideosPage = lazy(() => import("../pages/VideosPage/VideosPage"));
const VideoPage = lazy(() => import("../pages/VideoPage/VideoPage"));

const App: React.FC = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Suspense fallback={null}>
          <Header />
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
