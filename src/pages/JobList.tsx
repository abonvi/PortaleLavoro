import React, { useEffect, useState } from 'react';
import { getAllJobPositions } from '../services/jobService';
import { ViewControls } from '../components/JobList/ViewControls';
import { JobCard } from '../components/JobList/JobCard';
import type { JobPosition, ViewMode, SortMode } from '../types';

export function JobList() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  useEffect(() => {
    getAllJobPositions()
      .then(setPositions)
      .finally(() => setLoading(false));
  }, []);

  const sortedPositions = [...positions].sort((a, b) => {
    if (sortMode === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento posizioni...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-text">Posizioni Aperte</h1>
        <ViewControls
          viewMode={viewMode}
          sortMode={sortMode}
          onViewModeChange={setViewMode}
          onSortModeChange={setSortMode}
        />
      </div>

      {positions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Nessuna posizione disponibile al momento.</p>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' 
            : 'space-y-4'
        }`}>
          {sortedPositions.map((position) => (
            <JobCard
              key={position.id}
              position={position}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}