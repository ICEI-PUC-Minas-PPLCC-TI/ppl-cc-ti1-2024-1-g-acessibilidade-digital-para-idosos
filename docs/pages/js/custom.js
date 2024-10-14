const form = document.getElementById('topicForm');
const { OpenAI } = require('openai');

const api = new OpenAI({
    baseURL: 'https://api.aimlapi.com',
    //apiKey: 
});

if (form) {

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const result = await api.chat.completions.create({
            model: 'meta-llama/Meta-Llama-3-70B-Instruct-Lite',
            messages: [
              {
                role: 'system',
                content: 'Você deve responder com um passo a passo em tópicos.',
              },
              {
                role: 'user',
                content: 'Como salvo um contato no celular?'
              }
            ],
          });
        
          const message = result.choices[0].message.content;
          console.log(`Assistant: ${message}`);
    });
}