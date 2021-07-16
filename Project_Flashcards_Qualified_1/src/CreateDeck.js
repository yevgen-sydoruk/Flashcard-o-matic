import React, { useState } from "react";
import { createDeck } from "./utils/api/index";
import { useHistory, Link } from "react-router-dom";

function CreateDeck() {
    const history = useHistory();
    const deckSetup = {
        name: "",
        description: "",
    };
    const [newDeck, setNewDeck] = useState(deckSetup);

    async function handleSubmit(event) {
        // console.log(event.target);
        //THE SUBMIT BUTTON SHOULD LEAD TO DECK SCREEN, NOT HOME
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            { ...newDeck },
            abortController.signal
        );
        console.log(response.id);
        history.push("/");
        return response;
    }

    function handleChange({ target }) {
        setNewDeck({
            ...newDeck,
            [target.name]: target.value,
        });
    }

    function handleCancelButton() {
        history.push("/");
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">Create Deck</li>
            </ol>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create Deck</h1>
                <label for="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Deck Name"
                    value={newDeck.name}
                    onChange={handleChange}
                ></input>
                <label for="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    type="textarea"
                    placeholder="Brief description of the deck"
                    value={newDeck.description}
                    onChange={handleChange}
                ></textarea>
                <button onClick={() => handleCancelButton()}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
