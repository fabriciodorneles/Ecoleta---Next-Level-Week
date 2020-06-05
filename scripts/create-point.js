function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        // .then( (res) => {return res.json()})
        .then( res => res.json())
            .then(states => {
                for( state of states){
                    ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
                }

            } )
}

populateUFs();


// ele tá declarando o argumento event para pegar o target do evento ali embaixo
function getCities(event) {
    // aqui ele ta localizando o select com id City
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]") //pode ser assim tb
    
    // aqui ele tá pegando o value do estado selecionado(passado pelo event)
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "Selecione a Cidade";
    citySelect.disabled = true;
    
    fetch(url)
        // .then( (res) => {return res.json()})
        .then( res => res.json())
            .then(cities => {
                for( city of cities){
                    citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}</option>`
                }
                citySelect.disabled = false;
            } )
    

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
//pegar todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//faz essa variável apontar para o tag input de nome itens
const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //ADD OR REMOVE CLASS, TOOGLE(ON/OFF)
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    //verificar se existem os itens selecionados
    //pegar os itens selecionados
    //FINDINDEXOF COM PARAMETROS / PASSANDO  FUNÇÕES / SIMPLIFICANDO FUNÇÕES
    //FUNÇÃO EXTENSA E COM EXPLICAÇÃO
    // const alreadySelected = selectedItems.findIndex(function(item) {//oque confunde aqui é que essa find index quando dá TRUE ela já retorna e para, se não vai até o final e dá false.
                                                                        // e ainda ela retorna -1 se é FALSE e o INDEX do Array se é TRUE
    //     const itemFound = item == itemId // a const itemFound é igual à comparação de item com itemId
    //     return itemFound
    // })
    //SIMPLIFICANDO
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    // se ja tiver selecionado 
    if(alreadySelected >= 0) {
        //tirar a seleção
        const filteredItems = selectedItems.filter(item => {  //essa função tb passa por todos os items, caso ela vai tirar um elemento desse array e adicionar o elemento num novo array
                                                                    //ele vai fazer isso sempre que a função for FALSE
            return item != itemId
        })

        selectedItems = filteredItems
    } else {
        //se não estiver selecionado adicionar à seleção
        selectedItems.push(itemId)
    }
    // atualizar o campo escondido
    collectedItems.value = selectedItems
    
}
