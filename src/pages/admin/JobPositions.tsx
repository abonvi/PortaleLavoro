import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2, Code2, Building2, Users2, TrendingUp, Megaphone } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';
import { getAllJobPositions, deleteJobPosition } from '../../services/jobService';
import type { JobPosition } from '../../types';
import { JobPositionModal } from './JobPositionModal';

const categoryIcons = {
  development: { icon: Code2, gradient: 'from-violet-200 to-violet-300', text: 'Sviluppo' },
  administration: { icon: Building2, gradient: 'from-blue-200 to-blue-300', text: 'Amministrazione' },
  sales: { icon: TrendingUp, gradient: 'from-emerald-200 to-emerald-300', text: 'Commerciale' },
  hr: { icon: Users2, gradient: 'from-orange-200 to-orange-300', text: 'Risorse Umane' },
  marketing: { icon: Megaphone, gradient: 'from-rose-200 to-rose-300', text: 'Marketing' },
};

export function AdminJobPositions() {
  const { positions, loading, setPositions, setLoading, setError } = useJobStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);

  useEffect(() => {
    loadPositions();
  }, []);

  const loadPositions = async () => {
    setLoading(true);
    try {
      const data = await getAllJobPositions();
      setPositions(data);
    } catch (error) {
      setError('Errore durante il caricamento delle posizioni');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Sei sicuro di voler eliminare questa posizione?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteJobPosition(id);
      await loadPositions();
    } catch (error) {
      setError('Errore durante l\'eliminazione della posizione');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (position: JobPosition) => {
    setEditingPosition(position);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingPosition(null);
  };

  const handleModalSave = async () => {
    await loadPositions();
    handleModalClose();
  };

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && positions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto" />
          <p className="mt-4 text-gray-600">Caricamento posizioni...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Gestione Posizioni</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestisci le posizioni lavorative aperte
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nuova Posizione
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Cerca posizioni..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="bg-white shadow-sm rounded-2xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredPositions.map((position) => {
            const category = categoryIcons[position.category];
            const CategoryIcon = category.icon;

            return (
              <li key={position.id}>
                <div className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                        <CategoryIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {position.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Codice: {position.code}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(position)}
                        className="p-2 rounded-full text-primary-600 hover:bg-primary-50 transition-colors"
                        title="Modifica"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(position.id)}
                        className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                        title="Elimina"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Pubblicata il {new Date(position.createdAt).toLocaleDateString('it-IT')}
                  </div>
                </div>
              </li>
            );
          })}
          {filteredPositions.length === 0 && (
            <li className="px-6 py-8 text-center text-gray-500">
              Nessuna posizione trovata
            </li>
          )}
        </ul>
      </div>

      <JobPositionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        position={editingPosition}
      />
    </div>
  );
}