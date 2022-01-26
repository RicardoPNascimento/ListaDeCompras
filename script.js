//linkando o botao adicionar
let produtos = [];
let i = 0;
let botaoSalvar=document.getElementById('botaoSalvar')
let botaoCancelar=document.getElementById('botaoCancelar')
let botaoAdicionar=document.getElementById('botaoAdicionar')

function adicionar(){
    let produto = document.querySelector("#inputProduto").value
    let verTela = document.querySelector(".listaProduto")
    produtos.push(produto)
    

   verTela.innerHTML +=`
  
       
  
          <tr>
            
            <td>${produto}</td>
            <td></td>
            <td></td>
            <td>
              <button onclick="editar('${produtos[i]}')" id="icbutton" data-bs-toggle="modal" data-bs-target="" class="btn btn-dark">Editar</button>
              <button  onclick="Limpar('${produtos[i]}')" id="deletebutton" class="btn btn-dark">Excluir</button>
            </td>
          </tr>
        
      
   `
   
   i++;
    console.log(produto)
}

function Limpar(name_product){
    let indice = produtos.indexOf(name_product)
    produtos.splice(indice,1)
    let refresh = 0
    let verTela = document.querySelector(".listaProduto")
    verTela.innerHTML=''
    while (refresh<produtos.length){
         verTela.innerHTML +=`
         
         <tr>
         <td>${produtos[refresh]}</td>
         <td></td>
         <td></td>
         <td>
           <button id="icbutton" data-bs-toggle="modal" data-bs-target="">Editar</button>
           <button  onclick="Limpar('${produtos[refresh]}')" id="deletebutton">Excluir</button>
         </td>
       </tr>
     
     
      `
      refresh++
    }
      
      
}

function limpartudo(){
    for (x=0;x=produtos.length;x++){
        produtos.pop(x)
        console.log('excluiu')
    }
    let verTela = document.querySelector(".listaProduto")
    verTela.innerHTML=''
}

function editar(){
    
    botaoSalvar.style.display='inline-block'
    botaoCancelar.style.display='inline-block'
    botaoAdicionar.style.display='none'
}

function cancelar(){
    
    botaoSalvar.style.display='none'
    botaoCancelar.style.display='none'
    botaoAdicionar.style.display='inline-block'
}

function salvar(name_product){
    let indice = produtos.indexOf(name_product)
    
    botaoSalvar.style.display='none'
    botaoCancelar.style.display='none'
    botaoAdicionar.style.display='inline-block'
    console.log(indice)
}










