import { useContext } from 'react';
import PhotoContext from '../context/PhotoContext';

const PhotoCard = ({ data }) => {
  const { setPhotosData, photosData } = useContext(PhotoContext);

  console.log(photosData, 'Data');
  const handleAddFav = () => {
    const photosListAfterFav = photosData.map((photoObject) => {
      if (photoObject.id === data.id) {
        photoObject.isFavorite = !photoObject.isFavorite;
      }
      return photoObject;
    });
    setPhotosData(photosListAfterFav);
  };

  return (
    <div
      style={{
        background: data.isFavorite ? `red` : `#fff`,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        padding: '2px',
      }}
    >
      <img width={200} src={data.image} />
      <p>{data.description}</p>
      <button onClick={handleAddFav}>
        {data.isFavorite ? `Remove From Fav` : `Add to Fav`}
      </button>
    </div>
  );
};

export default PhotoCard;
