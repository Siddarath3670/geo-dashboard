# Geo Dashboard

A modern, responsive dashboard application for visualizing geospatial data using React, Leaflet, and Material UI.

## Deplyed Link
- **link**: https://geo-dashboard-pied.vercel.app/ (deployed on vercel) 

## 🚀 Features

- **Interactive Map**: specific geospatial data visualization using [Leaflet](https://leafletjs.com/) and [React Leaflet](https://react-leaflet.js.org/).
- **Data Grid**: Advanced tabular data presentation with sorting, filtering, and pagination using [MUI Data Grid](https://mui.com/x/react-data-grid/).
- **Responsive Design**: Built with [Tailwind CSS](https://tailwindcss.com/) and [Material UI](https://mui.com/) to ensure a seamless experience across devices.
- **Mock Data**: Utilizes [Faker.js](https://fakerjs.dev/) for generating realistic test data.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Material UI (MUI)](https://mui.com/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/)
- **Data Handling**: [MUI X Data Grid](https://mui.com/x/react-data-grid/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geo-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚦 Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

## 📂 Project Structure

```
src/
├── features/         # Feature-based architecture
│   ├── dashboard/    # Dashboard layout and logic
│   ├── map/          # Map visualization components
│   └── table/        # Data grid components
├── services/         # API and data services
├── types/            # TypeScript type definitions
├── App.tsx           # Main application entry
└── main.tsx          # React DOM rendering
```


