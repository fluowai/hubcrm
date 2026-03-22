import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AIAgent from './components/AIAgent';
import Settings from './components/Settings';
import Conversations from './components/Conversations';
import PlaceholderPage from './components/PlaceholderPage';
import SalesAutomation from './components/SalesAutomation';
import Prospecting from './components/Prospecting';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard />;
      case View.AIAgent:
        return <AIAgent />;
      case View.CRM:
        return <Conversations />; // Using conversations as the main CRM view for demo
      case View.Appointments:
        return <PlaceholderPage title="Agendamentos" />;
      case View.Prospecting:
        return <Prospecting />;
      case View.Contacts:
        return <PlaceholderPage title="Contatos" />;
      case View.Connection:
        return <PlaceholderPage title="Conexão" />;
      case View.Settings:
        return <Settings />;
      case View.SalesAutomation:
        return <SalesAutomation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text-secondary font-sans">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;