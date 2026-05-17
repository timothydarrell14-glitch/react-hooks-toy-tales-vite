import React, {useRef, useEffect, useState}from "react";

function ToyForm({list}) {
  const nameRef = useRef("")
  const imageRef = useRef("")
  const [likeCount, setLikeCount] = useState(0)
  const [loading, setLoading] = useState(false)

  let newId = list.length + 1

  let newToyDetails = {
    id: newId,
    name: nameRef.current.value,
    image: imageRef.current.value,
    likes : likeCount,
  }

  function handleSubmit(event){
    event.preventDefault()
  }

  useEffect(()=> {
    setLoading(true)
    const addToy = async (newToyDetails) => {
      try {
        const response = await fetch(`http://localhost:3001/toys`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newToyDetails)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error adding user:", error);
    }
    }
    addToy(newToyDetails)
    setLoading(false)
  }, [])


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