import { useContext } from "react";
import { usePokemonStates } from "../Context/context";
import Card from './Card'
import '../Styles/Home.css'
const Home = () =>{
    const {pokemon} = usePokemonStates()

    
    return(
        <div>
            <h1 className="titulo">Pokemons</h1>
            <div className="cardContainer">
                {pokemon.map(pokemon=> (
                <Card pokemon={pokemon} key={pokemon.id}/>
                ))}
            </div>
        </div>
    )
}

export default Home