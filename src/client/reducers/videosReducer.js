const initialState = {
  videos: [],
};

const videosReducer = (state = initialState, action) => {
  const {
    type,
    totalVideos,
    totalPages,
    videos,
    size,
    pageNumber,
  } = action;
  switch (type) {
    case 'GOT_VIDEOS': {
      return Object.assign(
        {},
        state,
        {
          videos, totalVideos, totalPages, size, pageNumber,
        },
      );
    }
    default:
      return state;
  }
};

export default videosReducer;
