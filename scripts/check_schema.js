import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = dotenv.config({ path: envPath });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { autoRefreshToken: false, persistSession: false }
});

async function checkSchema() {
    console.log("--- Verificando Colunas ---");
    // Try to select just 'id'
    const { error: errId } = await supabase.from('empresas').select('id').limit(1);
    console.log("Coluna 'id':", errId ? "❌ Falta" : "✅ Existe");

    // Try to select 'categoria'
    const { error: errCat } = await supabase.from('empresas').select('categoria').limit(1);
    console.log("Coluna 'categoria':", errCat ? "❌ Falta" : "✅ Existe");

    // Try to select 'fotos_urls'
    const { error: errFoto } = await supabase.from('empresas').select('fotos_urls').limit(1);
    console.log("Coluna 'fotos_urls':", errFoto ? "❌ Falta" : "✅ Existe");
}

checkSchema();
