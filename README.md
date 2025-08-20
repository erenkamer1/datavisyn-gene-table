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
- **Visual Regression Testing** - Snapshot testing for UI changes
- **Cross-browser Testing** - Chromium, Firefox, WebKit support

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
- **Table Render Tests**: Correct display of all columns
- **Data Formatting**: Formatted display of Ensembl ID, biotype, position data
- **Filtering Tests**: Biotype and chromosome-based filtering
- **Sorting Tests**: Ascending/descending sorting for all columns
- **Pagination Tests**: Page navigation and page size changes
- **Search Tests**: Global search functionality

#### 🎨 UI/UX Tests
- **Detail Panel Tests**: Gene selection and detail viewing
- **Chart Render Tests**: Loading of ECharts visualizations
- **Responsive Design**: Behavior on different screen sizes
- **External Links**: Correct functioning of Ensembl and GeneCards links
- **Error Handling**: Network errors and edge cases

#### 📸 Visual Regression
- **Snapshot Testing**: Visual consistency of UI components
- **Cross-browser Compatibility**: Render differences in different browsers
- **Theme Consistency**: Consistent application of Mantine theming

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

## 🧪 Test Strategy

### Test Pyramid Approach

```
    🔺 E2E Tests (Playwright)
     │ • User journey tests
     │ • Cross-browser compatibility
     │ • Visual regression testing
     │
    🔺 Integration Tests
     │ • Component integration
     │ • API mocking tests
     │ • State management tests
     │
    🔺 Unit Tests (Future)
       • Utility function tests
       • Pure component tests
       • Business logic tests
```

### Test Categories

1. **Smoke Tests**: Basic functionality and render tests
2. **Feature Tests**: Comprehensive user interaction tests  
3. **Edge Case Tests**: Error handling and boundary condition tests
4. **Performance Tests**: Performance tests with large datasets
5. **Accessibility Tests**: ARIA compliance and keyboard navigation

## 📈 Future Developments

### 🚀 Roadmap

#### v1.1 - API Integration
- [ ] Real-time gene expression data (GTEx API)
- [ ] MyGene.info integration
- [ ] ENSEMBL REST API integration
- [ ] Caching strategy and offline support

#### v1.2 - Advanced Visualizations
- [ ] Genomic visualization with Gosling.js
- [ ] Gene pathway analysis charts
- [ ] Protein interaction networks
- [ ] Comparative genomics view

#### v1.3 - Collaboration Features
- [ ] Gene list export/import
- [ ] Annotation and notes system
- [ ] Share functionality
- [ ] User preferences and saved filters

#### v1.4 - Analytics & Insights
- [ ] Machine learning-based gene recommendations
- [ ] Statistical analysis dashboard
- [ ] Batch gene analysis tools
- [ ] Advanced search and query builder

### 🛠 Technical Improvements

- **State Management**: Redux Toolkit for complex state
- **PWA Features**: Offline mode and background sync
- **Micro-frontends**: Modularization for scalable architecture
- **GraphQL**: Efficient data fetching
- **Server Components**: React 19 server components adoption

## 🤝 Contributing

### Development Workflow

1. **Fork & Clone**: Fork the repository and clone locally
2. **Branch Strategy**: Create branch in `feature/feature-name` format
3. **Commit Convention**: Use Conventional Commits format
4. **Testing**: Write tests for new features
5. **Pull Request**: Create PR with detailed description

### Code Standards

- **ESLint Rules**: Automated code quality checks
- **Prettier**: Consistent code formatting
- **TypeScript Strict**: Type safety enforcement
- **Test Coverage**: Minimum 80% test coverage
- **Performance Budget**: Bundle size and loading time limits

## 📞 Support and Contact

### 🐛 Bug Reports
- Create detailed bug report in GitHub Issues
- Include reproduction steps and environment information
- Share screenshots and console logs

### 💡 Feature Requests
- Share suggestions in Discussion tab
- Explain use case and business value
- Include mock-ups and wireframes

### 📧 Contact
- **Project Owner**: Eren Kamer
- **Email**: [email to be updated]
- **LinkedIn**: [profile link to be updated]

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

**⭐ If you liked this project, don't forget to give it a star!**

*A powerful, performant, and user-friendly solution for modern genomic data analysis.*
