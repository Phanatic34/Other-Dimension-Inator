# Rendezvous 🍜

A modern, bilingual (Chinese/English) social platform for food lovers to discover restaurants, share reviews, and organize dining experiences. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🍱 Restaurant Reviews
- **Rich Review Posts**: Share experiences with ratings, price ranges, photos, and detailed descriptions
- **Multi-Image Gallery**: Horizontal scroll-snap gallery with lightbox support for enlarged viewing
- **Smart Filtering**: Multi-criteria filtering by cuisine style, food category, rating, price, and distance
- **Interactive Elements**: Like, comment, share posts and save restaurants or posts separately

### 🎯 Advanced Filtering System
- **風格 (Style)**: Filter by cuisine type (Japanese, Korean, Taiwanese, American, etc.)
- **類別 (Category)**: Filter by food type (Desserts, Breakfast, Street Food, Fast Food, etc.)
- **評價 (Rating)**: Filter by minimum rating (4.0+, 3.0+, 2.0+)
- **價格 (Price)**: Set custom price range (NT$ min-max)
- **距離 (Near Me)**: Filter by distance in kilometers
- **Multi-Filter Support**: Combine multiple filters with AND logic across groups
- **Tag-Based Search**: Click cuisine or food-type chips to instantly filter feed

### 📱 Modern UI/UX
- **Clean Design**: Threads/Twitter-inspired card layout with elegant spacing
- **Bilingual Interface**: Seamless Chinese/English labeling throughout
- **Responsive**: Desktop-optimized with collapsible sidebar filters
- **Dark Mode Ready**: Theme system with CSS variables
- **Smooth Animations**: Animated filter drawer expand/collapse transitions

### 🎨 Post Creation
- **Composer Interface**: Twitter-style create post card with icon toolbar
- **Auto-Disable**: Smart button states based on content validation
- **Rich Input**: Support for images, links, emojis, and location tags

### 👥 Social Features
- **User Profiles**: Avatar, display name, handle, follower status
- **Feed Filtering**: Switch between "All" and "Following" views
- **Post Actions**: Context menu with save post and report options
- **Share & Save**: Separate actions for sharing posts vs. saving restaurant locations

## 🏗️ Project Structure

