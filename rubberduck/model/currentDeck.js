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
    card = deck.shift()
    deck.push(card)
    return card
}

function resetDeck() {
  temp = [...deckCopy]
  deck = deckCopy
  deckCopy = [...temp]
}

// function shuffleDeck() {
    // TODO: 
// }

export { getDeck, setNewDeck, getNextCard, resetDeck }