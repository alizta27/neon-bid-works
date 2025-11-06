import { useState } from 'react';
import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  return (
    <div className="max-w-md mx-auto p-4">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="mt-4 p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium">Pencarian: {searchQuery || '(kosong)'}</p>
        <p className="text-sm font-medium">Kategori: {selectedCategory}</p>
      </div>
    </div>
  );
}
