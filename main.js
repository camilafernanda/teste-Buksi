let todosOsLivros = [];

function perguntaNome() {
    let nome = window.prompt("Qual o seu nome?");
    let elementoNome = document.querySelector("#nome");
    elementoNome.innerHTML = nome;
}

function adicionaLivro() {
    // Guardando os valores dos inputs
    let tituloLivro = document.querySelector("#titulo");
    let autorLivro = document.querySelector("#autor");
    let capaLivro = document.querySelector("#capa_livro");
    let paginasLidas = document.querySelector("#paginas_lidas");
    let totalPaginas = document.querySelector("#total_paginas");
    let lido;

    // Criando o objeto livro
    let livro = {
        titulo: tituloLivro.value,
        autor: autorLivro.value,
        capa: capaLivro.value,
        paginas: totalPaginas.value,
        paginasLidas: paginasLidas.value,
        lido: lido
    };

    todosOsLivros.push(livro);
    console.log(todosOsLivros);

    adicionaLivroNaLista(livro);
    contaPaginas();

    event.preventDefault(); //Para a página não atualizar e ser resetada

}

function adicionaLivroNaLista(livro) {
    listaLivrosNaoLidos = document.querySelector("#lista_livros_nao_lidos");
    listaLivrosLidos = document.querySelector("#lista_livros_lidos");

    let elementoArticle = document.createElement("article");
    let elementoImagem = document.createElement("img");
    let elementoTitulo = document.createElement("h1");
    let elementoAutor = document.createElement("p");
    let inputLeitura = document.createElement("input");
    let elementoBotaoDelete = document.createElement("button");

    elementoImagem.src = livro.capa;
    elementoTitulo.innerText = livro.titulo;
    elementoAutor.innerText = livro.autor;
    inputLeitura.type = "range";
    elementoBotaoDelete.innerText = "X Deletar";

    elementoBotaoDelete.className = "botao-simples-texto";
    elementoArticle.className = "livro";
    

    elementoArticle.appendChild(elementoImagem);
    elementoArticle.appendChild(elementoTitulo);
    elementoArticle.appendChild(elementoAutor);
    elementoArticle.appendChild(elementoBotaoDelete);

    

    if (livro.paginasLidas == livro.paginas) {
        livro.lido = true;
        listaLivrosLidos.appendChild(elementoArticle);

        console.log("o livro foi lido!");
    } else {
        livro.lido = false;
        inputLeitura.type = "range";
        inputLeitura.min = 0;
        inputLeitura.value = livro.paginasLidas;
        inputLeitura.max = livro.paginas;
        elementoArticle.appendChild(inputLeitura);
        listaLivrosNaoLidos.appendChild(elementoArticle);

        marcarComoLido(inputLeitura, livro, elementoArticle, elementoBotaoDelete);

        console.log("o livro não foi lido!");
    }
    
    deletaLivro(elementoBotaoDelete, elementoArticle);
}

function deletaLivro(elementoBotaoDelete, elementoArticle, livro) {
    elementoBotaoDelete.addEventListener("click", function(){
        lista.removeChild(elementoArticle);
        let posicao = todosOsLivros.indexOf(livro);
        todosOsLivros.splice(posicao, 1);
        contaPaginas();
    });
}

function marcarComoLido(inputLeitura, livro, elementoArticle, elementoBotaoDelete) {

    inputLeitura.addEventListener("change", function (evento) {
        paginaAtual = evento.target.value;
        livro.paginasLidas = paginaAtual;
        contaPaginas();

        if (paginaAtual == livro.paginas) {
            livro.lido = true;

            livrosNaoLidos.removeChild(elementoArticle);
            elementoArticle.querySelector("input").remove();
            listaLivrosLidos.appendChild(elementoArticle);

            deletaLivro(elementoBotaoDelete, livro, elementoArticle, livrosLidos);
            
        }

    });
    
}

function contaPaginas() {

    let posicao;
    let totalPaginasTodosLivros = 0;
    let totalPaginasLidas = 0;
    let totalPaginasNaoLidas = 0;
    let porcentagem = 0;

    for (posicao = 0; posicao < todosOsLivros.length; posicao++) {
        totalPaginasTodosLivros += Number(todosOsLivros[posicao].paginas);
        totalPaginasLidas += Number(todosOsLivros[posicao].paginasLidas);
        totalPaginasNaoLidas = Number(totalPaginasTodosLivros - totalPaginasLidas);
    }

    porcentagem = (totalPaginasLidas * 100) / totalPaginasTodosLivros;

    // Atualizando os valores na página
    let elementoTotalPaginasLidas = document.querySelector("#total_paginas_lidas");
    elementoTotalPaginasLidas.innerHTML = totalPaginasLidas;

    let elementoPaginasFaltantes = document.querySelector("#paginas_faltantes");
    elementoPaginasFaltantes.innerHTML = totalPaginasNaoLidas;

    let elementoPorcentagem = document.querySelector("#campo_porcentagem");
    elementoPorcentagem.innerHTML = porcentagem.toFixed(2) + "%";
}