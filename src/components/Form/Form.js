import "./Form.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterGamesByTitle, filterGamesByPlatform } from "../../helpers/filterGames";
import {games} from "../../data/games";

const Form = () => {
    const [inputs, setInputs] = useState([
        {
            id: "title",
            value: "",
            label: "Title",
            filter: filterGamesByTitle
        },
        {
            id: "platforms",
            value: "",
            label: "Platform",
            filter: filterGamesByPlatform
        },
    ]);

    let dispatch = useDispatch();

    const onInputChanged = (event) => {
        let copy = [...inputs];
        copy.map(input => {
            if (input.id === event.target.id) {
                input.value = event.target.value;
            }
        });
        setInputs(copy);
    }

    const inputsToBeRendered = inputs.map(objectFromStateArray => {
        return (
        <div key={objectFromStateArray.id} className="form__wrapper">
            <label className="form__label" htmlFor={objectFromStateArray.id}>{objectFromStateArray.label}</label>
            <input className="form__input" onChange={onInputChanged} id={objectFromStateArray.id} type="text" value={objectFromStateArray.value} />
        </div>);
    })

    const submit = (event) => {
        event.preventDefault();
        let result = games;//[a,b,c,d]
        inputs.forEach( input => {
            //[a,b,c,d]=> [a,b] => [a]
            result = input.filter(input.value, result);
        });
        dispatch({
            type: "FILTEREDGAMES",
            payload: result
        })
    }

    return (
        <form className="form" onSubmit={submit}>
            <div className="form__inputsWrapper">
            {inputsToBeRendered}
            </div>         
            <button className="form__search" onClick={submit}>Zoeken</button>
        </form>
    )
}

export default Form;