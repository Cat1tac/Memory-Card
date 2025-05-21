import useFetchedData from "./fetchData";
import "../styles/pokemonList.css"

export default function Randomize({score, setScore, bestScore, setBestScore, saved, setSaved}){
    const {pokemon, error, loading} = useFetchedData(score);
           
    if (loading) return <p>Loading Images</p>
    if (error) return <p>{error}</p>

    function handleReset(e) {
        //Increases score, resets pokemon on screen, 
        // and adds clicked pokemon to a set of all clicked pokemon in current game
        if(!saved.has(e.target.id)){
            setSaved(saved.add(e.target.id));
            setScore(score + 1);
        } else {
            //Increses best score, clears score and clears all pokemon in saved pokemon
            setBestScore(bestScore >= score ? bestScore : score);
            setScore(score = 0);
            saved.clear();
            setSaved(saved);
        }
    }

    return (
        <div className="pokemonDiv">
            {pokemon.map((pocketmon) => {
                return <img key={pocketmon.dex} src={pocketmon.link} id={pocketmon.dex} onClick={handleReset}/>
            })}
        </div>
    )
}

