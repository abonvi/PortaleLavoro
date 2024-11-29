import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { JobPosition } from '../../types';

interface JobPositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (position: Partial<JobPosition>) => void;
  position?: JobPosition | null;
}

export function JobPositionModal({ isOpen, onClose, onSave, position }: JobPositionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
  });

  useEffect(() => {
    if (position) {
      setFormData({
        title: position.title,
        code: position.code,
        description: position.description,
      });
    } else {
      setFormData({
        title: '',
        code: '',
        description: '',
      });
    }
  }, [position]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        
        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {position ? 'Modifica Posizione' : 'Nuova Posizione'}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titolo
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Codice
                </label>
                <input
                  type="text"
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descrizione
                </label>
                <textarea
                  id="description"
                  rows={10}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  {position ? 'Salva Modifiche' : 'Crea Posizione'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}