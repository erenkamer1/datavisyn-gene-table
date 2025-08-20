# 🧬 Datavisyn Gene Table Challenge

**Hybrid Frontend & QA Project** - React-based gene data visualization application and comprehensive Playwright test suite

📍 **Live Demo**: [https://erenkamer1.github.io/datavisyn-gene-table](https://erenkamer1.github.io/datavisyn-gene-table) *(To be deployed)*
🔗 **GitHub Repository**: [https://github.com/erenkamer1/datavisyn-gene-table](https://github.com/erenkamer1/datavisyn-gene-table)

![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Mantine](https://img.shields.io/badge/Mantine-6.0.22-cyan?logo=mantine)
![Playwright](https://img.shields.io/badge/Playwright-1.55.0-green?logo=playwright)
![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?logo=vite)

## 📋 About the Project

This project is a hybrid challenge solution developed for **Datavisyn** company. It includes an interactive React application that visualizes human genes and comprehensive QA tests for this application.

### 🎯 Key Features

- **🔍 Performant Gene Table**: Optimized Mantine React Table for 5000+ gene data
- **📊 Interactive Detail Panel**: Genomic information and visualizations for selected genes
- **🎨 Modern UI/UX**: Responsive interface designed with Mantine UI library
- **📈 Data Visualization**: Genomic position and biotype charts with ECharts
- **🧪 Comprehensive Test Coverage**: 100% functional test coverage with Playwright
- **⚡ Real-time Filtering**: Biotype, chromosome, and global search filters

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern hooks and concurrent features
- **TypeScript 5.8.3** - Type safety and developer experience
- **Mantine UI 6.0.22** - Component library and theming
- **Mantine React Table 1.3.4** - Performant data table
- **ECharts 5.6.0** - Interactive data visualization
- **Papa Parse 5.5.3** - CSV data processing
- **Vite 7.1.2** - Fast build and development server

### QA & Testing
- **Playwright 1.55.0** - End-to-end test framework
- **TypeScript Test Suite** - Type-safe test writing

### DevOps & Tools
- **ESLint** - Code quality and consistency
- **Git hooks** - Pre-commit validation
- **CI/CD Ready** - Ready configuration for GitHub Actions

## 🚀 Installation and Running

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

You can verify your installations by running:
```bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
git --version   # Any recent version
```

### 1. Clone the Project
```bash
git clone https://github.com/erenkamer1/datavisyn-gene-table.git
cd datavisyn-gene-table
```

### 2. Install Dependencies
```bash
npm install

# Install Playwright browsers (required for testing)
npm run test:install
```

### 3. Start Development Server
```bash
npm run dev
```
📍 Application will run at `http://localhost:5173`

### 4. Production Build
```bash
npm run build
npm run preview
```

## 🧪 Running Tests

### Running Playwright Tests

```bash
# Run all tests
npm run test

# Run in headful mode (browser visible)
npm run test:headed

# Run in interactive UI mode
npm run test:ui

# Run in debug mode
npm run test:debug
```

### Special Test Scenarios

```bash
# Only gene table tests
npm run test:gene-table

# Mantine storybook integration tests
npm run test:mantine-storybook

# Visual regression tests
npm run test:visual

# View test report
npm run test:report
```

### Test Coverage Areas

#### ✅ Functional Tests

## 📊 Project Structure

```
datavisyn-gene-table/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── GeneTable.tsx        # Main table component
│   │   └── GeneDetail.tsx       # Gene detail panel
│   ├── 📁 types/
│   │   └── gene.ts              # TypeScript type definitions
│   ├── 📁 utils/
│   │   └── csvParser.ts         # CSV data processing utilities
│   ├── App.tsx                  # Main application component
│   └── main.tsx                 # React application entry point
├── 📁 tests/
│   ├── gene-table-advanced.spec.ts    # Detailed functional tests
│   ├── mantine-storybook.spec.ts      # UI library integration tests
│   └── visual-regression.spec.ts      # Visual regression tests
├── 📁 public/
│   └── genes_human.csv          # Gene data file (5000+ rows)
├── package.json                 # NPM dependencies and scripts
├── playwright.config.ts         # Playwright test configuration
├── vite.config.ts              # Vite build configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎛 Application Features

### 🔍 Gene Table (GeneTable)
- **Performance Optimization**: Row virtualization for 5000+ rows
- **Smart Filtering**: Multi-select biotype and chromosome filters
- **Flexible Sorting**: Multi-column sorting for all columns
- **Responsive Design**: Tablet and mobile compatible layout
- **Keyboard Navigation**: Full keyboard support for accessibility

#### Table Columns:
- **Ensembl ID**: Formatted link with monospace font
- **Gene Symbol**: Color-coded badges
- **Gene Name**: Truncated with tooltip support
- **Biotype**: Categorized color coding
- **Chromosome**: Sorted badges (1-22, X, Y)
- **Start/End Position**: Locale-formatted numbers
- **Actions**: View and select buttons

### 📊 Gene Detail Panel (GeneDetail)
- **Metadata Display**: Comprehensive gene information
- **Genomic Visualization**: Position charts with ECharts
- **Biotype Analysis**: Category distribution with pie chart
- **External Integration**: Direct links to Ensembl and GeneCards
- **Future-ready**: Placeholders for future features

#### Visualizations:
- **Position Chart**: Genomic location and gene length bar chart
- **Biotype Distribution**: Interactive pie chart
- **Responsive Charts**: Mobile-friendly chart dimensions

## 🔧 Development Details

### 🎨 UI/UX Design Decisions

- **Modern Material Design**: Consistent design system with Mantine UI
- **Color Semantics**: Meaningful color coding according to biotypes
- **Information Hierarchy**: Visual prominence of important information
- **Progressive Disclosure**: Step-by-step information disclosure with detail panel
- **Mobile-first**: Mobile optimization with responsive breakpoints

### ⚡ Performance Optimizations

- **Virtual Scrolling**: Memory-efficient rendering for 5000+ rows
- **Memoization**: Cache expensive calculations with React.useMemo
- **Lazy Loading**: Dynamic imports and component splitting
- **Debounced Search**: Search performance optimization with 300ms delay
- **Optimistic Updates**: Instant feedback for UI responsiveness

### 🔐 Type Safety

- **Strict TypeScript**: Compile-time error catching
- **Interface Definitions**: Comprehensive type definitions
- **Generic Components**: Reusable and type-safe component architecture
- **Runtime Validation**: Runtime type checking for CSV parsing

### 📧 Contact
- **Project Owner**: Eren Kamer
- **Email**: erenkamer28@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/eren-kamer-b82875171/

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

**⭐ If you liked this project, don't forget to give it a star!**

*A powerful, performant, and user-friendly solution for modern genomic data analysis.*
