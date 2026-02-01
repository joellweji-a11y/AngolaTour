
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Employee {
    id: string;
    name: string;
    role: string;
    phone: string;
    admissionDate: string;
    status: 'active' | 'inactive';
    avatar: string;
}

const StaffManagement: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [staff, setStaff] = useState<Employee[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        phone: '',
        admissionDate: new Date().toISOString().split('T')[0]
    });

    // Carregar funcionários do localStorage
    useEffect(() => {
        const storedStaff = localStorage.getItem(`at_staff_${id}`);
        if (storedStaff) {
            setStaff(JSON.parse(storedStaff));
        } else {
            // Dados iniciais de exemplo
            const initialStaff: Employee[] = [
                { id: '1', name: 'Maria Santos', role: 'Gerente', phone: '+244 923 456 789', admissionDate: '2023-01-15', status: 'active', avatar: 'Maria' },
                { id: '2', name: 'João Pereira', role: 'Chef', phone: '+244 912 345 678', admissionDate: '2023-03-20', status: 'active', avatar: 'Joao' },
                { id: '3', name: 'Ana Costa', role: 'Atendente', phone: '+244 934 567 890', admissionDate: '2023-06-01', status: 'active', avatar: 'Ana' },
            ];
            setStaff(initialStaff);
            localStorage.setItem(`at_staff_${id}`, JSON.stringify(initialStaff));
        }
    }, [id]);

    const saveStaff = (updatedStaff: Employee[]) => {
        setStaff(updatedStaff);
        localStorage.setItem(`at_staff_${id}`, JSON.stringify(updatedStaff));
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.role) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (editingId) {
            // Editar funcionário existente
            const updated = staff.map(e =>
                e.id === editingId
                    ? { ...e, ...formData }
                    : e
            );
            saveStaff(updated);
        } else {
            // Adicionar novo funcionário
            const newEmployee: Employee = {
                id: Date.now().toString(),
                ...formData,
                status: 'active',
                avatar: formData.name.split(' ')[0]
            };
            saveStaff([...staff, newEmployee]);
        }

        resetForm();
    };

    const handleEdit = (employee: Employee) => {
        setEditingId(employee.id);
        setFormData({
            name: employee.name,
            role: employee.role,
            phone: employee.phone,
            admissionDate: employee.admissionDate
        });
        setShowModal(true);
    };

    const handleDelete = (employeeId: string) => {
        if (confirm('Deseja remover este funcionário?')) {
            const updated = staff.filter(e => e.id !== employeeId);
            saveStaff(updated);
        }
    };

    const toggleStatus = (employeeId: string) => {
        const updated = staff.map(e =>
            e.id === employeeId
                ? { ...e, status: e.status === 'active' ? 'inactive' as const : 'active' as const }
                : e
        );
        saveStaff(updated);
    };

    const resetForm = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({
            name: '',
            role: '',
            phone: '',
            admissionDate: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
            <header className="p-6 pt-12 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50 border-b border-white/5">
                <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-surface-dark flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-white">arrow_back</span>
                </button>
                <div>
                    <h1 className="text-xl font-black text-white italic">Funcionários</h1>
                    <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-0.5">Estabelecimento #{id}</p>
                </div>
            </header>

            <main className="p-6 space-y-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-blue-500 text-white p-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                >
                    <span className="material-symbols-outlined">person_add</span>
                    <span className="text-sm font-black uppercase tracking-widest">Adicionar Funcionário</span>
                </button>

                <div className="space-y-4">
                    {staff.map(person => (
                        <div key={person.id} className="bg-surface-dark/50 border border-white/5 rounded-[24px] p-5 flex items-center gap-4">
                            <div className="size-14 rounded-2xl overflow-hidden border border-white/10">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}`}
                                    alt={person.name}
                                    className="w-full h-full object-cover bg-surface-light"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white">{person.name}</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{person.role}</p>
                                <p className="text-[9px] text-gray-600 mt-1">{person.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleStatus(person.id)}
                                    className={`text-[8px] font-black uppercase px-2 py-1 rounded cursor-pointer ${person.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}
                                >
                                    {person.status === 'active' ? 'Ativo' : 'Inativo'}
                                </button>
                                <button
                                    onClick={() => handleEdit(person)}
                                    className="size-10 rounded-xl bg-surface-dark border border-white/10 flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-blue-400 text-lg">edit</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(person.id)}
                                    className="size-10 rounded-xl bg-surface-dark border border-red-500/20 flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Modal de Adicionar/Editar Funcionário */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-surface-dark border border-white/10 rounded-[32px] p-6 w-full max-w-md animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-white italic">
                                {editingId ? 'Editar Funcionário' : 'Novo Funcionário'}
                            </h2>
                            <button onClick={resetForm} className="size-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Nome Completo *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Ex: Maria Santos"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Cargo / Função *</label>
                                <select
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Selecionar cargo</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value="Chef">Chef</option>
                                    <option value="Cozinheiro">Cozinheiro</option>
                                    <option value="Atendente">Atendente</option>
                                    <option value="Rececionista">Rececionista</option>
                                    <option value="Segurança">Segurança</option>
                                    <option value="Limpeza">Limpeza</option>
                                    <option value="Motorista">Motorista</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Contacto</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="+244 9XX XXX XXX"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Data de Admissão</label>
                                <input
                                    type="date"
                                    value={formData.admissionDate}
                                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                                    className="w-full bg-background-dark border border-white/10 rounded-2xl py-4 px-4 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full mt-6 bg-blue-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                        >
                            {editingId ? 'Salvar Alterações' : 'Adicionar Funcionário'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
