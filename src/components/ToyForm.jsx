import React, { useRef, useState } from "react";

function ToyForm({ onAddToy }) {
  const nameRef = useRef("")
  const imageRef = useRef("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    const newToyDetails = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      likes: 0,
    }

    fetch(`http://localhost:3001/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToyDetails)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        onAddToy(data)
        nameRef.current.value = ""
        imageRef.current.value = ""
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error adding toy:", error)
        setLoading(false)
      })
  }


  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          ref={imageRef}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>

      {loading && <h3>Adding new toy...</h3>}
    </div>
  );
}

export default ToyForm;