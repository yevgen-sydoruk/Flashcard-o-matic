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
          return (
            <div key={deck.id}>
              <article className="card m-1" key={deck.id}>
                <div className="card-body">
                  <div className="card-title mb-2">{deck.name}</div>
                  <div className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</div>
                  <div className="card-text mb-2">{deck.description}</div>
                  <Link className="btn btn-secondary mr-2" to={`/decks/${deck.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-primary mr-2" to={`/decks/${deck.id}/study`}>
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
