// Banco de dados expandido com Identidades Visuais, Mascotes e Auxílio para Iniciantes
const dadosIdiomas = {
    ingles: {
        nomeExibicao: "🇺🇸 Inglês",
        classeTema: "tema-ingles",
        mascote: "🦅",
        saudacaoMascote: "Hello! Eu sou o Eagle, a Águia Americana! Vamos dominar o inglês juntos?",
        historias: [
            { titulo: "⚔️ Século V - Origem Germânica", texto: "Tribos como Anglos e Saxões invadiram a ilha da Bretanha trazendo dialetos que formaram o 'Old English'." },
            { titulo: "👑 Ano 1066 - Influência Francesa", texto: "Os normandos franceses assumiram o trono. O povo falava inglês e os reis francês, misturando os dois idiomas!" },
            { titulo: "✍️ Século XVI - Era Shakespeare", texto: "O famoso escritor William Shakespeare inventou mais de 1.700 palavras sozinho que são usadas até hoje." }
        ],
        atividades: [
            { 
                dica: "💡 **Dica de associação:** Pense no período do dia. 'Morning' lembra o nascer do sol!",
                q: "Como se diz 'Bom dia'?", 
                o: ["Good afternoon", "Good morning", "Good night", "Good evening"], 
                c: 1, 
                tipo: "normal" 
            },
            { 
                dica: "💡 **Dica de som:** A palavra 'Water' soa parecido com 'uó-ter'. É vital para a vida.",
                q: "Qual o significado de 'Water'?", 
                o: ["Comida", "Fogo", "Sol", "Água"], 
                c: 3, 
                tipo: "normal" 
            },
            { 
                dica: "⚡ **DESAFIO DE PROVA:** Hora de testar sua escuta mental!",
                q: "Traduza: 'The dog is happy'", 
                o: ["O cachorro está feliz", "O gato está correndo", "O pássaro voou", "O cachorro está bravo"], 
                c: 0, 
                tipo: "prova" 
            }
        ]
    },
    espanhol: {
        nomeExibicao: "🇪🇸 Espanhol",
        classeTema: "tema-espanhol",
        mascote: "🐂",
        saudacaoMascote: "¡Hola! Sou o Toro, o Touro de Castela! Preparado para dar um show de ritmo?",
        historias: [
            { titulo: "🏰 O Latim Vulgar", texto: "Soldados romanos levaram o latim para a Península Ibérica. O isolamento das regiões criou o Castelhano." },
            { titulo: "🕌 Influência Árabe", texto: "Por quase 800 anos, os árabes viveram na Espanha. Por isso, mais de 4.000 palavras em espanhol vêm do árabe!" }
        ],
        atividades: [
            { 
                dica: "💡 **Dica de associação:** Lembra muito a nossa palavra 'Amigo', só muda a pronúncia!",
                q: "Como se diz 'Amigo'?", 
                o: ["Hermano", "Chico", "Amigo", "Señor"], 
                c: 2, 
                tipo: "normal" 
            },
            { 
                dica: "💡 **Dica visual:** 'Gato' escreve exatamente igual ao português. Facinho!",
                q: "Como se traduz 'El gato'?", 
                o: ["O cachorro", "O gato", "O rato", "O pássaro"], 
                c: 1, 
                tipo: "normal" 
            }
        ]
    },
    frances: {
        nomeExibicao: "🇫🇷 Francês",
        classeTema: "tema-frances",
        mascote: "🐓",
        saudacaoMascote: "Bonjour! Sou o Coq, o Galo de Versalhes! Vamos aprender a língua mais charmosa do mundo?",
        historias: [
            { titulo: "🍷 Os Celtas e Romanos", texto: "O francês nasceu da mistura do latim romano com a língua dos povos Gauleses (os antigos celtas)." },
            { titulo: "🎭 Idioma da Diplomacia", texto: "Durante séculos, o francês foi a língua oficial de todas as cortes e reis da Europa devido ao seu prestígio." }
        ],
        atividades: [
            { 
                dica: "💡 **Dica de etiqueta:** É usado para agradecer gentilmente por um favor.",
                q: "O que significa 'Merci'?", 
                o: ["Por favor", "De nada", "Obrigado", "Desculpe"], 
                c: 2, 
                tipo: "normal" 
            }
        ]
    },
    japones: {
        nomeExibicao: "🇯🇵 Japonês",
        classeTema: "tema-japones",
        mascote: "🦊",
        saudacaoMascote: "Konnichiwa! Sou a Kitsune, a Raposa Mágica! Vamos dominar os primeiros traços orientais?",
        historias: [
            { titulo: "🌸 Raízes Isoladas", texto: "Por ser uma ilha, o Japão desenvolveu uma fala única, adotando os caracteres chineses (Kanji) mais tarde." },
            { titulo: "📜 Os Três Alfabetos", texto: "O japonês moderno usa Hiragana (palavras nativas), Katakana (palavras estrangeiras) e Kanji (ideogramas)." }
        ],
        atividades: [
            { 
                dica: "💡 **Dica fonética:** Soa como 'Ari-gato'. É o agradecimento mais famoso dos animes!",
                q: "Como se diz 'Obrigado' em Japonês?", 
                o: ["Konnichiwa", "Sayonara", "Arigatou", "Sumimasen"], 
                c: 2, 
                tipo: "normal" 
            }
        ]
    }
};

