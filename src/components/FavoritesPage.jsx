import React, { useContext } from 'react';
import PhotoContext from '../context/PhotoContext';
import './FavoritesPage.css'; // Import custom CSS file for styling

const FavoritesPage = () => {
  const { favorites, removeFromFavorites } = useContext(PhotoContext);

  const handleRemoveFromFavorites = (photo) => {
    removeFromFavorites(photo);
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added.</p>
      ) : (
        <div className="favorites-grid"> {/* Use a container for the grid layout */}
          {favorites.map((photo) => (
            <div key={photo.id} className="favorite-card"> {/* Apply styles to the card */}
              <img
                src={photo.image}
                alt={photo.description}
                className="favorite-image" {/* Apply styles to the image */}
              />
              <div className="favorite-details"> {/* Add a container for the details */}
                <p className="favorite-description">{photo.description}</p>
                <button onClick={() => handleRemoveFromFavorites(photo)}>
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
