import React, { useContext, useState, useRef, useEffect } from 'react'
import './Main.css'
import '../Sidebar/Config/styles.css'
import { assets } from '../../assets/assets'
import CountdownTimer from './ContadorFlavosBank.jsx'
import { Context } from '../../context/context.jsx'
import Sidebar from '../Sidebar/Sidebar.jsx'
import BlocoDeCodigo from './BlocoDCodigo.jsx'
import Botao from './BotaoDeCopiar.jsx'
import Configuracoes from '../Sidebar/Config/Config.jsx'
import Falar from './BotaoDeFalar.jsx'
import runModel from '../../config/flavosia.js'
import { SettingsContext } from '../Sidebar/Config/Context-Config.jsx'
import { DesabilitarNomeContext } from '../Sidebar/Config/DesabNameContext.jsx'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Main = () => {
    const { showSettings } = useContext(SettingsContext)
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, userMessage, messages, currentMessageText, prevPrompts } = useContext(Context)
    const [userName, setUserName] = useState([]);
    const { DesabilitarNome } = React.useContext(DesabilitarNomeContext)
    const eventDate = new Date("2025-03-18T20:00");
    const eventName = "Flavos IA 2.6";
    const latestLoading = loading && prevPrompts.length > 0;
    const { transcript, listening, resetTranscript, isMicrophoneAvailable } = useSpeechRecognition()
    const [inputError, setInputError] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const resultContainerRef = useRef(null); 

    useEffect(() => {
        if (resultContainerRef.current) {
            resultContainerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [prevPrompts]); // Executa quando prevPrompts muda

    const handleCardClick = (prompt) => {
        onSent(prompt);
    };

    const formatText = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Negrito
            .replace(/\n/g, '<br>') // Quebra de linha

    }

    //const minhasStrings = ["Se estiver precisando de ajuda é só me perguntar 😃!!!", "eai vamos ter uma conversinha?", "Ai Gala safado", `"Vai Gala"!`, "Mogaaai🥵", "Se estiver precisando de ajuda é só me perguntar 😃!!!", "eai vamos ter uma conversinha?"];

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    // Função para parar o reconhecimento de fala
    const stopListening = () => {
        SpeechRecognition.stopListening();
        setInput(transcript); // Atualiza o input com o texto reconhecido
    };

    const ResetarTrancrisao = () => {
        resetTranscript();
    }

    // Atualiza o input em tempo real com o texto reconhecido
    useEffect(() => {
        setInput(transcript); // Atualiza o input com o texto reconhecido
    }, [transcript, setInput]);

    const [mostrarCaixaTexto, setMostrarCaixaTexto] = useState(false); // Estado para controlar a exibição da caixa de texto

    // Função para alternar a visibilidade da caixa de texto
    const toggleCaixaTexto = () => {
        setMostrarCaixaTexto(prev => !prev); // Alterna entre verdadeiro e falso
    };

    // Limpa o erro após 2 segundos
    useEffect(() => {
        if (inputError) {
            setShowErrorMessage(true); // Mostra a mensagem de erro
            const timer = setTimeout(() => {
                setInputError(false); // Reseta o estado de erro após 2 segundos
                fadeOutErrorMessage(); // Inicia a animação de desaparecimento
            }, 3500);

            // Limpa o timeout se o componente for desmontado ou se o erro mudar
            return () => clearTimeout(timer);
        }
    }, [inputError]);

    const fadeOutErrorMessage = () => {
        let opacity = 1; // Opacidade inicial
        const interval = setInterval(() => {
            if (opacity > 0) {
                clearInterval(interval); // Para o intervalo quando a opacidade atinge 0.25
                setShowErrorMessage(false); // Esconde a mensagem de erro
            }
            opacity -= 0.65; // Reduz a opacidade
            document.querySelector('.error-message').style.opacity = opacity; // Aplica a nova opacidade
        }, 1500); // Ajuste o tempo conforme necessário
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Previne o comportamento padrão do Enter
            if (input.trim() === '') {
                setInputError(true); // Marca erro se o input estiver vazio
                return;
            }
            onSent(input); // Envia o input
            setInput(''); // Limpa o estado do input
            handleResetTranscript(); // Reseta o transcript ao enviar
        }
    };
    return (
        <div className='main'>
            <div className="nav">
                <p>Flavos IA 2.5</p>
                <div style={{ position: 'relative' }}> {/* Define o contêiner como relativo para posicionar a caixa de texto */}
                    <img
                        className='imagess'
                        src={assets.FlavosImage}
                        alt="Descrição da imagem"
                        onClick={toggleCaixaTexto}
                    />
                    {mostrarCaixaTexto && ( // Renderiza a caixa de texto apenas se mostrarCaixaTexto for verdadeiro
                        <div className='caixa-texto'>
                            <p><a href='https://flavosvoice.ct.ws'>Experimente o Flavos Voice</a></p>
                        </div>
                    )}
                </div>
                <img src={assets.user_icon} alt="" className='cursor-pointer' />
                <button className="mobile-sidebar-btn" onClick={() => {
                    // Abre a sidebar quando o botão é clicado
                    document.querySelector('.sidebar').classList.toggle('open');
                }}>
                    <img src={assets.menu_icon} alt="" />
                </button>
            </div>
            <div className="main-container">
                {showSettings && (
                    <Configuracoes />
                )}
                {!showResult
                    ? <>
                        <div className='greet'><p><span>Olá {userName ? userName : 'Usuário'}</span></p>
                            <p>Como eu posso te ajudar hoje?</p></div>
                        <div className={DesabilitarNome ? 'hidden' : 'greet'}>

                            <input type="text" className='input-box' placeholder="Digite seu nome (Maximo 50 Caracteres)" value={userName} onChange={(e) => setUserName(e.target.value)} maxLength={50} />
                        </div>
                        <div className="cards">
                            <div onClick={() => handleCardClick("Quem é seu dono?")} className="card">
                                <p>Quem é seu dono?</p>
                                <img src={assets.question_icon} alt="" />
                            </div>
                            <div onClick={() => handleCardClick("Como programar em Assembly?")} className="card">
                                <p>Como programar em Assembly?</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                    : <div>
                        <div className='result' ref={resultContainerRef} style={{overflowY: 'auto'}}>
                            {prevPrompts.map((entry, index) => (
                                <React.Fragment key={index}>
                                    <div className="result-title">
                                        <img src={assets.user_icon} alt="" />
                                        <p>{entry.userMessage}</p>
                                    </div>
                                    <div className="result-data">
                                        <img src={assets.FlavosImage} alt="" />
                                        {index === prevPrompts.length - 1 && latestLoading ? (
                                            <div className='loader'>
                                                <hr />
                                                <hr />
                                                <hr />
                                            </div>
                                        ) : (
                                            <div>
                                                {entry.response && entry.response.split('```').map((part, index) => (
                                                    index % 2 === 0 ? (
                                                        <p key={index} dangerouslySetInnerHTML={{ __html: formatText(part) }}></p>
                                                    ) : (
                                                        <BlocoDeCodigo key={index} codeString={part} />
                                                    )
                                                ))}
                                                <Botao texto={entry.response} copiarTexto={() => navigator.clipboard.writeText(entry.response)} />
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                }
                {/*<div className='result'>
                        {prevPrompts.map((entry, index) => (
                                <React.Fragment key={index}>
                                    <div className="result-title">
                                        <img src={assets.user_icon} alt="" />
                                        <p>{entry.userMessage}</p>
                                    </div>
                                    <div className="result-data">
                                        <img src={assets.flavos_icon} alt="" />
                                        {index === prevPrompts.length - 1 && latestLoading ? (
                                            <div className='loader'>
                                                <hr />
                                                <hr />
                                                <hr />
                                            </div>
                                        ) : (
                                            <div>
                                                {entry.response.split('```').map((part, index) => (
                                                    index % 2 === 0 ? (
                                                        <p key={index} dangerouslySetInnerHTML={{ __html: formatText(part) }}></p>
                                                    ) : (
                                                        <BlocoDeCodigo key={index} codeString={part} />
                                                    )
                                                ))}
                                                <Botao texto={entry.response} copiarTexto={() => navigator.clipboard.writeText(entry.response)} />
                                            </div>
                                        )}
                                    </div>
                                    <MessageList messages={messages} />
                                </React.Fragment>
                            ))}
                    </div>
                    ARRUMA DEPOIS CARA SE NAO FUNCIONAR*/}




                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Escreva alguma coisa..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleInputKeyDown}
                            className={inputError ? 'input-error' : ''}
                        />
                        {inputError && (
                            <div className={`error-message ${showErrorMessage ? 'show' : ''}`}>
                                Por favor, digite algo!
                            </div> // Mensagem de erro
                        )}
                        <div>
                            {input && (
                                <img
                                    onClick={() => {
                                        if (input.trim() === '') {
                                            setInputError(true); // Marca erro se o input estiver vazio
                                        } else {
                                            onSent(input);
                                            setInput('');
                                            resetTranscript();
                                        }
                                    }}
                                    src={assets.send_icon}
                                    alt=""
                                />
                            )}
                            <a href="https://flavosunidosia.ct.ws/Leitor"><img src={assets.gallery_icon} alt=""/></a>

                            <img src={assets.mic_icon} alt="" onClick={startListening} />
                            {listening && (
                                <>
                                    <img src={assets.stop_icon} alt="Parar" onClick={stopListening} />
                                    <img src={assets.delete_icon} alt="Deletar Fala" onClick={ResetarTrancrisao} />
                                </>
                            )}
                        </div>
                    </div>
                    <p className="bottom-info">
                        <CountdownTimer targetDate={eventDate} eventName={eventName} />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main
