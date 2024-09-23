import hfModel, { user } from "../model/hugging-face-model.mjs";
import cohereModel from "../model/cohere-model.mjs";
const NUMHINTS = 1

flashcardMessageHistory = [];
hintsRemaining = NUMHINTS;
model = cohereModel


function sendAnswer(question, modelAnswer, userAnswer) {
    // if (hintsRemaining >= 1) {
        const newMessage = formatMessage(question, modelAnswer, userAnswer)
        // flashcardMessageHistory.push(formatMessage(question, modelAnswer, userAnswer));
        return (model===hfModel ? hfModel.sendMessage(flashcardMessageHistory.concat([newMessage])) : cohereModel.sendMessage(flashcardMessageHistory, newMessage.message))
        .then(response => {
                flashcardMessageHistory.push(newMessage)
                console.log(response);
                prefix = "Hint: "
                if (response.includes(prefix)) {
                    if (hintsRemaining === 0) {
                        flashcardMessageHistory = []
                        hintsRemaining = NUMHINTS
                        return {responseType: "next", response: "Ah not quite quacko.. Let's take a look at the answer to see what you're missing!"}
                    } else {
                        hintsRemaining -= 1;
                        flashcardMessageHistory.push(formatResponse(response));
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
    return (model === hfModel) ?
    {
        role: hfModel.user,
        content: 
        `{
            Question: ${question},
            Model Answer: ${modelAnswer},
            My Answer: ${userAnswer}
        }   ${hfModel.repeatedInstr}`   
    } 
    :
    {
        role: cohereModel.user,
        message:
        `{
            Question: ${question},
            Model Answer: ${modelAnswer},
            My Answer: ${userAnswer}
        }   ${cohereModel.repeatedInstr}`   
    }
}

function formatResponse(response) {
    return (model === hfModel) ?
    {role: model.bot, content: response} :
    {role: model.bot, message: response}
}

export {sendAnswer};