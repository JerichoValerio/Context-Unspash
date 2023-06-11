import { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PhotoContext from './context/PhotoContext';
import PhotoList from './components/PhotoList';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const CLIENT_SECRET = `h-wHyPBeHzum1NAUJ2Ce8IEIQX_0IrJ-aGKBOmrLAfQ`;
  const [photosData, setPhotosData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesPage, setIsFavoritesPage] = useState(false);

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
        isFavorite: favorites.some((favorite) => favorite.id === data.id),
        id: data.id,
      };
    });
    setPhotosData(requiredData);
  };

  const addToFavorites = (photo) => {
    const updatedFavorites = [...favorites, photo];
    setFavorites(updatedFavorites);

    const updatedPhotosData = photosData.map((data) => {
      if (data.id === photo.id) {
        return { ...data, isFavorite: true };
      }
      return data;
    });
    setPhotosData(updatedPhotosData);
  };

  const removeFromFavorites = (photo) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== photo.id);
    setFavorites(updatedFavorites);

    const updatedPhotosData = photosData.map((data) => {
      if (data.id === photo.id) {
        return { ...data, isFavorite: false };
      }
      return data;
    });
    setPhotosData(updatedPhotosData);
  };

  const handleViewFavorites = () => {
    setIsFavoritesPage(true);
  };

  const handleViewAllPhotos = () => {
    setIsFavoritesPage(false);
  };

  return (
    <PhotoContext.Provider
      value={{
        photosData,
        favorites,
        setPhotosData,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={PhotoList} />
          <Route exact path="/favorites" component={FavoritesPage} />
        </Switch>
      </div>
    </PhotoContext.Provider>
  );
}

export default App;
