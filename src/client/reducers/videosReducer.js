const initialState = {
  videos: [],
};

const filterSubjectReducer = (state = initialState, action) => {
  const { videos } = action;
  switch (action.type) {
    case 'GOT_VIDEOS': {
      return Object.assign({}, state, { videos });
    }
    default:
      return state;
  }
};

export default filterSubjectReducer;
