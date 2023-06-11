import React, { useContext } from 'react';
import PhotoContext from '../context/PhotoContext';

const PhotoCard = ({ data }) => {
  const { addToFavorites, removeFromFavorites } = useContext(PhotoContext);

  const handleAddFav = () => {
    if (data.isFavorite) {
      removeFromFavorites(data);
    } else {
      addToFavorites(data);
    }
  };

  return (
    <div>
      <img width={200} src={data.image} alt={data.description} />
      <p>{data.description}</p>
      <button onClick={handleAddFav}>
        {data.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default PhotoCard;
