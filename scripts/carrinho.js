
var valorTotal = 0; // Variável de somatório
var valor = document.querySelector('#Total > span'); // Objeto para escrita do somatório
var lista = []; // Lista vazia de elementos

document.getElementById('finalizar-btn').style.display = 'none';

function adicionar(imagem, preco) {
    if (!lista.includes(imagem)) {
        document.querySelector('.layout-conteudo > .titulo > .carrinho-img-btn > img').src = '../icones produtos/cart-download-solid-48.png';

         // Cria uma linha
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        /*Elementos para adicionar em td3*/
        let span = document.createElement('span');
        let remover = document.createElement('img');
        let remover_div = document.createElement('div');

        span.innerText = preco;
        remover.src = '../icones produtos/trash-regular-48.png';
        remover_div.classList.add('btn-remover');
        remover_div.appendChild(remover);

        td1.innerHTML = `
        <img src="${imagem}">`;

        td2.innerHTML = `
        <div id="container">
            <div class="btn-menos">
                <img src="../icones produtos/minus-regular-48.png">
            </div>

            <div class="quantidade">
                <span>${1}</span>
            </div>

            <div class="btn-mais">
                <img src="../icones produtos/plus-regular-48.png">
            </div>
        </div>`;
        td2.style.alignItems = 'center';

        td3.classList.add('valor');

        let div = document.createElement('div');
        div.appendChild(span);
        div.appendChild(remover_div);

        td3.appendChild(div);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        document.getElementById('carrinho').appendChild(tr);

        lista.push(imagem); // Insere o elemento na lista

        valorTotal += parseFloat(String(preco).replace(',', '.'));
        valor.innerText = String(valorTotal.toFixed(2)).replace('.', ',');
        document.getElementById('finalizar-btn').style.display = 'block';

        // Função de adicionar
        let quantidade = td2.querySelector('.quantidade > span');
        let btn_mais = td2.querySelector('.btn-mais');

        btn_mais.addEventListener('click', function () {
            let qnt = parseInt(quantidade.innerText);
            let precoUnitario = parseFloat(String(preco).replace(',', '.'));

            qnt += 1;
            quantidade.innerText = qnt;

            valorTotal += precoUnitario;
            valor.innerText = String(valorTotal.toFixed(2)).replace('.', ',');

            let precoTotal = precoUnitario * qnt;
            span.innerText = String(precoTotal.toFixed(2)).replace('.', ',');
        })

        // Função de remover
        let btn_menos = td2.querySelector('.btn-menos');

        btn_menos.addEventListener('click', function () {
            let qnt = parseInt(quantidade.innerText);
            let precoUnitario = parseFloat(String(preco).replace(',', '.'));

            if (qnt > 1) {
                qnt -= 1;
                quantidade.innerText = qnt;

                valorTotal -= precoUnitario;
                if(valorTotal < 0) valorTotal = 0;
                valor.innerText = String(valorTotal.toFixed(2)).replace('.', ',');

                let precoTotal = precoUnitario * qnt;
                span.innerText = String(precoTotal.toFixed(2)).replace('.', ',');
            }
        })

        remover_div.addEventListener("click", function () { // Cada botão contém uma função remover
            tr.remove();

            let qnt = parseInt(quantidade.innerText);
            let precoUnitario = parseFloat(String(preco).replace(',', '.'));

            valorTotal -= precoUnitario * qnt;
            if(valorTotal < 0) valorTotal = 0;
            valor.innerText = String(valorTotal.toFixed(2)).replace('.', ',');

            lista = lista.filter(function (objeto) { // Remove o elemento da lista
                return objeto !== imagem;
            });

            if (lista.length === 0) {
                document.querySelector('.layout-conteudo > .titulo > .carrinho-img-btn > img').src = '../icones produtos/cart-solid-48.png';
                document.getElementById('finalizar-btn').style.display = 'none';
            }
        })
    }
}

//Notificação da compra
function compraMsg() {
    let total = document.getElementById('Total').innerText;
    let mensagem = `Compra finalizada. ${total}`;
    alert(mensagem);
}

//Carrinho
function mostrarCarrinho() {
    document.querySelector('.layout-conteudo').style.display = 'none';
    document.querySelector('#layout-carrinho').style.display = 'block';
}

function mostrarProdutos() {
    document.querySelector('.layout-conteudo').style.display = 'block';
    document.querySelector('#layout-carrinho').style.display = 'none';
}