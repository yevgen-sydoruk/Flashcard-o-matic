import React, { useState, useEffect } from "react";
import { readCard, readDeck, updateCard } from "./utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";
import Form from "./Form";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const isNewCard = false;

    const deckSetup = {
        id: "",
        name: "",
        description: "",
    };
    const cardSetup = {
        id: "",
        front: "",
        back: "",
        deckId: "",
    };

    const [card, setCard] = useState(deckSetup);
    const [deck, setDeck] = useState(cardSetup);

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                const cardResponse = await readCard(
                    cardId,
                    abortController.signal
                );
                setCard(cardResponse);
                setDeck(deckResponse);
            } catch (error) {
                console.error("Error", error);
            }
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, [deckId, cardId]);

    function handleChange({ target }) {
        setCard({
            ...card,
            [target.name]: target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await updateCard({ ...card }, abortController.signal);
        history.push(`/decks/${deckId}`);
        return response;
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
                <li className="breadcrumb-item active">Edit Card {cardId}</li>
            </ol>
            <Form isNewCard={isNewCard} deck={deck} handleSubmitClick={handleSubmit} handleChange={handleChange} newCard={card} handleShow={handleCancel}></Form>
        </div>
    );
}

export default EditCard;
