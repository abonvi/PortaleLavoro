import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Code2, Building2, Users2, TrendingUp, Megaphone } from 'lucide-react';
import { getJobPosition } from '../services/jobService';
import { ApplicationForm } from '../components/ApplicationForm';
import type { JobPosition } from '../types';

const categoryIcons = {
  development: { icon: Code2, gradient: 'from-violet-200 to-violet-300', text: 'Sviluppo' },
  administration: { icon: Building2, gradient: 'from-blue-200 to-blue-300', text: 'Amministrazione' },
  sales: { icon: TrendingUp, gradient: 'from-emerald-200 to-emerald-300', text: 'Commerciale' },
  hr: { icon: Users2, gradient: 'from-orange-200 to-orange-300', text: 'Risorse Umane' },
  marketing: { icon: Megaphone, gradient: 'from-rose-200 to-rose-300', text: 'Marketing' },
};

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [position, setPosition] = useState<JobPosition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getJobPosition(id)
        .then(setPosition)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleApplicationSubmit = async (data: any) => {
    console.log('Dati candidatura:', data);
    alert('Candidatura inviata con successo!');
    navigate('/posizioni');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!position) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">
          Posizione non trovata
        </h2>
        <button
          onClick={() => navigate('/posizioni')}
          className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Torna alla lista
        </button>
      </div>
    );
  }

  const category = categoryIcons[position.category];
  const CategoryIcon = category.icon;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/posizioni')}
        className="mb-6 inline-flex items-center text-primary-600 hover:text-primary-700"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Torna alla lista
      </button>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}>
                <CategoryIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {position.title}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Codice: {position.code}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Pubblicata il {new Date(position.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div 
            className="job-description mt-8"
            dangerouslySetInnerHTML={{ __html: position.description }} 
          />
        </div>

        <div className="border-t border-gray-200 bg-gray-50 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Candidati per questa posizione
          </h2>
          <ApplicationForm
            positionId={position.id}
            onSubmit={handleApplicationSubmit}
          />
        </div>
      </div>
    </div>
  );
}