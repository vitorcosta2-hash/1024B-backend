import mysql from 'mysql2/promise';
import express from 'express';
const app = express()
app.use(express.json())
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'aula1',
});

app.post("/cadastro_produto", async (req, res) => {
    try {
        const {id,nome,categoria,preco,data_criacao,data_modificacao  } = req.body;
        if (!id || !nome || !categoria || !preco || !data_criacao || !data_modificacao) {
            return res.status(500).json({ mensagem: "id, nome, categoria, preco, data_criacao e data_modificacao são obrigatórios!" })
            
        }
        const [resultado] =
            await connection.execute(`insert into produto values (?,?,?,?,?,?)`, [id, nome, categoria, preco, data_criacao, data_modificacao])
        console.log(resultado)
        res.status(201).json({ mensagem: "Sucesso" })
    } catch (err) {
        res.status(500).json({ mensagem: "Erro no servidor!" })
    }
})//Inserir
app.get("/listar_produtos", async (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`SELECT * FROM produto`)
        console.log(resultado)
        res.status(200).json(resultado)
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: "Erro no servidor!" })
    }
    })

app.get("/listar_produtos_informatica", async (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`SELECT * FROM produto WHERE categoria = 'informatica'`);
        console.log(resultado)
        res.status(200).json(resultado)
    }  catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: "Erro no servidor!" })
    }
    })
app.get("/listar_produtos_caros", async (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`SELECT * FROM produto WHERE preco > 100`);
        console.log(resultado)
        res.status(200).json(resultado)
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: "Erro no servidor!" })
    }
})




app.listen(8000, () => {
    console.log("Servidor iniciado na porta 8000")
})







/*

//  0.2 (1,0 ponto) Explique o que é o typescripte para que ele serve. 
//  É uma extensão da linguagem JavaScript e adiciona recursos de tipagem estática, classes, interfaces e outros recursos  avançados para ajudar a tornar o desenvolvimento de software mais fácil, mais escalável e mais seguro.

// 0.3 (1,0 ponto) Para que serve o express.json() no código feito em sala de aula e o que acontece se eu não colocar ele no código
// ele serve pra roda o código sem ele o código não funciona 

// 0.4 (2,0 pontos) Considerando o código de banco de dados passado para resolução de prova, crie uma rota para cadastro de pizzas


import mysql from 'mysql2/promise';
import express from 'express';
const app = express()
app.use(express.json())
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'pizzaria',
});

app.post("/cadastro_pizza", async (req, res) => {
    try {
        const {id,nome,tamanho,preco,data_criacao} = req.body;
        if (!id || !nome || !tamanho || !preco || !data_criacao ) {
            return res.status(500).json({ mensagem: "id, nome, tamanho, preco, data_criacao  são obrigatórios!" })
            
        }
        const [resultado] =
            await connection.execute(`insert into produto values (?,?,?,?,?)`, [id, nome, tamanho, preco, data_criacao])
        console.log(resultado)
        res.status(201).json({ mensagem: "Sucesso" })
    } catch (err) {
        res.status(500).json({ mensagem: "Erro no servidor!" })
    }
})

app.listen(8001, () => {
    console.log("Servidor iniciado na porta 8001")
})


















































*/