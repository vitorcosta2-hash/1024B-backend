/**
 * Exercício 01 - cria um novo vetor com os valores do vetor original mais dois novos valores
 * Nome da função - criaNovoVetor
 * Crie uma função que retorne um novo vetor com os valores do vetor original mais dois novos valores
 * @param {number[]} vetor Vetor de números
 * @param {number} valor1 Primeiro valor a ser adicionado
 * @param {number} valor2 Segundo valor a ser adicionado
 * @returns {number[]} Retorna um novo vetor com os valores do vetor original mais dois novos valores
 * @example
 * criaNovoVetor([1, 2, 3], 4, 5) // [1, 2, 3, 4, 5]
 * criaNovoVetor([1, 2, 3], 0, 0) // [1, 2, 3, 0, 0]
 */ 

//Início do seu código
console.log("\n===================")
console.log("LISTA 1")
console.log("===================")

function criaNovoVetor(v: number[], v1: number, v2: number): number[] {
    const  novoVetor = [...v, v1, v2];
    return novoVetor;
}
//Fim do seu código
console.log(("\nExercício 01 - criaNovoVetor"))
console.log(criaNovoVetor([1, 2, 3], 4, 5)) 
console.log(criaNovoVetor([1, 2, 3], 0, 0))

/**
 * Exercício 02 - divisivelPor11
 * Nome da função - divisivelPor11
 * Crie uma função que retorna um array com os números divisíveis por 11 no intervalo
 * @param {number} min Número mínimo
 * @param {number} max Número máximo
 * @returns {number[]} Retorna um array com os números divisíveis por 11 no intervalo
 * @example
 *  divisivelPor11(1, 100) // [11, 22, 33, 44, 55, 66, 77, 88, 99]
 *  
 * divisivelPor11(11, 110) // [11, 22, 33, 44, 55, 66, 77, 88, 99, 110]
 */

//Início do seu código

function divisivelPor11(min: number, max: number): number[] {
    const resultado: number[] = [];
    for (let i = min; i <= max; i++) {
        if (i % 11 === 0) {
            resultado.push(i);
        }
    }
    return resultado;
}
//Fim do seu código
console.log("\nExercício 02 - divisivelPor11")
console.log(divisivelPor11(1, 100))
console.log(divisivelPor11(11, 110))

/**
 *  Exercício 03 - maioresDeIdade
 * Nome da função - maioresDeIdade
 * Crie uma função que retorna um array com os objetos com idade maior que 18
 * @param {vetor:Pessoa[]} vetor Vetor de objetos com id, nome e idade
 * @returns {Pessoa[]} Retorna um array com os objetos com idade maior que 18
 * @example
 * 
 * const pessoa1 = {id: 1, nome: 'João', idade: 20}
 * const pessoa2 = {id: 2, nome: 'Maria', idade: 18}
 * const pessoa3 = {id: 3, nome: 'José', idade: 17}
 * maioresDeIdade([pessoa1, pessoa2, pessoa3]) // [pessoa1, pessoa2]
 */
interface Pessoa{
    id: number,
    nome: string,
    idade: number
}

//Início do seu código

function maioresDeIdade(vetor: Pessoa[]): Pessoa[] {
    const resultado: Pessoa[] = [];
    for (const pessoa of vetor) {
        if (pessoa.idade >= 18) {
            resultado.push(pessoa);
        }
    }
    return resultado;
}

//Fim do seu código
console.log("\nExercício 03 - maiores De Idade")
console.log(maioresDeIdade([{id: 1, nome: 'João', idade: 20}, {id: 2, nome: 'Maria', idade: 18}, {id: 3, nome: 'José', idade: 17}]))

/**
 * Exercício 04 - resolve equação
 * Nome da função - resolveEquacao
 * Crie uma função que retorne os pontos em Y a partir de um vetor dos pontos em X da equação y = x^2 + 2x + 6
 * @param {number[]} vetor Vetor de pontos em X
 * @returns {number[]} Retorna um array com os pontos em Y
 * @example
 * resolveEquacao([1, 2, 3]) // [9, 14, 21]
 */

//Início do seu código

function resolveEquacao(vetor: number[]): number[] {
    const resultado: number[] = [];
    for (const x of vetor) {
        const y = x ** 2 + 2 * x + 6;
        resultado.push(y);
    }
    return resultado;
}

//Fim do seu código
console.log("\nExercício 04 - resolve equação")
console.log(resolveEquacao([1, 2, 3]))         

// Lista de Exercícios de Programação 02

/**
 * Exercício 01 - Calcular o quadrado de um número
 * Nome da função - calcularQuadrado
 * Crie uma função que receba um número e retorne o seu valor elevado ao quadrado.
 * @param {number} a Número a ser calculado
 * @returns {number} Retorna o quadrado do número
 * @example
 * calcularQuadrado(2) // 4
 * calcularQuadrado(-3) // 9
 */
