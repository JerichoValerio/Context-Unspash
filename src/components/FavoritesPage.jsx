import React, { useContext } from 'react';
import PhotoContext from '../context/PhotoContext';
import PhotoCard from './PhotoCard';

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(PhotoContext);

  const handleRemoveFromFavorites = (photo) => {
    removeFromFavorites(photo);
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((data) => (
          <div key={data.id}>
            <PhotoCard data={data} />
            <button onClick={() => handleRemoveFromFavorites(data)}>Remove from Favorites</button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
