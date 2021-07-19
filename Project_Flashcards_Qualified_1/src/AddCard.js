import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "./utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();

    const setup = {
        front: "",
        back: "",
    };

    const [newCard, setNewCard] = useState(setup);
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId]);

    function handleChange({ target }) {
        setNewCard({
            ...newCard,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await createCard(
            deckId,
            { ...newCard },
            abortController.signal
        );
        history.go("/");
        setNewCard(setup);
        return response;
    }

    async function handleDone() {
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
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
            <form onSubmit={handleSubmit}>
                <h2>{deck.name}: Add Card</h2>
                <div className="form-group">
                    <label>Front</label>
                    <textarea
                        id="front"
                        name="front"
                        className="form-control"
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Front side of card"
                        value={newCard.front}
                    />
                </div>
                <div className="form-group">
                    <label>Back</label>
                    <textarea
                        id="back"
                        name="back"
                        className="form-control"
                        onChange={handleChange}
                        type="textarea"
                        placeholder="Back side of card"
                        value={newCard.back}
                    />
                </div>
                <button
                    className="btn btn-secondary mr-2"
                    onClick={() => handleDone()}
                >
                    Done
                </button>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddCard;
