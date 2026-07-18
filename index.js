// Banco de dados dinâmico de Idiomas, Histórias e Lições
const dadosIdiomas = {
    ingles: {
        historias: [
            { titulo: "⚔️ Origem Germânica", texto: "O inglês começou com as invasões das tribos dos Anglos e Saxões no século V." },
            { titulo: "👑 A Influência Francesa", texto: "Em 1066, os normandos franceses dominaram a Inglaterra, adicionando mais de 10.000 palavras ao vocabulário." }
        ],
        atividades: [
            { q: "Como se diz 'Obrigado' em Inglês?", o: ["Thank you", "Please", "Hello", "Sorry"], c: 0, tipo: "normal" },
            { q: "Qual o significado de 'Water'?", o: ["Fogo", "Terra", "Água", "Ar"], c: 2, tipo: "normal" },
            { q: "⚡ PROVA: Escolha a tradução de 'The book is on the table'", o: ["O livro mudou de mesa", "O livro está em cima da mesa", "A mesa sumiu com o livro", "Comprei um livro e uma mesa"], c: 1, tipo: "prova" }
        ]
    },
    espanhol: {
        historias: [
            { titulo: "🏰 O Reino de Castela", texto: "O espanhol, ou castelhano, nasceu na região de Castela a partir do latim falado pelo Império Romano." },
            { titulo: "🌍 Expansão Global", texto: "Com as navegações do século XV, o idioma cruzou o oceano e hoje é falado em mais de 20 países." }
        ],
        atividades: [
            { q: "Como se diz 'Bom dia' em Espanhol?", o: ["Buenos días", "Boa noite", "Hola", "Adiós"], c: 0, tipo: "normal" },
            { q: "O que significa 'Perro'?", o: ["Gato", "Cachorro", "Pássaro", "Cavalo"], c: 1, tipo: "normal" },
            { q: "⚡ PROVA: O que significa 'Me gusta el fútbol'?", o: ["Eu jogo futebol", "Eu odeio futebol", "Eu gosto de futebol", "Eu assisto futebol"], c: 2, tipo: "prova" }
        ]
    },
    frances: {
        historias: [
            { titulo: "🍷 O Latim Galo-Romano", texto: "O francês surgiu da mistura do latim trazido pelos romanos com as línguas celtas locais da antiga Gália." }
        ],
        atividades: [
            { q: "Como se diz 'Oi' de forma amigável em Francês?", o: ["Merci", "Salut", "Au revoir", "Oui"], c: 1, tipo: "normal" },
            { q: "O que significa 'Bonjour'?", o: ["Bom dia", "Boa noite", "Obrigado", "Por favor"], c: 0, tipo: "normal" }
        ]
    }
};

// Estado do Usuário
let usuario = {
    nome: "",
    xp: 0,
    ofensiva: 1,
    idiomaAtual: "ingles",
    indiceAtividade: 0
};

// Verificar se usuário já existe salvo no navegador
window.onload = function() {
    const salvo = localStorage.getItem("glowlingo_user");
    if(salvo) {
        usuario = JSON.parse(salvo);
        carregarPainelPrincipal();
    }
}

function fazerCadastro() {
    const inputNome = document.getElementById("username").value.trim();
    if(inputNome === "") return alert("Insira um nome válido para ganhar seus pontos!");
    
    usuario.nome = inputNome;
    salvarDados();
    carregarPainelPrincipal();
}

function salvarDados() {
    localStorage.setItem("glowlingo_user", JSON.stringify(usuario));
}

function carregarPainelPrincipal() {
    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");
    
    document.getElementById("display-name").innerText = `👤 ${usuario.nome}`;
    atualizarStatusNaTela();
    carregarConteudoIdioma();
}

function atualizarStatusNaTela() {
    document.getElementById("user-xp").innerText = usuario.xp;
    document.getElementById("user-streak").innerText = usuario.ofensiva;
}

function mudarIdioma(novoIdioma) {
    usuario.idiomaAtual = novoIdioma;
    usuario.indiceAtividade = 0;
    
    document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
    
    carregarConteudoIdioma();
    salvarDados();
}

function carregarConteudoIdioma() {
    const dados = dadosIdiomas[usuario.idiomaAtual];
    
    // Carregar Histórias
    const containerHistorias = document.getElementById("story-container");
    containerHistorias.innerHTML = "";
    dados.historias.forEach(h => {
        containerHistorias.innerHTML += `
            <div class="story-card">
                <h4>${h.titulo}</h4>
                <p style="font-size: 14px; margin-top: 5px;">${h.texto}</p>
            </div>
        `;
    });

    // Carregar Atividade Atual
    carregarAtividadeAtual();
}

let respondido = false;

function carregarAtividadeAtual() {
    respondido = false;
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("quiz-feedback").innerText = "";

    const listaAtividades = dadosIdiomas[usuario.idiomaAtual].atividades;
    
    // Se acabaram as lições desse idioma
    if(usuario.indiceAtividade >= listaAtividades.length) {
        document.getElementById("question-title").innerText = "🏆 Idioma Concluído por hoje! Mude de língua ou treine novamente.";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("quiz-progress").style.width = "100%";
        return;
    }

    const item = listaAtividades[usuario.indiceAtividade];
    
    // Barra de progresso
    const progresso = (usuario.indiceAtividade / listaAtividades.length) * 100;
    document.getElementById("quiz-progress").style.width = `${progresso}%`;

    // Título especial se for prova
    if(item.tipo === "prova") {
        document.getElementById("question-title").innerHTML = `<span style="color: var(--accent)">${item.q}</span>`;
    } else {
        document.getElementById("question-title").innerText = item.q;
    }

    // Carregar as opções em botões
    const containerOpcoes = document.getElementById("options-container");
    containerOpcoes.innerHTML = "";
    item.o.forEach((opcao, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-card";
        btn.innerText = opcao;
        btn.onclick = () => verificarResposta(idx, btn);
        containerOpcoes.appendChild(btn);
    });
}

function verificarResposta(idxSelecionado, botaoClicado) {
    if(respondido) return;
    respondido = true;

    const item = dadosIdiomas[usuario.idiomaAtual].atividades[usuario.indiceAtividade];
    const todosBotoes = document.querySelectorAll(".option-card");

    if(idxSelecionado === item.c) {
        botaoClicado.classList.add("correct");
        let xpGanhos = item.tipo === "prova" ? 30 : 10; // Prova dá mais pontos!
        usuario.xp += xpGanhos;
        document.getElementById("quiz-feedback").innerHTML = `<span style="color:var(--primary)">+${xpGanhos} XP! Resposta Perfeita! 🔥</span>`;
    } else {
        botaoClicado.classList.add("wrong");
        todosBotoes[item.c].classList.add("correct");
        document.getElementById("quiz-feedback").innerHTML = `<span style="color:#ff4b4b">Estude mais um pouco! A resposta certa ficou verde.</span>`;
    }

    atualizarStatusNaTela();
    salvarDados();
    document.getElementById("next-btn").classList.remove("hidden");
}

function proximaAtividade() {
    usuario.indiceAtividade++;
    salvarDados();
    carregarAtividadeAtual();
}
