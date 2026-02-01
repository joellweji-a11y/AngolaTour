import { BotaoSOS } from './components/BotaoSOS';
import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// Importação das Páginas Existentes
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import Transport from './pages/Transport';
import Stay from './pages/Stay';
import Food from './pages/Food';
import Culture from './pages/Culture';
import Details from './pages/Details';
import RestaurantDetails from './pages/RestaurantDetails';
import Booking from './pages/Booking';
import MapView from './pages/MapView';
import Payment from './pages/Payment';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentHistory from './pages/PaymentHistory';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Gallery from './pages/Gallery';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import CulturalMosaic from './pages/CulturalMosaic';
import ProvinceDetail from './pages/ProvinceDetail';
import MyBookings from './pages/MyBookings';
import ProviderDashboard from './pages/ProviderDashboard';
import RegistrationForm from './pages/RegistrationForm';
import EstablishmentDashboard from './pages/EstablishmentDashboard';
import PromotionsManagement from './pages/PromotionsManagement';
import GuideRegistration from './pages/GuideRegistration';
import GuideDashboard from './pages/GuideDashboard';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import PersonalData from './pages/PersonalData';
import PaymentsCommissions from './pages/PaymentsCommissions';
import SecuritySettings from './pages/SecuritySettings';
import PreferencesSettings from './pages/PreferencesSettings';
import NotificationSettings from './pages/NotificationSettings';
import LegalSupport from './pages/LegalSupport';
import HelpCenter from './pages/HelpCenter';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UnifiedSearch from './pages/UnifiedSearch';
import ConnectedAccounts from './pages/ConnectedAccounts';
import SafetyTips from './pages/SafetyTips';
import FeedbackReport from './pages/FeedbackReport';
import VirtualExperience from './pages/VirtualExperience';
import PrivacySettings from './pages/PrivacySettings';
import MyMessages from './pages/MyMessages';
import CompanyProfile from './pages/CompanyProfile';
import MenuManagement from './pages/MenuManagement';
import StaffManagement from './pages/StaffManagement';
import EstablishmentSettings from './pages/EstablishmentSettings';
import SOSPage from './pages/SOSPage';
import CreateAd from './pages/CreateAd';
import AdPendingStatus from './pages/AdPendingStatus';
import AdminAdsReview from './pages/AdminAdsReview';
import AdReviewDetail from './pages/AdReviewDetail';

// IMPORTAÇÃO DA NOVA PÁGINA DE GESTÃO DE SUBSCRICÕES
import { AdminGestao } from './pages/AdminGestao';

const isAuthenticated = () => !!localStorage.getItem('at_user_session');

const isAdmin = () => {
  const session = localStorage.getItem('at_user_session');
  if (!session) return false;
  try {
    const user = JSON.parse(session);
    return user.role === 'admin' || user.email === 'admin@angolatour.ao';
  } catch (e) {
    return false;
  }
};

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideNav = ['/', '/login', '/register', '/admin', '/register-service', '/establishment-dashboard', '/promotions', '/register-guide', '/guide-dashboard', '/chat', '/settings', '/search', '/safety-tips', '/feedback', '/experience', '/company-profile'].some(path => location.pathname.startsWith(path));

  if (hideNav) return null;

  const navItems = [
    { label: 'Início', icon: 'home', path: '/home' },
    { label: 'Reservas', icon: 'calendar_month', path: '/bookings' },
    { label: 'Mensagens', icon: 'forum', path: '/messages' },
    { label: 'Explorar', icon: 'explore', path: '/mosaic' },
    { label: 'Perfil', icon: 'person', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background-dark/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-3 px-6 z-50 flex justify-between items-center shadow-2xl">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${location.pathname === item.path ? 'text-primary scale-110' : 'text-gray-500 hover:text-white'
            }`}
        >
          <span className={`material-symbols-outlined text-[26px] ${location.pathname === item.path ? 'fill-1' : 'outline'}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}

      {/* BOTÃO DE GESTÃO - APENAS VISÍVEL PARA ADMINS */}
      {isAdmin() && (
        <button
          onClick={() => navigate('/admin/gestao-empresas')}
          className="ml-2 p-2 bg-primary/20 border border-primary/50 rounded-lg text-primary flex flex-col items-center gap-1 animate-pulse"
        >
          <span className="material-symbols-outlined text-[24px]">settings_suggest</span>
          <span className="text-[8px] font-bold uppercase">Gestão</span>
        </button>
      )}
    </nav>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Navigate to="/home" replace />;
  return <>{children}</>;
};


