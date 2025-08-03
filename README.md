# Job Board Application

A modern, responsive job board application built with Vue.js 3, featuring job listings, filtering capabilities, and detailed job views.

## Features

- **Job Listings**: Browse through available job positions
- **Advanced Filtering**: Filter jobs by title/company, location, and category with active filter display
- **Job Details**: View comprehensive job information with modular components
- **Analytics Tracking**: Built-in dataLayer implementation for user interaction tracking
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **Responsive Design**: Optimized for all device sizes using DaisyUI
- **Modern UI**: Clean and intuitive interface with smooth animations and gradient effects
- **Performance Optimization**: Async component loading for better performance

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vue Router** for navigation
- **Pinia** for state management
- **DaisyUI** + **Tailwind CSS** for styling
- **@unhead/vue** for dynamic meta tags and SEO
- **Vite** for fast development and building
- **Vitest** for testing
- **ESLint** + **Prettier** for code quality

## Project Structure

```
src/
├── components/
│   ├── Icons/               # Lucide icon components
│   ├── JobCard.vue          # Job listing card component
│   ├── JobDetailCard.vue    # Modular job detail display component
│   ├── JobFilters.vue       # Advanced filtering with active filter display
│   ├── JobsGrid.vue         # Responsive job listings grid
│   ├── PageFooter.vue       # Accessible footer with social links
│   ├── PageHeader.vue       # Navigation header
│   ├── SearchInput.vue      # Debounced search input component
│   └── SelectInput.vue      # Reusable select dropdown component
├── stores/
│   └── jobs.ts              # Pinia store for job management
├── views/
│   ├── HomeView.vue         # Homepage with job listings and filters
│   └── JobDetailView.vue    # Individual job detail page with analytics
├── router/
│   └── index.ts             # Vue Router configuration
├── assets/
│   └── style.css            # Global styles with Tailwind imports
├── __tests__/               # Vitest unit tests
├── App.vue                  # Root component
└── main.ts                  # Application entry point

public/
├── jobs.json                # Mock job data
├── favicon.ico              # Application favicon
└── logo.webp                # Company logo
```

## Setup Instructions

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test:unit` - Run unit tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Design Decisions

### State Management

- **Pinia** was chosen for its simplicity and excellent TypeScript support
- Centralized job data management with computed properties for filtering
- Reactive filters that automatically update the job listings

### Styling Approach

- **DaisyUI** provides semantic component classes while maintaining Tailwind's utility-first approach
- Responsive design implemented using DaisyUI's responsive utilities
- Custom CSS limited to specific cases (like line clamping)

### Component Architecture

- **Composition API** used throughout for better TypeScript integration
- **Single File Components** for better organization
- **Props interface** definitions for type safety
- **Reusable components** like JobCard, JobDetailCard for consistency
- **Modular design** with separated concerns (JobDetailCard extracted from JobDetailView)
- **Async component loading** for performance optimization
- **Event-driven communication** between parent and child components

### Routing

- **Vue Router** with programmatic navigation
- **Dynamic routes** for job details (`/job/:id`)
- **Route guards** could be easily added for authentication

### Data Management

- **Mock JSON data** stored in public directory
- **Fetch API** used for data retrieval
- **Error handling** and loading states implemented
- **TypeScript interfaces** for data structure validation

## Features Implementation

### Homepage (`/`)

- Job listings grid with responsive layout
- Search functionality (title/company)
- Location and category filters
- Loading and error states
- Empty state handling

### Job Detail Page (`/job/:id`)

- Comprehensive job information display with modular JobDetailCard component
- Navigation back to homepage
- Similar jobs suggestions
- Action buttons (Apply, Save, Share) with analytics tracking
- 404 handling for non-existent jobs
- Dynamic meta tags and SEO optimization
- DataLayer implementation for user interaction tracking
- Async component loading for better performance

### Filtering System

- Real-time search as you type with debouncing
- Multiple filter combinations (search, location, category)
- Clear filters functionality with smart disable state
- Active filters display with individual removal options
- Computed properties for efficient filtering
- Enhanced UI with gradient backgrounds and improved spacing
- Responsive grid layout for different screen sizes

## Recent Improvements

### Accessibility Enhancements
- WCAG 2.1 compliant footer with proper ARIA labels
- Semantic HTML structure with nav elements
- Keyboard navigation support with focus indicators
- Screen reader optimization with aria-hidden for decorative icons
- Descriptive link labels for external social media links

### UI/UX Improvements
- Enhanced JobFilters component with gradient backgrounds
- Active filters display with individual removal capabilities
- Improved responsive design for mobile, tablet, and desktop
- Modern visual hierarchy with better spacing and typography
- Interactive elements with hover and focus states

### Performance Optimizations
- Async component loading for Lucide icons
- Modular component architecture (JobDetailCard extraction)
- Debounced search input for better performance
- Optimized bundle size with code splitting

### Analytics Integration
- DataLayer implementation for tracking user interactions
- Page view tracking with automatic initialization
- Button click tracking for Apply, Save, and Share actions
- TypeScript interfaces for type-safe analytics events