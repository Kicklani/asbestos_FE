# Asbestos Detection Frontend

AI-powered asbestos detection application built with React and TypeScript.

## Features

- 🔬 AI-powered image analysis for asbestos detection
- 📸 Image upload and processing
- 🎯 3-step analysis workflow
- 🗺️ Inspection center recommendations
- 📊 Visual data representation
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand
- **Routing:** React Router v7
- **Styling:** Tailwind CSS
- **Image Processing:** Fabric.js, Konva
- **Data Visualization:** D3.js, Chart.js
- **HTTP Client:** Axios

## Project Structure

```
asbestos_FE/
├── src/
│   ├── api/              # API integration
│   │   ├── client.ts
│   │   └── analysisApi.ts
│   ├── assets/           # Static assets
│   │   ├── images/
│   │   └── icons/
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── analysis/     # Analysis-specific components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── AnalysisPage.tsx
│   │   └── AboutPage.tsx
│   ├── store/            # Zustand state management
│   │   └── analysisStore.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── imageUtils.ts
│   │   └── formatters.ts
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Public assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies
```

## Folder and File Descriptions

### Root Configuration Files

- **[package.json](package.json)** - Project dependencies, scripts, and metadata
- **[vite.config.ts](vite.config.ts)** - Vite bundler configuration with React plugin and path aliases
- **[tsconfig.json](tsconfig.json)** - TypeScript compiler options and path mapping
- **[tsconfig.node.json](tsconfig.node.json)** - TypeScript configuration for Node.js files
- **[tailwind.config.js](tailwind.config.js)** - Tailwind CSS theme customization and content paths
- **[postcss.config.js](postcss.config.js)** - PostCSS configuration for Tailwind and Autoprefixer
- **[index.html](index.html)** - HTML entry point and template
- **[.gitignore](.gitignore)** - Git ignore rules for node_modules, dist, env files, etc.
- **[.env.example](.env.example)** - Example environment variables (API URL)

### Source Directory (`src/`)

#### API Layer (`src/api/`)
- **[client.ts](src/api/client.ts)** - Axios HTTP client instance with interceptors for authentication and error handling
- **[analysisApi.ts](src/api/analysisApi.ts)** - API endpoints for image analysis and inspection center retrieval

#### Components (`src/components/`)

**Common Components (`src/components/common/`)** - Reusable UI components:
- **[Button.tsx](src/components/common/Button.tsx)** - Customizable button component with variants (primary, secondary, danger)
- **[Card.tsx](src/components/common/Card.tsx)** - Container card component with optional title
- **[LoadingSpinner.tsx](src/components/common/LoadingSpinner.tsx)** - Loading indicator with size options and message
- **[index.ts](src/components/common/index.ts)** - Barrel export for common components

**Analysis Components (`src/components/analysis/`)** - Domain-specific components:
- **[ImageUploader.tsx](src/components/analysis/ImageUploader.tsx)** - Drag-and-drop image upload with preview and validation
- **[AnalysisResult.tsx](src/components/analysis/AnalysisResult.tsx)** - Displays analysis results with color-coded status (green/yellow/red)
- **[AdditionalInfoForm.tsx](src/components/analysis/AdditionalInfoForm.tsx)** - Form for collecting location, size, and additional images
- **[InspectionCenterList.tsx](src/components/analysis/InspectionCenterList.tsx)** - Displays nearby inspection centers with costs and details
- **[index.ts](src/components/analysis/index.ts)** - Barrel export for analysis components

**Layout Components (`src/components/layout/`)** - Page structure components:
- **[Header.tsx](src/components/layout/Header.tsx)** - Top navigation bar with logo and menu
- **[Footer.tsx](src/components/layout/Footer.tsx)** - Footer with links and disclaimer
- **[Layout.tsx](src/components/layout/Layout.tsx)** - Main layout wrapper combining header, content, and footer
- **[index.ts](src/components/layout/index.ts)** - Barrel export for layout components

#### Pages (`src/pages/`)
- **[HomePage.tsx](src/pages/HomePage.tsx)** - Landing page with feature overview and CTA
- **[AnalysisPage.tsx](src/pages/AnalysisPage.tsx)** - Main analysis workflow with 3 steps (upload → results → inspection centers)
- **[AboutPage.tsx](src/pages/AboutPage.tsx)** - Information about the service, technology, and disclaimer
- **[index.ts](src/pages/index.ts)** - Barrel export for pages

#### State Management (`src/store/`)
- **[analysisStore.ts](src/store/analysisStore.ts)** - Zustand store managing:
  - Current workflow step (1-3)
  - Uploaded images
  - Analysis results
  - Additional information
  - Inspection centers
  - Loading and error states

#### Types (`src/types/`)
- **[index.ts](src/types/index.ts)** - TypeScript type definitions for:
  - Analysis results and status (`AnalysisResult`, `AnalysisStatus`)
  - Image uploads (`ImageUpload`)
  - Additional information (`AdditionalInfo`)
  - Inspection centers (`InspectionCenter`)
  - API responses
  - Store state

#### Utilities (`src/utils/`)
- **[imageUtils.ts](src/utils/imageUtils.ts)** - Image processing utilities:
  - `generateImagePreview()` - Creates base64 preview from File
  - `validateImageFile()` - Validates file type and size
  - `compressImage()` - Compresses images before upload

- **[formatters.ts](src/utils/formatters.ts)** - Formatting utilities:
  - `formatCurrency()` - Formats Korean Won (KRW)
  - `formatDistance()` - Formats distance in km/m
  - `formatDateTime()` - Formats dates in Korean locale
  - `getStatusColor()` - Returns color code for status
  - `getStatusEmoji()` - Returns emoji for status

#### Assets (`src/assets/`)
- **images/** - Image files (logos, illustrations, etc.)
- **icons/** - Icon files (SVG, PNG)

#### Core Application Files
- **[App.tsx](src/App.tsx)** - Root component with React Router setup and route definitions
- **[main.tsx](src/main.tsx)** - Application entry point, renders React app to DOM
- **[index.css](src/index.css)** - Global styles and Tailwind CSS imports
- **[vite-env.d.ts](src/vite-env.d.ts)** - TypeScript declarations for Vite environment variables

### Public Directory (`public/`)
Static assets served directly without processing (favicon, robots.txt, etc.)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kicklani/asbestos_FE.git
cd asbestos_FE
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API endpoint:
```
VITE_API_BASE_URL=http://your-api-url/api
```

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run lint
```

## How It Works

### Step 1: Basic Screening
- Upload a photo of the stone
- AI analyzes and provides one of three results:
  - 🟢 Green (70%): Safe, no asbestos
  - 🟡 Yellow (25%): Uncertain, needs more info
  - 🔴 Red (5%): Potential danger

### Step 2: Detailed Analysis
- For yellow/red results, provide additional information:
  - Multiple images from different angles
  - Location where stone was found
  - Size of the stone

### Step 3: Inspection Centers
- If still uncertain, get recommendations for:
  - Nearby certified inspection centers
  - Estimated costs
  - Expected inspection time

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Disclaimer

This application provides preliminary screening only. Always consult certified professionals for final verification and safety decisions.
