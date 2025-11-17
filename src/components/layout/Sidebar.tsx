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
      <div className="p-5">
        <h2 className="text-xl text-text-primary mb-5 tracking-wide font-black" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Boards</h2>

        {/* All Boards Option */}
        <button
          onClick={() => onBoardSelect(null)}
          className={`w-full text-left px-4 py-3 rounded-xl mb-3 text-base transition-all duration-200 relative overflow-hidden ${
            selectedBoardId === null
              ? 'bg-bg-primary text-text-primary shadow-md border-l-4 border-accent-gold font-bold'
              : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
          }`}
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === null ? 900 : 700 }}
        >
          All Boards
        </button>

        {/* By Cuisine / Style */}
        <div className="mb-6">
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
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base transition-all duration-200 relative ${
                  selectedBoardId === board.id
                    ? 'bg-bg-primary text-text-primary shadow-md border-l-4 border-accent-gold font-bold'
                    : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
                }`}
                style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === board.id ? 900 : 700 }}
              >
                {board.label}
              </button>
              ))}
            </div>
          )}
        </div>

        {/* By Food Type */}
        <div>
          <button
            onClick={() => setIsFoodTypeOpen(!isFoodTypeOpen)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary uppercase tracking-wider hover:text-text-primary transition-all duration-200 rounded-lg hover:bg-bg-hover"
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
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base transition-all duration-200 relative ${
                  selectedBoardId === board.id
                    ? 'bg-bg-primary text-text-primary shadow-md border-l-4 border-accent-gold font-bold'
                    : 'text-text-primary hover:bg-bg-hover hover:shadow-sm font-semibold'
                }`}
                style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: selectedBoardId === board.id ? 900 : 700 }}
              >
                {board.label}
              </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

