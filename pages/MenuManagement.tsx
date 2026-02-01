
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface MenuItem {
    id: string;
    name: string;
    price: string;
    category: string;
    description: string;
    available: boolean;
}

const MenuManagement: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Prato Principal',
        description: ''
    });

    // Carregar menu do localStorage
    useEffect(() => {
        const storedMenu = localStorage.getItem(`at_menu_${id}`);
        if (storedMenu) {
            setMenuItems(JSON.parse(storedMenu));
        } else {
            // Dados iniciais de exemplo
            const initialMenu: MenuItem[] = [
                { id: '1', name: 'Mufete Tradicional', price: '8.500', category: 'Prato Principal', description: 'Peixe grelhado com banana, feijão e mandioca', available: true },
                { id: '2', name: 'Calulu de Peixe', price: '7.200', category: 'Prato Principal', description: 'Prato tradicional angolano', available: true },
                { id: '3', name: 'Moamba de Galinha', price: '6.800', category: 'Prato Principal', description: 'Galinha com molho de dendém', available: false },
                { id: '4', name: 'Funge', price: '1.500', category: 'Acompanhamento', description: 'Acompanhamento tradicional', available: true },
                { id: '5', name: 'Sumo de Múcua', price: '800', category: 'Bebida', description: 'Sumo natural de baobab', available: true },
            ];
            setMenuItems(initialMenu);
            localStorage.setItem(`at_menu_${id}`, JSON.stringify(initialMenu));
        }
    }, [id]);

    const saveMenu = (updatedMenu: MenuItem[]) => {
        setMenuItems(updatedMenu);
        localStorage.setItem(`at_menu_${id}`, JSON.stringify(updatedMenu));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.price || !formData.category) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (editingId) {
            // Editar prato existente
            const updated = menuItems.map(item =>
                item.id === editingId
                    ? { ...item, ...formData }
                    : item
            );
            saveMenu(updated);
        } else {
            // Adicionar novo prato
            const newItem: MenuItem = {
                id: Date.now().toString(),
                ...formData,
                available: true
            };
            saveMenu([...menuItems, newItem]);
        }

        resetForm();
    };

    const handleEdit = (item: MenuItem) => {
        setEditingId(item.id);
        setFormData({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description
        });
        setShowModal(true);
    };

    const handleDelete = (itemId: string) => {
        if (confirm('Deseja remover este prato do menu?')) {
            const updated = menuItems.filter(item => item.id !== itemId);
            saveMenu(updated);
        }
    };

    const toggleAvailability = (itemId: string) => {
        const updated = menuItems.map(item =>
            item.id === itemId
                ? { ...item, available: !item.available }
                : item
        );
        saveMenu(updated);
    };

    const resetForm = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            name: '',
            price: '',
            category: 'Prato Principal',
            description: ''
        });
    };

    const categories = ['Prato Principal', 'Entrada', 'Acompanhamento', 'Sobremesa', 'Bebida', 'Snack'];

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-black text-white italic">Gerir Menu</h1>
                    <p className="text-[10px] text-accent font-black uppercase tracking-widest mt-0.5">Estabelecimento #{id}</p>
                </div>
            </header>

            <main className="p-6 space-y-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-primary text-white p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined">add</span>
                    <span className="text-sm font-black uppercase tracking-widest">Adicionar Prato</span>
                </button>

                {/* Filtro por categoria */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                    {categories.map(cat => (
                        <span key={cat} className="shrink-0 text-[9px] bg-surface-dark border border-white/10 px-3 py-2 rounded-xl font-bold text-gray-400 uppercase tracking-wider">
                            {cat}
                        </span>
                    ))}
                </div>

                <div className="space-y-4">
                    {menuItems.map(item => (
                        <div key={item.id} className="bg-surface-dark/50 border border-white/5 rounded-[24px] p-5">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-white">{item.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase">{item.category}</span>
                                        <div className="size-1 bg-gray-700 rounded-full" />
                                        <span className="text-sm text-accent font-black">{item.price} Kz</span>
                                    </div>
                                    {item.description && (
                                        <p className="text-[10px] text-gray-600 mt-2">{item.description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => toggleAvailability(item.id)}
                                    className={`text-[8px] font-black uppercase px-2 py-1 rounded cursor-pointer ${item.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                                >
                                    {item.available ? 'Disponível' : 'Indisponível'}
                                </button>
                            </div>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="flex-1 bg-blue-500/10 border border-blue-500/30 py-2 rounded-xl text-blue-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">edit</span>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex-1 bg-red-500/10 border border-red-500/30 py-2 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1"
                                >
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal de Adicionar/Editar Prato */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-surface-dark border border-white/10 rounded-[32px] p-6 w-full max-w-md animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-white italic">
                                {editingId ? 'Editar Prato' : 'Novo Prato'}
                            </h2>
                            <button onClick={resetForm} className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome do Prato *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                    placeholder="Ex: Mufete Tradicional"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Preço (Kz) *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="8500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Categoria *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Descrição</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none"
                                    placeholder="Descrição do prato..."
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-6 bg-primary text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95 transition-all"
                        >
                            {editingId ? 'Salvar Alterações' : 'Adicionar ao Menu'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuManagement;
