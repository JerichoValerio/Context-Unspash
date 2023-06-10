import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PhotoContext from './context/PhotoContext';
import PhotoList from './components/PhotoList';

function App() {
  const CLIENT_SECRET = `h-wHyPBeHzum1NAUJ2Ce8IEIQX_0IrJ-aGKBOmrLAfQ`;
  const [photosData, setPhotosData] = useState([]);

  useEffect(() => {
    getPhotosFromSplash();
  }, []);

  const getPhotosFromSplash = async () => {
    const photoDataPromise = await fetch(
      `https://api.unsplash.com/photos/?client_id=${CLIENT_SECRET}`
    );
    const photoJsonData = await photoDataPromise.json();
    const requiredData = photoJsonData.map((data) => {
      return {
        image: data.urls.full,
        description: data.alt_description,
        isFavorite: false,
        id: data.id,
      };
    });
    setPhotosData(requiredData);
  };

  return (
    <PhotoContext.Provider
      value={{
        photosData,
        setPhotosData,
      }}
    >
      <PhotoList />
    </PhotoContext.Provider>
  );
}

export default App;
