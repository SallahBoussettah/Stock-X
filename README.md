# Modern E-commerce Template (Stock-X)

A sophisticated and conversion-optimized e-commerce template built with React, TypeScript, and Tailwind CSS. This template focuses on product presentation, user experience, and a seamless checkout process.

## Features

- Responsive design (mobile-first approach)
- Product listing with advanced filtering
- Product details with image gallery and variants
- Shopping cart management
- Checkout process with multi-step form
- User account management
- Wishlist functionality
- Order history and tracking
- Categories browsing with subcategories
- Special deals and promotions page
- Standalone order tracking system

## Tech Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Icons**: React Icons
- **Authentication**: JWT with localStorage (simulated)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SallahBoussettah/Stock-X.git
   cd Stock-X
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## Deployment

### Deploy to Netlify

This project is configured for easy deployment to Netlify. You can deploy in two ways:

#### Option 1: Continuous Deployment from GitHub

1. Fork or clone this repository to your GitHub account
2. Create a new site in Netlify and connect it to your GitHub repository
3. Netlify will automatically detect the build settings from the `netlify.toml` file
4. Your site will be deployed and will automatically update when you push changes to GitHub

#### Option 2: Deploy with Netlify CLI

1. Install Netlify CLI (already added as a dev dependency):
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy using the integrated script:
   ```bash
   npm run deploy
   ```

#### Custom Domain

After deployment, you can configure a custom domain in the Netlify dashboard:

1. Go to your site settings in Netlify
2. Click on "Domain settings"
3. Add your custom domain and follow the DNS configuration instructions

## Project Structure

```
src/
├── components/    # Reusable components
│   ├── layout/    # Layout components (Header, Footer, etc.)
│   ├── ui/        # UI components
├── pages/         # Page components
├── types/         # TypeScript type definitions
├── store/         # Redux store configuration
├── App.tsx        # Main application component
└── main.tsx       # Entry point
```

## Key Components and Pages

### Layout Components
- `Header`: Main navigation with categories, deals, search, and user dropdown
- `Footer`: Site information, quick links, account links, and newsletter sign-up
- `MainLayout`: Wrapper for consistent layout across pages

### Pages
- `HomePage`: Landing page with featured products and categories
- `ProductListingPage`: Displays products with filtering and sorting
- `ProductDetailsPage`: Detailed product information and options
- `CartPage`: Shopping cart management
- `CheckoutPage`: Multi-step checkout process
- `AccountPage`: User account management with order history and tracking
- `WishlistPage`: User's saved items with authentication check
- `CategoriesPage`: Browse all product categories and subcategories
- `DealsPage`: Special offers and promotions with filtering options
- `OrderTrackingPage`: Standalone order tracking system (no login required)
- `ContactPage`: Contact information and form
- `FAQPage`: Frequently asked questions

### Authentication
- `LoginPage`: User login with form validation
- `RegisterPage`: New user registration
- `ForgotPasswordPage`: Password recovery

## Newly Implemented Features

### Categories System
The Categories page displays a visually appealing grid of product categories with:
- Category images and descriptions
- Product counts
- Subcategories
- Links to filtered product listings

### Deals and Promotions
The Deals page showcases special offers with:
- Filtering for "Featured" and "Ending Soon" deals
- Discount information (percentage off, fixed amount off, BOGO)
- Expiration dates with visual indicators for deals ending soon
- Coupon codes when applicable
- Direct links to shop by category

### Order Tracking System
The Order Tracking functionality is available in two ways:
1. **In User Account**: Authenticated users can track orders from their account page
2. **Standalone Page**: Anyone can track orders by entering an order ID without logging in

Features include:
- Order status timeline visualization
- Shipping and delivery details
- Complete order summary with items and totals
- Printable receipts
- Demo order IDs: 12345, 54321, ORD-2023-1001, ORD-2023-1002

### Authentication Checks
Authentication checks were added to:
- `WishlistPage`: Prompts login for unauthenticated users
- `AccountPage`: Redirects to login page for unauthenticated users

## Customization

### Styling
The project uses Tailwind CSS for styling. The main configuration is in `tailwind.config.js` where you can customize colors, fonts, and other theme settings.

### Adding New Pages
1. Create a new page component in the `pages` directory
2. Add a route in `App.tsx`

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Design inspiration from various e-commerce websites
- React and TypeScript community for excellent documentation
- All the open-source libraries that made this project possible
