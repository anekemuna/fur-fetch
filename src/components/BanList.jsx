import React from "react";

const BanList = ({ bannedAttributes, onRemoveFromBanList }) => {
  return (
    <div className="ban-list card">
      <h3>🚫 Ban List</h3>
      <p className="ban-list-description">
        Select an attribute in your listing to ban it.
      </p>

      {bannedAttributes.length === 0 ? (
        <p className="empty-ban-list">No banned attributes yet</p>
      ) : (
        <div className="banned-items">
          {bannedAttributes.map((attribute, index) => (
            <div key={index} className="banned-item">
              <span className="banned-text">{attribute}</span>
              <button
                className="remove-btn"
                onClick={() => onRemoveFromBanList(attribute)}
                title="Remove from ban list"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {bannedAttributes.length > 0 && (
        <button
          className="btn btn-small btn-danger"
          onClick={() =>
            bannedAttributes.forEach((attr) => onRemoveFromBanList(attr))
          }
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default BanList;
