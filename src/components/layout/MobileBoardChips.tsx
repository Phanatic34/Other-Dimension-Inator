import React from 'react';
import { Board } from '../../types/models';

interface MobileBoardChipsProps {
  boards: Board[];
  selectedBoardId: string | null;
  onBoardSelect: (boardId: string | null) => void;
}

export const MobileBoardChips: React.FC<MobileBoardChipsProps> = ({
  boards,
  selectedBoardId,
  onBoardSelect,
}) => {
  return (
    <div className="md:hidden px-4 py-3 bg-spotify-black border-b border-elegant-border overflow-x-auto scrollbar-hidden">
      <div className="flex space-x-2">
        <button
          onClick={() => onBoardSelect(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-base transition-all duration-200 shadow-premium ${
            selectedBoardId === null
              ? 'bg-spotify-green text-white hover:bg-spotify-green-hover'
              : 'bg-spotify-gray text-spotify-text-dim border border-elegant-border hover:bg-elegant-hover'
          }`}
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
        >
          All
        </button>
        {boards.map(board => (
          <button
            key={board.id}
            onClick={() => onBoardSelect(board.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-base transition-all duration-200 shadow-premium ${
              selectedBoardId === board.id
                ? 'bg-spotify-green text-white hover:bg-spotify-green-hover'
                : 'bg-spotify-gray text-spotify-text-dim border border-elegant-border hover:bg-elegant-hover'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            {board.name}
          </button>
        ))}
      </div>
    </div>
  );
};

