$(document).ready(function () {
    const inputNomePrato = document.getElementById('prato-nome');
    const inputQuantidade = document.getElementById('quantidade');
    const inputPreco = document.getElementById('preco');
    let q = [];
    let p = [];

    // Carregar dados do Local Storage
    function carregarDados() {
        const dados = JSON.parse(localStorage.getItem('dadosTabela')) || [];
        dados.forEach(dado => {
            q.push(dado.quantidade);
            p.push(dado.preco);
            adicionarLinha(dado.nome, dado.quantidade, dado.preco);
        });
    }

    // Submeter o formulário
    $('#form').submit(function (e) {
        e.preventDefault();
        adicionar();
    });

    // Adicionar item à tabela
    function adicionar() {
        let quantidade = parseFloat(inputQuantidade.value);
        let preco = parseFloat(inputPreco.value);
        let nome = inputNomePrato.value;

        q.push(quantidade);
        p.push(preco);

        adicionarLinha(nome, quantidade, preco);
        salvarDados();

        document.querySelector('#prato-nome').value = '';
        document.querySelector('#quantidade').value = '';
        document.querySelector('#preco').value = '';
    }

    // Adicionar linha à tabela
    function adicionarLinha(nome, quantidade, preco) {
        let index = q.length - 1; // Obtém o índice da nova linha
        let lista = `<tr data-index="${index}">
            <td>${nome}</td>
            <td>${quantidade}</td>
            <td>${preco}</td>
            <td><button class="delete-btn">Excluir</button></td>
        </tr>`;

        document.querySelector('tbody').innerHTML += lista;
        document.querySelector('.ttt').innerHTML = calculo();
        adicionarEventosDeExclusao();
    }

    // Salvar dados no Local Storage
    function salvarDados() {
        let dados = [];
        document.querySelectorAll('tbody tr').forEach((row, index) => {
            dados.push({
                nome: row.children[0].textContent,
                quantidade: q[index],
                preco: p[index]
            });
        });
        localStorage.setItem('dadosTabela', JSON.stringify(dados));
    }

    // Adicionar eventos de exclusão
    function adicionarEventosDeExclusao() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                let row = button.closest('tr');
                let index = row.getAttribute('data-index');
                removerLinha(index, row);
            });
        });
    }

    // Remover linha da tabela
    function removerLinha(index, row) {
        q.splice(index, 1);
        p.splice(index, 1);

        row.remove(); // Remove apenas a linha clicada

        // Atualizar os índices das linhas restantes
        document.querySelectorAll('tbody tr').forEach((tr, i) => {
            tr.setAttribute('data-index', i);
        });

        salvarDados();
        document.querySelector('.ttt').innerHTML = calculo();
    }

    // Calcular o total
    function calculo() {
        let total = 0;
        for (let i = 0; i < q.length; i++) {
            total += q[i] * p[i];
        }
        return total;
    }

    carregarDados();
});