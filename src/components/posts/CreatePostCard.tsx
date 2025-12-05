import React, { useState } from 'react';

interface CreatePostCardProps {
  avatarUrl?: string;
}

// Inline SVG icon components
const PhotoIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const FaceSmileIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export function CreatePostCard({ avatarUrl }: CreatePostCardProps) {
  const [text, setText] = useState('');

  const isEmpty = text.trim().length === 0;

  const handleSubmit = () => {
    if (isEmpty) return;
    console.log('Create post (TODO):', text);
    setText('');
  };

  const handleIconClick = (iconName: string) => {
    console.log(`TODO: ${iconName} functionality`);
  };

  return (
    <section className="mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm">
      {/* Top row: Avatar + Textarea */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-bg-tertiary">
          <img 
            src={avatarUrl || "https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png"} 
            alt="Your avatar" 
            className="h-full w-full object-cover" 
          />
        </div>

        {/* Textarea */}
        <div className="flex-1">
          <textarea
            rows={1}
            placeholder="今天吃了什麼好東西？"
            className="w-full resize-none border-none bg-transparent text-[15px] leading-snug text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              // Allow Shift+Enter for new line, Enter alone submits
              if (e.key === 'Enter' && !e.shiftKey && !isEmpty) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="mt-3 h-px w-full bg-border-color opacity-50" />

      {/* Bottom row: Icons + Post button */}
      <div className="mt-2 flex items-center justify-between">
        {/* Icon buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleIconClick('image')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-accent-primary transition-colors hover:bg-accent-primary/10"
            aria-label="Add image"
          >
            <PhotoIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => handleIconClick('link')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-accent-primary transition-colors hover:bg-accent-primary/10"
            aria-label="Add link"
          >
            <LinkIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => handleIconClick('emoji')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-accent-primary transition-colors hover:bg-accent-primary/10"
            aria-label="Add emoji"
          >
            <FaceSmileIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => handleIconClick('location')}
            className="flex h-8 w-8 items-center justify-center rounded-full text-accent-primary transition-colors hover:bg-accent-primary/10"
            aria-label="Add location"
          >
            <MapPinIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Post button */}
        <button
          type="button"
          disabled={isEmpty}
          onClick={handleSubmit}
          className={
            "rounded-full px-5 py-1.5 text-sm font-semibold transition-colors " +
            (isEmpty
              ? "bg-border-color text-white cursor-not-allowed opacity-50"
              : "bg-accent-primary text-white hover:bg-accent-hover")
          }
        >
          發佈
        </button>
      </div>
    </section>
  );
}

