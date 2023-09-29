import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { usePokemonStates } from "../Context/context";
import '../Styles/Details.css'

const Detail = () => {
  const { id } = useParams(); // Obtiene el parámetro de la URL (el ID del Pokémon)
  const { pokemon } = usePokemonStates();
  const [evolutionInfo, setEvolutionInfo] = useState(null);

  // Busca el Pokémon con el ID correspondiente
  const selectedPokemon = pokemon.find(p => p.id === Number(id));

  useEffect(() => {
    if (!selectedPokemon) {
      return;
    }

    // Obtener la URL de la especie del Pokémon
    const speciesURL = selectedPokemon.species.url;

    // Hacer una solicitud para obtener la URL de la cadena de evolución
    axios.get(speciesURL)
      .then(response => {
        const evolutionChainURL = response.data.evolution_chain.url;

        // Hacer una solicitud para obtener los detalles de la evolución
        axios.get(evolutionChainURL)
          .then(evolutionResponse => {
            setEvolutionInfo(evolutionResponse.data);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedPokemon]);

  if (!selectedPokemon) {
    return <div>Pokémon no encontrado.</div>;
  }

  return (
    <div className="detailsContainer">
      <h3 className="detailsData">Name: {selectedPokemon.name}</h3>
      <img className="detailsImage" src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
      <h4 className="detailsData">Height: {selectedPokemon.height}</h4>
      <h4 className="detailsData">Weight: {selectedPokemon.weight}</h4>
      <h4>Base Experience: {selectedPokemon.base_experience}</h4>
      <h3 className="detailsData">Stats:</h3>
      <ul className="listContainer">
        {selectedPokemon.stats.map((stat, index) => (
          <li className="detailsData" key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul className="listContainer">
        {selectedPokemon.abilities.map((ability, index) => (
          <li className="detailsData" key={index}>
            {ability.ability.name}
          </li>
        ))}
      </ul>
      <h3>Types</h3>
      <ul className="listContainer">
        {selectedPokemon.types.map((type, index) => (
          <li className="detailsData" key={index}>
            {type.type.name}
          </li>
        ))}
      </ul>
      {evolutionInfo && (
        <div className="evolutionInfo">
          <h3 className="detailsData">Evolves From: {evolutionInfo?.chain?.species?.name}</h3>
          {/* Puedes mostrar más detalles de evolución si es necesario */}
        </div>
      )}
      <Link to="/" className="backButton">
        Back to Pokemons
      </Link>
    </div>
  );
};

export default Detail;