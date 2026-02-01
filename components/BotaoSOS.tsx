import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export const BotaoSOS = () => {
  const [enviando, setEnviando] = useState(false);

  const enviarAlerta = async () => {
    setEnviando(true);

    // Aqui simulamos o envio de um alerta para o Supabase
    const { error } = await supabase
      .from('sos_alertas')
      .insert([{
        data_hora: new Date().toISOString(),
        mensagem: "Pedido de ajuda carregado!"
      }]);

    if (error) {
      alert("Erro ao enviar SOS: " + error.message);
    } else {
      alert("🚨 ALERTA SOS ENVIADO! As autoridades foram notificadas.");
    }

    setEnviando(false);
  };

  return (
    <button
      onClick={enviarAlerta}
      disabled={enviando}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#ff0000',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        fontSize: '12px'
      }}
    >
      {enviando ? '...' : 'SOS'}
    </button>
  );
};