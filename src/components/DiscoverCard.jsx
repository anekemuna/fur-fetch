import React, { useState } from "react";

const DiscoverCard = ({
  dog,
  loading,
  onDiscover,
  onAddToBanList,
}) => {
  const [imageLoading, setImageLoading] = useState(true);

  if (loading) {
    return (
      <div className="discover-card card">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Fetching a furry friend...</p>
        </div>
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="discover-card card">
        <p>No dog data available</p>
        <button className="btn" onClick={onDiscover}>
          🔄 Try Again
        </button>
      </div>
    );
  }

  const breed = dog.breeds && dog.breeds[0];

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleAddToBanList = (attribute) => {
    onAddToBanList(attribute);
    onDiscover(); // Get a new dog after banning
  };

  return (
    <div className="discover-card card">
      <div className="dog-image-container">
        {imageLoading && (
          <div className="image-loading">
            <div className="spinner"></div>
          </div>
        )}
        <img
          src={dog.url}
          alt="Random dog"
          className="dog-image"
          onLoad={handleImageLoad}
          style={{ display: imageLoading ? "none" : "block" }}
        />
      </div>

      {breed && (
        <div className="dog-info">
          <h2 className="breed-name">{breed.name}</h2>

          <div className="dog-details">
            {breed.breed_group && (
              <div className="detail-item">
                <strong>Group:</strong>
                <span
                  className="clickable-attribute"
                  onClick={() => handleAddToBanList(breed.breed_group)}
                >
                  {breed.breed_group}
                </span>
              </div>
            )}

            {breed.life_span && (
              <div className="detail-item">
                <strong>Life Span:</strong> {breed.life_span}
              </div>
            )}

            {breed.temperament && (
              <div className="detail-item">
                <strong>Temperament:</strong>
                <div className="temperament-tags">
                  {breed.temperament.split(", ").map((trait, index) => (
                    <span
                      key={index}
                      className="temperament-tag clickable-attribute"
                      onClick={() => handleAddToBanList(trait)}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {breed.origin && (
              <div className="detail-item">
                <strong>Origin:</strong> {breed.origin}
              </div>
            )}

            <div className="physical-traits">
              {breed.height && (
                <div className="trait">
                  <strong>Height:</strong> {breed.height.metric} cm
                </div>
              )}
              {breed.weight && (
                <div className="trait">
                  <strong>Weight:</strong> {breed.weight.metric} kg
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="card-actions">
    
        <button className="btn" onClick={onDiscover}>
          🔀 Discover New Dog
        </button>
      </div>
    </div>
  );
};

export default DiscoverCard;
