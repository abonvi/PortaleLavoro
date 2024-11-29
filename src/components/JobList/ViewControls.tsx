import React from 'react';
import { LayoutGrid, List, ArrowDownAZ, Clock } from 'lucide-react';
import type { ViewMode, SortMode } from '../../types';

interface ViewControlsProps {
  viewMode: ViewMode;
  sortMode: SortMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSortModeChange: (mode: SortMode) => void;
}

export function ViewControls({
  viewMode,
  sortMode,
  onViewModeChange,
  onSortModeChange,
}: ViewControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-white rounded-lg shadow-sm p-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-md transition-all ${
            viewMode === 'grid'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-500 hover:text-primary-600'
          }`}
          title="Vista griglia"
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-md transition-all ${
            viewMode === 'list'
              ? 'bg-primary-100 text-primary-600'
              : 'text-gray-500 hover:text-primary-600'
          }`}
          title="Vista lista"
        >
          <List className="h-5 w-5" />
        </button>
      </div>

      <select
        value={sortMode}
        onChange={(e) => onSortModeChange(e.target.value as SortMode)}
        className="bg-white border-0 rounded-lg shadow-sm pl-3 pr-10 py-2 text-gray-700 focus:ring-2 focus:ring-primary-500 cursor-pointer"
      >
        <option value="recent">Più recente</option>
        <option value="title">Per titolo</option>
      </select>
    </div>
  );
}