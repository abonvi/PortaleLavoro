import React from 'react';

interface PersonalInfoProps {
  values: {
    nome: string;
    cognome: string;
    email: string;
    telefono: string;
    indirizzo: string;
  };
  onChange: (field: string, value: string) => void;
}

export function PersonalInfo({ values, onChange }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold gradient-text">Informazioni Personali</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome *
          </label>
          <input
            type="text"
            id="nome"
            value={values.nome}
            onChange={(e) => onChange('nome', e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="cognome" className="block text-sm font-medium text-gray-700">
            Cognome *
          </label>
          <input
            type="text"
            id="cognome"
            value={values.cognome}
            onChange={(e) => onChange('cognome', e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
            Telefono *
          </label>
          <input
            type="tel"
            id="telefono"
            value={values.telefono}
            onChange={(e) => onChange('telefono', e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="indirizzo" className="block text-sm font-medium text-gray-700">
            Indirizzo *
          </label>
          <input
            type="text"
            id="indirizzo"
            value={values.indirizzo}
            onChange={(e) => onChange('indirizzo', e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
}