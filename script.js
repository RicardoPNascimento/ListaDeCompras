let produtos = []; //aqui é o meu array onde ficará os nomes dos produtos
let i = 0;       //defini uma variavel de contagem , usada para varrer e imprimir o array novamente (refresh)    
let botaoSalvar = document.getElementById("botaoSalvar");//DOM
let botaoCancelar = document.getElementById("botaoCancelar");
let botaoAdicionar = document.getElementById("botaoAdicionar");
let people = [];     //crei meu array de objetos para adicionar o nome e email (API)  

function recupDados() {       //fazer requisição externa em JS
  fetch("https://randomuser.me/api/?results=1%27%27") //onde pegaremos os dados ,get é método padrão
    .then((resp) => resp.json())           //se deu certo execute, converter pra json , pq ela retorna se teve resultado ou não , tempo para recuperar para json
    .then(function (data) {               //informações obtidas ,data resp.(json)
      let authors = data.results;
      return authors.map(function (author) {   //map serve pra mapear
        let name = author.name.first;    //crie duas variaveis pra salvar os valores(name e email)
        let email = author.email;
        people.push({ name, email });//adiciona o elemento ao final do array,no caso um OBJETO
      });
    })
    .catch(function (error) {        //se deu errado
      console.log(error);
    });

  
}
recupDados();    //chamei a função recupDados

function adicionar() {   //botão adicionar
  let inicio =  document.querySelector(".headTable") //se eu tiver na parte do headTable apenas, então remova headTable,query selector (geral)
  if (inicio){
    inicio.classList.remove("headTable")


  }


  let produto = document.querySelector("#inputProduto").value; //estou pegando do meu HTML o valor digitado no input quando clica no botaão adicionar
  let verTela = document.querySelector(".listaProduto");   //chamei minha tbody da tabela do HTML
  produtos.push(produto);      //adicionei o elemento no meu array produtos
  
  
  verTela.innerHTML += ` 
  
       
  
          <tr>
            
            <td>${produto}</td>
            <td>${people[i].name}</td>
            <td>${people[i].email}</td>
            <td>
              <button onclick="editar('${produtos[i]}')" id="icbutton"  class="btn btn-dark">Editar</button>
              <button  onclick="Limpar('${produtos[i]}')" id="deletebutton" class="btn btn-dark">Excluir</button>
            </td>
          </tr>
        
      
   `;

  i++;//para cada item que eu adicionar vou imprimir as linha na tabela
  console.log(produto)
  document.querySelector("#inputProduto").value = "";  //limpo o input após adicionar um item
  recupDados(); //chamo o meu API novamente para adicionar outro ele mento no array people
}

function Limpar(name_product) {
  let indice = produtos.indexOf(name_product);//estou usando o name_product para acessar o ${produto[i]} e saber qual o índice atraves do indexOf
  produtos.splice(indice, 1);  //apaguei item pelo índice
  let refresh = 0;
  let verTela = document.querySelector(".listaProduto"); //acessei novamente minha tabela
  verTela.innerHTML = ""; //limpei minha tela HTML o body da minha tabela
  while (refresh < produtos.length) { //enquanto houver produtos vou printar a tela com o indice refresh para que eu possa limpa outros produtos
    verTela.innerHTML += `
         
         <tr>
         <td>${produtos[refresh]}</td>
         <td>${people[refresh].email}</td>
         <td>${people[refresh].name}</td>
         <td>
           <button id="icbutton" class="btn btn-dark">Editar</button>
           <button  onclick="Limpar('${produtos[refresh]}')" id="deletebutton" class="btn btn-dark">Excluir</button> 
         </td>
       </tr>
     
     
      `;
    refresh++; //índice do refresh
  }
  
}


function limpartudo() {
  for (x = 0; (x = produtos.length); x++) { //percorro todo meu array e apago cada item apartir do último
    produtos.pop(x);
   
  }
  let verTela = document.querySelector(".listaProduto"); // posso colocar no escopo global ,aqui acesso minha tabela
  verTela.innerHTML = ""; //dou um refresh no html 
}

  
function editar(name_product) {
  let indice = produtos.indexOf(name_product); //estou acessando o produto que quero editar
  ind = indice;  //aqui eu salvei o indice do produto a ser editado

  botaoSalvar.style.display = "inline-block";   //mostrar o botão salvar
  botaoCancelar.style.display = "inline-block";  //mostrar botão cancelar
  botaoAdicionar.style.display = "none";           //esconde botão salvar
  document.querySelector("#inputProduto").value = name_product; //ele retorna para o inpute o nome que vai ser editado , ele prenche para mim 
  
}

function cancelar() {
  botaoSalvar.style.display = "none";  //quando chamo função cancelar botões salvar e cancelar somem
  botaoCancelar.style.display = "none"; //
  botaoAdicionar.style.display = "inline-block";
  document.querySelector("#inputProduto").value = "";//apago o valor que esta no input
}

function salvar() { //posso usa várias vezes a função refresh logo preciso de um contador
  let refresh = 0; //
  let newproduct = document.querySelector("#inputProduto").value; //nova variavél pra guarda o novo produto(valor)
  let verTela = document.querySelector(".listaProduto"); //chamei minha tbody do HTML
  botaoSalvar.style.display = "none"; //escondo os botões salvar e cancelar
  botaoCancelar.style.display = "none";
  botaoAdicionar.style.display = "inline-block";//mostro botão adicionar novamente
  console.log(ind);  //posso apagar ?
  produtos.splice(ind, 1, newproduct);//apago o item e adiciono o novo , ind traz da funçao editar o número do índice

  verTela.innerHTML = "";// limpei a tela
  while (refresh < produtos.length) {  //atualizo minha tela e atualizo ,como refresh é o mesmo valor so que atualizado ele vai imprimir toda a tabela atualizada
    verTela.innerHTML += `
         
         <tr>
         <td>${produtos[refresh]}</td>
         <td>${people[refresh].name}</td>
         <td>${people[refresh].email}</td>
         <td>
           <button id="icbutton" onclick="editar('${produtos[refresh]}')" class="btn btn-dark">Editar</button>
           <button  onclick="Limpar('${produtos[refresh]}')" id="deletebutton" class="btn btn-dark">Excluir</button>
         </td>
       </tr>
     
     
      `;
    refresh++;
  }
  document.querySelector("#inputProduto").value = ""; //apago o valor que estiver no input
}


