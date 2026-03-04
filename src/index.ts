let x:number = 10

let nome:string = "Kaynan"

let vetor:number[] = [1,2,3,4,5]

let nomes:string[] = ["oi","olá"]
console.log(nomes)

//Teste

let bol:boolean = true;

bol = false

const variavel:any = "oi"

const a:undefined = undefined;

const obj:{id:number;nome:string;idade:number} = {
    id:1,
    nome:"Kaynan",
    idade:31
}
obj.id=2
obj.nome = "Vitor"
obj.idade=32

// obj={
//     id:2,
//     nome:"Tere",
//     idade:31
// }

const x1 = 10

const vetor1: number[] = [0,1,2,3,4]
vetor1[0] = 10

// asdfasdg = [0,1,2,3,4]

let vetor2: number[] = [0,1,2,3,4]
vetor2 = [0,1,2,3,4]

let outraletra: number|string = 10 ;
outraletra="Kaynan"

const obj1:{id?:number;nome:string;idade:number} = {
    id:1,
    nome:"Kaynan",
    idade:31
}

type Pessoa = {id?:number;nome:string;idade:number}

const p:Pessoa={
    id:10,
    nome:"Qualquer coisa",
    idade:32
}
const p1:Pessoa={
    id:10,
    nome:"Qualquer coisa",
    idade:32
}

// Funções no javascript/typescript

const f =  (variavel:number):number=>10
// const f = nomeFuncao
const f3 = f(10)
// const f2 = nomeFuncao(10)

console.log("O valor de x é " +f3.toString())

// Terminem essa função pra retornar a soma de todos
// Os elementos de um vetor.
// somaVetor([1,2,3]) => 6
// somaVetor([1,2,3,4]) => 10
function somaVetor(vetor: number[]): number {
   let soma = 0

   for (let i = 0; i < vetor.length; i++) {
      const element = vetor[i];
      soma = soma + element!
   }

   return soma
}

console.log(`O valor da soma do vetor é ${somaVetor([1,2,3])}`)

