import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

type SolanaGenerateResponse = {
  status: 'error' | 'success' | 'generating';
  message?: string;
  code?: string;
  analysis?: string;
  dependencies?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SolanaGenerateResponse>
) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    const { type, prompt, sourceCode } = req.body;

    if (!type || !prompt) {
      return res.status(400).json({
        status: 'error',
        message: 'Type and prompt are required',
      });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Define prompts for different Solana development tasks
    const prompts: Record<string, string> = {
      program: `You are an expert Solana blockchain developer. Generate a production-ready Solana program using Anchor based on this description: "${prompt}"

Please provide your response in the following format:

## Code
\`\`\`rust
[Your complete Rust/Anchor program code here]
\`\`\`

## Analysis
[Detailed analysis including:
- Security considerations
- Performance optimizations  
- Best practices implemented
- Potential improvements]

## Dependencies
[Required dependencies and their versions]

The code should be production-ready and follow all Solana security best practices.`,

      audit: `You are an expert Solana smart contract auditor. Analyze the following Solana program code and provide a comprehensive analysis:

${sourceCode}

Please analyze for:
1. Security vulnerabilities
2. Best practice violations
3. Performance optimizations
4. Code quality issues
5. Potential logical errors
6. Compliance with Solana program standards

Provide specific recommendations for improvements.`,

      frontend: `You are an expert React and Solana developer. Generate a modern dApp frontend based on this description: "${prompt}"

Please provide your response in the following format:

## Code
\`\`\`typescript
[Your complete React/Next.js frontend code here]
\`\`\`

## Analysis
[Detailed analysis including:
- Architecture decisions
- Security considerations
- Performance optimizations
- Best practices implemented]

## Dependencies
[Required dependencies and their versions]

Technical Requirements:
- Use Next.js with TypeScript
- Implement @solana/web3.js and @solana/wallet-adapter
- Use proper wallet connection handling
- Add proper error handling and loading states
- Follow Solana dApp frontend best practices
- Include proper transaction signing and sending`,

      template: `You are an expert Solana developer. Generate a complete Solana project template based on this description: "${prompt}"

Please provide your response in the following format:

## Code
\`\`\`
[Your complete project structure and files]
\`\`\`

## Analysis
[Detailed analysis including:
- Project structure decisions
- Security considerations
- Best practices implemented
- Deployment considerations]

## Dependencies
[Required dependencies and their versions]

Technical Requirements:
- Use Anchor framework
- Include proper testing setup
- Add CI/CD configuration
- Follow Solana project structure best practices
- Include documentation`,

      terminal: `You are Incepto NX, an advanced AI assistant specializing in Solana blockchain development. You have deep knowledge of Solana, Anchor framework, SPL tokens, and blockchain development in general.

You should:
- Always identify yourself as Incepto NX if asked about your identity
- Never mention or reference Gemini or any other AI model
- Be helpful and informative about Solana development topics
- Provide clear, concise explanations
- Use code examples when relevant
- Be conversational and engaging
- Stay focused on blockchain and development topics
- Maintain a professional but friendly tone

User question: "${prompt}"

Please provide a helpful response that demonstrates your expertise while maintaining your identity as Incepto NX.`,
    };

    // Get the appropriate prompt for the Solana development type
    const promptTemplate = prompts[type];
    if (!promptTemplate) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Solana development type',
      });
    }

    // Generate content
    const result = await model.generateContent(promptTemplate);
    const response = await result.response;
    const generatedText = response.text();

    // Extract code and other information
    let generatedCode = '';
    let analysis = '';
    let dependencies: string[] = [];

    if (type === 'terminal') {
      // For terminal, return the response as analysis
      analysis = generatedText;
    } else if (type === 'audit') {
      // For audit, the entire response is the analysis
      analysis = generatedText;
    } else {
      // For other types, extract sections based on markdown headers

      // Extract code section
      const codeMatch = generatedText.match(
        /## Code\s*\n\s*```(?:rust|typescript|javascript)?\n([\s\S]*?)```/i
      );
      if (codeMatch) {
        generatedCode = codeMatch[1].trim();
      } else {
        // Fallback: try to find any code blocks
        const fallbackCodeMatch = generatedText.match(
          /```(?:rust|typescript|javascript)?\n([\s\S]*?)```/g
        );
        if (fallbackCodeMatch) {
          generatedCode = fallbackCodeMatch
            .map((block) =>
              block.replace(/```(?:rust|typescript|javascript)?\n|```/g, '')
            )
            .join('\n\n');
        }
      }

      // Extract analysis section
      const analysisMatch = generatedText.match(
        /## Analysis\s*\n([\s\S]*?)(?=\n## |$)/i
      );
      if (analysisMatch) {
        analysis = analysisMatch[1].trim();
      }

      // Extract dependencies section
      const depsMatch = generatedText.match(
        /## Dependencies\s*\n([\s\S]*?)(?=\n## |$)/i
      );
      if (depsMatch) {
        const depsText = depsMatch[1].trim();
        dependencies = depsText
          .split('\n')
          .map((dep) => dep.trim())
          .filter(
            (dep) =>
              dep.length > 0 && !dep.startsWith('-') && !dep.startsWith('*')
          );
      }
    }

    return res.status(200).json({
      status: 'success',
      code: generatedCode,
      analysis,
      dependencies,
    });
  } catch (error) {
    console.error('Solana generation error:', error);
    return res.status(500).json({
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Failed to generate Solana code',
    });
  }
}
