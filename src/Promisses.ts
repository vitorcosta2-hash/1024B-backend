// promessas
// síncronas e assíncronas
// Paralelismo -> parelelo.

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


Math.random()