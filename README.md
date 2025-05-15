# 📸 Script para Capturar Screenshot no Console

Script JavaScript que permite capturar uma imagem da página atual diretamente pelo console do navegador.

## 🚀 Como Usar

1. **Abra o console do navegador**:
   - Chrome/Edge/Firefox: `F12` ou `Ctrl+Shift+J`
   - Mac: `Cmd+Opt+J`
   - Safari: Ative o menu Developer em Preferências

**Diretório:**
[Save Page](/SavePage.js)

2. **Copie e cole este código**:

```javascript
// Captura screenshot e faz download automático
function capturarScreenshot() {
  const script = document.createElement('script');
  script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  
  script.onload = () => {
    html2canvas(document.body).then(canvas => {
      const link = document.createElement('a');
      link.download = `print-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
      console.log('✅ Screenshot salvo com sucesso!');
    });
  };
  
  document.head.appendChild(script);
}

// Verifica se a biblioteca já está carregada
typeof html2canvas === 'undefined' ? capturarScreenshot() : html2canvas(document.body).then(canvas => {
  const link = document.createElement('a');
  link.download = `print-${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
});
