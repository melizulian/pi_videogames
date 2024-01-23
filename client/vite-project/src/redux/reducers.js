
const initialState = {
  videogames: [],
  filteredVideogames: [],
  filter: {
    origin: 'all',
    genre: 'all',
  },
  sort: 'asc',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload,
      };
    case 'SET_FILTERED_VIDEOGAMES':
      return {
        ...state,
        filteredVideogames: action.payload,
      };
      case 'SET_FILTER':
        console.log('Setting filter:', action.payload);
        return {
          ...state,
          filter: {
            ...state.filter,
            genre: action.payload,
          },
        };
    case 'SET_SORT':
        return {
          ...state,
          sort: action.payload,
        };
        case 'RESET_FILTER':
          return {
            ...state,
            filter: initialState.filter,
          };
    default:
      return state;
  }
};

export default rootReducer;