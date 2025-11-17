import React, { useState } from 'react';
import { Board } from '../../types/models';

interface SidebarProps {
  boards: Board[];
  selectedBoardId: string | null;
  onBoardSelect: (boardId: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  boards,
  selectedBoardId,
  onBoardSelect,
}) => {
  const [isCuisineOpen, setIsCuisineOpen] = useState(true);
  const [isFoodTypeOpen, setIsFoodTypeOpen] = useState(true);
  
  const cuisineBoards = boards.filter(b => b.category === 'cuisine');
  const typeBoards = boards.filter(b => b.category === 'type');

  return (
    <div className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color h-[calc(100vh-4rem)] overflow-y-auto sticky top-16 transition-colors duration-300">
      <div className="p-4">
        <h2 className="text-xl text-text-primary mb-5 tracking-wide font-black" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Boards</h2>

        {/* All Boards Option */}
        <button
          onClick={() => onBoardSelect(null)}
          className={`w-full text-left px-4 py-3 rounded-lg mb-3 text-base transition-all duration-200 relative overflow-hidden flex items-center space-x-3 ${
            selectedBoardId === null
              ? 'bg-bg-card text-text-primary shadow-sm border-l-4 border-accent-gold font-bold'
              : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
          }`}
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === null ? 900 : 700 }}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>All Boards</span>
        </button>

        {/* By Cuisine / Style */}
        <div className="mb-5">
          <button
            onClick={() => setIsCuisineOpen(!isCuisineOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-text-primary uppercase tracking-wider hover:bg-bg-hover transition-all duration-200 rounded-lg font-bold"
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            <span>By Cuisine / Style</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isCuisineOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isCuisineOpen && (
            <div className="space-y-1 mt-2">
              {cuisineBoards.map(board => (
                <button
                  key={board.id}
                  onClick={() => onBoardSelect(board.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all duration-200 relative flex items-center space-x-3 ${
                  selectedBoardId === board.id
                    ? 'bg-bg-card text-text-primary shadow-sm border-l-4 border-accent-gold font-bold'
                    : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
                }`}
                style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === board.id ? 900 : 700 }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
                <span>{board.label}</span>
              </button>
              ))}
            </div>
          )}
        </div>

        {/* By Food Type */}
        <div>
          <button
            onClick={() => setIsFoodTypeOpen(!isFoodTypeOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-text-primary uppercase tracking-wider hover:bg-bg-hover transition-all duration-200 rounded-lg font-bold"
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            <span>By Food Type</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isFoodTypeOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFoodTypeOpen && (
            <div className="space-y-1 mt-2">
              {typeBoards.map(board => (
                <button
                  key={board.id}
                  onClick={() => onBoardSelect(board.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base transition-all duration-200 relative flex items-center space-x-3 ${
                  selectedBoardId === board.id
                    ? 'bg-bg-card text-text-primary shadow-sm border-l-4 border-accent-gold font-bold'
                    : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
                }`}
                style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === board.id ? 900 : 700 }}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>{board.label}</span>
              </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

