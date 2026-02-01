
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA } from '../constants';
import { PROVINCES_DATA } from './CulturalMosaic';
import { Category, Destination, Company } from '../types';

interface AuditLog {
  id: string;
  type: 'new_company' | 'admin_access' | 'credentials_change' | 'payment_confirmed' | 'company_approved';
  description: string;
  timestamp: string;
  expanded: boolean;
}

interface ApprovedCompany extends Company {
  paymentStatus: 'pending' | 'paid';
  visible: boolean;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'moderation' | 'content'>('analytics');
  const [logFilter, setLogFilter] = useState<'all' | 'new_company' | 'admin_access' | 'credentials_change'>('all');

  // Estados de dados
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([]);
  const [approvedCompanies, setApprovedCompanies] = useState<ApprovedCompany[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: '1', type: 'new_company', description: 'Nova empresa "Hotel Baía" registrada no sistema. Aguardando aprovação do administrador. Categoria: Hospedagem, Província: Luanda.', timestamp: '2024-11-12 14:30', expanded: false },
    { id: '2', type: 'admin_access', description: 'Acesso administrativo realizado pelo user root@angolatour.ao. IP: 192.168.1.100. Localização: Luanda, Angola.', timestamp: '2024-11-12 12:00', expanded: false },
    { id: '3', type: 'credentials_change', description: 'Alteração de credenciais solicitada para gestor@empresa.ao. Token de recuperação enviado. Válido por 24h.', timestamp: '2024-11-11 18:45', expanded: false },
    { id: '4', type: 'payment_confirmed', description: 'Pagamento de 15.000 Kz confirmado para "Restaurante Sabor Africano". Fatura #INV-2024-1234.', timestamp: '2024-11-11 10:20', expanded: false },
    { id: '5', type: 'company_approved', description: 'Empresa "Táxi Express Luanda" aprovada e ativada no ecossistema. Visível em todas as províncias.', timestamp: '2024-11-10 16:00', expanded: false },
  ]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('at_pending_companies') || '[]');
    setPendingCompanies(stored);

    const approved = JSON.parse(localStorage.getItem('at_approved_companies') || '[]');
    setApprovedCompanies(approved);
  }, []);

  const handleApprove = (id: string) => {
    const company = pendingCompanies.find(c => c.id === id);
    if (company) {
      const approvedCompany: ApprovedCompany = {
        ...company,
        status: 'active',
        paymentStatus: 'pending',
        visible: false
      };

      const newApproved = [...approvedCompanies, approvedCompany];
      setApprovedCompanies(newApproved);
      localStorage.setItem('at_approved_companies', JSON.stringify(newApproved));

      const updated = pendingCompanies.filter(c => c.id !== id);
      setPendingCompanies(updated);
      localStorage.setItem('at_pending_companies', JSON.stringify(updated));

      // Add audit log
      const newLog: AuditLog = {
        id: Date.now().toString(),
        type: 'company_approved',
        description: `Empresa "${company.name}" aprovada. Aguardando confirmação de pagamento para ativar visibilidade.`,
        timestamp: new Date().toLocaleString('pt-AO'),
        expanded: false
      };
      setAuditLogs([newLog, ...auditLogs]);

      alert("Empresa aprovada! Aguardando confirmação de pagamento para ativar visibilidade nas províncias.");
    }
  };

  const handleConfirmPayment = (id: string) => {
    const updated = approvedCompanies.map(c =>
      c.id === id ? { ...c, paymentStatus: 'paid' as const, visible: true } : c
    );
    setApprovedCompanies(updated);
    localStorage.setItem('at_approved_companies', JSON.stringify(updated));

    const company = approvedCompanies.find(c => c.id === id);
    if (company) {
      const newLog: AuditLog = {
        id: Date.now().toString(),
        type: 'payment_confirmed',
        description: `Pagamento confirmado para "${company.name}". Empresa agora visível na província ${company.province}.`,
        timestamp: new Date().toLocaleString('pt-AO'),
        expanded: false
      };
      setAuditLogs([newLog, ...auditLogs]);
    }

    alert("Pagamento confirmado! Empresa agora visível nas províncias.");
  };

  const handleReject = (id: string) => {
    if (confirm("Deseja rejeitar esta empresa?")) {
      const updated = pendingCompanies.filter(c => c.id !== id);
      setPendingCompanies(updated);
      localStorage.setItem('at_pending_companies', JSON.stringify(updated));
    }
  };

  const toggleLogExpand = (id: string) => {
    setAuditLogs(auditLogs.map(log =>
      log.id === id ? { ...log, expanded: !log.expanded } : log
    ));
  };

  const filteredLogs = logFilter === 'all'
    ? auditLogs
    : auditLogs.filter(log => log.type === logFilter);

  const stats = {
    revenue: "15.4M Kz",
    bookings: "1,420",
    growth: "+22%",
    pendingApprovals: pendingCompanies.length,
    awaitingPayment: approvedCompanies.filter(c => c.paymentStatus === 'pending').length
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'new_company': return 'store';
      case 'admin_access': return 'security';
      case 'credentials_change': return 'password';
      case 'payment_confirmed': return 'payments';
      case 'company_approved': return 'verified';
      default: return 'info';
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'new_company': return 'text-blue-400 bg-blue-500/10';
      case 'admin_access': return 'text-purple-400 bg-purple-500/10';
      case 'credentials_change': return 'text-orange-400 bg-orange-500/10';
      case 'payment_confirmed': return 'text-green-400 bg-green-500/10';
      case 'company_approved': return 'text-accent bg-accent/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="flex-1 pb-32 overflow-y-auto no-scrollbar bg-background-dark min-h-screen">
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={() => alert('Avatar administrativo atualizado!')} />

      <header className="p-6 pt-12 bg-surface-dark/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/home')}
              className="size-11 rounded-2xl bg-primary flex items-center justify-center border border-white/10 shadow-xl active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-white">home</span>
            </button>
            <div className="relative">
              <button onClick={() => navigate('/admin/profile')} className="size-11 rounded-2xl bg-background-dark flex items-center justify-center border border-white/10 shadow-xl overflow-hidden active:scale-95 transition-all">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdminRoot" alt="Admin" className="w-full h-full object-cover" />
              </button>
              <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 border-2 border-surface-dark rounded-full animate-pulse" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-black italic leading-none">
              <span className="text-white">Angola</span><span className="text-primary">Tour</span> <span className="text-white">Admin</span>
            </h1>
            <p className="text-[8px] text-primary font-black uppercase tracking-[0.4em] mt-1.5">Kernel Security v5.0</p>
          </div>
          <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative">
            <span className="material-symbols-outlined text-lg">notifications</span>
            {(stats.pendingApprovals + stats.awaitingPayment) > 0 && <span className="absolute -top-1 -right-1 size-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-black animate-pulse">{stats.pendingApprovals + stats.awaitingPayment}</span>}
          </div>
        </div>

        {/* Tab Navigation Pro */}
        <div className="flex bg-background-dark/80 p-1.5 rounded-2xl border border-white/5 shadow-inner">
          {[
            { id: 'analytics', icon: 'monitoring', label: 'Stats' },
            { id: 'moderation', icon: 'verified_user', label: 'Moderar' },
            { id: 'users', icon: 'group', label: 'Gestão' },
            { id: 'content', icon: 'history', label: 'Logs' },
            { id: 'ads', icon: 'ads_click', label: 'Anúncios' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex flex-col items-center py-2.5 rounded-xl transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg scale-105' : 'text-gray-500'
                }`}
            >
              <span className="material-symbols-outlined text-xl mb-0.5">{tab.icon}</span>
              <span className="text-[8px] font-black uppercase tracking-tighter">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="p-6 space-y-10">

        {/* TAB: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] shadow-2xl">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Aprovações Pendentes</p>
                <h2 className={`text-2xl font-black mt-3 leading-none ${stats.pendingApprovals > 0 ? 'text-accent' : 'text-white'}`}>{stats.pendingApprovals}</h2>
              </div>
              <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] shadow-2xl">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Aguardando Pagamento</p>
                <h2 className={`text-2xl font-black mt-3 leading-none ${stats.awaitingPayment > 0 ? 'text-orange-500' : 'text-white'}`}>{stats.awaitingPayment}</h2>
              </div>
              <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] shadow-2xl">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Receita Mensal</p>
                <h2 className="text-2xl font-black text-green-500 mt-3 leading-none">{stats.revenue}</h2>
              </div>
              <div className="bg-surface-dark border border-white/5 p-6 rounded-[32px] shadow-2xl">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Crescimento</p>
                <h2 className="text-2xl font-black text-green-500 mt-3 leading-none">{stats.growth}</h2>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MODERATION */}
        {activeTab === 'moderation' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Solicitações de Registo</h3>
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{pendingCompanies.length} pendentes</span>
            </div>

            {pendingCompanies.length === 0 ? (
              <div className="py-20 flex flex-col items-center opacity-30 text-center">
                <span className="material-symbols-outlined text-7xl mb-4">check_circle</span>
                <p className="font-black text-lg uppercase tracking-widest">Tudo em ordem</p>
                <p className="text-xs font-bold mt-1">Nenhuma empresa aguardando moderação.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingCompanies.map(company => (
                  <div key={company.id} className="bg-surface-dark/50 border border-white/5 p-6 rounded-[32px] space-y-4 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-black text-white italic">{company.name}</h4>
                        <p className="text-[10px] text-accent font-black uppercase tracking-widest">NIF: {company.nif}</p>
                      </div>
                      <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-[8px] font-black uppercase">{company.subcategory}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                      <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> {company.province}</div>
                      <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">payments</span> {company.acceptedPayments?.length || 0} Métodos</div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleApprove(company.id)}
                        className="flex-1 bg-green-500 text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-green-500/20"
                      >
                        APROVAR NO ECOSSISTEMA
                      </button>
                      <button
                        onClick={() => handleReject(company.id)}
                        className="px-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: USERS/GESTÃO - Payment Confirmation */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Confirmação de Pagamentos</h3>
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">{stats.awaitingPayment} aguardando</span>
            </div>

            {approvedCompanies.filter(c => c.paymentStatus === 'pending').length === 0 ? (
              <div className="py-20 flex flex-col items-center opacity-30 text-center">
                <span className="material-symbols-outlined text-7xl mb-4">payments</span>
                <p className="font-black text-lg uppercase tracking-widest">Nenhum pagamento pendente</p>
                <p className="text-xs font-bold mt-1">Todas as empresas estão com pagamento confirmado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {approvedCompanies.filter(c => c.paymentStatus === 'pending').map(company => (
                  <div key={company.id} className="bg-surface-dark/50 border border-orange-500/20 p-6 rounded-[32px] space-y-4 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-black text-white italic">{company.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{company.province} • {company.subcategory}</p>
                      </div>
                      <span className="bg-orange-500/10 text-orange-400 px-2 py-1 rounded text-[8px] font-black uppercase animate-pulse">Aguardando</span>
                    </div>

                    <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-xl">
                      <p className="text-[10px] text-orange-300 font-bold">
                        ⚠️ Esta empresa foi aprovada mas ainda não é visível nas províncias. Confirme o pagamento para ativar.
                      </p>
                    </div>

                    <button
                      onClick={() => handleConfirmPayment(company.id)}
                      className="w-full bg-green-500 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">check_circle</span>
                      CONFIRMAR PAGAMENTO E ATIVAR
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Empresas Ativas */}
            {approvedCompanies.filter(c => c.paymentStatus === 'paid').length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Empresas Ativas ({approvedCompanies.filter(c => c.paymentStatus === 'paid').length})</h4>
                <div className="space-y-3">
                  {approvedCompanies.filter(c => c.paymentStatus === 'paid').map(company => (
                    <div key={company.id} className="bg-green-500/5 border border-green-500/20 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">{company.name}</p>
                        <p className="text-[9px] text-gray-500 font-bold uppercase">{company.province}</p>
                      </div>
                      <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-[8px] font-black uppercase">✓ Ativa</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: CONTENT/LOGS - Audit Logs */}
        {activeTab === 'content' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Logs de Auditoria</h3>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {[
                { id: 'all', label: 'Todos', icon: 'list' },
                { id: 'new_company', label: 'Nova Empresa', icon: 'store' },
                { id: 'admin_access', label: 'Acesso Admin', icon: 'security' },
                { id: 'credentials_change', label: 'Credenciais', icon: 'password' },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setLogFilter(filter.id as any)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-2 transition-all ${logFilter === filter.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-surface-dark border border-white/10 text-gray-500'
                    }`}
                >
                  <span className="material-symbols-outlined text-sm">{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Log Entries */}
            <div className="space-y-3">
              {filteredLogs.map(log => (
                <div key={log.id} className="bg-surface-dark/50 border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-4 flex items-start gap-3">
                    <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${getLogColor(log.type)}`}>
                      <span className="material-symbols-outlined text-lg">{getLogIcon(log.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold text-gray-200 ${log.expanded ? '' : 'line-clamp-2'}`}>
                        {log.description}
                      </p>
                      <p className="text-[9px] text-gray-600 font-bold mt-1">{log.timestamp}</p>
                    </div>
                    <button
                      onClick={() => toggleLogExpand(log.id)}
                      className="shrink-0 size-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {log.expanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>

                  {log.expanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-white/[0.02]">
                      <p className="text-[10px] text-gray-400 leading-relaxed">{log.description}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="text-[9px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          Ver Detalhes
                        </button>
                        <button className="text-[9px] font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg uppercase tracking-wider">
                          Exportar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: ADS */}
        {activeTab === 'ads' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-500">
            <div className="text-center py-8">
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-4xl">ads_click</span>
              </div>
              <h3 className="text-xl font-black text-white italic">Gestão de Anúncios</h3>
              <p className="text-sm text-gray-500 mt-2">Reveja e aprove anúncios submetidos por utilizadores</p>
            </div>

            <button
              onClick={() => navigate('/admin/ads')}
              className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined text-xl">open_in_new</span>
              Abrir Painel de Anúncios
            </button>
          </div>
        )}

      </main>

      <div className="mt-12 mb-20 text-center opacity-20 px-8">
        <p className="text-[8px] font-black uppercase tracking-[0.8em] text-white italic">AngolaTour System Security Kernel</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
