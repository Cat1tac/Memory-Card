import { useState, useEffect, cache } from "react";

export default function useFetchedData(score){
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //Make into function so can call it in the handleReset function
    useEffect(() => {
        //ignore prevents duplication in devlopment, resets pokemon array
        // creates array for list of random pokedex numbers
        // lone score variable allow for component to get remounted
        let ignore = false;
        setPokemon([]);
        const dexNumSet = [];
        score;

        //Populates Set With unique dex numbers
        for(let i = 0; i < 10; i++){
            let dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            while (dexNumSet.includes(dexNum)){
                dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            }
            dexNumSet.push(dexNum);
        }
        
        //Makes call from pokeApi and gets the gif
        for(let i = 0; i < dexNumSet.length; i++){
            cache(fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumSet[i]}`, {mode: "cors"})
            .then((response) => {
                if (response.status >= 400) {
                   throw new Error
                }
                return response.json();
            }) 
            .then((response) => {
               if(!ignore){
                    setPokemon(pokemon => [...pokemon, {dex: dexNumSet[i], link:response.sprites.versions["generation-v"]["black-white"].animated.front_default}]) 
                }
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false)))
        }

        return () => {
            ignore = true;
        }
    }, [score]);

    return {pokemon, error, loading}
}