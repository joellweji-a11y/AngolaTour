import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Category, CompanySubcategory } from '../types';
import IntlPhoneInput from '../components/IntlPhoneInput';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState<'user' | 'company' | 'admin'>('user');
  const [isLoading, setIsLoading] = useState(false);

  // States unificados
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    nif: '',
    category: Category.STAY,
    subcategory: 'Hotel' as CompanySubcategory,
    province: 'Luanda',
    municipality: '',
    payments: [] as string[],
    adminKey: '' // Nova chave para registro de administrador
  });

  const provinces = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'];
  const paymentOptions = ['Multicaixa Express', 'Transferência BAI', 'Cash', 'Visa/Mastercard'];

  const subcategories: Record<string, CompanySubcategory[]> = {
    [Category.STAY]: ['Hotel', 'Resort', 'Pensão', 'Guest House'],
    [Category.FOOD]: ['Restaurante Típico', 'Gourmet', 'Fast Food', 'Bar/Esplanada'],
    [Category.TRANSPORT]: ['Táxi Privado', 'Aluguer de Carros', 'Agência de Viagens'],
    [Category.CULTURE]: ['Museu', 'Galeria', 'Guia Independente'],
    [Category.COMMERCE]: ['Supermercado', 'Shopping/Centro Comercial', 'Mercado Municipal', 'Boutique'],
    [Category.FINANCE]: ['Banco', 'Casa de Câmbio', 'Agência de Seguros', 'ATM/Multicaixa'],
    [Category.LEISURE]: ['Bar', 'Discoteca', 'Rooftop', 'Lounge'],
    [Category.OTHER]: ['Outros']
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (registerType === 'admin') {
        if (formData.adminKey !== 'ANGOLA-2024-ROOT') {
          alert("Código Admin inválido! Contacte a Direção de TI.");
          setIsLoading(false);
          return;
        }
        localStorage.setItem('at_user_session', JSON.stringify({ ...formData, role: 'admin' }));
        alert("Conta de Administrador criada! Bem-vindo ao comando central.");
        navigate('/admin');
      } else if (registerType === 'company') {
        const pendingCompanies = JSON.parse(localStorage.getItem('at_pending_companies') || '[]');
        pendingCompanies.push({ ...formData, id: 'C' + Math.random().toString(36).substr(2, 5), status: 'pending', registrationDate: new Date().toLocaleDateString() });
        localStorage.setItem('at_pending_companies', JSON.stringify(pendingCompanies));
        alert("Registo de Empresa enviado! Aguarde a aprovação do Administrador.");
        navigate('/login');
      } else {
        localStorage.setItem('at_user_session', JSON.stringify({ ...formData, role: 'user' }));
        navigate('/home');
      }
      setIsLoading(false);
    }, 2000);
  };

  const togglePayment = (method: string) => {
    setFormData(prev => ({
      ...prev,
      payments: prev.payments.includes(method)
        ? prev.payments.filter(m => m !== method)
        : [...prev.payments, method]
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-background-dark relative overflow-y-auto no-scrollbar px-8">
      <header className="pt-12 mb-8">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-surface-dark flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-white">arrow_back</span>
          </button>
          <h1 className="text-xl font-black italic tracking-tighter">
            <span className="text-white">Angola</span><span className="text-primary">Tour</span>
          </h1>
        </div>
        <h2 className="text-3xl font-extrabold text-white italic tracking-tighter leading-none">Criação de Acesso</h2>
        <p className="text-gray-500 mt-2 text-sm font-medium uppercase tracking-widest">Registo Unificado AngolaTour</p>
      </header>

      {/* Seletor de Tipo Triplo */}
      <div className="flex bg-surface-dark p-1 rounded-2xl border border-white/5 mb-8 shadow-inner">
        <button
          onClick={() => setRegisterType('user')}
          className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${registerType === 'user' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}
        >
          Viajante
        </button>
        <button
          onClick={() => setRegisterType('company')}
          className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${registerType === 'company' ? 'bg-accent text-black shadow-lg' : 'text-gray-500'}`}
        >
          Empresa
        </button>
        <button
          onClick={() => setRegisterType('admin')}
          className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${registerType === 'admin' ? 'bg-white/10 text-white shadow-lg border border-white/10' : 'text-gray-500'}`}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-5 pb-20">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
            {registerType === 'admin' ? 'Nome do Operador' : registerType === 'company' ? 'Nome da Entidade' : 'Nome Completo'}
          </label>
          <input
            required
            className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {registerType === 'admin' && (
          <div className="space-y-2 animate-in fade-in duration-500">
            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Código de Autorização AngolaTour</label>
            <div className="relative">
              <input
                required
                type="password"
                className="w-full bg-surface-dark border-2 border-primary/20 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Introduza a chave mestre"
                value={formData.adminKey}
                onChange={e => setFormData({ ...formData, adminKey: e.target.value })}
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">key</span>
            </div>
            <p className="text-[8px] text-gray-500 mt-2 px-1">Este acesso concede privilégios de moderação total sobre dados de terceiros.</p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email de Acesso</label>
          <input
            required
            type="email"
            className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary outline-none"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        {/* Telefone Internacional */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Telefone de Contacto</label>
          <IntlPhoneInput
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            required
          />
        </div>

        {registerType === 'company' && (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Categoria</label>
              <select
                className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-4 text-xs font-bold text-white outline-none"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
              >
                {Object.values(Category).filter(c => subcategories[c]).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Província</label>
                <select className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-4 text-xs text-white" value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value })}>
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Município</label>
                <input required className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-6 text-xs text-white" value={formData.municipality} onChange={e => setFormData({ ...formData, municipality: e.target.value })} />
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Palavra-passe</label>
          <input
            required
            type="password"
            className="w-full bg-surface-dark border border-white/5 rounded-2xl py-4 px-6 text-white focus:ring-2 focus:ring-primary outline-none"
            placeholder="Mínimo 8 caracteres"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all mt-4 disabled:opacity-50 flex items-center justify-center gap-3 ${registerType === 'user' ? 'bg-primary text-white shadow-primary/30' :
            registerType === 'company' ? 'bg-accent text-black shadow-accent/30' :
              'bg-white text-black shadow-2xl'
            }`}
        >
          {isLoading ? <div className="size-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> : (
            <>{registerType === 'admin' ? 'REGISTAR OPERADOR' : 'CONCLUIR CADASTRO'} <span className="material-symbols-outlined text-sm">rocket_launch</span></>
          )}
        </button>

        <div className="text-center pb-10">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Já possui acesso?{' '}
            <Link to="/login" className="text-primary font-black underline">Entrar agora</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;