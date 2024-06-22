async function handleLogin(event) {
    event.preventDefault();

    var nome_usuario = document.getElementById('nome_usuario').value;
    var senha = document.getElementById('senha').value;

    console.log(nome_usuario)
    console.log(senha)

    fetch('http://localhost:3001/usuarios', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {          
            var usuario = data.find(usuario => usuario.nome_usuario === nome_usuario && usuario.senha === senha);

            if (usuario) {
                if (usuario.tipo_usuario == 'cliente') {
                    localStorage.setItem("tipoUsuario", "cliente");
                    window.location.href = './conteudo.html';
                } else if (usuario.tipo_usuario == 'admin') {
                    localStorage.setItem("tipoUsuario", data.tipo_usuario);
                    window.location.href = './conteudo.html';
                } else {
                    alert('Tipo de usuário desconhecido');
                }
            } else {
                throw new Error();
            }
        })
        .catch(error => {
            alert('Nome de usuário ou senha inválidos');
        });
}

document.getElementById('loginForm').addEventListener('submit', handleLogin);
