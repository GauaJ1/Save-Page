// Função para capturar a screenshot e baixar
function takeScreenshot() {
  // Usa html2canvas para capturar a página
  const script = document.createElement('script');
  script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  script.onload = function() {
    html2canvas(document.body).then(function(canvas) {
      // Cria um link para download
      const link = document.createElement('a');
      link.download = 'screenshot-' + new Date().getTime() + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      console.log('Screenshot capturado e download iniciado!');
    });
  };
  document.head.appendChild(script);
}

// Verifica se o html2canvas já está carregado
if (typeof html2canvas === 'undefined') {
  takeScreenshot();
} else {
  html2canvas(document.body).then(function(canvas) {
    const link = document.createElement('a');
    link.download = 'screenshot-' + new Date().getTime() + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    console.log('Screenshot capturado e download iniciado!');
  });
}