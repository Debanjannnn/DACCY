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
    const { problemDescription } = await req.json();

    if (!problemDescription) {
      return NextResponse.json({ message: 'Problem description is required' }, { status: 400 });
    }

    // Get the generative model
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the test cases
    const prompt = `Generate only and nothing else but a list of at least 3 diverse and valid test cases for the following problem description. Each test case should include an 'input' and 'expectedOutput'. The 'input' should be a structured object (e.g., an array, string, number, etc.), and the 'expectedOutput' should be a corresponding result. Provide at least one edge case. The format should be JSON, and there should be no additional explanations. Problem description:\n\n${problemDescription}`;

    const result = await model.generateContent(prompt);

    // Extract the test cases from the response
    const responseText = await result.response.text(); // Adjust this based on actual response structure
    const testCasesMatch = responseText.match(/(?:```json\n)?([\s\S]*?)(?:```|$)/);
    
    // If the test case generation is successful, parse the JSON data
    const testCases = testCasesMatch ? JSON.parse(testCasesMatch[1]) : { error: 'No test cases generated' };

    return NextResponse.json({
      testCases,
    });
  } catch (error) {
    console.error('Error generating test cases:', error);
    return NextResponse.json({ message: 'Error generating test cases' }, { status: 500 });
  }
}
