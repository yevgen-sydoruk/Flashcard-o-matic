import React, { useState, useEffect } from "react";
import { createCard, readDeck } from "./utils/api/index";
import { Link, useHistory, useParams } from "react-router-dom";
import Form from "./Form";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const isNewCard = true;

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
    const response = await createCard(deckId, { ...newCard }, abortController.signal);
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
      <Form
        isNewCard={isNewCard}
        deck={deck}
        handleSubmitClick={handleSubmit}
        handleChange={handleChange}
        newCard={newCard}
        handleShow={handleDone}
      ></Form>
    </div>
  );
}

export default AddCard;
