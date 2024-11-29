import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Code2, Building2, Users2, TrendingUp, Megaphone } from 'lucide-react';
import type { JobPosition } from '../../types';

const categoryIcons = {
  development: { icon: Code2, gradient: 'from-violet-200 to-violet-300', text: 'Sviluppo' },
  administration: { icon: Building2, gradient: 'from-blue-200 to-blue-300', text: 'Amministrazione' },
  sales: { icon: TrendingUp, gradient: 'from-emerald-200 to-emerald-300', text: 'Commerciale' },
  hr: { icon: Users2, gradient: 'from-orange-200 to-orange-300', text: 'Risorse Umane' },
  marketing: { icon: Megaphone, gradient: 'from-rose-200 to-rose-300', text: 'Marketing' },
};

interface JobCardProps {
  position: JobPosition;
  viewMode: 'grid' | 'list';
}

export function JobCard({ position, viewMode }: JobCardProps) {
  const category = categoryIcons[position.category];
  const CategoryIcon = category.icon;

  if (viewMode === 'list') {
    return (
      <Link
        to={`/posizioni/${position.id}`}
        className="block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="flex items-center p-6">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient}`}>
            <CategoryIcon className="h-6 w-6 text-white" />
          </div>
          
          <div className="ml-6 flex-grow">
            <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
            <p className="mt-1 text-sm text-gray-500">Codice: {position.code}</p>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(position.createdAt).toLocaleDateString()}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/posizioni/${position.id}`}
      className="block bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="p-6">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 rounded-bl-full`} />
        
        <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} w-fit`}>
          <CategoryIcon className="h-6 w-6 text-white" />
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
          <p className="mt-1 text-sm text-gray-500">Codice: {position.code}</p>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(position.createdAt).toLocaleDateString()}
        </div>

        <div className="mt-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/80 backdrop-blur-sm text-gray-700 shadow-sm">
            Visualizza Dettagli
          </span>
        </div>
      </div>
    </Link>
  );
}