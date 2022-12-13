import { useSelector } from "react-redux";
const Display = () => {

    const filteredGames = useSelector(state => {return state});
    
    const titlesToBeRendered = filteredGames.map(game => {
        return <h2>{game.title}</h2>
    })

    return (
        <>
            {titlesToBeRendered}
        </>
    )
}

export default Display;