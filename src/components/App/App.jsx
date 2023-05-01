import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';

export default function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <main>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} />
    </main>
  );
}
