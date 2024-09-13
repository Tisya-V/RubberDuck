var deck = [{question: '', answer:''}]
var deckCopy = [{question: '', answer:''}]  
var deckName = ''

function getDeck() {
  return {deckName: deckName, deckCards: deck}
}

function setNewDeck(newDeckName, newDeck) {
    console.log("Setting new deck", newDeck)
  deckName = newDeckName
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