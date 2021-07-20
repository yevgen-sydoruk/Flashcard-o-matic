function Form({isNewCard,deck,handleSubmitClick, handleChange, newCard, handleShow }) {

    return (
        <form onSubmit={handleSubmitClick}>
                {isNewCard ? 
                <h2>{deck.name}: Add Card</h2> : <h2>Edit Card</h2>}
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
                    onClick={() => handleShow()}
                >
                    {isNewCard ? "Done" : "Cancel"}
                </button>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
    )
}

export default Form;