console.log("\n===================")
console.log("LISTA 2")
console.log("===================")
//Início do seu código

function calcularQuadrado(a: number): number {
    return a ** 2;
}

//Fim do seu código
console.log("\nExercício 01 - Calcular o quadrado de um número")
console.log(calcularQuadrado(2))
console.log(calcularQuadrado(-3))

/**
 * Exercício 02 - Verificar se um número é positivo
 * Nome da função - ehPositivo
 * Crie uma função que retorne verdadeiro se o número for maior que zero e falso caso contrário.
 * @param {number} a Número a ser verificado
 * @returns {boolean} Retorna true para positivos e false para negativos ou zero
 * @example
 * ehPositivo(2) // true
 * ehPositivo(-3) // false
 */

//Início do seu código

function ehPositivo(a: number): boolean {
    return a > 0;
}

//Fim do seu código
console.log("\nExercício 02 - Verificar se um número é positivo")
console.log(ehPositivo(2)) 
console.log(ehPositivo(-3)) 

/**
 * Exercício 03 - Calcular média de três números
 * Nome da função - calcularMedia
 * Crie uma função que receba três números e retorne a média aritmética entre eles.
 * @param {number} a Primeiro número
 * @param {number} b Segundo número
 * @param {number} c Terceiro número
 * @returns {number} Retorna a média dos três números
 * @example
 * calcularMedia(2, 4, 6) // 4
 * calcularMedia(10, 20, 30) // 20
 */

//Início do seu código

function calcularMedia(a: number, b: number, c: number): number {
    return (a + b + c) / 3;
}

//Fim do seu código
console.log("\nExercício 03 - Calcular média de três números")
console.log(calcularMedia(2, 4, 6))
console.log(calcularMedia(10, 20, 30))

/**
 * Exercício 04 - Verificar se um ano é bissexto
 * Nome da função - ehAnoBissexto
 * Crie uma função que verifique se um ano é bissexto (divisível por 4).
 * @param {number} ano Ano a ser verificado
 * @returns {boolean} Retorna true se for bissexto e false caso contrário
 * @example
 * ehAnoBissexto(2020) // true
 * ehAnoBissexto(2021) // false
 */

//Início do seu código

function ehAnoBissexto(ano: number): boolean {
    return ano % 4 === 0;
}

//Fim do seu código
console.log("\nExercício 04 - Verificar se um ano é bissexto")
console.log(ehAnoBissexto(2020))
console.log(ehAnoBissexto(2021))

/**
 * Exercício 05 - Calcular fatorial de um número
 * Nome da função - calcularFatorial
 * Crie uma função que calcule o fatorial de um número inteiro não negativo.
 * @param {number} num Número para cálculo do fatorial
 * @returns {number} Retorna o resultado do fatorial
 * @example
 * calcularFatorial(5) // 120
 * calcularFatorial(0) // 1
 */

//Início do seu código

function calcularFatorial(num: number): number {
    if (num === 0) {
        return 1;
    }
    let fatorial = 1;
    for (let i = 1; i <= num; i++) {
        fatorial *= i;
    }
    return fatorial;
}

//Fim do seu código
console.log("\nExercício 05 - Calcular fatorial de um número")
console.log(calcularFatorial(5))
console.log(calcularFatorial(0))

/**
 * Exercício 06 - Encontrar o menor número em um array
 * Nome da função - encontrarMenorNumero
 * Crie uma função que percorra um array de números e retorne o menor valor encontrado.
 * @param {number[]} vetor Array de números
 * @returns {number} Retorna o menor número presente no array
 * @example
 * encontrarMenorNumero([3, 1, 5, 2, 4]) // 1
 * encontrarMenorNumero([-3, -1, -5]) // -5
 */

//Início do seu código

function encontrarMenorNumero(vetor: number[]): number {
    let menor: number = vetor[0]!;
    for (const num of vetor) {
        if (num < menor) {
            menor = num;
        }
    }
    return menor;
}
//Fim do seu código
console.log("\nExercício 06 - Encontrar o menor número em um array")
console.log(encontrarMenorNumero([3, 1, 5, 2, 4]))
console.log(encontrarMenorNumero([-3, -1, -5]))

/**
 * Exercício 07 - Calcular o maior entre dois números
 * Nome da função - calcularMaior
 * Crie uma função que receba dois números e retorne o maior deles.
 * @param {number} a Primeiro número
 * @param {number} b Segundo número
 * @returns {number} Retorna o maior dos dois valores
 * @example
 * calcularMaior(2, 3) // 3
 * calcularMaior(5, 1) // 5
 */

