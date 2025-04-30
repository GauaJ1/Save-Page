/* MessageList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/context';
import { assets } from '../../../assets/assets';

const MessageList = () => {
    const { messages, setMessages, onSent } = useContext(Context);

    const handleSendMessage = async (message) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(messages => [...messages, {
                    tipo: 'mensagem',
                    remetente: 'Pessoa',
                    texto: message,
                }]);
                // Only add the response if it's not already present
                if (!messages.find(entry => entry.tipo === 'resposta' && entry.response === data)) {
                    setMessages(messages => [...messages, {
                        tipo: 'resposta',
                        remetente: 'Flavos IA',
                        response: data,
                    }]);
                }
            } else {
                console.error('Erro ao enviar a mensagem:', response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
        }
    };

    return (
        <div>
            {messages && Array.isArray(messages) && messages.length > 0 ? (
                <div>
                    <img src={assets.flavos_icon} alt="" />
                    {messages.map((entry, i) => (
                        <div key={i}>
                            {entry.tipo === 'mensagem' && (
                                <div className="user-message">
                                    <img src={assets.user_icon} alt="" />
                                    <p><strong>{entry.remetente}:</strong> {entry.texto}</p>
                                </div>
                            )}
                            {entry.tipo === 'resposta' && (
                                <div className="response-message">
                                    <p><strong>{entry.remetente}:</strong> {entry.response}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (null)}
        </div>
    );
};

export default MessageList;*/

/*const handleFileChange = (e, callback) => {
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
          const formattedResponse = jsonData.map((item) => {
            if (item.tipo === 'mensagem' || item.tipo === 'resposta') {
              return {
                ...(item.tipo === 'mensagem' ? { userMessage: item.conteudo } : {}),
                ...(item.tipo === 'resposta' ? { response: item.conteudo } : {}),
              };
            }
          });

          if (typeof callback === 'function') {
            callback(true); // Chama a função de callback apenas se ela for uma função válida
          } else {
            console.error('Callback não é uma função');
          }

          setPrevPrompts((prevPrompts) => [...prevPrompts, ...formattedResponse]);
        } else {
          alert('Formato de JSON inválido. Por favor, envie um arquivo com um array de objetos.');
        }
      } catch (error) {
        console.error('Erro ao analisar JSON:', error);
        alert('Erro ao analisar JSON. Por favor, verifique o arquivo.');
      }
    };
    reader.readAsText(file);
  };*/