// IMPORTAÇÃO DO COMPONENTE DE TESTE
import { EmpresasLista } from './components/EmpresasLista';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl relative overflow-x-hidden font-body text-text-dark dark:text-white">

        {/* O Botão SOS fica aqui dentro para respeitar o layout da App */}
        <BotaoSOS />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/test-companies" element={<EmpresasLista />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<ProtectedRoute><UnifiedSearch /></ProtectedRoute>} />
          <Route path="/safety-tips" element={<ProtectedRoute><SafetyTips /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><FeedbackReport /></ProtectedRoute>} />
          <Route path="/experience" element={<ProtectedRoute><VirtualExperience /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/mosaic" element={<ProtectedRoute><CulturalMosaic /></ProtectedRoute>} />
          <Route path="/province/:id" element={<ProtectedRoute><ProvinceDetail /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MyMessages /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/settings/personal-data" element={<ProtectedRoute><PersonalData /></ProtectedRoute>} />
          <Route path="/settings/connected-accounts" element={<ProtectedRoute><ConnectedAccounts /></ProtectedRoute>} />
          <Route path="/settings/payments" element={<ProtectedRoute><PaymentsCommissions /></ProtectedRoute>} />
          <Route path="/settings/security" element={<ProtectedRoute><SecuritySettings /></ProtectedRoute>} />
          <Route path="/settings/privacy" element={<ProtectedRoute><PrivacySettings /></ProtectedRoute>} />
          <Route path="/settings/preferences" element={<ProtectedRoute><PreferencesSettings /></ProtectedRoute>} />
          <Route path="/settings/notifications" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
          <Route path="/settings/help" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
          <Route path="/settings/legal" element={<ProtectedRoute><LegalSupport /></ProtectedRoute>} />
          <Route path="/settings/legal/terms" element={<ProtectedRoute><TermsOfService /></ProtectedRoute>} />
          <Route path="/settings/legal/privacy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/provider" element={<ProtectedRoute><ProviderDashboard /></ProtectedRoute>} />
          <Route path="/company-profile" element={<ProtectedRoute><CompanyProfile /></ProtectedRoute>} />
          <Route path="/register-service" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
          <Route path="/register-guide" element={<ProtectedRoute><GuideRegistration /></ProtectedRoute>} />
          <Route path="/guide-dashboard" element={<ProtectedRoute><GuideDashboard /></ProtectedRoute>} />
          <Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/establishment-dashboard/:id" element={<ProtectedRoute><EstablishmentDashboard /></ProtectedRoute>} />
          <Route path="/promotions/:id" element={<ProtectedRoute><PromotionsManagement /></ProtectedRoute>} />
          <Route path="/menu-management/:id" element={<ProtectedRoute><MenuManagement /></ProtectedRoute>} />
          <Route path="/staff-management/:id" element={<ProtectedRoute><StaffManagement /></ProtectedRoute>} />
          <Route path="/establishment-settings/:id" element={<ProtectedRoute><EstablishmentSettings /></ProtectedRoute>} />
          <Route path="/sos" element={<ProtectedRoute><SOSPage /></ProtectedRoute>} />
          <Route path="/transport" element={<ProtectedRoute><Transport /></ProtectedRoute>} />
          <Route path="/stay" element={<ProtectedRoute><Stay /></ProtectedRoute>} />
          <Route path="/food" element={<ProtectedRoute><Food /></ProtectedRoute>} />
          <Route path="/culture" element={<ProtectedRoute><Culture /></ProtectedRoute>} />
          <Route path="/details/:id" element={<ProtectedRoute><Details /></ProtectedRoute>} />
          <Route path="/restaurant-details/:id" element={<ProtectedRoute><RestaurantDetails /></ProtectedRoute>} />
          <Route path="/booking/:id" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute><AdminGestao /></AdminProtectedRoute>} />
          <Route path="/admin/overview" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/profile" element={<AdminProtectedRoute><AdminProfile /></AdminProtectedRoute>} />
          <Route path="/admin/ads" element={<AdminProtectedRoute><AdminAdsReview /></AdminProtectedRoute>} />
          <Route path="/admin/ads/review/:id" element={<AdminProtectedRoute><AdReviewDetail /></AdminProtectedRoute>} />

          <Route path="/ads/create" element={<ProtectedRoute><CreateAd /></ProtectedRoute>} />
          <Route path="/ads/pending-status" element={<ProtectedRoute><AdPendingStatus /></ProtectedRoute>} />
        </Routes>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;