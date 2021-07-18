import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "./utils/api/index";

function Deck() {
    const history = useHistory();
    const { deckId } = useParams();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                setCards(response.cards);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    async function handleEditCard(card) {
        history.push(`/decks/${deckId}/cards/${card.id}/edit`);
    }

    async function handleDeleteCard(card) {
        if (
            window.confirm(
                `Delete this card? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.go("/");
                return await deleteCard(card.id, abortController.signal);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    async function handleDeleteDeck(deck) {
        if (
            window.confirm(
                `Delete this deck? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                history.push("/");
                return await deleteDeck(deck.id, abortController.signal);
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    // if (cards.length > 0) {
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">{deck.name}</li>
            </ol>
            <div>
                <div className="mb-3">
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>
                    <button
                        onClick={() => handleEditDeck()}
                        className="btn btn-secondary mr-1"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleStudy()}
                        className="btn btn-primary mx-1"
                    >
                        Study
                    </button>
                    <button
                        onClick={() => handleAddCard()}
                        className="btn btn-primary mx-1"
                    >
                        Add Cards
                    </button>
                    <button
                        onClick={() => handleDeleteDeck(deck)}
                        className="btn btn-danger mx-1"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <h2>Cards</h2>
            {cards.map((card) => {
                return (
                    <div className="card-deck mb-2" key={card.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col">{card.front}</div>
                                    <div className="col">{card.back}</div>
                                </div>
                                <div className="container row">
                                    <button
                                        onClick={() => handleEditCard(card)}
                                        className="btn btn-secondary mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCard(card)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Deck;

//Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ullam, omnis sapiente amet unde corrupti, cumque possimus quae eius eligendi quasi consectetur nisi, harum temporibus iusto? Labore et at illum.
