import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchFilters, setSearchFilters] = useState({
    province: '',
    district: '',
    category: 'all',
    priceRange: { min: 0, max: 10000000 },
    sizeRange: { min: 0, max: 200 }
  });

  const [isSearchActive, setIsSearchActive] = useState(false);

  const updateSearchFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
    setIsSearchActive(true);
  };

  const clearSearch = () => {
    setSearchFilters({
      province: '',
      district: '',
      category: 'all',
      priceRange: { min: 0, max: 10000000 },
      sizeRange: { min: 0, max: 200 }
    });
    setIsSearchActive(false);
  };

  const value = {
    searchFilters,
    updateSearchFilters,
    clearSearch,
    isSearchActive
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
