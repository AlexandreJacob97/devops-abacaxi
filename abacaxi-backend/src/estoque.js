const { Colheita, Venda } = require('./models');

// Estoque = total colhido - total vendido
async function calcularEstoque() {
  const colhido = (await Colheita.sum('quantidade')) || 0;
  const vendido = (await Venda.sum('quantidade')) || 0;
  return { colhido, vendido, estoque: colhido - vendido };
}

module.exports = calcularEstoque;
