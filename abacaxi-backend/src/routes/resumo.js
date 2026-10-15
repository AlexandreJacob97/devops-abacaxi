const router = require('express').Router();
const { Venda } = require('../models');
const calcularEstoque = require('../estoque');

// GET /resumo -> totais para o painel
router.get('/', async (req, res) => {
  const { colhido, vendido, estoque } = await calcularEstoque();
  const vendas = await Venda.findAll({ attributes: ['quantidade', 'preco_unitario'] });
  const faturamento = vendas.reduce(
    (total, v) => total + v.quantidade * Number(v.preco_unitario),
    0
  );
  res.json({ colhido, vendido, estoque, faturamento });
});

module.exports = router;
