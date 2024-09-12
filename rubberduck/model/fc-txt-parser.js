const fs = require('fs');

async function parseFlashcards(file) {

    const contents = await file.text();
    flashcards = contents.split('Question:').map((flashcard) => {
        if (flashcard === '') return;
        [q, a] = flashcard.split('Answer:')
        q = q.trim();
        a = a.trim();
        return {question: q, answer: a};
    });
    return flashcards.filter(f => f); // filter out undefined
}

export { parseFlashcards };