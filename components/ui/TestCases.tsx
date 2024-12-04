'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type TestCase = {
  input: string;
  expectedOutput: string ;  // Adjust based on expected output type
};

export const TestCases = ({ description }: { description: string }) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestCases = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/testcase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problemDescription: description }),
      });

      const data = await response.json();
      if (response.ok) {
        setTestCases(data.testCases || []);
      } else {
        setError(data.message || 'Failed to fetch test cases');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      <p>{description}</p>

      <Button
        onClick={fetchTestCases}
        disabled={loading}
        className="mt-4"
      >
        {loading ? 'Generating Test Cases...' : 'Generate Test Cases'}
      </Button>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {testCases.length > 0 && (
        <div className="mt-4">
          <ul className="list-disc ml-4">
            {testCases.map((testCase, index) => (
              <li key={index}>
                <strong>Input:</strong> {testCase.input} <br />
                <strong>Expected Output:</strong> {testCase.expectedOutput}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
