import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "./utils/api/index";

function Home() {
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await listDecks(abortController.signal);
                setDecks(response);
            } catch (error) {
                console.log(error, "Error");
            }
            return () => abortController.abort();
        }
        fetchData();
    }, []);

    async function handleDelete(deck) {
        if (
            window.confirm(
                `Delete this deck?  
                
You will not be able to recover it.`
            )
        ) {
            const abortController = new AbortController();
            history.go("/");
            return await deleteDeck(deck.id, abortController.signal); //check if signal needed
        }
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
                            <article className="card m-1" key={deck.id}>
                                <div className="card-body">
                                    <div classsName="card-title">
                                        {deck.name}
                                    </div>
                                    <div className="card-subtitle mb-2 text-muted">
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
                                        className="btn btn-primary mx-1"
                                        to={`/decks/${deck.id}/study`}
                                    >
                                        Study
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-1"
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
