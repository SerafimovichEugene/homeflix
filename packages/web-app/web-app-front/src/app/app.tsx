import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from "../pages/Home/Home";
import Videos from "../pages/Videos/Videos";
import Video from "../pages/Video/Video";

const HomeIndex = () => (<div>Hello</div>);

const App: React.FC = () => {
  return(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeIndex />} />
            <Route path="videos" element={<Videos />} />
            <Route path="videos/:id" element={<Video />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
};

export default App;
