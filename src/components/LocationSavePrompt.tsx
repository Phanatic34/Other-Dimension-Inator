import React from 'react';
import { useLocationPreview } from '../contexts/LocationPreviewContext';

export const LocationSavePrompt: React.FC = () => {
  const { pendingSaveLocation, setPendingSaveLocation, addSavedLocation } =
    useLocationPreview();

  if (!pendingSaveLocation) return null;

  const handleConfirm = () => {
    addSavedLocation(pendingSaveLocation);
    setPendingSaveLocation(null);
  };

  const handleCancel = () => {
    setPendingSaveLocation(null);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pointer-events-none pt-[94px]">
      {/* top toast-style card - larger, positioned below top bar with pop-out animation */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-[#F0D3B0] px-6 py-4 pointer-events-auto animate-pop-in">
        <div className="text-base font-semibold mb-2 text-text-primary">
          加入蒐藏清單？
        </div>
        <div className="text-sm text-text-secondary mb-4">
          <div className="font-medium mb-1">{pendingSaveLocation.name}</div>
          {pendingSaveLocation.address && (
            <div className="text-xs text-text-secondary/80">{pendingSaveLocation.address}</div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-full border border-gray-300 text-text-secondary hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-hover transition-colors text-sm"
          >
            加入蒐藏
          </button>
        </div>
      </div>
    </div>
  );
};

