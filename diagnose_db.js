import 'dotenv/config';
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function diagnose() {
  console.log("--- Diagnóstico AngolaTour ---");
  console.log(`URL: ${SUPABASE_URL}`);

  // 1. Check connection and 'empresas' table
  console.log("\n1. Verificando tabela 'empresas'...");
  const { data: empresas, error: errEmp } = await supabase
    .from('empresas')
    .select('*')
    .limit(5);

  if (errEmp) {
    console.log(`❌ Erro/Inexistente: ${errEmp.message}`);
  } else {
    console.log(`✅ Tabela 'empresas' encontrada. Linhas: ${empresas.length}`);
    if (empresas.length > 0) {
      console.log("Amostra:", JSON.stringify(empresas[0], null, 2));
    } else {
      console.log("ℹ️ Tabela vazia.");
    }
  }

  // 2. Check 'sos_alertas' table
  console.log("\n2. Verificando tabela 'sos_alertas'...");
  const { data: sos, error: errSos } = await supabase
    .from('sos_alertas')
    .select('*')
    .limit(5);

  if (errSos) {
    console.log(`❌ Erro/Inexistente: ${errSos.message}`);
  } else {
    console.log(`✅ Tabela 'sos_alertas' encontrada. Linhas: ${sos.length}`);
  }

  // 3. Permission Check (Attempt to write dummy)
  // Usually Anon key cannot create tables. We check if we can even *read* others.
  // We can imply permissions by the key type.
  console.log("\n3. Verificação de Permissões:");
  console.log("Chave usada: ANON (Pública)");
  console.log("ℹ️ A chave ANON geralmente NÃO tem permissão para alterar Schema (DDL).");
  console.log("ℹ️ Para alterar o schema, use o Dashboard do Supabase ou a CLI autenticada.");

}

diagnose();
