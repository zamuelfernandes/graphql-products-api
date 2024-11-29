/**
 * @swagger
 * /graphql:
 *   post:
 *     tags:
 *       - GraphQL Queries
 *     summary: Endpoint único para consultas e mutações.
 *     description: |
 *       Este endpoint aceita **queries** e **mutations** no formato GraphQL para manipular os dados de produtos.  
 *       Exemplos de operações disponíveis:
 *       - Consultar um produto por ID (`product`)
 *       - Listar todos os produtos (`allProducts`)
 *       - Atualizar informações de um produto (`updateProduct`)
 *       - Deletar um produto por ID (`deleteProduct`)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *                 description: A query ou mutation em formato GraphQL.
 *                 example: |
 *                   mutation { updateProduct(id: "0", name: "Updated Product A", stock: 35) {id, name, price, stock} }
 *     responses:
 *       200:
 *         description: Resposta bem-sucedida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Resultado da consulta ou mutação.
 *                   example:
 *                     updateProduct: {
 *                       id: "0",
 *                       name: "Updated Product A",
 *                       price: default price,
 *                       stock: 45
 *                     }
 *       400:
 *         description: Requisição inválida ou erro nos dados fornecidos.
 *       401:
 *         description: Acesso não autorizado. Verifique o token de autenticação.
 */
 