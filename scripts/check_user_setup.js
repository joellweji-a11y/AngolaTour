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

const TARGET_EMAIL = 'joellweji@gmail.com';

async function verifyAndPromote() {
    console.log(`--- Verificando Admin para: ${TARGET_EMAIL} ---`);

    // 1. Get User ID from Auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
        console.error("❌ Erro ao listar users do Auth:", authError.message);
        return;
    }

    const user = users.find(u => u.email === TARGET_EMAIL);

    if (!user) {
        console.error(`❌ User '${TARGET_EMAIL}' NÃO encontrado no Auth. Tens a certeza que criaste conta?`);
        return;
    }
    console.log(`✅ User Auth encontrado: ${user.id}`);

    // 2. Check Profile
    const { data: profile, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profError) {
        console.log(`⚠️ Perfil não encontrado ou erro: ${profError.message}`);
        // Attempt to create if missing (Service Role can do this)
        console.log("ℹ️ Tentando criar perfil...");
        const { error: insertError } = await supabase.from('profiles').insert({
            id: user.id,
            email: TARGET_EMAIL,
            role: 'admin'
        });

        if (insertError) {
            console.error("❌ Falha ao criar perfil:", insertError.message);
        } else {
            console.log("✅ Perfil criado com role 'admin'!");
        }
        return;
    }

    // 3. Check Role and Update if needed
    console.log(`✅ Perfil encontrado. Role atual: '${profile.role}'`);

    if (profile.role !== 'admin') {
        console.log("ℹ️ Atualizando role para 'admin'...");
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', user.id);

        if (updateError) {
            console.error("❌ Erro ao atualizar role:", updateError.message);
        } else {
            console.log("✅ Role atualizado para 'admin' com sucesso!");
        }
    } else {
        console.log("✅ O utilizador JÁ É Admin.");
    }
}

verifyAndPromote();
