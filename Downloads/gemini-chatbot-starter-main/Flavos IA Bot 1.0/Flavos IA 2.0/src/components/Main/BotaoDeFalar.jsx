import React, { useState } from 'react';
import '../Main/BDFalar.css';

function Falar({ text }) {
    const [falar, setFalar] = useState(false);
    const [utterance, setUtterance] = useState(null);

    const handleClick = () => {
        setFalar(true);
        const valor = new SpeechSynthesisUtterance(text);
        setUtterance(valor);
        valor.onend = () => {
            setFalar(false);
        }
        window.speechSynthesis.speak(valor);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setFalar(false);
    };

    return (
        <div className="falar">
            {falar ? (
                <div>
                    <button
                        className="btn-parar"
                        onClick={handleStop}
                    >
                        Parar
                    </button>
                </div>
            ) : (
                <button
                    className="btn-falar"
                    onClick={handleClick}
                >
                    Falar
                </button>
            )}
        </div>
    );
};

export default Falar;