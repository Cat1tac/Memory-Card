import { useState, useEffect, cache } from "react";

export default function Randomize({score, setScore, bestScore, setBestScore, saved, setSaved}){
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    //Make into function so can call it in the next function
    useEffect(() => {
        let ignore = false;
        const dexNumSet = [];

        //Populate Set With unique dex numbers
        for(let i = 0; i < 10; i++){
            let dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            while (dexNumSet.includes(dexNum)){
                dexNum = Math.floor(Math.random() * (386 - 252) + 252);
            }
            dexNumSet.push(dexNum);
        }
        
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
    }, []);
        
    
    if (loading) return <p>Loading Images</p>
    if (error) return <p>{error}</p>

    function handleReset(e) {
        if(!saved.has(e.target.id)){
            setSaved(saved.add(e.target.id));
            setScore(score + 1);
        } else {
            setBestScore(bestScore >= score ? bestScore : score);
            setScore(score = 0);
            saved.clear();
            setSaved(saved);
            Randomize({score, setScore, bestScore, setBestScore, saved, setSaved})
        }
    }

    return (
        <div>
            {pokemon.map((pocketmon) => {
                return <img key={pocketmon.dex} src={pocketmon.link} id={pocketmon.dex} onClick={handleReset}/>
            })}
        </div>
    )
}

