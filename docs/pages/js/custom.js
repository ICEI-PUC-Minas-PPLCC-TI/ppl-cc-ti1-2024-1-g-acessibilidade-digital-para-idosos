const form = document.getElementById('topicForm');
const gerarImagemBtn = document.getElementById('gerarImagemBtn');
const gerarBtn = document.getElementById('gerarBtn');
const tituloInput = document.getElementById('titulo');
const imagemInput = document.getElementById('imagemUpload');
const conteudoInput = document.getElementById('conteudo');
const linkInput = document.getElementById('link');  // Campo para o link de vídeo

if (gerarBtn) {
  gerarBtn.addEventListener('click', async () => {
    const titulo = tituloInput.value;

    if (!titulo) {
      alert("Por favor, preencha o campo Título antes de gerar uma resposta.");
      return;
    }

    try {
      const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eac59e502a694e88bff466e435a857b2`,  // Use sua chave API aqui
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Gere um tutorial curto de ${titulo} sem utilizar negrito ou tamanhos variados de fonte. Inicie a resposta no passo 1. Depois, escreva "Link:" e sugira direto um link do YouTube que ensine o tópico`
            }
          ]
        })
      });

      const result = await response.json();
      const message = result.choices[0].message.content;
      
      const splitMessage = message.split('Link:');  // Dividindo a resposta entre o passo a passo e o link
      const passos = splitMessage[0].trim();
      const videoLink = splitMessage[1]?.trim();  // Link de vídeo, se existir

      // Coloca a resposta no campo "Conteúdo"
      conteudoInput.value = passos;

      // Se houver um link de vídeo na resposta, coloque no campo "Link"
      if (videoLink) {
        linkInput.value = videoLink;
      }

    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
    }
  });
}

if (gerarImagemBtn) {
  gerarImagemBtn.addEventListener('click', async () => {
    const imagemInput = document.getElementById('imagemUpload');

    if (!imagemInput.files.length) {
      alert("Por favor, selecione uma imagem antes de gerar uma resposta.");
      return;
    }
    const imagem = imagemInput.files[0];
  const reader = new FileReader();

  reader.onload = async function (event) {
    const imagemBase64 = event.target.result.split(',')[1];

    try {
      const response = await fetch('https://easy-peasy.ai/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer d7a188c605c7862ba3a7699d13be6e7fbdcd45ed61f5fd7232b26dccd9d059f2`,  // Use sua chave API aqui
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: imagem.type,
                  data: imagemBase64,
                },
              },},
          ],
          stream: false
        })
      });

      const result = await response.json();
      const tituloGerado = result.messages[0]?.content; // Obtém o texto gerado da API

      if (tituloGerado) {
        tituloInput.value = tituloGerado.trim(); // Define o título gerado no campo "Título"
      } else {
        alert("Nenhum título foi gerado. Verifique a imagem enviada ou tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao gerar o título:', error);
      alert('Ocorreu um erro ao tentar gerar o título. Tente novamente.');
    }
  };

  reader.readAsDataURL(imagem); // Converte a imagem para base64
})}