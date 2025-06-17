const botao = document.getElementById('btnSalvar');


botao.addEventListener('click', 
    function(){
        let listaOrcamentos = JSON.parse(localStorage.getItem("orcamentos")) || [];
        const opcaoMensal = document.getElementById('sim').checked ? "Sim" : "Não";
        const precoTotal = calcularOrcamento();
        const orcamento = {
            nome: document.getElementById('nome').value,
            servico: document.getElementById('tipoServico').value,
            area: document.getElementById('areaTerreno').value,
            manutencaoMensal: opcaoMensal,
            precoTotal: precoTotal
        }

        const indexEditando = document.getElementById('indexEditar').value;
        if(indexEditando !== ""){
            listaOrcamentos[indexEditando] = orcamento;
            document.getElementById('indexEditar').value = "";
        } else{
            listaOrcamentos.push(orcamento);      
        }
        

        localStorage.setItem("orcamentos", JSON.stringify(listaOrcamentos));
        
        document.getElementById('nome').value = "";
        document.getElementById('areaTerreno').value = "";
        listar();
    }
) 


function calcularOrcamento(){
    const precoBase = 10;
    let precoFinal = 0;
    const areaTerreno = document.getElementById("areaTerreno").value;
    let opcao = document.getElementById('tipoServico').value;

    if(opcao === "Poda"){
        precoFinal += areaTerreno * precoBase;
    } else if(opcao === "Plantio"){
        precoFinal += areaTerreno * (precoBase + (20/100 * precoBase));
    } else if(opcao === "Manutenção Completa"){
        precoFinal += areaTerreno * (precoBase + (50/100 * precoBase));
    }

    if(document.getElementById('sim').checked){
        precoFinal += 100;
  
    } 
    return precoFinal;
}


function listar(){
    const listaOrcamentosCad = JSON.parse(localStorage.getItem("orcamentos")) || [];
    const tabela = document.getElementById('listaOrcamentos');
    tabela.innerHTML = "";

    listaOrcamentosCad.forEach((orcamento, index) =>{
        const linha = document.createElement('tr');
        linha.innerHTML = `
        <td>${orcamento.nome}</td>
        <td>${orcamento.servico}</td>
        <td>${orcamento.area}</td>
        <td>${orcamento.manutencaoMensal}</td>
        <td>R$${orcamento.precoTotal}</td>
        <td>
            <button class="btnEditar" onclick="editarOrcamento(${index})">Editar</button>
            <button class="btnExcluir" onclick="excluirOrcamento(${index})">Excluir</button>
        </td>`;
        tabela.appendChild(linha);
    });

}

function editarOrcamento(index){
    const listaOrcamentosCad = JSON.parse(localStorage.getItem("orcamentos")) || [];
    document.getElementById('nome').value = listaOrcamentosCad[index].nome;
    document.getElementById('areaTerreno').value = listaOrcamentosCad[index].area;
    document.getElementById('indexEditar').value = index;
}

function excluirOrcamento(index){
    const listaOrcamentosCad = JSON.parse(localStorage.getItem("orcamentos")) || [];
    if(confirm("Deseja excluir esse orçamento?")){
        listaOrcamentosCad.splice(index, 1);
        localStorage.setItem("orcamentos", JSON.stringify(listaOrcamentosCad));
        listar();
    }    
}



listar();