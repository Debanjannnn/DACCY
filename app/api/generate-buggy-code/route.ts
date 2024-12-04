import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Generative AI with your API key
const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genai = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { level, language } = await req.json();

    if (!level || !language) {
      return NextResponse.json({ message: 'Level and language are required' }, { status: 400 });
    }

    // Get the generative model
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the buggy code
    const prompt = `Generate a buggy code which isn't easy to fix for a ${level} level problem in ${language}. Only provide the code, you may remove random lines, no comments, and no extra text.`;
    const result = await model.generateContent(prompt);

    // Extract the code using regex
    const responseText = result.response.text(); // Adjust this based on actual response structure
    const codeMatch = responseText.match(/(?:```[\w+]*\n)?([\s\S]*?)(?:```|$)/);
    const buggyCode = codeMatch ? codeMatch[1] : 'No code generated'; // Do not trim to preserve indentation

    // Prepare prompts for hints, title, and resolution guidance
    const hintPrompt = `Provide a clear and concise explanation of the following code. The explanation should include a brief overview of the program's functionality, a breakdown of each key component and its purpose, and an outline of the input/output behavior. Aim for clarity and precision, ensuring that the description is easy to understand for someone with a basic understanding of ${language}. The total length should not exceed 500 characters. Here is the code:\n${buggyCode}`;
    const problemTitlePrompt = `Generate the problem title for ${buggyCode}, with no unnecessary text or special characters: `;
    const resolveHintsPrompt = `Analyze the following buggy code and generate a list of specific, actionable hints to resolve the bugs. The hints should include identifying missing or incorrect lines, potential logic errors, and syntax issues. Do not fix the code, only provide hints. Keep the list concise and clear. Here is the code:\n${buggyCode}`;

    // Run all prompts concurrently
    const [hintResult, problemTitleResult, resolveHintsResult] = await Promise.all([
      model.generateContent(hintPrompt),
      model.generateContent(problemTitlePrompt),
      model.generateContent(resolveHintsPrompt),
    ]);

    // Extract results
    const hint = hintResult.response.text(); // Adjust this based on actual response structure
    const problemTitleText = problemTitleResult.response.text(); // Ensure this is called correctly
    const resolveHints = resolveHintsResult.response.text(); // Ensure this extracts the resolution hints correctly

    return NextResponse.json({
      code: buggyCode,
      hint,
      problemTitleText,
      resolveHints,
    });

  } catch (error) {
    console.error('Error fetching buggy code:', error);
    return NextResponse.json({ message: 'Error generating buggy code' }, { status: 500 });
  }
}
