import React, { useState } from 'react';
import { User } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { Icons } from './icons';
import ToggleSwitch from './ui/ToggleSwitch';
import Modal from './ui/Modal';

const mockUsers: User[] = [
  { id: '1', name: 'Lumen Digital', type: 'ADMIN', status: true },
  { id: '2', name: 'Usuário Teste01', type: 'USER', status: true },
  { id: '3', name: 'usuario-528096135', type: 'USER', status: false },
];

const PermissionCheckbox = ({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) => (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4 rounded bg-gray-100 border-gray-300 text-brand-yellow focus:ring-brand-yellow" />
      <span className="text-sm text-brand-text-primary">{label}</span>
    </label>
);

const EditPermissionsModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Permissões: Lumen Digital">
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-brand-text-primary mb-3">Visibilidade de Menus</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <PermissionCheckbox label="Menu Chat" defaultChecked />
                        <PermissionCheckbox label="Menu Agente de IA" defaultChecked />
                        <PermissionCheckbox label="Menu CRM" defaultChecked />
                        <PermissionCheckbox label="Menu Agendamentos" defaultChecked />
                        <PermissionCheckbox label="Menu Prospectar" defaultChecked />
                        <PermissionCheckbox label="Menu Contatos" defaultChecked />
                        <PermissionCheckbox label="Menu Conexão" defaultChecked />
                        <PermissionCheckbox label="Menu Configurações" defaultChecked />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-text-primary mb-3">Permissões de Edição</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <PermissionCheckbox label="Editar Agente de IA" defaultChecked />
                        <PermissionCheckbox label="Editar CRM" />
                        <PermissionCheckbox label="Editar Agendamentos" defaultChecked />
                        <PermissionCheckbox label="Editar Prospecção" />
                        <PermissionCheckbox label="Editar Contatos" defaultChecked />
                        <PermissionCheckbox label="Editar Conexão" />
                        <PermissionCheckbox label="Editar Configurações" defaultChecked />
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-brand-text-primary mb-3">Visibilidade de Leads</h3>
                    <div className="flex items-start space-x-2">
                      <PermissionCheckbox label="Ver todos os Leads" />
                      <span className="text-xs text-brand-text-secondary">Não: Apenas Leads Atribuídos</span>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-end space-x-3">
                <Button variant="secondary" onClick={onClose}>Cancelar</Button>
                <Button variant="primary" onClick={onClose}>Salvar Permissões</Button>
            </div>
        </Modal>
    );
};

const Settings: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text-primary">Configurações</h1>
      <div className="flex space-x-4 border-b border-brand-border">
          <button className="py-2 px-1 border-b-2 border-brand-yellow text-brand-text-primary font-semibold">Usuários</button>
          <button className="py-2 px-1 text-brand-text-secondary hover:text-brand-text-primary">CRM</button>
          <button className="py-2 px-1 text-brand-text-secondary hover:text-brand-text-primary">Disparo</button>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-brand-text-primary">Usuários</h2>
          <Button variant="primary" onClick={() => {}}>
            <Icons.Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-brand-border text-sm text-brand-text-secondary">
              <th className="py-3 px-4">NOME</th>
              <th className="py-3 px-4">TIPO</th>
              <th className="py-3 px-4">STATUS</th>
              <th className="py-3 px-4 text-right">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-brand-border hover:bg-gray-50">
                <td className="py-3 px-4 text-brand-text-primary font-medium">{user.name}</td>
                <td className="py-3 px-4">{user.type}</td>
                <td className="py-3 px-4">
                  <ToggleSwitch initialChecked={user.status} />
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" className="p-2" onClick={() => setIsModalOpen(true)}>
                    <Icons.Pencil className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <EditPermissionsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Settings;