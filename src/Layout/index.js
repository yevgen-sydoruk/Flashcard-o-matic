import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Study from "../Study";
import CreateDeck from "../CreateDeck";
import Deck from "../Deck";
import EditDeck from "../EditDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study></Study>
          </Route>
          <Route path="/decks/new">
            <CreateDeck></CreateDeck>
          </Route>
          <Route exact path="/decks/:deckId" /*exact?*/>
            <Deck></Deck>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck></EditDeck>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard></AddCard>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard></EditCard>
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
