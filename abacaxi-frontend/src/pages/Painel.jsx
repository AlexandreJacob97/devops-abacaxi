import { useEffect, useState } from 'react';
import { api, formatarReais } from '../api.js';

export default function Painel() {
  const [resumo, setResumo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api('/resumo').then(setResumo).catch((err) => setErro(err.message));
  }, []);

  if (erro) return <p className="erro">{erro}</p>;
  if (!resumo) return <p>Carregando...</p>;

  return (
    <div className="indicadores">
      <div className="card"><span>Total colhido</span><strong>{resumo.colhido}</strong></div>
      <div className="card"><span>Total vendido</span><strong>{resumo.vendido}</strong></div>
      <div className="card"><span>Em estoque</span><strong>{resumo.estoque}</strong></div>
      <div className="card"><span>Faturamento</span><strong>{formatarReais(resumo.faturamento)}</strong></div>
    </div>
  );
}
