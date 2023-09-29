import '../Styles/Card.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({ pokemon }) => {
  const [speciesInfo, setSpeciesInfo] = useState(null);

  useEffect(() => {
    axios.get(pokemon.species.url)
      .then(response => {
        const habitat = response.data.habitat.name;
        const color = response.data.color.name;
        
        setSpeciesInfo({ habitat, color });
      })
      .catch(error => {
        console.error(error);
      });
  }, [pokemon.species.url]); 

  return (
    <div className="container">
      <h3 className="data">Name: {pokemon.name}</h3>
      <img className="image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h4 className="data">Height: {pokemon.height}</h4>
      <h4 className="data">Weight: {pokemon.weight}</h4>
      {speciesInfo && (
          <h4 className="data">Habitat: {speciesInfo.habitat}</h4>  
      )}
      <h3 className="data">Stats:</h3>
      <ul className="listContainer">
        {pokemon.stats.map((stat, index) => (
          <li className="data" key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <Link to={`/detail/${pokemon.id}`} className="detailButton">
        Details
      </Link>
    </div>
  );
};

export default Card;