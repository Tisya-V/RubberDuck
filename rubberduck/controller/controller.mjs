import {sendMessage} from "../model/model.mjs";
import {repeatedInstr} from "../model/model.mjs";

const NUMHINTS = 1

flashcardMessageHistory = [];
hintsRemaining = NUMHINTS;


function sendAnswer(question, modelAnswer, userAnswer) {
    if (hintsRemaining >= 1) {
        
        flashcardMessageHistory.push(formatMessage(question, modelAnswer, userAnswer));
        return sendMessage(flashcardMessageHistory)
            .then(response => {
                console.log(response);
                prefix = "Hint: "
                if (response.includes(prefix)) {
                    hintsRemaining -= 1;
                    flashcardMessageHistory.push(response);
                    return {responseType: "hint", response: response.slice(prefix.length)};
                } else {
                    prefix = "No Hint: "
                    flashcardMessageHistory = []
                    hintsRemaining = NUMHINTS
                    return {responseType: "next", response: "Quack quack! Nicely done! Let's move on to the next flashcard!"};
                }
            })
            .catch(error => console.error(error));

    } else {
        flashcardMessageHistory = []
        hintsRemaining = NUMHINTS
        return Promise.resolve({ responseType: "next", response: "Quack quack! Let's take a look at the answer!" });
    }
}

function formatMessage(question, modelAnswer, userAnswer) {
    return {
        role: "user",
        content: 
        `{
            Question: ${question},
            Model Answer: ${modelAnswer},
            My Answer: ${userAnswer}
        }   ${repeatedInstr}`   
    }
}

export {sendAnswer};