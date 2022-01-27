//linkando o botao adicionar

let produtos = []; //aqui é o meu array onde ficará os nomes dos produtos
let i = 0;       //defini uma variavel de contagem , usada para varrer e imprimir o array novamente (refresh)    
let botaoSalvar = document.getElementById("botaoSalvar");
let botaoCancelar = document.getElementById("botaoCancelar");
let botaoAdicionar = document.getElementById("botaoAdicionar");
let people = [
  {
    nome: "",
    email: "",
  },
];

function recupDados() {
  fetch("https://randomuser.me/api/?results=1%27%27")
    .then((resp) => resp.json())
    .then(function (data) {
      let authors = data.results;
      return authors.map(function (author) {
        let name = author.name.first;
        let email = author.email;
        people.push({ email, name });
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  
}
people.shift();
recupDados();

function adicionar() {
  let inicio =  document.querySelector(".headTable")
  if (inicio){
    inicio.classList.remove("headTable")
  }


  let produto = document.querySelector("#inputProduto").value;
  let verTela = document.querySelector(".listaProduto");
  produtos.push(produto);
  // if (i === 0) {
  //   document.querySelector(".table-primary").innerHTML=`
  //   <thead id="headTable" style="text-align:center;"> 
  //             <tr>
  //               <th scope="col">Nome do Produto</th>
  //               <th scope="col">Resp. Compra</th>
  //               <th scope="col">Email</th>
  //             </tr>
  //           </thead>
  //   `
    
  // }
 console.log(i)
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

  i++;
  console.log(produto)
  document.querySelector("#inputProduto").value = "";
  recupDados();
}

function Limpar(name_product) {
  let indice = produtos.indexOf(name_product);
  produtos.splice(indice, 1);
  let refresh = 0;
  let verTela = document.querySelector(".listaProduto");
  verTela.innerHTML = "";
  while (refresh < produtos.length) {
    verTela.innerHTML += `
         
         <tr>
         <td>${produtos[refresh]}</td>
         <td>${people[refresh].email}</td>
         <td>${people[refresh].name}</td>
         <td>
           <button id="icbutton" >Editar</button>
           <button  onclick="Limpar('${produtos[refresh]}')" id="deletebutton">Excluir</button>
         </td>
       </tr>
     
     
      `;
    refresh++;
  }
}

function limpartudo() {
  for (x = 0; (x = produtos.length); x++) {
    produtos.pop(x);
    console.log("excluiu");
  }
  let verTela = document.querySelector(".listaProduto");
  verTela.innerHTML = "";
}

function editar(name_product) {
  let indice = produtos.indexOf(name_product);
  ind = indice;

  botaoSalvar.style.display = "inline-block";
  botaoCancelar.style.display = "inline-block";
  botaoAdicionar.style.display = "none";
  document.querySelector("#inputProduto").value = name_product;
  
}

function cancelar() {
  botaoSalvar.style.display = "none";
  botaoCancelar.style.display = "none";
  botaoAdicionar.style.display = "inline-block";
  document.querySelector("#inputProduto").value = "";
}

function salvar() {
  let refresh = 0;
  let newproduct = document.querySelector("#inputProduto").value;
  let verTela = document.querySelector(".listaProduto");
  botaoSalvar.style.display = "none";
  botaoCancelar.style.display = "none";
  botaoAdicionar.style.display = "inline-block";
  console.log(ind);
  produtos.splice(ind, 1, newproduct);

  verTela.innerHTML = "";
  while (refresh < produtos.length) {
    verTela.innerHTML += `
         
         <tr>
         <td>${produtos[refresh]}</td>
         <td>${people[refresh].name}</td>
         <td>${people[refresh].email}</td>
         <td>
           <button id="icbutton" onclick="editar('${produtos[refresh]}')" >Editar</button>
           <button  onclick="Limpar('${produtos[refresh]}')" id="deletebutton">Excluir</button>
         </td>
       </tr>
     
     
      `;
    refresh++;
  }
  document.querySelector("#inputProduto").value = "";
}

//  let tb = document.getElementById("headTable");
//  console.log(tb.style.display)
// if (produtos.length ==0){
//   tb.style.display = "block";
//   console.log(tb)
// }


