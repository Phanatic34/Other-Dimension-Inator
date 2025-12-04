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

### 🍽️ Dining Meetups
- **Meetup Posts**: Organize group dining experiences with time, location, and budget
- **Status Management**: Track meetup status (OPEN/CLOSED) with visual indicators
- **Visibility Control**: Set posts as PUBLIC or FOLLOWERS-only
- **Rich Details**: Include meetup time, max headcount, budget description, and reservation status
- **Food Tags**: Tag meetups with cuisine styles and food categories
- **Meetup Composer**: Dedicated interface for creating meetup posts with location search

### 👤 User Profiles
- **Complete Profile Pages**: View user profiles with cover image, avatar, display name, and handle
- **Profile Tabs**: Switch between Posts, Reviews, Meetups, and Saved content
- **Profile Tags**: Display user's preferred cuisine styles and food categories
- **Edit Profile**: Edit own profile with modal interface (display name, bio, tags)
- **Follower System**: View follower/following counts and follow status
- **You Might Like**: Recommended users sidebar for discovering new food lovers
- **Fixed Navigation**: Sticky "Back to Home" button for easy navigation

### 📍 Saved Restaurants
- **Interactive Map View**: Google Maps integration with restaurant markers
- **List View**: Grid/list layout with restaurant cards showing key information
- **Search & Autocomplete**: Real-time search with Google Places API autocomplete
- **Advanced Filtering**: Filter by cuisine style and food category
- **Restaurant Details**: Detailed panel with address, tags, and saved date
- **Map Navigation**: Click markers or list items to view restaurant details
- **Location Search**: Search for locations and center map view

### 🗺️ Google Maps Integration
- **Places API**: Location search and autocomplete functionality
- **Map Display**: Interactive maps with custom markers for restaurants
- **Location Selection**: Choose restaurant locations when creating posts
- **Address Resolution**: Convert place names to coordinates and full addresses
- **Geocoding**: Support for location-based filtering and distance calculations

### 👥 Social Features
- **User Profiles**: Avatar, display name, handle, follower status
- **Feed Filtering**: Switch between "All" and "Following" views
- **Post Actions**: Context menu with save post and report options
- **Share & Save**: Separate actions for sharing posts vs. saving restaurant locations
- **Multi-Page Navigation**: React Router integration for seamless page transitions

## 🏗️ Project Structure

```
src/
├── api/
│   ├── mock.ts                    # Mock API with sample data
│   ├── mockProfile.ts             # Mock user profile data
│   └── mockSavedRestaurants.ts    # Mock saved restaurants data
├── components/
│   ├── common/
│   │   ├── Logo.tsx               # App logo component
│   │   └── SearchInput.tsx        # Reusable search with clear button
│   ├── layout/
│   │   ├── TopNavBar.tsx          # Top navigation bar with search
│   │   ├── Sidebar.tsx            # Left sidebar with filters
│   │   ├── MobileBoardChips.tsx   # Mobile board selector
│   │   └── TabSwitcher.tsx        # Tab switcher (Reviews/Meetups)
│   ├── posts/
│   │   ├── CreatePostCard.tsx     # Post creation composer
│   │   ├── ReviewPostCard.tsx     # Review post card with lightbox
│   │   ├── MeetupPostCard.tsx     # Meetup post card
│   │   ├── ReviewPostComposer.tsx # Review post creation modal
│   │   ├── DiningMeetupComposer.tsx # Meetup post creation modal
│   │   ├── InteractiveRatingInput.tsx # Star rating input component
│   │   ├── LocationSearchModal.tsx # Google Maps location search
│   │   └── PostActions.tsx        # Post action menu
│   ├── profile/
│   │   ├── ProfileHeader.tsx       # User profile header
│   │   ├── ProfileTags.tsx        # User profile tags
│   │   ├── ProfileTabs.tsx        # Profile tab navigation
│   │   ├── EditProfileModal.tsx   # Profile editing modal
│   │   └── YouMightLike.tsx       # Recommended users component
│   └── savedRestaurants/
│       ├── SavedRestaurantsMap.tsx # Google Maps map view
│       ├── SavedRestaurantsList.tsx # Restaurant list view
│       ├── RestaurantDetailPanel.tsx # Restaurant details panel
│       └── SearchWithAutocomplete.tsx # Location search component
├── pages/
│   ├── RendezvousHome.tsx         # Main page with centralized state
│   ├── UserProfilePage.tsx        # User profile page
│   └── SavedRestaurantsPage.tsx   # Saved restaurants page
├── types/
│   ├── models.ts                  # Post and user type definitions
│   ├── profile.ts                 # User profile type definitions
│   ├── savedRestaurants.ts        # Saved restaurant type definitions
│   ├── location.ts                # Location type definitions
│   └── placeSearch.ts             # Google Places API types
├── hooks/
│   └── useGoogleMaps.ts           # Google Maps API hook
├── contexts/
│   └── ThemeContext.tsx           # Theme context provider
├── utils/
│   ├── sorting.ts                 # Sorting utilities
│   └── tagOptions.ts             # Tag option definitions
├── App.tsx                         # Root component with routing
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

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```bash
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```
> **Note**: You need a Google Maps API key with Places API and Maps JavaScript API enabled. Get one from [Google Cloud Console](https://console.cloud.google.com/).

4. **Start development server**
```bash
npm start
```

5. **Open in browser**
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

### ReviewPostComposer
Review post creation modal with:
- **Interactive Rating Input**: Click stars to set rating (1-5)
- **Google Maps Integration**: Search and select restaurant locations
- **Price Level Selection**: Choose price range ($, $$, $$$)
- **Image Upload Support**: Multiple image selection (UI ready)
- **Tag Selection**: Choose cuisine style and food category
- **Form Validation**: Ensure all required fields are filled

### DiningMeetupComposer
Meetup post creation modal with:
- **Date & Time Picker**: Select meetup date and time
- **Location Search**: Google Places autocomplete for restaurant selection
- **Headcount Management**: Set maximum number of participants
- **Budget Input**: Free-text budget description
- **Reservation Toggle**: Indicate if reservation is made
- **Visibility Settings**: Choose PUBLIC or FOLLOWERS-only
- **Food Tags**: Add cuisine and food type tags

### UserProfilePage
Complete user profile page featuring:
- **Profile Header**: Cover image, avatar, display name, handle, bio
- **Profile Tags**: Display user's preferred styles and categories
- **Tab Navigation**: Switch between Posts, Reviews, Meetups, Saved
- **Edit Profile**: Modal for editing own profile information
- **You Might Like**: Sidebar with recommended users
- **Fixed Navigation**: Sticky "Back to Home" button
- **Scrollable Content**: Only profile content scrolls, navigation stays fixed

### SavedRestaurantsPage
Saved restaurants management page with:
- **Dual View Mode**: Toggle between map and list views
- **Google Maps Integration**: Interactive map with restaurant markers
- **Search & Filter**: Search by name/address, filter by style/category
- **Restaurant Details**: Click to view full restaurant information
- **Map Navigation**: Click markers or list items to view details
- **Location Search**: Search for locations and center map view

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

### Routing
React Router integration for multi-page navigation:
- **Home Page** (`/`): Main feed with posts and filters
- **User Profile** (`/user/:username`): Individual user profile pages
- **Saved Restaurants** (`/saved-restaurants`): Map and list view of saved restaurants
- **Navigation**: TopNavBar with logo click to home, profile links, and saved restaurants link

### Google Maps Integration
- **API Hook**: `useGoogleMaps` hook manages script loading and initialization
- **Places API**: Autocomplete for location search in post creation
- **Maps JavaScript API**: Interactive maps for saved restaurants page
- **Environment Variable**: `REACT_APP_GOOGLE_MAPS_API_KEY` required
- **Error Handling**: Graceful fallback if API key is missing or invalid

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
  restaurantAddress?: string;   // Full address
  restaurantLat?: number;      // Latitude
  restaurantLng?: number;      // Longitude
}
```

