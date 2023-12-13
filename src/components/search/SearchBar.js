import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";

// prop sent by parent
const SearchBar = ({ onSearchBarChange }) => {
  const [searchBar, setSearchBar] = useState(null);

  // retrieve data that the user will enter in <AsyncPaginate/>
  const handleOnChange = (searchData) => {
    // set the new state as the data thats been entered by user
    setSearchBar(searchData);
    // pass the data we got from input
    onSearchBarChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              // will be used to get the data to be set as new state
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      placeholder="Search for a city"
      debounceTimeout={600}
      value={searchBar}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default SearchBar;
