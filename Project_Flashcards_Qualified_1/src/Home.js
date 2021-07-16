import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "./utils/api/index";

function Home() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    async function handleDelete(deck) {
        const abortController = new AbortController();
        history.go("/"); //Set to 0?
        return await deleteDeck(deck.id, abortController.signal); //check if signal needed
    }

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            listDecks();
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

    return (
        <div className="container">
            <Link to="decks/new">+ Creacte Deck</Link>
            <div className="card-deck">
                {decks.map((deck) => {
                    console.log(`${deck.name}`);
                    return (
                        <div>
                            <article cllassName="card" key={deck.id}>
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
                                    <Link className="btn">View</Link>
                                    <Link className="btn">Study</Link>
                                    <button
                                        className="btn"
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
