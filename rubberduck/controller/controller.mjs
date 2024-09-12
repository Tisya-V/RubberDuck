import {sendMessage} from "../model/model.mjs";
import {repeatedInstr} from "../model/model.mjs";

const NUMHINTS = 1

flashcardMessageHistory = [];
hintsRemaining = NUMHINTS;


function sendAnswer(question, modelAnswer, userAnswer) {
    // if (hintsRemaining >= 1) {
        
        flashcardMessageHistory.push(formatMessage(question, modelAnswer, userAnswer));
        return sendMessage(flashcardMessageHistory)
            .then(response => {
                console.log(response);
                prefix = "Hint: "
                if (response.includes(prefix)) {
                    if (hintsRemaining === 0) {
                        flashcardMessageHistory = []
                        hintsRemaining = NUMHINTS
                        return {responseType: "next", response: "Ah not quite quacko.. Let's take a look at the answer to see what you're missing!"}
                    } else {
                        hintsRemaining -= 1;
                        flashcardMessageHistory.push({role: "assistant", content: response});
                        return {responseType: "hint", response: `Hint ${NUMHINTS - hintsRemaining}/${NUMHINTS}:   ` + response.slice(prefix.length)}
                    }
                } else {
                    flashcardMessageHistory = []
                    hintsRemaining = NUMHINTS
                    return {responseType: "next", response: "Quack quack! Nicely done! Let's move on to the next flashcard!"};
                }
            })
            .catch(error => console.error(error));

    // } 
    // else {
    //     flashcardMessageHistory = []
    //     hintsRemaining = NUMHINTS
    //     return Promise.resolve({ responseType: "next", response: "Quack quack! Let's take a look at the answer!" });
    // }
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