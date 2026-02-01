-- Estrutura Mestre AngolaTour
DROP TABLE IF EXISTS public.empresas CASCADE;

CREATE TABLE public.empresas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT CHECK (categoria IN ('Hospedagem', 'Transporte', 'Gastronomia', 'Bar', 'Cultura')),
  provincia TEXT NOT NULL,
  descricao TEXT,
  fotos_urls TEXT[] DEFAULT '{}', -- Suporta as 6 imagens
  aprovado_admin BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.sos_alertas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  coordenadas TEXT,
  mensagem TEXT DEFAULT 'Pedido de ajuda enviado',
  criado_at TIMESTAMPTZ DEFAULT NOW()
);