```
src/
├── api/
│   └── mock.ts                    # Mock API with sample data
├── components/
│   ├── common/
│   │   ├── Logo.tsx               # App logo component
│   │   └── SearchInput.tsx        # Reusable search with clear button
│   ├── layout/
│   │   ├── TopNavBar.tsx          # Top navigation bar with search
│   │   ├── Sidebar.tsx            # Left sidebar with filters
│   │   ├── MobileBoardChips.tsx   # Mobile board selector
│   │   └── TabSwitcher.tsx        # Tab switcher (Reviews/Meetups)
│   └── posts/
│       ├── CreatePostCard.tsx     # Post creation composer
│       ├── ReviewPostCard.tsx     # Review post card with lightbox
│       └── MeetupPostCard.tsx     # Meetup post card
├── pages/
│   └── RendezvousHome.tsx         # Main page with centralized state
├── types/
│   └── models.ts                  # TypeScript interfaces
├── App.tsx                         # Root component with theme
├── index.css                       # Global styles + CSS variables
└── tailwind.config.js              # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Phanatic34/Other-Dimension-Inator.git
cd "Final Project"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Components

### ReviewPostCard
The main review post component featuring:
- **Header**: User info, timestamp, restaurant name with location chip, and action menu
- **Tag Pills**: Clickable chips for location+restaurant, cuisine style, and food type
- **Rating Row**: Star display, numeric rating, price level symbols, and price range
- **Content**: Hashtag-styled text with blue clickable tags
- **Image Gallery**: Horizontal scroll-snap carousel with hover badges and click-to-enlarge lightbox
- **Actions Bar**: Like, comment, share (with counts), and save restaurant location buttons

### Sidebar
Advanced filtering sidebar with:
- **看板 (Board)**: Main section header with "所有看板 (All Boards)" button
- **Collapsible Sections**: Smooth CSS Grid animations for expand/collapse
- **Single-Select Filters**: Style and Category (one active at a time)
- **Range Filters**: Custom price min/max with apply button
- **Rating Filter**: Radio-style buttons for 4.0+, 3.0+, 2.0+ stars
- **Distance Filter**: Numeric input for nearby restaurants (km)

### CreatePostCard
Post composer featuring:
- **Auto-Growing Textarea**: Placeholder for post content
- **Icon Toolbar**: Image, link, emoji, and location buttons
- **Smart Submit**: Disabled (gray) when empty, enabled (red) when valid
- **Keyboard Shortcut**: Enter to submit (Shift+Enter for new line)

## 🎨 Design System

### Typography
- **Display Font**: Serif for headers and titles
- **Body Font**: Sans-serif for content and UI elements
- **Font Sizes**: 
  - `text-xs` (0.75rem) - Secondary labels
  - `text-sm` (0.875rem) - Metadata
  - `text-base` (1rem) - Body content
  - `text-lg` (1.125rem) - Section headers

### Color Palette (Light Mode)
```css
--bg-primary: #f5f3ef       /* Main background */
--bg-secondary: #f0ede8     /* Feed background */
--bg-tertiary: #e8e4dd      /* Sidebar background */
--bg-card: #fefdfb          /* Card background */
--text-primary: #27130c     /* Primary text */
--text-secondary: #6b5847   /* Secondary text */
--accent-primary: #d4793d   /* Accent orange */
--topbar: #b63a2f           /* Dark red accent */
```

### Spacing
- Consistent use of Tailwind spacing scale
- Card padding: `px-5 py-4`
- Section margins: `mb-4` to `mb-5`
- Content spacing: `mt-3` between rating and text

## 🔧 Technical Details

### State Management
Centralized in `RendezvousHome.tsx`:
```typescript
type ActiveFilters = {
  searchQuery: string;
  style: string | null;        // Single-select
  category: string | null;     // Single-select
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};
```

### Filtering Logic
Multi-filter support with AND logic:
```typescript
function passesFilters(post: ReviewPost, filters: ActiveFilters): boolean {
  // All conditions must pass (AND)
  // - Search matches text fields
  // - Style/Category exact match (if set)
  // - Price within range
  // - Rating meets minimum
  // - Distance within radius
}
```

### Image Handling
- **Demo Mode**: Uses Unsplash URLs for demonstration
- **Production Note**: Comments indicate cloud storage (AWS S3, GCS, Firebase) required
- **Lightbox**: Click to enlarge, ESC to close, arrow navigation for multiple images
- **Scroll Snap**: CSS `scroll-snap-type: x mandatory` for Instagram-like gallery

## 📦 Data Models

### ReviewPost
```typescript
interface ReviewPost {
  id: string;
  type: 'review';
  author: User;
  restaurantName: string;
  locationArea?: string;
  styleType?: string;           // e.g., "日式 Japanese"
  foodType?: string;            // e.g., "拉麵 Ramen"
  rating: number;               // 1.0 - 5.0
  priceLevel: string;           // "$", "$$", "$$$", etc.
  priceMax?: number;            // In NT$
  contentSnippet: string;
  images?: string[];            // Image URLs
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  board?: Board;
  isFromFollowedUser: boolean;
  distanceKm?: number;
}
```

## 🔜 Roadmap

### Phase 1: Backend Integration
- [ ] Replace mock API with REST/GraphQL endpoints
- [ ] User authentication (JWT or OAuth)
- [ ] Real-time updates with WebSockets
- [ ] Image upload to cloud storage

### Phase 2: Enhanced Features
- [ ] Post detail pages with full comments
- [ ] User profiles and following system
- [ ] Collections/bookmarks management
- [ ] Interactive map view with markers
- [ ] Notifications system

### Phase 3: Mobile & PWA
- [ ] Responsive mobile layout
- [ ] Touch gestures for gallery
- [ ] Progressive Web App features
- [ ] Native mobile app (React Native)

### Phase 4: Advanced Social
- [ ] Meetup organization and RSVP
- [ ] Direct messaging
- [ ] Restaurant check-ins
- [ ] Photo tagging and mentions
- [ ] Activity feed

## 🛠️ Technologies

- **[React 18](https://react.dev/)** - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Create React App](https://create-react-app.dev/)** - Build tooling
- **CSS Variables** - Dynamic theming
- **CSS Grid & Flexbox** - Layout systems

## 📝 Development Notes

### Code Style
- Functional components with TypeScript
- Props interfaces defined inline or above components
- Helper functions prefixed with `handle` for event handlers
- Pure functions for filters and data transformations

### Best Practices
- Semantic HTML elements
- Accessible buttons and form controls
- Descriptive aria-labels where needed
- `e.stopPropagation()` for nested clickables
- CSS transitions for smooth animations

### File Organization
- Components grouped by feature (layout, posts, common)
- Shared types in `types/models.ts`
- Mock data separated in `api/mock.ts`
- Global styles use CSS custom properties

## 🤝 Contributing

This is an educational project. Contributions, issues, and feature requests are welcome!

## 📄 License

This project is for educational purposes.

## 👤 Author

**Philip** - [Phanatic34](https://github.com/Phanatic34)

---

Built with ❤️ for food lovers everywhere 🍜🍕🍱
