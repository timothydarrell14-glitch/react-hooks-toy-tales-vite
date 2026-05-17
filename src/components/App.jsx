import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyList, setToyList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/toys`)
      .then((response) => response.json())
      .then((data) => setToyList(data))
      .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToyList([...toyList, newToy]);
    setShowForm(false);
  }

  function handleDeleteToy(id) {
    setToyList(toyList.filter((toy) => toy.id !== id));
  }

  function handleUpdateLikes(id, newLikes) {
    setToyList(
      toyList.map((toy) => (toy.id === id ? { ...toy, likes: newLikes } : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toyList={toyList} onDeleteToy={handleDeleteToy} onUpdateLikes={handleUpdateLikes} />
    </>
  );
}

export default App;