let usuario = {
    nome: "",
    xp: 0,
    ofensiva: 1,
    idiomaAtual: "ingles",
    indiceAtividade: 0
};

window.onload = function() {
    const salvo = localStorage.getItem("glowlingo_user");
    if(salvo) {
        usuario = JSON.parse(salvo);
        carregarPainelPrincipal();
    }
}

function fazerCadastro() {
    const inputNome = document.getElementById("username").value.trim();
    if(inputNome === "") return alert("Insira um nome válido!");
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
    gerarBotoesIdiomas();
    carregarConteudoIdioma();
}

function atualizarStatusNaTela() {
    document.getElementById("user-xp").innerText = usuario.xp;
    document.getElementById("user-streak").innerText = usuario.ofensiva;
}

// Cria os botões da barra lateral baseando-se nas chaves do banco de dados
function gerarBotoesIdiomas() {
    const container = document.querySelector(".lang-selector");
    container.innerHTML = "";
    Object.keys(dadosIdiomas).forEach(chave => {
        const lang = dadosIdiomas[chave];
        const ativo = chave === usuario.idiomaAtual ? "active" : "";
        container.innerHTML += `<button class="lang-btn ${ativo}" onclick="mudarIdioma('${chave}')">${lang.nomeExibicao}</button>`;
    });
}

function mudarIdioma(novoIdioma) {
    usuario.idiomaAtual = novoIdioma;
    usuario.indiceAtividade = 0;
    
    gerarBotoesIdiomas();
    carregarConteudoIdioma();
    salvarDados();
}

function carregarConteudoIdioma() {
    const dados = dadosIdiomas[usuario.idiomaAtual];
    
    // Troca de Tema Visual no Body
    document.body.className = ""; 
    document.body.classList.add(dados.classeTema);

    // Atualiza Mascote e Painel Interativo
    const bannerMascote = document.getElementById("story-container").parentElement.previousElementSibling;
    if (!document.getElementById("banner-mascote-dinamico")) {
        const novoBanner = document.createElement("div");
        novoBanner.id = "banner-mascote-dinamico";
        novoBanner.className = "mascot-banner";
        bannerMascote.parentNode.insertBefore(novoBanner, bannerMascote);
    }
    document.getElementById("banner-mascote-dinamico").innerHTML = `
        <span class="mascot-avatar">${dados.mascote}</span>
        <div class="mascot-bubble">${dados.saudacaoMascote}</div>
    `;
    
    // Carrega Histórias Dinâmicas em formato de Linha do Tempo rolável
    const containerHistorias = document.getElementById("story-container");
    containerHistorias.className = "story-scroll";
    containerHistorias.innerHTML = "";
    dados.historias.forEach(h => {
        containerHistorias.innerHTML += `
            <div class="story-card">
                <h4 style="color:var(--theme-secondary); font-weight:800;">${h.titulo}</h4>
                <p style="font-size: 14px; margin-top: 8px; line-height:1.4;">${h.texto}</p>
            </div>
        `;
    });

    carregarAtividadeAtual();
}

let respondido = false;

function carregarAtividadeAtual() {
    respondido = false;
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("quiz-feedback").innerText = "";

    const listaAtividades = dadosIdiomas[usuario.idiomaAtual].atividades;
    const containerOpcoes = document.getElementById("options-container");
    
    if(usuario.indiceAtividade >= listaAtividades.length) {
        document.getElementById("question-title").innerText = "🎉 Parabéns! Você completou todas as tarefas desse idioma por hoje!";
        containerOpcoes.innerHTML = "";
        document.getElementById("quiz-progress").style.width = "100%";
        // Remove a caixa de dica temporariamente
        if(document.getElementById("dica-aula")) document.getElementById("dica-aula").remove();
        return;
    }

    const item = listaAtividades[usuario.indiceAtividade];
    const progresso = (usuario.indiceAtividade / listaAtividades.length) * 100;
    document.getElementById("quiz-progress").style.width = `${progresso}%`;

    // Inserção da área de dicas facilitadoras para novatos
    if(!document.getElementById("dica-aula")) {
        const dicaDiv = document.createElement("div");
        dicaDiv.id = "dica-aula";
        dicaDiv.className = "tip-box";
        document.getElementById("question-title").parentNode.insertBefore(dicaDiv, document.getElementById("question-title"));
    }
    document.getElementById("dica-aula").innerHTML = item.dica;

    if(item.tipo === "prova") {
        document.getElementById("question-title").innerHTML = `<span style="color: var(--theme-secondary)">🔥 EXAME DE CORES: ${item.q}</span>`;
    } else {
        document.getElementById("question-title").innerText = item.q;
    }

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
        let pontos = item.tipo === "prova" ? 40 : 15;
        usuario.xp += pontos;
        document.getElementById("quiz-feedback").innerHTML = `<span style="color:var(--success)"> Perfeito! +${pontos} XP na conta! ✨</span>`;
    } else {
        botaoClicado.classList.add("wrong");
        todosBotoes[item.c].classList.add("correct");
        document.getElementById("quiz-feedback").innerHTML = `<span style="color:#ff4b4b">Quase lá! O boneco te mostra a resposta certa em verde!</span>`;
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
