import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

type GenerateResponse = {
  status: 'error' | 'success' | 'generating';
  message?: string;
  code?: string;
  progress?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const { projectType, description } = req.body;

    if (!projectType || !description) {
      return res.status(400).json({
        status: 'error',
        message: 'Project type and description are required',
      });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Define prompts for different project types
    const prompts: Record<string, string> = {
      'web-app': `You are an expert React developer. Generate a modern, production-ready Next.js component based on this description: "${description}"

Technical Requirements:
- Use TypeScript with strict type checking
- Implement Tailwind CSS for styling
- Use modern React patterns (hooks, composition)
- Include proper TypeScript interfaces and types
- Add JSDoc comments for documentation
- Implement proper error handling
- Use modern ES6+ features
- Follow React best practices

Design Requirements:
- Create a responsive layout
- Use modern, clean design
- Implement smooth animations with Framer Motion
- Follow accessibility best practices
- Use semantic HTML elements
- Include proper loading and error states

Please provide the complete component code wrapped in a TypeScript/React code block.`,

      'mobile-app': `You are an expert React Native developer. Generate a production-ready React Native component based on this description: "${description}"

Technical Requirements:
- Use TypeScript with strict type checking
- Implement React Native's built-in styling
- Use modern React patterns (hooks, composition)
- Include proper TypeScript interfaces and types
- Add JSDoc comments for documentation
- Implement proper error handling
- Use modern ES6+ features
- Follow React Native best practices

Design Requirements:
- Create a responsive layout that works on both iOS and Android
- Use platform-specific components when necessary
- Implement smooth animations with React Native Animated
- Follow mobile UX best practices
- Include proper loading and error states
- Handle different screen sizes

Please provide the complete component code wrapped in a TypeScript/React Native code block.`,

      dashboard: `You are an expert frontend developer. Generate a modern dashboard component based on this description: "${description}"

Technical Requirements:
- Use TypeScript with strict type checking
- Implement Tailwind CSS for styling
- Use modern React patterns (hooks, composition)
- Include data visualization with Chart.js or Recharts
- Add real-time data handling capabilities
- Implement proper error handling
- Use modern ES6+ features
- Follow dashboard UX best practices

Design Requirements:
- Create a responsive grid layout
- Use modern, clean design
- Implement smooth transitions and animations
- Include proper loading states and skeletons
- Use proper color coding for data visualization
- Follow accessibility guidelines

Please provide the complete component code wrapped in a TypeScript/React code block.`,

      api: `You are an expert backend developer. Generate a production-ready API endpoint based on this description: "${description}"

Technical Requirements:
- Use TypeScript with strict type checking
- Implement proper request validation
- Use modern Express.js patterns
- Include proper error handling middleware
- Add comprehensive API documentation
- Implement security best practices
- Use modern ES6+ features
- Follow RESTful API conventions

Security Requirements:
- Implement proper authentication
- Add input validation and sanitization
- Use rate limiting
- Handle CORS properly
- Implement proper error responses
- Add request logging

Please provide the complete API endpoint code wrapped in a TypeScript/Node.js code block.`,
    };

    // Get the appropriate prompt for the project type
    const prompt = prompts[projectType] || prompts['web-app'];

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    // Extract code from the response
    const codeMatch = generatedText.match(
      /```(?:typescript|tsx|javascript)?\n([\s\S]*?)```/
    );
    const code = codeMatch ? codeMatch[1].trim() : generatedText;

    return res.status(200).json({
      status: 'success',
      code,
    });
  } catch (error) {
    console.error('Generation error:', error);
    return res.status(500).json({
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Failed to generate code',
    });
  }
}
