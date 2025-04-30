import React, { useState } from 'react';
import '../Main/BDCopiar.css'

const Botao = ({ texto, copiarTexto }) => {
    const [copiado, setCopiado] = useState(false);

    const handleClick = () => {
        copiarTexto();
        setCopiado(true);
        setTimeout(() => {
            setCopiado(false);
        }, 2000);
    };

    return (
        <button className={`botao ${copiado? 'copiado' : ''}`} onClick={handleClick}>
            {copiado? 'Copiado!' : 'Copiar'}
        </button>
    );
};

export default Botao;