# ServiceTrack

ServiceTrack is a frontend web application that helps users track and manage recurring services such as subscriptions, utilities, bookings, and memberships.

## Project Overview

The purpose of this project is to provide users with a simple dashboard where they can view active services, monitor monthly spending, check renewal dates, add new services, and filter existing services.

## Technology Stack

- React
- Vite
- React Router DOM
- React Hooks
- Context API
- CSS

## Key Features

- Multi-page navigation using React Router
- Dashboard overview with summary cards
- Services page with search and status filtering
- Service details page
- Add service form with validation
- Shared state management using Context API
- Mock data loading
- Loading and error states
- Settings page with interactive toggles
- Responsive layout for desktop and mobile
- Accessible labels and semantic HTML

## Installation Instructions

1. Install project dependencies:

```bash
npm install


## Design Decisions

The application uses a component-based structure to improve maintainability and reusability. Pages are separated from reusable components such as service cards and statistic cards. Shared service data is managed through React Context, which allows multiple pages to access and update the same service list.

The visual design uses a soft baby pink and magenta pink theme to create a friendly and modern dashboard experience. The interface uses clear spacing, cards, badges, forms, and simple navigation so users can quickly understand service costs, renewal dates, and status information.

## Folder Structure

```
src
├── components
│   ├── servicecard.jsx
│   └── statcard.jsx
├── context
│   └── servicecontext.jsx
├── data
│   └── services.js
├── pages
│   ├── addservice.jsx
│   ├── dashboard.jsx
│   ├── servicedetails.jsx
│   ├── services.jsx
│   └── settings.jsx
├── App.jsx
├── index.css
└── main.jsx

## Screenshots
Screenshots are included in the final submission folder.
``` screenshots:
Dashboard page
Services page
Add Service form
Service details page
Settings page
Mobile responsive view

## Reflection
The full 500-700 word reflection is included in `reflection.docx`.

## AI use Declaration
AI assistance was used for grammar, structural guidance, and coding support. The final implementation and project decisions were reviewed and adapted by the student.