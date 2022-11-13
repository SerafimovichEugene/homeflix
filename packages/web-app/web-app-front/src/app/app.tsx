import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Videos from "../pages/Videos/Videos";
import Video from "../pages/Video/Video";

const App: React.FC = () => {
  return(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Videos />} />
            <Route path="/:id" element={<Video />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
};

export default App;
