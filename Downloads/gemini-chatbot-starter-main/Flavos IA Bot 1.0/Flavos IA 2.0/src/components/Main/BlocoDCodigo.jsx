import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const BlocoDeCodigo = React.memo(({ codeString }) => {
  const [language, code] = codeString.trim().split('\n', 2);
  const [copiar, setCopiar] = useState();

  const lines = codeString.trim().split('\n');
  const formattedCode = lines.slice(1).join('\n');
 
  return (
    <div>
      <div className="max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md ">
        <div className='flex justify-between px-4 text-white text-xs items-center'>
          <p className="text-sm">{language.replace(/```/, '')}</p>
          {copiar ? (
            <buttton className="py-1 inline-flex items-center gap-1">
              <span className='text-base mt-1'>
                <ion-icon name="checkmark-sharp"></ion-icon>
              </span>
              Copiado!
            </buttton>
          ) : (
            <buttton className="py-1 inline-flex items-center gap-1 cursor-pointer" onClick={() => {
              navigator.clipboard.writeText(formattedCode);
              setCopiar(true);
              setTimeout(() => {
                setCopiar(false)
              }, 3000);
            }}>
              <span className='text-base mt-1'>
                <ion-icon name="clipboard-outline"></ion-icon>
              </span>
              Copiar Codigo
            </buttton>
          )}
        </div>
        <pre>
          <code>
            <SyntaxHighlighter language={language.replace(/```/, '')} style={atomOneDark} customStyle={{
              padding: "25px",
            }}
              wrapLongLines={true}>
              {formattedCode}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    </div>
  );
});
export default BlocoDeCodigo