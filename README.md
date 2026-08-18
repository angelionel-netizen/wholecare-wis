# 🌿 WholeCare: Integrative Wellness Information System (WIS)

> A full-stack healthcare and nutrition information system designed for Whole Foods Market. WholeCare connects in-store customers with certified dietitians and holistic wellness specialists through flexible consultation spaces, granular privacy controls, and personalized dietary protocols.

---

## 📌 Executive Overview & Core Problem

Traditional grocery retail and clinical dietary care operate in silos. WholeCare bridges this gap by creating an in-store **Wellness Information System (WIS)** that empowers shoppers to book on-site consultations, receive practitioner-approved nutrition guides, and maintain strict control over their health data.

### Key Highlights:
- **Dual-Sided Role Architecture**: Seamless switching between the **Customer Portal** and the **Clinician / Provider Portal**.
- **Granular Consent Gate**: HIPAA-inspired audit controls allowing users to explicitly authorize or restrict provider access to clinical consultation notes and grocery history.
- **Relational Data Persistence**: Backed by a normalized SQLite database tracking users, providers, appointments, and encounters.
- **Harvest Modern UI**: Built with a custom Tailwind CSS theme leveraging glassmorphism, responsive grids, and accessible typography.

---

## 🛠️ System Architecture & Tech Stack
┌─────────────────────────────────────────────────────────┐
│                 React 18 SPA (Vite)                     │
│    • Customer Dashboard      • Provider Portal Console  │
│    • Real-Time Booking Engine • Granular Consent Gate   │
└────────────────────────────┬────────────────────────────┘
│ HTTP / JSON REST
┌────────────────────────────▼────────────────────────────┐
│               Node.js & Express API                     │
│    • /api/register           • /api/login               │
│    • /api/providers          • /api/appointments        │
└────────────────────────────┬────────────────────────────┘
│ SQL Queries (better-sqlite3)
┌────────────────────────────▼────────────────────────────┐
│                 SQLite Database Engine                  │
│    • customers (demographics, auth, consent flags)       │
│    • providers (specialties, availability, ratings)     │
│    • appointments & clinical_encounters                 │
└─────────────────────────────────────────────────────────┘
### Stack Breakdown
- **Frontend**: React 18, Vite, Tailwind CSS, Plus Jakarta Sans & Playfair Display
- **Backend**: Node.js, Express.js, CORS
- **Database**: SQLite (`better-sqlite3`)
- **State Management**: Contextual React State with live database synchronization

---

## ✨ Features & User Flows

### 1. Customer & Member Portal
- **Intake & Consent Registration**: Capture dietary lifestyle choices alongside explicit legal and data-sharing consent checkboxes.
- **Interactive Dashboard**: View upcoming appointments, quick-action shortcuts, and recent health activity updates.
- **Appointment Scheduling**: Filter certified specialists by specialty (Dietetics, Holistic Health, Functional Lifestyle), pick consultation dates, and reserve time slots.
- **Curated Nutrition & Recipes**: Filterable clinician-backed dietary protocols and lifestyle guides.
- **Health Profile & Privacy Hub**: Update sensitivities and toggle real-time provider data access.
- **Preventive Care Billing**: View verified health plan coverage, copay status ($0 preventive tier), and itemized statements.

### 2. Clinician / Provider Portal
- **Consultation Queue**: Manage daily patient appointments across in-store flexible spaces.
- **Real-Time Consent Status**: Visual verification badges confirming whether a patient has authorized chart notes or grocery synchronization.
- **Clinical Encounter Documentation**: Enter real-time diagnostic observations and prescribe targeted market items.

---

## 🚀 Local Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0 or higher)
- `npm` (bundled with Node.js)

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/wholecare-wis.git](https://github.com/YOUR_USERNAME/wholecare-wis.git)
cd wholecare-wis