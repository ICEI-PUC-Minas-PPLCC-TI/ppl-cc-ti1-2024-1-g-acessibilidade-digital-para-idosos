const form = document.getElementById('topicForm');

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
            content: 'Como salvo um contato no celular?'
          }
        ]
      })
    });

    const result = await response.json();
    const message = result.choices[0].message.content;
    console.log(`Assistant: ${message}`);
  });
}
