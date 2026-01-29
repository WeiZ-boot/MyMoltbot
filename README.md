# MyMoltbot

A modern Todo List application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Add, complete, and delete todos
- 🔍 Filter todos (All / Active / Completed)
- 🗑️ Clear completed todos
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with smooth animations

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/WeiZ-boot/MyMoltbot.git
cd MyMoltbot

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
MyMoltbot/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with Tailwind
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/
│       └── TodoList.tsx     # Todo list component
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## License

MIT
