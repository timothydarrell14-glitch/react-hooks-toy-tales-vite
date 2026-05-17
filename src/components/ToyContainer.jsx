import React, {useEffect, useState} from "react";
import ToyCard from "./ToyCard";

function ToyContainer() {

  const [toyList, setToyList] = useState([])

useEffect(() => {
  const getData = async () => {
    try{
      let response = await fetch(`http://localhost:3001/toys`)

      if(!response.ok){
        throw new Error ("Network error")
      }
      let data = await response.json()
      
      setToyList(data)

    }catch(error){
      console.error("Error getting toys", error)
    }
  }
  getData()
}, [])

  return (
    <div id="toy-collection">
      {toyList.map((toy, index) => (
        <ToyCard id={toy.id} key={index} name={toy.name} image={toy.image} likes={toy.likes}/>
      ))}
    </div>
  );
}

export default ToyContainer;
