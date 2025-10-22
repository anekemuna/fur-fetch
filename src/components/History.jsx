import React from "react";

const History = ({ history, onSelectDog }) => {
  return (
    <div className="history card">
      <h3>📚 History</h3>
      <p className="history-description">Your recently viewed dogs</p>

      {history.length === 0 ? (
        <p className="empty-history">No dogs in history yet</p>
      ) : (
        <div className="history-items">
          {history.map((dog, index) => {
            const breed = dog.breeds && dog.breeds[0];
            return (
              <div
                key={dog.id || index}
                className="history-item"
                onClick={() => onSelectDog(dog)}
              >
                <img
                  src={dog.url}
                  alt={breed ? breed.name : "Dog"}
                  className="history-image"
                />
                <div className="history-info">
                  <span className="history-breed">
                    {breed ? breed.name : "Unknown Breed"}
                  </span>
                  <span className="history-date">#{index + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
