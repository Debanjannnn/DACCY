'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Play, Sun, Moon, Lightbulb } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full" />,
})

export default function PalindromicLabyrinth() {
  const [darkMode, setDarkMode] = useState(true)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-normal">Daccy</h1>
          <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>The Palindromic Labyrinth</CardTitle>
              <CardDescription>Difficulty: Hard</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                You are given a labyrinth represented as a string of characters. Each character represents a room, and rooms are connected in a circular manner. Your task is to find the length of the longest palindromic subsequence that can be formed by traversing the labyrinth.
              </p>
              <h3>Input:</h3>
              <p>A string S representing the labyrinth (1 ≤ |S| ≤ 1000)</p>
              <h3>Output:</h3>
              <p>An integer representing the length of the longest palindromic subsequence</p>
              <h3>Example:</h3>
              <pre><code>
                Input: "AABCBA"
                Output: 5
              </code></pre>
              <p>Explanation: The longest palindromic subsequence is "ABCBA", which has a length of 5.</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
              <CardDescription>Write your solution here</CardDescription>
            </CardHeader>
            <CardContent>
              <MonacoEditor
                height="400px"
                defaultLanguage="javascript"
                theme={darkMode ? "vs-dark" : "light"}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Code className="mr-2 h-4 w-4" />
                Format Code
              </Button>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5" />
              AI Hint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => setShowHint(!showHint)}
              className="mb-4"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            {showHint && (
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  Consider using dynamic programming to solve this problem. You can create a 2D array to store the lengths of palindromic subsequences for different substrings of the input string.
                </p>
                <p>
                  The key is to build up from smaller subproblems to larger ones. Start with palindromes of length 1, then 2, and so on, until you've considered the entire string.
                </p>
                <p>
                  Remember to handle the circular nature of the labyrinth by considering all possible starting points.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © 2023 DSA Problem Solver. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

