import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useVideos } from '../../data/api/api';

export const Videos = () => {

  const [page] = useState(1);

  const { useVideosList } = useVideos();
  const { data, isLoading } = useVideosList({
    page,
    limit: 20,
  });

  return (
    <div>
      <h4>here should be a list:</h4>
      { isLoading && <h6>Loading...</h6> }
      { !isLoading && data && data.items.map(i => {
        return (
          <div>
            <Link to={i.id}>{i.name}</Link>
          </div>
        )
      }) }
    </div>
  );
}

export default Videos;
