const form = document.getElementById('topicForm');
const gerarBtn = document.getElementById('gerarBtn');
const tituloInput = document.getElementById('titulo');
const conteudoInput = document.getElementById('conteudo');

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
          'Authorization': `Bearer bdda4200a7c948328cb8b3f6c800e27e`,  // Use sua chave API aqui
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: "Gere um passo a passo de até 8 passos para o tema a seguir, sem utilizar negrito ou tamanhos variados de fonte e já inicie sua resposta com o passo 1" + titulo // Usando o valor do campo título como o prompt
            }
          ]
        })
      });

      const result = await response.json();
      const message = result.choices[0].message.content;
      
      // Coloca a resposta no campo "Conteúdo"
      conteudoInput.value = message;

    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
    }
  });
}
