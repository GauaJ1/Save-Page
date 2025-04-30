import { createContext, useState } from "react";
import runModel from "../config/flavosia";
import { assets } from "../assets/assets";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [combinedHistory, setCombinedHistory] = useState([]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [currentMessageText, setCurrentMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const [savedPrompts, setSavedPrompts] = useState([]);
    


    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () => {
        setShowResult(false)
        setLoading(false)
        setPrevPrompts([])

    }

    const formatText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Negrito
            .replace(/\n/g, '<br>'); // Quebra de linha
    }



    const onSent = async (prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        const userMessage = input ? input : prompt; // Acessa o valor do input do usuário
        
        
        //const userMessage = prompt ? prompt : input; // Obtém a mensagem do usuário
        const newMessage = { userMessage, response: "" };
        const updatedPrompts = [...prevPrompts, newMessage];
        setPrevPrompts(updatedPrompts);
        //setMessages([...messages, { userMessage, response }]);
        setSavedPrompts(updatedPrompts)
        console.log(userMessage)
        let { response } = await runModel(userMessage, updatedPrompts);

        // Atualiza a última mensagem no histórico com a resposta completa
        setPrevPrompts(prev => {
            const newPrompts = [...prev];
            newPrompts[newPrompts.length - 1].response = response;
            return newPrompts;
        });

        //* Novo Loading
        const NovoLoading = { ...loading };
        NovoLoading[prompt] = true;
        setLoading(NovoLoading);

        // Formata o histórico em HTML

        /*const formattedHistory = prevPrompts.map((entry, index) => (
            <div key={index}>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{entry.userMessage}</p>
                </div>
                <div className="result-data">
                    <img src={assets.flavos_icon} alt="" />
                    <p>{entry.response}</p>
                </div>
            </div>
        )).join('');


        // Define resultData com o HTML formatado e aplica o delay
        for (let i = 0; i < formattedHistory.length; i++) {
            delayPara(i, formattedHistory[i]);
        }*/


        /*setMessages(prevMessages => [...prevMessages, { userMessage: prompt ? prompt : input, response }]);*/
        setCurrentMessageIndex(0); // Reinicia o índice da mensagem atual
        setCurrentMessageText(''); // Limpa o texto da mensagem atual
        setInput("");

        //?  Atualiza o resultado da resposta

        if (response !== undefined && response !== null && typeof response === 'string' || Array.isArray(response)) {
            let i = 0;
            const intervalId = setInterval(() => {
                if (currentMessageIndex < response.length) {
                    setCurrentMessageText(prevText => prevText + response[currentMessageIndex]);
                    setCurrentMessageIndex(prevIndex => prevIndex + 1);
                    clearInterval(intervalId);
                    setLoading(false);
                }
            }, 250);
        }
        //? Está parte ja foi arrumada.


        setInput("");

        //* Quando o bot morrer ( ficar exausto), faça ele reiniciar e responder a resposta novamente.



        /*
        setResultData("");
        setLoading(true);
        setShowResult(true);

        const userMessage = prompt ? prompt : input; // Obtém a mensagem do usuário

        // Adiciona a mensagem do usuário ao histórico (sem a resposta ainda)
        setPrevPrompts(prev => [...prev, { userMessage, response: "" }]);

        // Obtém a resposta, seja personalizada ou do modelo
        let response = getCustomResponse(userMessage) || await runModel(userMessage, prevPrompts);

        // Atualiza a última mensagem no histórico com a resposta completa
        setPrevPrompts(prev => prev.map((entry, index) =>
            index === prev.length - 1 ? { ...entry, response } : entry
        ));

        // Formata o histórico em HTML
        const formattedHistory = prevPrompts.map((entry, index) => (
            <div key={index}>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{entry.userMessage}</p>
                </div>
                <div className="result-data">
                    <img src={assets.flavos_icon} alt="" />
                    <p dangerouslySetInnerHTML={{ __html: entry.response }}></p>
                </div>
            </div>
        )).join('');
    

    // Define resultData com o HTML formatado e aplica o delay
    for (let i = 0; i < formattedHistory.length; i++) {
        delayPara(i, formattedHistory[i]);
    }


    setMessages(prevMessages => [
        ...prevMessages,
        { userMessage: prompt ? prompt : input, response }
    ]);
    setCurrentMessageIndex(0); // Reinicia o índice da mensagem atual
    setCurrentMessageText(''); // Limpa o texto da mensagem atual
    setInput("");


    let i = 0;
    const intervalId = setInterval(() => {
        if (currentMessageIndex < response.length) {
            setCurrentMessageText(prevText => prevText + response[currentMessageIndex]);
            setCurrentMessageIndex(prevIndex => prevIndex + 1);
        } else {
            clearInterval(intervalId);
            setLoading(false);
        }
    }, 2500);
    setInput("")
        */



    }

    const QuandoReceberMSG = (message) => {
        const novoLoading = { ...loading };
        novoLoading[message] = false;
        setLoading(novoLoading);
    }



    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        messages,
        setMessages,
        currentMessageText,
        savedPrompts,
        setShowResult,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider