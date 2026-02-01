import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';

export const AdminGestao = () => {
    const navigate = useNavigate();
    const [empresas, setEmpresas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const carregarEmpresas = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('empresas').select('*').order('criado_em', { ascending: false });
        if (data) setEmpresas(data);
        if (error) console.error("Erro:", error);
        setLoading(false);
    };

    useEffect(() => { carregarEmpresas(); }, []);

    const alternarStatus = async (id: string, statusAtual: boolean) => {
        const { error } = await supabase
            .from('empresas')
            .update({ aprovado_admin: !statusAtual })
            .eq('id', id);

        if (error) alert("Erro ao atualizar: " + error.message);
        else carregarEmpresas();
    };

    const eliminarEmpresa = async (id: string, nome: string) => {
        if (window.confirm(`⚠️ Perigo! \n\nTem a certeza que quer ELIMINAR a empresa "${nome}"?\nEsta ação não pode ser desfeita.`)) {
            const { error } = await supabase.from('empresas').delete().eq('id', id);

            if (error) {
                alert("Erro ao eliminar: " + error.message + "\n\nVerifique se tem permissões de Admin!");
            } else {
                alert("Empresa eliminada com sucesso!");
                carregarEmpresas();
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/home')}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Painel Admin</h1>
                        <p className="text-xs text-green-600 font-medium bg-green-50 inline-block px-2 py-0.5 rounded-full border border-green-100">
                            ● Database Conectada
                        </p>
                    </div>
                </div>
                <button
                    onClick={carregarEmpresas}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    title="Atualizar Lista"
                >
                    <span className="material-symbols-outlined">refresh</span>
                </button>
            </header>

            <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <span className="material-symbols-outlined animate-spin text-3xl mb-2">refresh</span>
                        <p>A carregar base de dados...</p>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-gray-500 uppercase text-xs font-bold tracking-wider">
                                {empresas.length} Empresas Registadas
                            </h2>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                                            <th className="p-4 font-bold">Empresa</th>
                                            <th className="p-4 font-bold">Categoria</th>
                                            <th className="p-4 font-bold">Província</th>
                                            <th className="p-4 font-bold text-center">Estado</th>
                                            <th className="p-4 font-bold text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {empresas.map(emp => (
                                            <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-4">
                                                    <p className="font-bold text-gray-900">{emp.nome}</p>
                                                    <p className="text-xs text-gray-400 font-mono mt-0.5">{emp.id}</p>
                                                </td>
                                                <td className="p-4">
                                                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                                                        {emp.categoria || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-600">
                                                    {emp.provincia}
                                                </td>
                                                <td className="p-4 text-center">
                                                    <button
                                                        onClick={() => alternarStatus(emp.id, emp.aprovado_admin)}
                                                        className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${emp.aprovado_admin
                                                                ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                                                                : 'bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100'
                                                            }`}
                                                    >
                                                        {emp.aprovado_admin ? 'APROVADO' : 'PENDENTE'}
                                                    </button>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <button
                                                        onClick={() => eliminarEmpresa(emp.id, emp.nome)}
                                                        className="size-9 inline-flex items-center justify-center rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 hover:text-red-600 transition-colors"
                                                        title="Eliminar Empresa"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {empresas.length === 0 && (
                                <div className="p-10 text-center text-gray-400">
                                    <p>Nenhuma empresa encontrada na base de dados.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
