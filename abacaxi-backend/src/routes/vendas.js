const router = require('express').Router();
const { Venda } = require('../models');
const calcularEstoque = require('../estoque');

// GET /vendas
router.get('/', async (req, res) => {
  const vendas = await Venda.findAll({ order: [['data', 'DESC'], ['id', 'DESC']] });
  res.json(vendas);
});

// POST /vendas  { data, quantidade, preco_unitario, cliente }
router.post('/', async (req, res) => {
  const { data, quantidade, preco_unitario, cliente } = req.body;
  if (!data || !(quantidade > 0) || !(preco_unitario > 0)) {
    return res.status(400).json({ erro: 'Informe data, quantidade e preço maiores que zero' });
  }

  const { estoque } = await calcularEstoque();
  if (quantidade > estoque) {
    return res.status(400).json({ erro: `Estoque insuficiente. Disponível: ${estoque}` });
  }

  const venda = await Venda.create({ data, quantidade, preco_unitario, cliente });
  res.status(201).json(venda);
});

// DELETE /vendas/:id
router.delete('/:id', async (req, res) => {
  const apagadas = await Venda.destroy({ where: { id: req.params.id } });
  if (!apagadas) return res.status(404).json({ erro: 'Venda não encontrada' });
  res.status(204).end();
});

module.exports = router;
