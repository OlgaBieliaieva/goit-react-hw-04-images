import { useState } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

export default function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <main>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} />
    </main>
  );
}
