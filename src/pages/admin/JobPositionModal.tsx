import React, { useState, useEffect } from 'react';
import { X, Loader2, Code2, Building2, Users2, TrendingUp, Megaphone } from 'lucide-react';
import { createJobPosition, updateJobPosition } from '../../services/jobService';
import { RichTextEditor } from '../../components/RichTextEditor';
import type { JobPosition } from '../../types';

const categoryIcons = {
  development: { icon: Code2, text: 'Sviluppo' },
  administration: { icon: Building2, text: 'Amministrazione' },
  sales: { icon: TrendingUp, text: 'Commerciale' },
  hr: { icon: Users2, text: 'Risorse Umane' },
  marketing: { icon: Megaphone, text: 'Marketing' },
};

const categoryOptions = [
  { value: 'development', label: 'Sviluppo' },
  { value: 'administration', label: 'Amministrazione' },
  { value: 'sales', label: 'Commerciale' },
  { value: 'hr', label: 'Risorse Umane' },
  { value: 'marketing', label: 'Marketing' },
];

interface JobPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  position: JobPosition | null;
}

export function JobPositionModal({ isOpen, onClose, onSave, position }: JobPositionModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    category: 'development' as JobPosition['category'],
  });

  useEffect(() => {
    if (position) {
      setFormData({
        title: position.title,
        code: position.code,
        description: position.description,
        category: position.category,
      });
    } else {
      setFormData({
        title: '',
        code: '',
        description: '',
        category: 'development',
      });
    }
  }, [position]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (position) {
        await updateJobPosition(position.id, formData);
      } else {
        await createJobPosition(formData);
      }
      onSave();
    } catch (error) {
      console.error('Errore durante il salvataggio:', error);
      alert('Si è verificato un errore durante il salvataggio');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const CategoryIcon = categoryIcons[formData.category].icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        
        <div className="relative bg-white rounded-2xl w-full max-w-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold gradient-text">
                {position ? 'Modifica Posizione' : 'Nuova Posizione'}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      category: e.target.value as JobPosition['category']
                    }))}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    {categoryOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <CategoryIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Titolo
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Codice
                </label>
                <input
                  type="text"
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descrizione
                </label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                  onHtmlChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
                  disabled={loading}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Salvataggio...
                    </>
                  ) : position ? (
                    'Salva Modifiche'
                  ) : (
                    'Crea Posizione'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}