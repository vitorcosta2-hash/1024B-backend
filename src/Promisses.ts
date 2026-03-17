// promessas
// síncronas e assíncronas
// Paralelismo -> parelelo.

// console.log("Início da execução do código")
// //async function funcao(){
// const funcao = async () => {
//     const prom =
//         new Promise<string>((resolve, reject) => {
//             setTimeout(function handle() {
//                 reject("Erro ao executar a função")
//             }, 5000)
//         })
//     return prom
// }
// try{
// const resultado = await funcao()
// console.log(resultado)
// }
// catch(erro){
//     console.log(erro)
// }
// console.log("Fim da execução do código")

// Math.random()>=0.5{}
// Crie uma função que tenha 50% de chance de retornar "Tere" após
// 5 segundos ou a função devolve o valor null
// function devolveTere()
// E faça o tratamento do erro com o Try e catch

function devolveTere(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() >= 0.5) {
                resolve("Tere");
            } else {
                resolve(null);
            }
        }, 5000);
    });
}

async function executarDevolveTere() {
    try {
        const resultado = await devolveTere();
        if (resultado) {
            console.log(resultado);
        } else {
            console.log("Valor nulo recebido");
        }   
    } catch (erro) {
        console.log("Erro ao executar a função:", erro);
    }
}
executarDevolveTere()