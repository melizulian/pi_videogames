// import style from './Search.module.css';
// import { useState } from 'react';
// import PropTypes from 'prop-types';

// const SearchBar = ({ onSearch, onFilter, onSort }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOptions, setFilterOptions] = useState({
//     origin: 'all',
//     genre: 'all',
//   });
//   const [sort, setSort] = useState('none');

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleKeyPress = () => {
//     const trimmedSearchTerm = searchTerm.trim();

//     if (trimmedSearchTerm !== '') {
//       console.log('Nombre codificado:', encodeURIComponent(trimmedSearchTerm));
//       onSearch(trimmedSearchTerm);
//     }
//   };

//   const handleFilterChange = (optionType, event) => {
//     const newFilterOptions = {
//       ...filterOptions,
//       [optionType]: event.target.value,
//     };
//     setFilterOptions(newFilterOptions);
//     onFilter(newFilterOptions);
//   };

//   const handleSortChange = (event) => {
//     setSort(event.target.value);
//     onSort(event.target.value);
//   };

//   return (
//     <div className={style.searchContainer}>
//       <input
//         className={style.input}
//         type="text"
//         placeholder="Buscar..."
//         value={searchTerm}
//         onChange={handleInputChange}
//       />
//       <button className={style.btn} onClick={handleKeyPress}>
//         Buscar
//       </button>
//       <select className={style.option} value={filterOptions.origin} onChange={(e) => handleFilterChange('origin', e)}>
//         <option value="all">Todos</option>
//         <option value="api">API</option>
//         <option value="db">Base de datos</option>
//       </select>
//       <select className={style.option} value={filterOptions.genre} onChange={(e) => handleFilterChange('genre', e)}>
//         {/* Aquí deberías mapear tus géneros desde la base de datos */}
//         <option value="all">Todos los géneros</option>
//         {/* Opciones de género aquí */}
//       </select>
//       <select className={style.option} value={sort} onChange={handleSortChange}>
//         <option value="none">Ordenar por</option>
//         <option value="asc">Ascendente</option>
//         <option value="desc">Descendente</option>
//         <option value="rating">Rating</option>
//       </select>
//     </div>
//   );
// };

// SearchBar.propTypes = {
//   onSearch: PropTypes.func.isRequired,
//   onFilter: PropTypes.func.isRequired,
//   onSort: PropTypes.func.isRequired,
// };

// export default SearchBar;

import style from './Search.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, onFilter, onSort, genres }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    origin: 'all',
    genre: 'all',
  });
  const [sort, setSort] = useState('none');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm !== '') {
      console.log('Nombre codificado:', encodeURIComponent(trimmedSearchTerm));
      onSearch(trimmedSearchTerm);
    }
  };

  const handleFilterChange = (optionType, event) => {
    const newFilterOptions = {
      ...filterOptions,
      [optionType]: event.target.value,
    };
    setFilterOptions(newFilterOptions);

    if (optionType === 'genre') {
      onFilter(event.target.value);
    }
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    onSort(event.target.value);
  };

  return (
    <div className={style.searchContainer}>
      <input
        className={style.input}
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className={style.btn} onClick={handleKeyPress}>
        Buscar
      </button>
      <select className={style.option} value={filterOptions.origin} onChange={(e) => handleFilterChange('origin', e)}>
        <option value="all">Todos</option>
        <option value="api">API</option>
        <option value="db">Base de datos</option>
      </select>
      <select
  className={style.option}
  value={filterOptions.genre}
  onChange={(e) => handleFilterChange('genre', e)}
>
  <option value="all">Todos los géneros</option>
  {genres && genres.map((genre) => (
    <option key={genre.id} value={genre.name}>
      {genre.name}
    </option>
  ))}
</select>

      <select className={style.option} value={sort} onChange={handleSortChange}>
        <option value="none">Ordenar por</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
};

export default SearchBar;