### MeetupPost
```typescript
interface MeetupPost {
  id: string;
  type: 'meetup';
  author: User;
  restaurantName: string;
  locationText: string;         // Free-text address/area
  address?: string;             // Optional full address
  meetupTime: string;           // ISO datetime string
  foodTags: string[];           // Cuisine and food type tags
  maxHeadcount: number;         // Total seats
  currentHeadcount: number;     // Current participants
  budgetDescription: string;    // Free text budget info
  hasReservation: boolean;      // Reservation status
  description: string;          // Main post content
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;     // Optional restaurant image
  status: 'OPEN' | 'CLOSED';    // Meetup status
  createdAt: string;
  updatedAt?: string;
  likeCount: number;
  commentCount: number;
  shareCount?: number;
  isFromFollowedUser?: boolean;
}
```

### UserProfile
```typescript
interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  handle: string;               // e.g., "@foodie_ntu"
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  followerCount: number;
  followingCount: number;
  isFollowedByCurrentUser?: boolean;
  preferredStyles?: string[];   // Cuisine style preferences
  preferredCategories?: string[]; // Food category preferences
}
```

### SavedRestaurant
```typescript
interface SavedRestaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  styleTags?: string[];         // Cuisine styles
  categoryTags?: string[];      // Food categories
  savedAt: string;              // ISO datetime string
  savedFromPostId?: string;     // Original post ID if saved from post
}
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   - Ensure your project is pushed to a GitHub repository

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your repository

3. **Configure Project Settings**
   - Framework Preset: **Create React App**
   - Root Directory: If project is in a subdirectory (e.g., `wp-final`), set it here
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `build` (Create React App default)
   - Install Command: `npm install`

4. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `REACT_APP_GOOGLE_MAPS_API_KEY` = your Google Maps API key
   - Select environments: Production, Preview, Development

5. **Configure Routing (SPA)**
   - Create `vercel.json` in your project root:
   ```json
   {
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~1-3 minutes)
   - Your site will be live at `your-project.vercel.app`

### Environment Variables

Required environment variables:
- `REACT_APP_GOOGLE_MAPS_API_KEY`: Your Google Maps API key with Places API and Maps JavaScript API enabled

## 🔜 Roadmap

### Phase 1: Backend Integration
- [ ] Replace mock API with REST/GraphQL endpoints
- [ ] User authentication (JWT or OAuth)
- [ ] Real-time updates with WebSockets
- [ ] Image upload to cloud storage

### Phase 2: Enhanced Features
- [x] Post detail pages with full comments (Modal implemented)
- [x] User profiles and following system
- [x] Collections/bookmarks management (Saved Restaurants)
- [x] Interactive map view with markers
- [ ] Notifications system

### Phase 3: Mobile & PWA
- [ ] Responsive mobile layout
- [ ] Touch gestures for gallery
- [ ] Progressive Web App features
- [ ] Native mobile app (React Native)

### Phase 4: Advanced Social
- [x] Meetup organization and RSVP (Meetup posts implemented)
- [ ] Direct messaging
- [ ] Restaurant check-ins
- [ ] Photo tagging and mentions
- [ ] Activity feed

## 🛠️ Technologies

- **[React 18](https://react.dev/)** - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Create React App](https://create-react-app.dev/)** - Build tooling
- **[Google Maps API](https://developers.google.com/maps)** - Maps and Places integration
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
