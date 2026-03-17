// Função de vetores -> Revisão

console.log("\n===========")
console.log("Frameworks")
console.log("Aula de hoje é sobre funções de vetores.")
console.log("Dia: 17/06/26")
console.log("============")

// FIND

const vetor = [1, 2, 3, 4, 5,6,7]
// Procurar -> find
// ele procure o que nós mandarmos.
// Então temos que criar uma função que retorne verdadeiro
// para o que estamos buscando e false para o que não estamos buscando

console.log("\nFIND\n") 
console .log(vetor.find((num:number) => num==3)) 

// Filter -> filtrar

console.log("\nFILTER\n")
const pessoas = [{id:1,nome:"Kaynan"}, {id:2,nome:"Vitor"}]
console.log(pessoas.filter((p)=> p.id>=1))

// MAP

// tambem vamos passar uma função para ele:
// E ele vai aplicar a função em cada elemento do vetor
// E criar um  novo vetor transformado pela função que 

console.log("\nMAP\n")
console.log(vetor)
console.log(vetor.map((x) => x))

//SPREAD 
console.log("\nSPREAD\n")

const vetor2 = vetor
const vetor3 = [...vetor,...vetor2]
vetor2[0] = 10
vetor3[0] = 10
console.log(vetor3)


