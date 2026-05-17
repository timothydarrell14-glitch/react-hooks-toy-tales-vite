import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toyList, onDeleteToy, onUpdateLikes }) {
  return (
    <div id="toy-collection">
      {toyList.map((toy) => (
        <ToyCard
          id={toy.id}
          key={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          onDeleteToy={onDeleteToy}
          onUpdateLikes={onUpdateLikes}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
