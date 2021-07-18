import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "./utils/api/index";

function Home() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            // listDecks();
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                console.log(error, "Can`t do that..."); //Update the error message
            }
            return () => abortController.abort();
        }
        fetchData();
    }, []);

    async function handleDelete(deck) {
        const abortController = new AbortController();
        history.go("/"); //Set to 0?
        return await deleteDeck(deck.id, abortController.signal); //check if signal needed
    }

    return (
        <div className="container">
            <Link className="btn btn-secondary mb-2" to="decks/new">
                + Creacte Deck
            </Link>
            <div className="card-deck">
                {decks.map((deck) => {
                    console.log(`${deck.name}`);
                    return (
                        <div>
                            <article className="card" key={deck.id}>
                                <div className="card-body">
                                    <div classsName="card-title">
                                        {deck.name}
                                    </div>
                                    <div className="card-subtitle">
                                        {deck.cards.length} cards
                                    </div>
                                    <div className="card-text">
                                        {deck.description}
                                    </div>
                                    <Link
                                        className="btn btn-secondary mx-1"
                                        to={`/decks/${deck.id}`}
                                    >
                                        View
                                    </Link>
                                    <Link
                                        className="btn btn-primary"
                                        to={`/decks/${deck.id}/study`}
                                    >
                                        Study
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => handleDelete(deck)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        </div>
                    ); //TODO: HOW TO REPLACE THE WORD "DELETE" WITH A BIN?
                })}
            </div>
        </div>
    );
}

export default Home;
