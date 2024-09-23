import { CohereClient } from "cohere-ai";


const cohere = new CohereClient({
  token: process.env.EXPO_PUBLIC_COHERE_API_KEY,
});

export const user = "USER"
export const system = "SYSTEM"
export const bot = "CHATBOT"


const repeatedInstr = `
    Does this answer contain the key points and details and keywords? If so then congratulate me and stop.
    Do not give me a hint if my answer is good enough and answers the provided question correctly and accurately.
    The model answer is a guide towards the needed info.
    I.e. if i have captured the essence of the answer, congratulate me then end your answer.
    Only if it is missing keywords and information then,
    What is a good, concise hint, worded in simple terms, that will guide my answer toward a the model answer WITHOUT giving the model answer away?
    Your hint should not give away the key terms and information, just guide me towards them.
    The 'Model Answer' is to be taken as the correct answer (even if you think it is wrong or missing info).
    Be concise.
    Preface the answer with "Hint: " so I know it is a hint, or "Success: " if you think my answer is good enough.
`

const messageHistory = [
  { 
    role: system, 
    message: `
      Take the role of a friend quizzing the user on their flashcards, one flashcard at a time.
      Never give away solutions. Give hints in the form of probing questions. Be concise, friendly.
    `
  },
  {
    role: user,
    message: `
      I am being tested on some flashcards. 
      For each answer I give, I will send you my answer, and the model correct answer from the flashcard.
      You must decide whether my answer includes all of the key information and keywords.
      If so, congratulate me.
      If not, give me a small hint guiding me towards the information I have missed or gotten incorrect.
      For example, the data I will send will be something like:

      {
        Question: "What is the CPU? What is the role of the CPU"
        Model Answer: "Central Processing Unit - processes data and instructions within the computer"
        My Answer: "processes instructions"
      } 

      What is a good, concise hint, worded in simple terms, that will guide my answer toward a the model answer WITHOUT giving the model answer away
      For example you might say "What does CPU stand for? What else does it process?"
      And then I might say
      "Oh right! Central Programming Unit for processing data and instructions"
      And you might say
      "Almost... not programming but..?"
      And then I might say
      "Oh Central Processing Unit!"
      And I have now gotten the full answer and you could just say "Well done you got it!"
      Keep things consise.
    `
  },
  {
    role : bot,
    message : "Understood! Let's get started!"
  },
  {
    role: user, 
    message: `
      {
        Question: "What is the ALU? What is the role of the ALU?"
        Model Answer: "Arithmetic Logic Unit - Performs arithmetic and logical operations such as additions and bit shifts"
        My Answer: "does mathsy stuff?"
      }  
        
      ${repeatedInstr}
    `
  },
  {
    role: bot, 
    message: `
       You're on the right track! The ALU does perform mathematical and logical operations, but it's important to be specific and use the correct terminology. Try saying "Arithmetic and Logic Unit - performs arithmetic and logical operations such as additions, subtractions, and bit shifts." Good job though! Keep it up!
    `
  },
  {
    role: user,
    message: "No you need to give me a HINT, or small clue, or guiding question, as to the information that is missing or wrong. For example, you could have said, 'what does ALU stand for? what kind of 'mathsy' operations might it be performing?"
  },
  {
    role: bot,
    message: "Understood"
  },
  { 
    role: user,
    message: `
      {
        Question: "How does cache size affect CPU performance?"
        Model Answer: "Cache is faster to access than RAM, so the larger cache is, the more items it can hold and fetch from. This means the slower RAM need only be accessed less frequently, speeding performance."
        My Answer: "Cache is faster than RAM"
      }

      ${repeatedInstr}
    `
  },

  {
    role: bot,
    message: "Consider focusing on how the cache's size impacts the frequency of accessing the slower RAM. A larger cache size means fewer trips to the slower RAM, leading to improved performance."
  },

  {
    role: user,
    message: "The first part is a good, well-worded hint. The second part gives away the answer. In future, structure your hints more like the first part."
  },
  {
    role: bot,
    message: "Understood, I will make sure to provide hints that guide the answer without giving away the exact answer. In this case, a hint could be: Consider how the cache size affects the frequency of accessing the slower RAM. A larger cache size can lead to improved performance in what way?"
  },

  {
    role: user,
    message: `Very good. Remember to keep it fairly short and consise.
    Next one:

    {
        Question: "How does number of cores affect CPU performance?"
        Model Answer: "Each core of the CPU is basically its own set of CU, ALU, registers etc, to process data independently of other cores. So the more cores you have, the more instructions you can execute simultaneously, making the program run faster."
        My Answer: "Each core of the CPU is its own set of Control Unit, ALU, registers etc, so it can process data independently of other cores. So the more cores you have, the more instructions you can execute simultaneously, so the faster the execution."
    }
      ${repeatedInstr}
    `
  },

  {
    role: bot,
    message: " Great job on your answer! You've captured the essence of the model answer. As a hint, you could consider focusing on how having more cores allows for the execution of more instructions at the same time, leading to faster processing."
  },

  {
    role: user,
    message: `
    {
        Question: "How does clock speed affect CPU performance?"
        Model Answer: "The higher the clock speed, the more FDE cycles are performed per second, so the more instructions are carried out per second."
        My Answer: "More Fetch-Decode-Execute cycles performed per second so more instructions completed in a given time frame"
    }
          ${repeatedInstr}
    `
  },
  {
    role: bot,
    message: `
      No Hint: You got it! Your answer is good enough. Well done!
    `
  }
];

const message =
`
    {
        Question: "What is the role of the accumulator"
        Model Answer: "Holds the immediate result of calculations performed by the ALU."
        My Answer: "Hold data"
    }
          ${repeatedInstr}
    `

const sendChatCompletionRequest = async (messageHistory, newMessage) => {    
    try {
        const response = await cohere.chat({
          preamble: `Take the role of a friend, with slightly duckish mannerisms (i.e. the occasional quack) quizzing the user on their flashcards, one flashcard at a time.
          Never give away solutions. Give hints in the form of probing questions. Be concise, friendly.`,
      
          message: newMessage,
          chatHistory: messageHistory,
      
        });
    
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error sending chat completion request:", error);
        throw error;
    }
};

const sendMessage = async (prevMessages, message) => {
  try {
    const response = await sendChatCompletionRequest(messageHistory.concat(prevMessages), message);
    console.log("Response from model", response.text); 
    return response.text;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// sendMessage(message)

const cohereModel = {
    user,
    bot,
    repeatedInstr,
    sendMessage
}

export default cohereModel; 