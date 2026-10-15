const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Usuario = sequelize.define('usuario', {
  usuario: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  senha_hash: { type: DataTypes.STRING, allowNull: false },
});

const Colheita = sequelize.define('colheita', {
  data: { type: DataTypes.DATEONLY, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  observacao: { type: DataTypes.STRING },
});

const Venda = sequelize.define('venda', {
  data: { type: DataTypes.DATEONLY, allowNull: false },
  quantidade: { type: DataTypes.INTEGER, allowNull: false },
  preco_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  cliente: { type: DataTypes.STRING },
});

module.exports = { sequelize, Usuario, Colheita, Venda };
