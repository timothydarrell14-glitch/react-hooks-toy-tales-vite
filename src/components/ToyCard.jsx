import React, { useState } from "react";

function ToyCard({ id, name, image, likes, onDeleteToy, onUpdateLikes }) {
  const [likeCount, setLikeCount] = useState(likes);

  function handleClick() {
    const updatedLikes = likeCount + 1;
    setLikeCount(updatedLikes);
    onUpdateLikes(id, updatedLikes);

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update likes");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
        setLikeCount(likeCount);
        onUpdateLikes(id, likeCount);
      });
  }

  function handleDonate() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete toy");
        }
        onDeleteToy(id);
      })
      .catch((error) => {
        console.error("Error deleting toy:", error);
      });
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likeCount} Likes </p>
      <button onClick={handleClick} className="like-btn">Like {"<3"}</button>
      <button onClick={handleDonate} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
