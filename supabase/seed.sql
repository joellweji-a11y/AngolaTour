-- Seed Data para AngolaTour
-- Inserir 5 empresas fictícias em Luanda e Benguela (Hospedagem e Gastronomia)

INSERT INTO public.empresas (nome, categoria, provincia, descricao, fotos_urls, aprovado_admin)
VALUES
  (
    'Epic Sana Luanda', 
    'Hospedagem', 
    'Luanda', 
    'Hotel de 5 estrelas de referência no centro de Luanda, com vistas deslumbrantes para a Baía.', 
    ARRAY['https://placehold.co/800x600?text=Epic+Sana', 'https://placehold.co/800x600?text=Quarto'], 
    TRUE
  ),
  (
    'Oon.dah Restaurante', 
    'Gastronomia', 
    'Luanda', 
    'Experiência gastronómica de alto nível com sabores fusão e ambiente sofisticado.', 
    ARRAY['https://placehold.co/800x600?text=Oondah', 'https://placehold.co/800x600?text=Prato'], 
    TRUE
  ),
  (
    'Hotel Mombaka', 
    'Hospedagem', 
    'Benguela', 
    'Conforto e tradição no coração de Benguela. Ideal para viajantes de negócios e lazer.', 
    ARRAY['https://placehold.co/800x600?text=Mombaka', 'https://placehold.co/800x600?text=Lobby'], 
    TRUE
  ),
  (
    'Restaurante Tudo na Brasa', 
    'Gastronomia', 
    'Benguela', 
    'Os melhores grelhados de Benguela. Ambiente familiar e descontraído.', 
    ARRAY['https://placehold.co/800x600?text=Tudo+na+Brasa'], 
    TRUE
  ),
  (
    'Lodge Kapimbaw', 
    'Hospedagem', 
    'Benguela', 
    'Refúgio ecológico com paisagens incríveis. Perfeito para desconectar da cidade.', 
    ARRAY['https://placehold.co/800x600?text=Kapimbaw'], 
    TRUE
  );
