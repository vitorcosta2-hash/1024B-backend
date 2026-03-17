// promessas
// síncronas e assíncronas
// Paralelismo -> parelelo.

console.log("\n=========================")
console.log("Frameworks")
console.log("Aula de hoje é sobre promessas.")
console.log("Dia: 10/06/2026")
console.log("===========================")

console.log("\nExemplo de Promessa\n")

console.log("Início da execução do código")
//async function funcao(){
const funcao = async () => {
    const prom =
        new Promise<string>((resolve, reject) => {
            setTimeout(function handle() {
                reject("Erro ao executar a função")
            }, 5000)
        })
    return prom
}
try{
const resultado = await funcao()
console.log(resultado)
}
catch(erro){
    console.log(erro)
}
console.log("Fim da execução do código")

// Math.random()>=0.5{}
// Crie uma função que tenha 50% de chance de retornar "Tere" após
// 5 segundos ou a função devolve o valor null
// function devolveTere()
// E faça o tratamento do erro com o Try e catch

console.log("\nExercício\n")

function devolveTere(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= 0.5) {
                resolve("Tere")
            } else {
                resolve(null)
            }   
        }, 5000)
    })
}
try {
    const resultado = await devolveTere()
    console.log(resultado)
}
catch (erro) {
    console.log(erro)
}