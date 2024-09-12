var deck = [{question: '', answer:''}]
var deckCopy = [{question: '', answer:''}]  

function getDeck() {
  return deck
}

function setNewDeck(newDeck) {
    console.log("Setting new deck", newDeck)
  deck = newDeck
  deckCopy = [...newDeck]
}

function getNextCard() {
    if (deck.length === 0) {
        return null
    }
    card = deck.pop()
    console.log(card)
    return card
}

function resetDeck() {
  deck = deckCopy
}

// function shuffleDeck() {
    // TODO: 
// }

export { getDeck, setNewDeck, getNextCard, resetDeck }