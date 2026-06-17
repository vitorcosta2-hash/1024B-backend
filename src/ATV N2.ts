import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';
import express from 'express';
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

interface IQuantidadePedido extends RowDataPacket {
    quantidade_pedidos: number
}
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dbteremercado',
});

// 1......
// Crie uma rota '\cliente_data_pedido' que retorne os clientes e a data que os mesmos fizeram 
// o pedido. Para realizar isso, utilize o comando inner join para juntar as tabelas. 
// Utilize o banco de dados chamado  dbteremercado
// SELECT nome,datapedido FROM clientes c INNER JOIN pedidos p ON c.idclientes=p.clientes_idclientes

app.get("/cliente_data_pedido", async (req, res) => {
    try {
        const [resultado] = await connection.execute(` SELECT c.nome, p.datapedido FROM clientes c INNER JOIN pedidos p ON c.idclientes = p.clientes_idclientes `);

        res.status(200).json(resultado);
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: "Erro no servidor!" });
    }
});

// 2 Crie uma rota chamada '\pedidos_2026' que retorne 
// idclientes, nome, cidade, idade,idpedidos,datapedido dos pedidos feitos no ano
// de 2026.

app.get("/pedidos_2026", async (req, res) => {
    try {
        const [resultado] = await connection.execute(`SELECT  c.idclientes, c.nome, c.cidade,c.idade,    p.idpedidos,    p.datapedido  FROM clientes c INNER JOIN pedidos p  ON c.idclientes = p.clientes_idclientes WHERE YEAR(p.datapedido) = 2026
    `);

        res.status(200).json(resultado);
    } catch (err) {
        console.log(err);
        res.status(500).json({ mensagem: "Erro no servidor!" });
    }
});

// 3.Crie uma rota chamada '\quantidade_pedidos' que retorne 
// um json no formato '{quantidade_pedidos:100}' com a quantidade de pedidos cadastrados
// na tabela pedidos. USE O COMANDO COUNT(*) para contar as quantidades.

app.get("/quantidade_pedidos", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`
      SELECT COUNT(*) AS quantidade_pedidos FROM pedidos`) as any;

    res.status(200).json(resultado[0]); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensagem: "Erro no servidor!" });
  }
});

// 4 Crie uma rota chamada '\quantidade_pedidos_clientes' que retorne
// um json no formato '[{nome:"tere",quantidade_pedidos:1000}]' que retorne 
// todos os clientes e a quantidade de pedidos que cada cliente fez

app.get("/quantidade_pedidos_clientes", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`
      SELECT 
        c.nome,
        COUNT(p.idpedidos) AS quantidade_pedidos
      FROM clientes c
      INNER JOIN pedidos p 
      ON c.idclientes = p.clientes_idclientes
      GROUP BY c.nome
    `);

    res.status(200).json(resultado);
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensagem: "Erro no servidor!" });
  }
});

//   5) ROTA    /quantidade_produtos_por_cliente
//   Crie um código que retorne o nome do cliente e a quantidade de produtos que cada pedido tem
//    formato    [{nome:"Nome Cliente",idpedido:1,quantidade_produtos:1000}]

app.get("/quantidade_produtos_por_cliente", async (req, res) => {
    try {
        const [resultado, campos] =
            await connection.execute(`
                SELECT 
                    c.nome,
                    p.idpedidos AS idpedido,
                    SUM(i.quantidade) AS quantidade_produtos
                FROM clientes c
                INNER JOIN pedidos p 
                    ON c.idclientes = p.clientes_idclientes
                INNER JOIN itenspedidos i 
                    ON p.idpedidos = i.pedidos_idpedidos
                GROUP BY c.nome, p.idpedidos
            `)

        console.log(resultado)
        res.status(200).json(resultado)

    } catch (err) {
            console.log(err);
    res.status(500).json({ mensagem: "Erro no servidor!" });
    }
})

//  6)    /valor_pedido_total
// Crie um código que retorne o nome do cliente e o valor total de cada pedido
//  [{nome:"Nome Cliente",valor_total:1000}]

app.get("/valor_pedido_total", async (req, res) => {
  try {
    const [resultado] = await connection.execute(`
      SELECT   c.nome, p.idpedidos AS idpedido, SUM(i.quantidade * pr.preco) AS valor_total
      FROM clientes c  INNER JOIN pedidos p ON c.idclientes = p.clientes_idclientes INNER JOIN itenspedidos i ON p.idpedidos = i.pedidos_idpedidos
      INNER JOIN produtos pr ON i.produtos_idprodutos = pr.idprodutos GROUP BY c.nome, p.idpedidos
    `)

    res.status(200).json(resultado)
} catch (erro) {
    console.log(erro);
    res.status(500).json({ mensagem: "Erro no servidor!" });
  }
  
})

// 7) /cadastro_multiplos_produtos
// Crie a rota POST que recebe um array de produtos no body.
// Inserir cada produto no banco com:
// data_criacao automática
// data_modificacao null
// Retornar: "X produtos cadastrados com sucesso!"

app.post("/cadastro_multiplos_produtos", async (req, res) => {
  try {
    const produtos = req.body;

    // Verifica se veio um array
    if (!Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({
        mensagem: "Envie um array de produtos válido!"
      });
    }

    for (const produto of produtos) {
      await connection.execute( ` INSERT INTO produtos ( idprodutos, nome, preco, categoria_idcategoria, data_criacao, data_modificacao  )
          VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          produto.idprodutos, produto.nome, produto.preco,  produto.categoria_idcategoria,  new Date(), null 
        ]
      );
    }

    res.status(201).json({
      mensagem: `${produtos.length} produtos cadastrados com sucesso!`
    });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({
      mensagem: "Erro no servidor!"
    });
  }
});


app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000")
})

