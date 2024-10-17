# iFrame Breakout Demo

This project is a Next.js application that demonstrates various iframe breakout techniques. It's designed to showcase potential security vulnerabilities and how they can be exploited or prevented.

## Features

- Custom iframe content manipulation
- Demonstration of iframe sandbox breakout techniques
- Real-time message passing between parent and iframe
- Tailwind CSS for styling
- TypeScript for type safety

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Next.js app directory
- `components/`: React components
- `public/`: Static files
- `lib/`: Utility functions

## Key Components

### CustomIframeDemoComponent

This is the main component that demonstrates the iframe breakout techniques. It allows users to input custom HTML content and observe the behavior of the iframe.


### Exploit HTML

The `exploit.html` file contains a proof-of-concept for breaking out of an iframe sandbox:
# iframe-escape
