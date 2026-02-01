
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROVINCES_DATA } from './CulturalMosaic';
import { LocalService } from '../types';

interface ApprovedCompany {
  id: string;
  name: string;
  province: string;
  category: string;
  phone?: string;
  municipality?: string;
}

const ProvinceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const province = PROVINCES_DATA.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<'public' | 'private'>('public');
  const [approvedCompanies, setApprovedCompanies] = useState<ApprovedCompany[]>([]);

  // Carregar empresas aprovadas e filtrar por província
  useEffect(() => {
    const companiesJson = localStorage.getItem('at_approved_companies');
    if (companiesJson && province) {
      const allCompanies: ApprovedCompany[] = JSON.parse(companiesJson);
      // Filtrar empresas pela província actual
      const filtered = allCompanies.filter(
        c => c.province?.toLowerCase() === province.name.toLowerCase()
      );
      setApprovedCompanies(filtered);
    }
  }, [province]);

  if (!province) return <div className="p-10 text-center">Província não encontrada.</div>;

  // Use React.FC to handle special props like 'key' correctly during list rendering
  const ServiceCard: React.FC<{ service: LocalService }> = ({ service }) => (
    <div className="bg-surface-dark/50 dark:bg-surface-dark/50 border border-white/5 p-5 rounded-[28px] flex items-center justify-between shadow-xl hover:border-accent/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`size-12 rounded-2xl flex items-center justify-center border ${service.category === 'Saúde' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
            service.category === 'Segurança' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
              service.category === 'Finanças' ? 'bg-accent/10 border-accent/20 text-accent' :
                'bg-gray-500/10 border-gray-500/20 text-gray-400'
          }`}>
          <span className="material-symbols-outlined text-2xl">
            {service.category === 'Saúde' ? 'medical_services' :
              service.category === 'Segurança' ? 'local_police' :
                service.category === 'Finanças' ? 'account_balance' : 'settings_input_antenna'}
          </span>
        </div>
        <div>
          <h4 className="text-sm font-black text-white dark:text-white leading-tight">{service.name}</h4>
          <p className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">{service.address}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => window.location.href = `tel:${service.phone}`}
          className="size-9 rounded-xl bg-background-dark dark:bg-background-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">call</span>
        </button>
      </div>
    </div>
  );

  // Card para empresas aprovadas
  const CompanyCard: React.FC<{ company: ApprovedCompany }> = ({ company }) => (
    <div className="bg-surface-dark/50 dark:bg-surface-dark/50 border border-accent/10 p-5 rounded-[28px] flex items-center justify-between shadow-xl hover:border-accent/30 transition-all group">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-2xl flex items-center justify-center border bg-accent/10 border-accent/20 text-accent">
          <span className="material-symbols-outlined text-2xl">verified</span>
        </div>
        <div>
          <h4 className="text-sm font-black text-white dark:text-white leading-tight">{company.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] bg-accent/10 text-accent px-2 py-0.5 rounded font-bold uppercase">{company.category}</span>
            {company.municipality && (
              <span className="text-[10px] text-gray-500 font-bold">{company.municipality}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        {company.phone && (
          <button
            onClick={() => window.location.href = `tel:${company.phone}`}
            className="size-9 rounded-xl bg-background-dark dark:bg-background-dark border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-accent transition-colors"
          >
            <span className="material-symbols-outlined text-lg">call</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-background-dark dark:bg-background-dark min-h-screen pb-32 overflow-y-auto no-scrollbar">
      {/* Hero Header */}
      <div className="relative h-[45vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${province.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-dark" />

        <header className="absolute top-12 left-6 right-6 flex justify-between items-center z-20">
          <button onClick={() => navigate(-1)} className="size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="size-11 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 flex items-center justify-center text-accent">
              <span className="material-symbols-outlined">verified</span>
            </button>
          </div>
        </header>

        <div className="absolute bottom-6 left-8 right-8">
          <p className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-2">Angola Tour Hub</p>
          <h1 className="text-5xl font-black text-white italic tracking-tighter leading-none">{province.name}</h1>
          <p className="text-gray-300 text-sm font-medium mt-4 leading-relaxed max-w-[90%]">{province.description}</p>
        </div>
      </div>

      <main className="p-6 space-y-10">
        {/* Statistics Bar */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Capital', val: province.capital, icon: 'location_city' },
            { label: 'Ritmo', val: province.ritmo, icon: 'music_note' },
            { label: 'Prato', val: province.dish, icon: 'restaurant' },
          ].map(s => (
            <div key={s.label} className="bg-surface-dark/30 dark:bg-surface-dark/30 border border-white/5 p-4 rounded-[28px] text-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-primary text-xl mb-1">{s.icon}</span>
              <p className="text-[10px] font-black text-white dark:text-white truncate px-1">{s.val}</p>
              <p className="text-[7px] font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Services Tab Selector */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-black text-white dark:text-white tracking-widest uppercase">Serviços Locais</h2>
            <div className="flex bg-surface-dark dark:bg-surface-dark p-1 rounded-2xl border border-white/5 shadow-inner">
              <button
                onClick={() => setActiveTab('public')}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${activeTab === 'public' ? 'bg-primary text-white shadow-lg' : 'text-gray-500'}`}
              >
                Públicos
              </button>
              <button
                onClick={() => setActiveTab('private')}
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${activeTab === 'private' ? 'bg-accent text-black shadow-lg' : 'text-gray-500'}`}
              >
                Privados ({approvedCompanies.length})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeTab === 'public' ? (
              province.publicServices.length > 0 ? (
                province.publicServices.map(s => <ServiceCard key={s.id} service={s} />)
              ) : (
                <p className="text-[10px] text-gray-600 font-bold text-center py-10">Nenhum serviço público registado nesta base.</p>
              )
            ) : (
              // Mostrar empresas aprovadas filtradas por província
              approvedCompanies.length > 0 || province.privateServices.length > 0 ? (
                <>
                  {approvedCompanies.map(c => <CompanyCard key={c.id} company={c} />)}
                  {province.privateServices.map(s => <ServiceCard key={s.id} service={s} />)}
                </>
              ) : (
                <p className="text-[10px] text-gray-600 font-bold text-center py-10">Nenhum serviço privado registado nesta província.</p>
              )
            )}
          </div>
        </section>

        {/* Registration CTA - Elegant & Attractive */}
        <section className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[40px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-surface-dark border border-white/10 rounded-[40px] p-8 overflow-hidden">
            <div className="absolute -right-10 -top-10 size-40 bg-accent/5 blur-3xl rounded-full" />

            <div className="flex flex-col gap-6 items-center text-center">
              <div className="size-20 rounded-[32px] bg-background-dark border-2 border-dashed border-accent/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-accent text-4xl">storefront</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white italic">Tens um negócio em {province.name}?</h3>
                <p className="text-xs text-gray-500 font-medium mt-2 leading-relaxed">
                  Junta-te à rede oficial do <span className="text-white">Angola Tour</span> e alcança milhares de turistas que visitam a província todos os meses.
                </p>
              </div>
              <button
                onClick={() => navigate('/register-service')}
                className="w-full bg-accent text-black py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-accent/20 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                EFETUAR CADASTRO LOCAL
                <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Cultural Fact AI (Small Widget) */}
        <section className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 p-6 rounded-[32px] flex gap-4 items-center">
          <div className="size-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Sabias que?</p>
            <p className="text-[11px] text-gray-400 leading-tight mt-1">
              {province.name === 'Luanda' ? 'O nome original da cidade era São Paulo da Assunção de Loanda.' :
                province.name === 'Huíla' ? 'O Lubango situa-se a uma altitude média de 1.760 metros.' :
                  'Esta província é vital para a preservação das tradições bantu de Angola.'}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProvinceDetail;