//Início do seu código

function calcularMaior(a: number, b: number): number {
    return a > b ? a : b;
}

//Fim do seu código
console.log("\nExercício 07 - Calcular o maior entre dois números")
console.log(calcularMaior(2, 3))
console.log(calcularMaior(5, 1))

/**
 * Exercício 08 - Concatenar duas strings
 * Nome da função - concatenarStrings
 * Crie uma função que receba duas strings e as retorne unidas em uma única string.
 * @param {string} s1 Primeira string
 * @param {string} s2 Segunda string
 * @returns {string} Retorna as duas strings concatenadas
 * @example
 * concatenarStrings('Olá, ', 'mundo!') // 'Olá, mundo!'
 * concatenarStrings('123', '456') // '123456'
 */

//Início do seu código

function concatenarStrings(s1: string, s2: string): string {
    return s1 + s2;
}

//Fim do seu código
console.log("\nExercício 08 - Concatenar duas strings")
console.log(concatenarStrings('Olá, ', 'mundo!'))
console.log(concatenarStrings('123', '456'))

/**
 * Exercício 09 - Inverte a ordem dos caracteres de uma string
 * Nome da função - inverteString
 * Crie uma função que receba uma string e retorne essa string com os caracteres em ordem inversa.
 * @param {string} str A string que será invertida
 * @returns {string} Retorna a string com os caracteres em ordem inversa
 * @example
 * inverteString("hello") // "olleh"
 * inverteString("abcdef") // "fedcba"
 */ 

// Início do seu código
//OBS: não use as funções reverse e join
function inverteString(str: string): string {
    let invertida = '';
    for (let i = str.length - 1; i >= 0; i--) {
        invertida += str[i];
    }
    return invertida;
}
// Fim do seu código
console.log("\nExercício 09 - Inverte a ordem dos caracteres de uma string")
console.log(inverteString("hello"))
console.log(inverteString("abcdef"))

/**
 * Exercício 10 - Contagem de vogais
 * Nome da função - contaVogais
 * Crie uma função que receba uma string e retorne a quantidade de vogais presentes na string.
 * @param {string} str A string que será analisada
 * @returns {number} Retorna a quantidade de vogais na string
 * @example
 * contaVogais("hello") // 2
 * contaVogais("abcdef") // 2
 */

// Início do seu código

function contaVogais(str: string): number {
    const vogais = 'aeiouAEIOU';
    let contador = 0;
    for (const char of str) {
        if (vogais.includes(char)) {
            contador++;
        }
    }
    return contador;
}

// Fim do seu código
console.log("\nExercício 10 - Contagem de vogais")
console.log(contaVogais("hello"))
console.log(contaVogais("abcdef"))

/**
 * Exercício 11 - divisivelPor7Ou9
 * Nome da função - divisivelPor7Ou9
 * Crie uma função que retorna um array com os números divisíveis por 7 ou por 9 no intervalo
 * @param {number} min Número mínimo
 * @param {number} max Número máximo
 * @returns {number[]} Retorna um array com os números divisíveis por 7 ou por 9 no intervalo
 * @example
 * divisivelPor7Ou9(1, 50) // [7, 9, 14, 18, 21, 27, 28, 35, 36, 42, 45, 49]
 * divisivelPor7Ou9(7, 70) // [7, 9, 14, 18, 21, 27, 28, 35, 36, 42, 45, 49, 54, 56, 63, 70]
 */

//Início do seu código

function divisivelPor7Ou9(min: number, max: number): number[] {
    const resultado: number[] = [];
    for (let i = min; i <= max; i++) {
        if (i % 7 === 0 || i % 9 === 0) {
            resultado.push(i);
        }
    }
    return resultado;
}                                                                               
//Fim do seu código
console.log("\nExercício 11 - divisivel Por 7Ou9 ")
console.log(divisivelPor7Ou9(1, 50))
console.log(divisivelPor7Ou9(7, 70))

/**
 * Exercício 12 - Contagem de consoantes
 * Nome da função - contaConsoantes
 * Crie uma função que receba uma string e retorne a quantidade de consoantes presentes na string.
 * @param {string} str A string que será analisada
 * @returns {number} Retorna a quantidade de consoantes na string
 * @example
 * contaConsoantes("hello") // 3
 * contaConsoantes("abcdef") // 4
 */

// Início do seu código

function contaConsoantes(str: string): number {
    const consoantes = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    let contador = 0;
    for (const char of str) {
        if (consoantes.includes(char)) {
            contador++;
        }
    }
    return contador;
}

// Fim do seu código
console.log("\nExercício 12 - Contagem de consoantes")
console.log(contaConsoantes("hello"))
console.log(contaConsoantes("abcdef"))