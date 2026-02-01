import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

interface Empresa {
    id: string;
    nome: string;
    categoria: string;
    provincia: string;
    descricao: string;
    fotos_urls: string[];
}

export const EmpresasLista: React.FC = () => {
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtroProvincia, setFiltroProvincia] = useState<string>('Todas');

    useEffect(() => {
        fetchEmpresas();
    }, []);

    const fetchEmpresas = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('empresas')
                .select('*');

            if (error) throw error;
            setEmpresas(data || []);
        } catch (error) {
            console.error('Erro ao buscar empresas:', error);
        } finally {
            setLoading(false);
        }
    };

    const empresasFiltradas = filtroProvincia === 'Todas'
        ? empresas
        : empresas.filter(Empresa => Empresa.provincia === filtroProvincia);

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-24">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Diretório de Empresas</h1>

                {/* Filtros */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['Todas', 'Luanda', 'Benguela'].map(prov => (
                        <button
                            key={prov}
                            onClick={() => setFiltroProvincia(prov)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtroProvincia === prov
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {prov}
                        </button>
                    ))}
                </div>

                {/* Lista */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-2 text-gray-500 text-sm">A carregar empresas...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {empresasFiltradas.length === 0 ? (
                            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500">Nenhuma empresa encontrada nesta categoria.</p>
                            </div>
                        ) : (
                            empresasFiltradas.map((empresa) => (
                                <div key={empresa.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                                    {/* Avatar / Imagem placeholder */}
                                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                                        {empresa.fotos_urls && empresa.fotos_urls[0] ? (
                                            <img
                                                src={empresa.fotos_urls[0]}
                                                alt={empresa.nome}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <span className="material-symbols-outlined">image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-gray-900">{empresa.nome}</h3>
                                            <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                                {empresa.categoria}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {empresa.provincia}
                                        </p>

                                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                            {empresa.descricao}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
