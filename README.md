# RentNest — House Rental Platform in Kolhapur, Maharashtra

> "Find Your Perfect Home in Kolhapur"

RentNest is a dedicated house and apartment rental platform focused on the residential market of **Kolhapur, Maharashtra, India**. The platform allows users to explore verified rental properties across prime localities (Rajarampuri, Tarabai Park, Shahupuri, Kasaba Bawada, Nagala Park, Kalamba, Rankala, Udyam Nagar, and Vishrambag) with transparent Indian Rupee (₹) pricing, rich amenities filters, direct landlord contact, and comprehensive property management.

---

## Key Features

- **Kolhapur Locality Focus**: Fast search and filtering across popular residential localities in Kolhapur.
- **Indian Rupee (₹) Pricing**: Consistent INR monthly rental rates with special discount offer tags.
- **Modern Responsive UI**: Dark Navy (`#0f172a`) and Accent Orange (`#f97316`) theme with rounded cards, smooth sliders, and responsive layout.
- **User Authentication**: Secure JWT-based registration, login, and Google OAuth with Firebase.
- **Listing CRUD**: Create, edit, and delete property listings with image upload gallery.
- **Direct Landlord Connect**: Direct mailto integration for seamless communication.
- **Database Seed Script**: Pre-populated with realistic Kolhapur rental properties across all major areas.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ or v20+)
- [MongoDB](https://www.mongodb.com/) (running locally or MongoDB Atlas URI)

### Quick Start

1. **Install Dependencies**:
```bash
npm install
npm install --prefix frontend
```

2. **Seed Kolhapur Demo Properties**:
```bash
npm run seed
```

3. **Start Backend Server**:
```bash
npm run dev
# Backend runs on http://localhost:3000
```

4. **Start Frontend Development Server**:
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

#### Frontend Setup

Now, let's set up the frontend of the real estate project.

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```bash
VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
VITE_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_FIREBASE_APP_ID=your_firebase_app_id
```

4. Start the development server:

```bash
npm run dev
```

#### Usage

Visit `http://localhost:5173/` in your browser to access the full application, seamlessly integrating the backend and frontend.

## Project Preview

### Home Page

![](/assets/home.png)

![](/assets/offer-section.png)

![](/assets/rent-section.png)

![](/assets/sale-section.png)

### Sign In Page

![](/assets/sign-in.png)

### Sign Up Page

![](/assets/sign-up.png)

### Profile Page

![](/assets/profile.png)

### Create Lists Page

![](/assets/creating-list.png)

### Update Lists Page

![](/assets/updating-list.png)

### Listing Page

![](/assets/listing.png)

### Search Page

![](/assets/search-page.png)
