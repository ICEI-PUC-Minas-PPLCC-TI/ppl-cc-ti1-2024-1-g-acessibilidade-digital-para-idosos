const form = document.getElementById('topicForm');
const gerarBtn = document.getElementById('gerarBtn');
const tituloInput = document.getElementById('titulo');
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
