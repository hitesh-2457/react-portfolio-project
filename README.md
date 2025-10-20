# 🚀 Interactive Portfolio - Hitesh Gupta T R

A modern, interactive portfolio website built with React, TypeScript, and cutting-edge web technologies. Features 3D animations, interactive components, and a unique AI-powered console interface.

## 💡 Project Purpose

This portfolio serves as a creative showcase skills. Crafted purely for demonstration purposes, it highlights technical skills and innovative approaches to user interface design and not to serve as a commercial product.


Portfolio Preview
=====
## ✨ Features

### 🎨 Interactive Components
- **3D Tilted Cards**: Advanced perspective transforms with smooth animations
- **Spotlight Cards**: Dynamic lighting effects that follow mouse movement
- **Smooth Animations**: Powered by Motion.js for fluid transitions
- **Responsive Design**: Optimized for all screen sizes

### 🤖 SideKick Console Interface
- **Byte the Robot**: Interactive SideKick character with personality
- **Command System**: Navigate, get info, and interact via text commands
- **Auto-minimize**: Intelligently minimizes after 1.5 seconds for clean UX
- **Smooth Transitions**: Animated shrinking effects

### 🎭 Visual Effects
- **Lottie Animations**: Professional vector animations
- **Particle Effects**: Dynamic background animations
- **Glass Morphism**: Modern backdrop blur effects
- **Color Schemes**: Themed color palettes throughout

### 📱 Sections
- **Home**: Hero section with typing animation and 3D computer
- **About**: Interactive skill cards with flip animations
- **Experience**: Timeline with color-coded entries
- **Projects**: GitHub-integrated project showcase with 3D cards
- **Contact**: Professional contact information

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool

### Styling & Animation
- **Tailwind CSS 4** - Utility-first CSS framework
- **Motion.js** - Powerful animation library
- **CSS Grid/Flexbox** - Modern layout systems

### Interactive Components
- **@lottiefiles/dotlottie-react** - Lottie animation player
- **Three.js** - 3D graphics capabilities
- **Custom Hooks** - Reusable stateful logic

### Development Tools
- **TypeScript Compiler** - Type checking
- **Vite Plugins** - Enhanced development experience

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd react-portfolio-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server with HMR
npm run preview      # Preview production build locally
```

### Building
```bash
npm run build        # Production build with validation
npm run clean        # Clean build directory
```

### Quality Assurance
```bash
npm run type-check   # TypeScript type checking
npm run lint         # ESLint code quality check
npm run lint:fix     # Auto-fix ESLint issues
npm run validate-json # Validate data files
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── SpotlightCard.tsx # Interactive spotlight cards
│   ├── TiltedCard.tsx    # 3D tilt effect cards
│   ├── Console.tsx       # AI console interface
│   ├── NavBar.tsx        # Navigation component
│   └── ...
├── sections/            # Page sections
│   ├── home/            # Hero section
│   ├── about/           # About section
│   ├── experience/      # Experience timeline
│   ├── projects/        # Projects showcase
│   └── contact/         # Contact information
├── contexts/            # React contexts
│   └── NavigationContext.tsx
├── hooks/               # Custom React hooks
│   ├── useSectionRegistration.ts
│   ├── useExperienceYears.ts
│   └── useTypingEffect.ts
├── animations/          # Lottie animation components
├── constants/           # App constants and themes
├── utils/               # Utility functions
│   ├── consoleLogger.ts # Console logging system
│   └── dataLoader.ts    # Data loading utilities
└── assets/             # Static assets

public/
└── assets/             # Public data files
    ├── experience.json # Experience data
    └── about.json      # About section data
```

## 🎮 Console Commands

The interactive console supports various commands:

### Navigation
- `home` - Scroll to home section
- `about` - Scroll to about section
- `projects` - Scroll to projects section
- `contact` - Scroll to contact section

### Utilities
- `help` - Show available commands
- `clear` - Clear console history
- `hello` / `wave` - Interactive greeting

### Keyboard Shortcuts
- `/` - Focus console input
- `Enter` - Execute command

## 🎨 Customization

### Color Themes
Modify color schemes in `src/constants/index.ts`:

```typescript
export const COLOR_SCHEMES = [
  {
    accent: 'accent-blue-500',
    spotlight: 'rgba(59, 130, 246, 0.25)',
    gradient: 'from-blue-500 to-cyan-500',
    // ...
  }
];
```

### Console Behavior
Adjust auto-minimize timing in `src/app.tsx`:

```tsx
<Console autoToggleDelay={1500} /> {/* 1.5 seconds */}
```

### Animation Settings
Customize 3D effects in component files:
- `TiltedCard.tsx` - Adjust rotation amplitudes and spring values
- `SpotlightCard.tsx` - Modify spotlight colors and effects

## 📊 Data Management

### Experience Data
Edit `public/assets/experience.json` to update experience timeline:

```json
[
  {
    "id": "1",
    "title": "Software Engineer",
    "company": "Tech Company",
    "period": "2023 – Present",
    "category": "work"
  }
]
```

### About Data
Modify `public/assets/about.json` for about section cards:

```json
[
  {
    "id": "1",
    "title": "React",
    "items": ["Hooks", "Context", "Performance"]
  }
]
```

## 🔧 Development

### Code Quality
The project includes comprehensive quality checks:
- **TypeScript**: Strict type checking
- **JSON Validation**: Data file integrity checks

### Build Pipeline
```bash
npm run build
# 1. Validate JSON files
# 2. TypeScript type checking
# 3. Vite production build
```

### Performance Optimizations
- **Lazy Loading**: Components load on demand
- **Code Splitting**: Optimized bundle chunks
- **Asset Optimization**: Images and fonts optimized
- **Caching**: Efficient browser caching strategies

## 🌟 Key Components

### TiltedCard
Advanced 3D [card from ReactBits](https://reactbits.dev/components/tilted-card) with physics-based animations:
```tsx
<TiltedCard
  imageSrc="..."
  captionText="Project Title"
  rotateAmplitude={14}
  scaleOnHover={1.1}
/>
```

### SpotlightCard
Interactive [card from ReactBits](https://reactbits.dev/components/spotlight-card) with dynamic lighting:
```tsx
<SpotlightCard
  spotlightColor="rgba(59, 130, 246, 0.25)"
  enableFlip={true}
  frontContent={<h3>Title</h3>}
  backContent={<p>Description</p>}
/>
```

### Console
Interactive console interface:
```tsx
<Console autoToggleDelay={1500} />
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Vite Team** - For the lightning-fast build tool
- **Motion.js** - For smooth animations
- **Tailwind CSS** - For utility-first styling
- **Lottie** - For professional animations
- **ReactBits.dev** - For interactive UI components and design patterns

---
