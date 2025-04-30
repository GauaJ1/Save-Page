// Configuracoes.jsx
import React, { useState, useEffect, useContext, createContext } from 'react';
import './styles.css'; // Importamos o arquivo CSS
import { assets } from '../../../assets/assets';
import { Context } from '../../../context/context';
import Botao from '../../Main/BotaoDeCopiar';
import { DesabilitarNomeContext } from './DesabNameContext';
//?import { ResponseContext } from './RespostaTypeContext';

//?export const customResponse = 'imite um gato fofo'
//?export const setResponseType = false
//todo: Essas exportações são de teste, está funcioando, mas tem que fazer alguma coisa que faça para exportar sem ser desse jeito. Nao tente fazer estilo react, tente ser o Estilo Vanilla do JS
//* https://www.blackbox.ai/chat/Ge1Ak8G
const Configuracoes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [extended, setAbrir] = useState(false)
  const [useTimeBasedTheme, setUseTimeBasedTheme] = useState(false);
  const { formatResponse, setShowResult, setPrevPrompts, messages, prevPrompts, savedPrompts, response, userMessage } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [isBotaoClicado, setIsBotaoClicado] = useState(false);
  const [jsonData, setJsonData] = useState('');
  const { DesabilitarNome, setDesabilitarNome } = React.useContext(DesabilitarNomeContext);
  //?const { customResponse, setCustomResponse, responseType, setResponseType } = useContext(ResponseContext);




  const handleClick = () => {
    const url = "https://flavosunidosia.000.pe/JSONDOWNLOADER";
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.click();
  };

  const handleSaveClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsBotaoClicado(true);
    saveConversation();
  };

  const saveConversation = async () => {
    if (!isBotaoClicado) return;

    const conversationData = [];

    prevPrompts.map((prompt, index) => {
      const userData = {
        tipo: "mensagem",
        remetente: "Pessoa",
        conteudo: prompt.userMessage
      };

      const responseDate = {
        tipo: "resposta",
        remetente: "Flavos IA",
        conteudo: prompt.response
      };

      conversationData.push(userData);
      conversationData.push(responseDate);
    });


    const jsonData = JSON.stringify(conversationData, null, 2);
    setJsonData(jsonData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    //todo: a parte da tipo de resposta tem que fazer um provider E COLOCAR NO APP.JSX é isso🔥

    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      alert('Não Está Funcionando, Use o metodo abaixo.')
      const link = document.createElement('a');
      link.href = url;
      link.download = 'conversaFlavosIA.json';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      /*setTimeout(function () {
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
          <html>
            <head>
              <title>Conversa Flavos IA</title>
              <link href="https://cdn.tailwindcss.com" rel="stylesheet">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                .container {
                  max-width: 400px;
                  margin: 40px auto;
                  padding: 20px;
                  background-color: #f7f7f7;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .text-green-600 {
                  color: #34C759;
                }
                .bg-green-100 {
                  background-color: #E5F7F2;
                }
                .btn-close {
                  background-color: #34C759;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  padding: 10px 20px;
                  font-size: 16px;
                  cursor: pointer;
                  margin-top: 20px;
                }
                .btn-close:hover {
                  background-color: #2E865F;
                }
              </style>
            </head>
            <body class="bg-green-100">
              <div class="container">
                <div class="flex justify-center mb-4">
                  <img src="${assets.flavos_icon}" alt="Ícone Flavos" width="40" height="40">
                </div>
                <h1 class="text-3xl font-bold mb-4 text-green-600">Sua conversa está sendo salva...</h1>
                <p class="text-lg text-gray-600">Aguarde um momento, estamos processando sua conversa.</p>
                <div class="flex justify-center mt-4">
                  <i class="fas fa-spinner fa-spin text-green-600 fa-3x"></i>
                </div>
                <button class="btn-close mt-4" onclick="window.close()">Fechar</button>
                <input type="text" value="${url}" id="link" style="width: 100%; padding: 10px; border: none; border-radius: 5px; font-size: 16px; margin-top: 20px;">
              </div>
            </body>
          </html>
        `);
        newWindow.document.close();

        setTimeout(function () {
          const link = document.createElement('a');
          link.href = url;
          link.download = 'conversaFlavosIA.json';
          link.click();
        }, 2000); // Baixa o arquivo após 2 segundos
      }, 1000);*/
    } else {
      // Baixa o arquivo após 1 segundo
      // Caso contrário, apenas retorne a URL do blob
      //Código para o navegador
      console.log('url:', url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'conversaFlavosIA.json';
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      console.log('Clique disparado!');
      URL.revokeObjectURL(url);
      console.log(url);
    }

  };
  const handleFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (!file.name.endsWith('.json')) {
      alert('Apenas Arquivos JSON permitidos');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        if (Array.isArray(jsonData)) {
          const formattedResponse = [];
          jsonData.forEach((item) => {
            if (item.tipo === 'mensagem') {
              formattedResponse.push({ userMessage: item.conteudo, response: '' });
            } else if (item.tipo === 'resposta') {
              const lastItem = formattedResponse[formattedResponse.length - 1];
              if (lastItem && lastItem.userMessage) {
                lastItem.response = item.conteudo;
              } else {
                formattedResponse.push({ userMessage: '', response: item.conteudo });
              }
            }
          });
          // está acontecendo isso por causa que no formattedResponse, ele puxa os dois (usermessage e response), na ordem do json
          if (typeof callback === 'function') {
            callback(true); // Chama a função de callback apenas se ela for uma função válida
          } else {
            console.error('Callback não é uma função');
          }

          setPrevPrompts((prevPrompts) => [...prevPrompts, ...formattedResponse]);
          console.log(formattedResponse);
        } else {
          alert('Formato de JSON inválido. Por favor, envie um arquivo com um array de objetos.');
        }
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
        alert('Erro ao analisar JSON. Por favor, verifique o arquivo.');
      }
    };
    reader.readAsText(file);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const EsconderNome = () => {
    setDesabilitarNome(!DesabilitarNome);
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (useTimeBasedTheme) {
      if (currentHour >= 19 || currentHour < 6) {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
      } else {
        setDarkMode(false);
      }
    }
  }, [useTimeBasedTheme]);

  const toggleTimeBasedTheme = () => {
    setUseTimeBasedTheme(!useTimeBasedTheme);
  };

  const handleCopyJsonData = () => {
    navigator.clipboard.writeText(jsonData);
  }

  const context = useContext(Context);

  const handleInputChange = (event) => {
    setCustomResponse(event.target.value);
  }

  return (
    <div className="configuracoes">
      <div className="bottom">
        <div className="bottom-item recent-entry" onClick={toggleSettings}>
          <img className='imagemn' src={assets.setting_icon} alt="" />
          <h1>Configurações</h1>
        </div>
      </div>
      {showSettings && (
        <div>
          <div className="Aba">
            <h2>Tema</h2>
            <div className="bottom-item recent-entry">
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <span className="slider round"></span>
              </label>
              {extended ? <p>{darkMode ? 'Modo Escuro' : 'Modo Claro'}</p> : null}
            </div>
            <div className="Aba">
              <label className="switch">
                <input type="checkbox" checked={useTimeBasedTheme} onChange={toggleTimeBasedTheme} />
                <span className="slider round"></span>
              </label>
              <p>Usar tema baseado no horário do dia</p>
            </div>

          </div>
          <div className="Aba">
            <h2>
              <button onClick={handleSaveClick}>Salvar</button>
            </h2>
            {isOpen && (
              <>
                <div className="modal">
                  <div className="modal-content">
                    <h2 className='oi'>Você quer salvar a Conversa?</h2>
                    {/* Nessa Parte você ira mostrar uma mensagem de salvando ( Habilite a opção de escrever arquivos no celular) */}
                    <button className='save' onClick={handleButtonClick}>Sim</button>
                    <button onClick={handleClose} className='close'>Sair</button>
                    <p>Caso você não consiga baixar, copie a Conversa JSON cole nesse site e baixe:</p>
                    <Botao texto={jsonData} copiarTexto={() => { navigator.clipboard.writeText(jsonData); }} />
                    <p>https://flavosunidosia.ct.ws/JSONDOWNLOADER</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className='Aba'>
            <h2>Importar</h2>
            <input type="file" accept=".json" id="fileInput" onChange={(e) => {
              if (typeof setShowResult === 'function') {
                handleFileChange(e, setShowResult);
              } else {
                console.error('setShowResult não é uma função');
              }
            }} />
            <label htmlFor="fileInput">
              Selecione o arquivo conversaFlavosIA.json no seu dispositivo.
            </label>
          </div>
          <div className="Aba">
            <h2>Nome</h2>
            <div className="bottom-item recent-entry">
              <p className={DesabilitarNome ? 'hidden transition' : ''}>Ativar Nome</p>
              <label className="switch">
                <input type="checkbox" checked={DesabilitarNome} onChange={EsconderNome} />
                <span className="slider round"></span>
              </label>
              {extended ? <p>{DesabilitarNome ? 'Remover Nome' : 'Ativar Nome'}</p> : null}
              <p className={DesabilitarNome ? '' : 'hidden transition'}>Esconder Nome</p>
            </div>
          </div>
          {/*<div className="Aba">
            <h2>Resposta</h2>
            <div className="bottom-item recent-entry">
              <p className="person" style={{ opacity: responseType ? 0 : 1 }}>Personalizado</p>
              <label class="switch">
                <input type="checkbox" checked={responseType} onChange={() => setResponseType(!responseType)} />
                <span class="slider round personalizado"></span>
              </label>
              <p className="normal" style={{ opacity: responseType ? 1 : 0 }}>Padrão</p>
              {!responseType ? (
                <input
                  type="text"
                  placeholder="Insira o valor personalizado"
                  value={customResponse}
                  onChange={handleInputChange}
                  style={{
                    display: 'block',
                    fontSize: 18, // não 2px, pois isso faria o texto muito pequeno
                    padding: 5,
                    border: '1px solid #ccc',
                    borderRadius: 15,
                    width: 300,
                    boxShadow: '0 0 10px rgba(14, 209, 14, 0.452);',
                    transition: 'all 0.3s ease-in-out',
                  }}
                />
              ) : null}
            </div>
          </div>*/}
        </div>
      )
      }
    </div >
  );
};



export default Configuracoes;

