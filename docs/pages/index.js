const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());

// Carregar db.json da raiz do projeto
const dbPath = path.join(__dirname, 'db.json');
let db = JSON.parse(fs.readFileSync(dbPath));

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'docs/pages')));

// Obter todos os favoritos
app.get('/favoritos', (req, res) => {
    const favoritos = db.favoritos.map(fav => {
        const topico = db.topicos.find(top => top.id === fav.topicoId);
        return { ...topico, ...fav };
    });
    res.json(favoritos);
});

// Adicionar aos favoritos
app.post('/favoritos', (req, res) => {
    const { UserId, topico } = req.body;

    if (!UserId || !topico) {
        return res.status(400).json({ error: 'UserId e topico são necessários' });
    }

    const { id, titulo, imagem, categorias } = topico;

    const novoFavorito = {
        UserId,
        id,
        titulo,
        imagem,
        categorias
    };

    db.favoritos.push(novoFavorito);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(201).json(novoFavorito);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
