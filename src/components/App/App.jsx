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

// class App extends Component {
//   state = {
//     query: '',
//   };
//   handleFormSubmit = query => {
//     this.setState({ query });
//   };

//   render() {
//     return (
//       <main>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery query={this.state.query} />
//       </main>
//     );
//   }
// }

// export default App;
