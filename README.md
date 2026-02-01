# 🇦🇴 AngolaTour - Plataforma Turística de Angola

Bem-vindo ao **AngolaTour**, uma plataforma moderna e imersiva dedicada a promover o turismo, a cultura e a economia de Angola. Este projeto conecta viajantes, empresas locais e serviços essenciais num ecossistema digital integrado.

![AngolaTour Banner](https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=400&fit=crop&q=80) 
*(Imagem ilustrativa: Quedas de Kalandula)*

## 🚀 Funcionalidades Principais

### 1. 🆘 Botão SOS & Emergência
- Sistema de alerta rápido para turistas.
- Envio de coordenadas GPS e pedidos de ajuda em tempo real.
- Integração com serviços de segurança e saúde locais.

### 2. 🏨 Gestão de Empresas e Serviços
- Diretório completo de **Hotéis, Restaurantes, Transportes e Cultura**.
- **Para Empresas:** Dashboard dedicado para gestão de perfil, menus, promoções e staff.
- **Para Turistas:** Pesquisa avançada, avaliações, reservas e pagamentos integrados.

### 3. 🛡️ Painel de Administração (Backoffice)
- Controlo total sobre o ecossistema.
- **Moderação:** Aprovação/Rejeição de novas empresas e anúncios.
- **Gestão de Utilizadores:** Controlo de permissões e acessos (RLS - Row Level Security).
- **Analytics:** Visão geral de receitas, crescimento e pendências.
- **Logs de Auditoria:** Rastreio de todas as ações críticas no sistema.

### 4. 🎭 Mosaico Cultural
- Exploração interativa das **18 Províncias**.
- Informações detalhadas sobre gastronomia, música, pratos típicos e pontos turísticos de cada região.

### 5. 🤖 Integração com Inteligência Artificial
- **Gemini AI:** Assistente virtual para dicas de viagem personalizadas ("Mambo do Dia").
- Recomendações inteligentes baseadas no perfil do viajante.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS.
- **Backend (BaaS):** Supabase (PostgreSQL, Auth, Storage, Realtime).
- **Segurança:** Row Level Security (RLS) para proteção de dados sensíveis.
- **Integrações:** Google Gemini AI, Mapas Interativos.

---

## 📦 Como Instalar e Rodar Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- Conta no [Supabase](https://supabase.com/)

### Passos

1.  **Clonar o repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/AngolaTour.git
    cd AngolaTour
    ```

2.  **Instalar dependências:**
    ```bash
    npm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione as suas chaves:
    ```ini
    VITE_SUPABASE_URL=sua_url_supabase
    VITE_SUPABASE_ANON_KEY=sua_anon_key
    SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key #(Apenas para scripts admin)
    GEMINI_API_KEY=sua_chave_gemini
    ```

4.  **Rodar a aplicação:**
    ```bash
    npm run dev
    ```

---

## 🛡️ Segurança e Permissões

Este projeto utiliza **Supabase RLS** para garantir que apenas administradores podem gerir dados sensíveis.
- **Admin:** Pode criar, editar e apagar empresas. Pode ver logs de auditoria.
- **Provider:** Pode gerir apenas a sua própria empresa.
- **User:** Pode visualizar, reservar e deixar reviews.

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se quiseres adicionar uma nova província, corrigir um bug ou melhorar a interface:
1.  Faz um Fork do projeto.
2.  Cria uma Branch (`git checkout -b feature/NovaFuncionalidade`).
3.  Comita as mudanças (`git commit -m 'Adiciona nova funcionalidade'`).
4.  Faz Push (`git push origin feature/NovaFuncionalidade`).
5.  Abre um Pull Request.

---

**Desenvolvido com ❤️ em Angola.**
