import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterGamesByTitle, filterGamesByPlatform } from "../../helpers/filterGames";

const Form = () => {
    const [inputs, setInputs] = useState([
        {
            id: "title",
            value: "",
            label: "TITLE",
            filter: filterGamesByTitle
        },
        {
            id: "platforms",
            value: "",
            label: "PLATFORM",
            filter: filterGamesByPlatform
        },
    ]);

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
        return (<div>
            <label htmlFor={objectFromStateArray.id}>{objectFromStateArray.label}</label>
            <input onChange={onInputChanged} id={objectFromStateArray.id} type="text" value={objectFromStateArray.value} />
        </div>);
    })

    const submit = (event) => {
        event.preventDefault();
        inputs.forEach(input => {
            console.log(input.filter(input.value));
        })
    }

    return (
        <form onSubmit={submit}>
            {inputsToBeRendered}
            <button onClick={submit}>Zoeken</button>
        </form>
    )
}

export default Form;