# Incepto NX

A no-code platform that transforms your ideas into production-ready applications using AI. Built with Next.js, Framer Motion, and Gemini AI integration.

## Features

- Beautiful, animated UI with Framer Motion
- Seamless integration with Gemini AI for code generation
- Support for multiple project types:
  - Solana Programs
  - Smart Contracts
  - Frontend dApps
  - Full-stack Web3 Applications

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Set up environment variables:
   Create a `.env.local` file with:

```
# Get your API key at https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see the app.

## How It Works

1. Users describe their Solana application through the intuitive interface
2. The description is sent to our Gemini AI integration
3. Gemini generates production-ready Solana code
4. The generated code can be previewed, edited, and exported

## Environment Variables

- `GEMINI_API_KEY`: Required for AI code generation. Get yours at [Google AI Studio](https://makersuite.google.com/app/apikey)

## Tech Stack

- Next.js
- Framer Motion
- Tailwind CSS
- TypeScript
- Gemini AI
- Solana Web3.js
- Anchor Framework

## Deployment

The app is designed to be deployed on Vercel:

```bash
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
