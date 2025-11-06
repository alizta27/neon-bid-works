# KerjaAja Design Guidelines

## Design Philosophy
**Retro-Modern Ceria** (Cheerful Retro-Modern) - A playful yet professional mobile-first experience that combines the engaging scroll experience of TikTok/Instagram with freelancing functionality.

## Color Palette
- **Primary Yellow**: `#F0E491` - Light cheerful base color for backgrounds and highlights
- **Secondary Greenish-Yellow**: `#BBC863` - Soft complementary tone for cards and sections
- **Deep Green**: `#31694E` - Professional contrast for CTAs, headers, and important elements
- **Muted Green**: `#658C58` - Supporting color for secondary actions and borders

## Typography
- **Bold & Readable**: Prioritize readability on small mobile screens
- **Hierarchy**: Strong contrast between headers and body text
- **Indonesian Language**: All UI text in Bahasa Indonesia (e.g., "Unggah", "Komentar", "Tawar", "Profil")

## Layout System
- **Mobile-First Viewport**: Design primarily for 375px-428px width (smartphone screens)
- **Vertical Feed Priority**: Full-screen scrollable feed as primary interface
- **Spacing**: Use Tailwind units of 2, 4, 6, and 8 for consistent rhythm (p-2, p-4, gap-6, mb-8)
- **Card-Based**: Rounded corners (rounded-xl, rounded-2xl) for all major components

## Component Library

### Bottom Navigation Bar
- Fixed at bottom with 4-5 icons (Home/Feed, Search, Upload, Dashboard, Profile)
- Active state with deep green background and icon highlighting
- Smooth color transitions on tap

### FeedCard (Main Content Card)
- Full-width or near-full-width cards with rounded corners
- Photo/Video display area (16:9 or 1:1 aspect ratio)
- User avatar + name at top
- Description text (2-3 lines with "Lihat Selengkapnya")
- Action buttons row: Like (heart), Comment (bubble), Bid/Tawar (tag icon)
- Light yellow or greenish-yellow background with subtle shadows

### Upload Form
- Bottom sheet or modal overlay for posting new jobs
- Large upload area with dashed border in muted green
- Text input for job description
- Category selector (dropdown or pills)
- Submit button in deep green

### Comment Section
- Slide-up bottom sheet with white/light yellow background
- User avatar + comment text in rounded bubbles
- Input field with send button at bottom
- Scrollable comment list

### Profile Header
- Avatar (circular, large) with muted green border
- Username and bio text
- Token/credit display with playful coin icon
- Edit profile button (rounded, deep green)

### Dashboard Cards
- Grid of 2-column statistics cards on mobile
- Token balance, active jobs, completed jobs
- Rounded cards with light backgrounds

## Animations & Interactions
- **Soft CSS Transitions**: 200-300ms ease-in-out for all state changes
- **Scroll Behavior**: Smooth vertical scroll with momentum
- **Card Interactions**: Subtle scale on tap (scale-98 to scale-100)
- **Bottom Sheet**: Slide-up animation with backdrop fade
- **Like Animation**: Heart icon pop/bounce effect
- **No Distracting Animations**: Keep animations purposeful and subtle

## Mobile-First Responsive Behavior
- **<768px (Mobile)**: Single column, full-width cards, bottom navigation
- **≥768px (Tablet)**: 2-column feed grid, side navigation option
- **≥1024px (Desktop)**: 3-column grid with fixed sidebar, feed remains centered

## Images
- **User Avatars**: Circular profile images throughout the app
- **Job Photos/Videos**: Primary content in feed cards - use placeholder images of work/projects (construction, design, coding, services)
- **Empty States**: Cheerful illustrations when no content exists
- No large hero section - app opens directly to vertical feed

## Accessibility
- Touch targets minimum 44x44px for mobile taps
- High contrast text (deep green on light yellow)
- Clear focus states for keyboard navigation
- Readable font sizes (minimum 14px for body text)

## Key UX Patterns
- **Swipe Gestures**: Optional swipe to like/archive posts
- **Pull to Refresh**: Standard mobile pattern for feed updates
- **Infinite Scroll**: Load more posts as user scrolls down
- **Double-Tap to Like**: Instagram-style interaction
- **Bottom Sheet Navigation**: For comments, filters, and actions