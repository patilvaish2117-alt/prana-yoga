# Prana Yoga — Online Sanctuary & Yoga Business Web Application

> **Tagline:** "Find Your Balance. Discover Your Inner Peace."  
> **Brand:** Prana Yoga  
> **Technology Stack:** React 18, Vite, React Router v6, Tailwind CSS, Lucide Icons  

---

## 🧘‍♂️ Overview

**Prana Yoga** is an elegant, mobile-responsive, multi-page online yoga business web application inspired by the visual serenity, editorial typography, and seamless user experience of world-class wellness platforms like *Yoga International*.

The platform unites an authentic digital learning catalog (14 structured courses spanning Asana, Pranayama, Kriya, Meditation, and Karma Yoga philosophy) with an eco-conscious storefront featuring sustainable yoga equipment, props, and meditation accessories.

Prana Yoga features client-side user accounts, a unified shopping cart supporting both digital courses and physical merchandise, dynamic route details, coupon promo codes, and an order management flow with local persistence.

---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup & Launch

1. **Navigate to the project root:**
   ```bash
   cd yogicc
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:5173/`.

---

## 🌐 Deployment (Free Hosting on Netlify)

This application is pre-configured with `_redirects` and `netlify.toml` for seamless client-side single-page application (SPA) routing on Netlify.

### Option 1: Netlify Drag & Drop (Easiest)

1. Build the production distribution:
   ```bash
   npm run build
   ```
   An optimized production bundle will be generated in `dist/`.

2. Open [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
3. Drag and drop the `dist` folder into the Netlify Drop area.
4. Your public URL will be live in seconds.

### Option 2: Netlify via GitHub Repository

1. Push this codebase to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Prana Yoga web application"
   git remote add origin https://github.com/<your-username>/prana-yoga.git
   git push -u origin main
   ```
2. Log into [Netlify](https://www.netlify.com) and click **"Add new site"** > **"Import an existing project"**.
3. Authorize GitHub and select your repository.
4. Configure build parameters:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**.

---

## 🎨 Design System & Visual Palette

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Sage 700 / 800** | `#3C5640` / `#324635` | Primary buttons, headers, active navigation pills |
| **Sage 100 / 200** | `#E5ECE6` / `#CDDBCF` | Subtle badge backgrounds, icon containers |
| **Cream 50 / 100** | `#FDFCF9` / `#FAF7F2` | Gentle canvas background, card surfaces |
| **Terracotta 500** | `#C8704D` | Accent call-to-actions, shop buttons, sale badges |
| **Charcoal 900** | `#1B231E` | High-contrast typography, footers |

### Typography
- **Headings:** `Playfair Display` (Classic editorial serif)
- **Body & Controls:** `Plus Jakarta Sans` (Clean, geometric, modern sans-serif)

---

## 📑 Pages & Routes Architecture

| Route | Page | Description & Key Features |
| :--- | :--- | :--- |
| `/` | **Home** | Editorial hero section with CTA, Prana philosophy, 4 featured courses, benefits grid, "Why Choose Us", student reflections, newsletter signup, and full footer. |
| `/programs` | **Yoga Programs Catalog** | 14 programs across Asana, Pranayama, Kriya, Meditation, and Karma Yoga. Real-time search, category pills, price and rating sorting. |
| `/programs/:id` | **Program Details** | Dynamic route detailing syllabus modules, difficulty level, duration, instructor biography, learning objectives, and enrollment CTA. |
| `/shop` | **Yoga Storefront** | 8 physical yoga products (Mat, Blocks, Strap, Cushion, Water Bottle, Carry Bag, Eye Pillow, Starter Kit) with filters, search, and stock indicators. |
| `/shop/:id` | **Product Details** | Dynamic route with detailed specifications table, highlights, quantity selector, and add-to-cart. |
| `/cart` | **Shopping Cart** | Unified cart for courses and props. Quantity controls, coupon promo codes (`PRANA10`, `PEACE20`), and rupee calculations. |
| `/checkout` | **Checkout** | Dynamic shipping address form (only prompted if physical goods are in the cart). Pay Later and Cash on Delivery options. |
| `/order-confirmation/:id` | **Order Receipt** | Unique order ID (`PRANA-ORD-XXXXX`), purchased item list, delivery address summary, and receipt view. |
| `/about` | **About Us** | The story of Prana Yoga, mission, 4 ethical pillars (Ahimsa, Satya, Seva, Samatva), and target practitioner guide. |
| `/contact` | **Contact & FAQ** | Contact inquiry form, studio location, operating hours, and 6-item expandable FAQ accordion. |
| `/login` | **Login** | Form validation, password visibility toggle, instant sample sign-in (`Aarav Sharma`), session persistence, and guest browsing link. |
| `/signup` | **Sign Up** | Registration with name, email, password, confirm password validation, and client storage. |
| `/account` | **My Account** | Dashboard displaying practitioner greeting, email, join date, enrolled programs library, and past order history. |
| `*` | **404 Not Found** | Custom tranquil 404 screen with return home navigation. |

---

## 🧘‍♀️ Catalog Overview

### Online Yoga Courses (14 Masterclasses)
- **Asana Postures:** Beginner Yoga Foundations (₹499), Flexibility & Mobility (₹699), Strength & Balance Yoga (₹799), Complete Asana Practice (₹999)
- **Pranayama Breathwork:** Pranayama for Beginners (₹399), Breathwork & Relaxation (₹599), Advanced Breathing Practice (₹799)
- **Kriya Practices:** Introduction to Kriya (₹599), Guided Kriya Practice (₹899)
- **Meditation & Nidra:** Mindfulness Meditation (₹299), Guided Deep Relaxation (₹499), Seven-Day Meditation Journey (₹699)
- **Karma Yoga & Philosophy:** Introduction to Karma Yoga (₹399), Yoga Philosophy Essentials (₹599)

### Physical Sanctuary Essentials (8 Products)
1. **Premium Yoga Mat** — ₹899 (6mm Eco TPE with alignment guide)
2. **Yoga Blocks Set** — ₹399 (High-density EVA foam pair)
3. **Cotton Yoga Strap** — ₹249 (8ft organic cotton with steel D-rings)
4. **Meditation Cushion** — ₹699 (Ergonomic buckwheat hull Zafu)
5. **Stainless Steel Water Bottle** — ₹349 (750ml insulated pro-grade steel)
6. **Yoga Mat Carry Bag** — ₹299 (Ventilated organic cotton canvas)
7. **Meditation Eye Pillow** — ₹199 (Mulberry silk with flaxseed & lavender)
8. **Yoga Starter Kit** — ₹1,499 (Complete 4-in-1 bundled set)

---

## 🔒 Customer Notice

- **Payment Notice:** Online credit/debit card processing is scheduled for an upcoming system upgrade. All orders placed are registered as reservations with Pay Later or Cash on Delivery options.
- **Account Persistence:** Member accounts, cart items, and completed orders are safely preserved in browser local storage.

---

**© 2026 Prana Yoga. All rights reserved. Find Your Balance. Discover Your Inner Peace.**
