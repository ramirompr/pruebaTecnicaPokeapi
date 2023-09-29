import { useContext, useState, useReducer, useEffect, createContext } from "react";
import axios from 'axios'

const PokemonStates = createContext();

const Context = ({children}) => {
    const [pokemon, setPokemon] = useState([])

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    useEffect(() => {
        axios(url)
          .then(res => {
            const pokemonPromises = res.data.results.map(pokemon => {
              return axios.get(pokemon.url).then(response => response.data);
            });
      
            // Espera a que todas las solicitudes se completen antes de actualizar el estado
            Promise.all(pokemonPromises)
              .then(pokemonData => {
                setPokemon(pokemonData);
                console.log(pokemonData);
              })
              .catch(error => console.error(error));
          })
          .catch(error => console.error(error));

      }, []);

    return(
        <PokemonStates.Provider value={{pokemon, setPokemon}}>
            {children}
        </PokemonStates.Provider>
    )
}

export default Context

export const usePokemonStates = () => useContext(PokemonStates)