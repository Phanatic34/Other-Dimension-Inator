# Rendezvous

A Dcard/Reddit-style community app focused on food and restaurants, built with React, TypeScript, and Tailwind CSS.

## Features

- **Food-based Boards**: Browse posts by cuisine (Japanese, Korean, Taiwanese, etc.) or food type (Desserts, Breakfast, Street Food, etc.)
- **Review Posts**: Share restaurant reviews with ratings, price levels, and location
- **Meetup Posts**: Organize group meals and find dining companions
- **Filtering & Search**: Filter by board, tab (Reviews/Meetups), following status, and search query
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── api/
│   └── mock.ts              # Mock API layer (simulates backend calls)
├── components/
│   ├── common/
│   │   └── SearchInput.tsx   # Reusable search input component
│   ├── layout/
│   │   ├── TopNavBar.tsx     # Top navigation bar
│   │   ├── Sidebar.tsx       # Desktop sidebar with boards
│   │   ├── MobileBoardChips.tsx  # Mobile board selector
│   │   └── TabSwitcher.tsx   # Tab switcher (Reviews/Meetups)
│   ├── modals/
│   │   └── PostTypeModal.tsx  # Modal for selecting post type
│   └── posts/
│       ├── ReviewPostCard.tsx # Review post card component
│       └── MeetupPostCard.tsx # Meetup post card component
├── pages/
│   └── RendezvousHome.tsx    # Main page with state management
├── types/
│   └── models.ts             # TypeScript data models
├── App.tsx                    # Root component
├── App.css                    # App styles (includes Tailwind)
├── index.tsx                  # Entry point
└── index.css                  # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture Notes

### Data Models

All data models are defined in `src/types/models.ts`:
- `User`: User information
- `Board`: Food boards (cuisine or food type)
- `ReviewPost`: Restaurant review posts
- `MeetupPost`: Group meal meetup posts
- `Post`: Union type for all posts

### Mock API Layer

The `src/api/mock.ts` file simulates backend API calls with:
- `fetchBoards()`: Returns all available boards
- `fetchPosts()`: Returns all posts (reviews + meetups)

These functions use `Promise` with simulated network delays. In the future, these will be replaced with real HTTP calls to a backend API.

### State Management

The main `RendezvousHome` component manages:
- `boards`: List of all boards
- `posts`: List of all posts
- `activeTab`: Current tab ('reviews' or 'meetups')
- `selectedBoardId`: Currently selected board (null = All Boards)
- `searchQuery`: Search input value
- `feedFilter`: 'all' or 'following'
- `isPostModalOpen`: Whether post creation modal is open

### Filtering Logic

Posts are filtered in this order:
1. By tab (Reviews or Meetups)
2. By selected board
3. By following status (if "Following" is selected)
4. By search query (matches title, restaurant name, board, author/host)

## Future Enhancements

The codebase includes TODO comments indicating where future features will be added:

- **Backend Integration**: Replace mock API with real HTTP calls
- **Authentication**: Add user authentication and session management
- **Post Creation**: Add forms for creating review and meetup posts
- **Post Details**: Add detail pages for individual posts
- **Map Integration**: Add interactive map view for restaurant locations
- **Mobile App**: Extract reusable logic for mobile app development

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Create React App**: Build tooling

## License

This project is for educational purposes.

