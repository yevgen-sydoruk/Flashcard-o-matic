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
        //THE SUBMIT BUTTON SHOULD LEAD TO DECK SCREEN, NOT HOME DONE
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createDeck(
            { ...newDeck },
            abortController.signal
        );
        // console.log("here", response.id);
        history.push(`/decks/${response.id}`);
        // history.push("/");
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
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Deck Name"
                        value={newDeck.name}
                        onChange={handleChange}
                        className="form-control"
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        type="textarea"
                        placeholder="Brief description of the deck"
                        value={newDeck.description}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>
                <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleCancelButton()}
                >
                    Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateDeck;
