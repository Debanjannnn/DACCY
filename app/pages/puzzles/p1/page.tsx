'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Play, Sun, Moon, Lightbulb } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"
import { NavbarComponent } from '@/components/navbar'
import { Editor } from '@monaco-editor/react'
import { CodeEditorWithPiston } from '@/components/ui/CodeEditor'
import { TestCases } from '@/components/ui/TestCases'



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

  const problemDescription = `
    You are given a labyrinth represented as a string of characters. Each character represents a room, and rooms are connected in a circular manner. Your task is to find the length of the longest palindromic subsequence that can be formed by traversing the labyrinth.
  `;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
        <NavbarComponent showBackButton={true} backButtonRoute="/" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>The Palindromic Labyrinth</CardTitle>
              <CardDescription>Difficulty: Hard</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
            <TestCases description={problemDescription} />
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CodeEditorWithPiston darkMode={darkMode} />
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
          © 2024 Daccy. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

