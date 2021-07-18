import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api/index";

function EditDeck() {
    const history = useHistory();
    const { deckId } = useParams();

    const DeckSetup = {
        id: "",
        name: "",
        description: "",
    };
    const [deck, setDeck] = useState(DeckSetup);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Error", error); //change
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateDeck({ ...deck }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
    }

    function handleChange({ target }) {
        setDeck({
            ...deck,
            [target.name]: target.value,
        });
    }

    async function handleCancel() {
        history.push(`/decks/${deckId}`);
    }

    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item">Edit Deck</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h1>Edit Deck</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        type="text"
                        value={deck.name}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        type="textarea"
                        value={deck.description}
                    />
                </div>
                <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleCancel()}
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

export default EditDeck;
