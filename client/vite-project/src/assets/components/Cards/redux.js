import { setFilter, setSort } from '../../../redux/actions';

export const mapStateToProps = state => ({
    videogames: state.videogames,
    filteredVideogames: state.setFilteredVideogamesfilteredVideogames,
  });
  
  export const mapDispatchToProps = dispatch => ({
    onFilter: filterOptions => dispatch(setFilter(filterOptions)),
    onSort: sort => dispatch(setSort(sort)),
  });

 