import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
//import { customResponse, setResponseType } from "../components/Sidebar/Config/Config";
//todo: Essas constantes eu exportei diretamente, sem ser automatico.


const genAI = new GoogleGenerativeAI('AIzaSyAG7yvbOUAZGtRmhGSG2LVefT-iFfXo5lE')

//old apikey= AIzaSyAG7yvbOUAZGtRmhGSG2LVefT-iFfXo5lE

const chatbotName = "Flavos IA";
const ChatbotNameRemember = "Seu nome é Flavos IA.";


//let conversationHistory = [];
let isFirstTime = true;


let DefaultSettings = "Você fala no idioma do usuario, Você se chama Flavos IA e o seu dono é Gaua. Não precisa ficar repetindo que seu dono foi Gaua.";

const safetySettings = (
  [
    "HARM_CATEGORY_HATE_SPEECH",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "HARM_CATEGORY_DANGEROUS_CONTENT",
    "HARM_CATEGORY_HARASSMENT",
  ]
).map((category) => ({
  category,
  threshold: "BLOCK_NONE",
}))

//Geração de Resposta
const model = genAI.getGenerativeModel({ // ---- Modelo Generativo
  model: "gemini-2.0-flash-001", //Modelo
  systemInstruction: DefaultSettings, // --- Instrução do Sistema
  safetySettings, // Configurações de segurança
});


async function runModel(userMessage, prevPrompts) {


  try {
    userMessage ? String(userMessage).toLowerCase() : ''

    let localConversationHistory = [];

    if (userMessage.includes("dia") && userMessage.includes("hoje") ) {
      const today = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('pt-BR', options); // Formata a data para o português
      return { response: `Hoje é ${formattedDate}`, combinedHistory: prevPrompts }; // Retorna a data formatada
    }
    else if (/horas.*s[ãa]o|s[ãa]o.*horas/.test(userMessage)) {
      const currentTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' }); // Obtém a hora e minutos
      return { response: `A hora atual é ${currentTime}`, combinedHistory: prevPrompts }; // Retorna a hora formatada
    }

    // const systemInstruction = RespostaPadrao ? DefaultSettings : (customInput.trim() !== '' ? customInput : DefaultSettings);

    // Combina o histórico local com o histórico do contexto, limitando a 50 mensagens
    const combinedHistory = [...prevPrompts, ...localConversationHistory].slice(-50);

    // Construção do prompt com o histórico combinado
    const prompt = `${combinedHistory.map(entry => `${entry.userMessage}: ${entry.response}`).join('\n\n')}\n${userMessage}:`;
    //Etapas de Segurança


    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage([prompt]); // Passa o prompt e a parte da imagem
    let response = await result.response.text();
    console.log(result.response.text())

    const customResponses = {
      "quem é seu dono?": "Gauã",
      "qual é o seu nome?": "Meu nome é Flavos IA.",
      "mamae": `Mamãe, Mamãe, Sim bebê
      coma frutas, oh bebê
      já comi, olha cá
      abra a boca, ahn ahn. ahnnnnnnnnnnnnn`,
      "big fish": "Cara Luryan e muito peixe grande - Mogai 2024",
      "shake": "autism, alzheimer and. shake"
    };

    if (userMessage && customResponses[String(userMessage).toLowerCase()]) {
      response = customResponses[String(userMessage).toLowerCase()];
    }
    return { response, combinedHistory }; // Retorna apenas a resposta do modelo

  } catch (error) {
    console.error("Failed to generate response:", error);

    if (error.message === " [GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY") {
      const ErrorResponse = {
        error: "Reinicie o aplicativo para tentar responder denovo."
      }
      response = ErrorResponse[String(userMessage).toLowerCase()];
    } else {
      return "Desculpe, algo deu errado. Por favor, tente novamente mais tarde.";
    }
  }

};

export default runModel