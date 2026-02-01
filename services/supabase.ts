import { createClient } from '@supabase/supabase-js'

// Tentamos ler as chaves
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Se as chaves não existirem, avisamos no console em vez de travar a app
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ ATENÇÃO: Chaves do Supabase não encontradas! Verifica o teu ficheiro .env.local");
}

// Criamos o cliente com uma segurança (string vazia caso falhe)
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)