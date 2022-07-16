import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from "../pages/Home/Home";
import Videos from "../pages/Videos/Videos";
import Video from "../pages/Videos/Video/Video";

interface Props {
  message: string;
}

const HomeIndex = () => (<div>Hello</div>);

const App: React.FC<Props> = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeIndex />} />
          <Route path="videos" element={<Videos />} />
          <Route path="videos/:id" element={<Video />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
