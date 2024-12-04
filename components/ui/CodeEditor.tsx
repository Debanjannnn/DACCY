'use client'

import { useState, useEffect, useRef } from 'react'
import { Editor, OnMount } from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code, Play } from 'lucide-react'
import { languageConfigs, LanguageConfig } from '@/utils/languageConfig'
import * as monaco from 'monaco-editor';

interface CodeEditorWithPistonProps {
  darkMode: boolean
}

export function CodeEditorWithPiston({ darkMode }: CodeEditorWithPistonProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageConfig>(languageConfigs[0])
  const [code, setCode] = useState<string>(selectedLanguage.boilerplate)
  const [output, setOutput] = useState<string>('')
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    setCode(selectedLanguage.boilerplate)
  }, [selectedLanguage])

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const formatCode = () => {
    setCode((prevCode) => prevCode.trim().replace(/\n\s*\n/g, '\n\n'))
  }

  const runCode = async () => {
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage.pistonLanguage,
          version: selectedLanguage.pistonVersion,
          files: [
            {
              content: code,
            },
          ],
        }),
      })

      const data = await response.json()
      setOutput(data.run.output)
    } catch (error) {
      console.error('Error executing code:', error)
      setOutput('Error executing code. Please try again.')
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Code Editor</CardTitle>
        <CardDescription>Write your solution here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select
          onValueChange={(value) => setSelectedLanguage(languageConfigs.find(lang => lang.name === value) || languageConfigs[0])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languageConfigs.map((lang) => (
              <SelectItem key={lang.name} value={lang.name}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Editor
          height="400px"
          language={selectedLanguage.monacoLanguage}
          theme={darkMode ? 'vs-dark' : 'light'}
          value={code}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            tabSize: selectedLanguage.formatOptions.tabSize,
            insertSpaces: selectedLanguage.formatOptions.insertSpaces,
          }}
          onChange={(value) => setCode(value || '')}
          onMount={handleEditorDidMount}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={formatCode}>
            <Code className="mr-2 h-4 w-4" />
            Format Code
          </Button>
          <Button onClick={runCode}>
            <Play className="mr-2 h-4 w-4" />
            Run Code
          </Button>
        </div>
        {output && (
          <div className="w-full mt-4">
            <h3 className="text-lg font-semibold mb-2">Output:</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
              {output}
            </pre>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

