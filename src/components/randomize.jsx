import { useState, useEffect } from "react";

export default function Randomize(){
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const dexNumSet = new Set([]);

        //Populate Set With unique dex numbers
        for(let i = 0; i < 10; i++){
            let dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            while (dexNumSet.has(dexNum)){
                dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            }
            dexNumSet.add(dexNum);
        }

        for(const dexNum of dexNumSet){
            fetch(`https://pokeapi.co/api/v2/pokemon/${dexNum}`, {mode: "cors"})
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("server error");
                }
                return response.json();
            }) //add conditional that changes pokemon if the link does not work
            .then((response) => setPokemon(pokemon => [...pokemon, {dex: dexNum, link:response.sprites.versions["generation-v"]["black-white"].animated.front_default}]))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
        }
    }, []);
        
    if (loading) return <p>Loading Images</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            {pokemon.map((pocketmon) => {
                return <img key={pocketmon.dex} src={pocketmon.link} onClick={Reset}/>
            })}
        </div>
    )
}

function Reset() {
    
}