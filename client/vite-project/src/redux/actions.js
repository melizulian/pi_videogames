export const setVideogames = (videogames) => ({
    type: 'SET_VIDEOGAMES',
    payload: videogames,
});

export const setFilteredVideogames = (filteredVideogames) => ({
    type: 'SET_FILTERED_VIDEOGAMES',
    payload: filteredVideogames,
  });
  
  export const setFilter = (filterOptions) => ({
    type: 'SET_FILTER',
    payload: filterOptions,
  });
  
export const setSort = (sort) => ({
    type: 'SET_SORT',
    payload: sort,
  });

  export const resetFilter = () => ({
    type: 'RESET_FILTER',
  });