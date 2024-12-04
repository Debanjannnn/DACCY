import * as monaco from 'monaco-editor';

export interface LanguageConfig {
  name: string;
  pistonLanguage: string;
  pistonVersion: string;
  monacoLanguage: string;
  boilerplate: string;
  formatOptions: monaco.languages.FormattingOptions;
}

export const languageConfigs: LanguageConfig[] = [
  {
    name: "JavaScript",
    pistonLanguage: "javascript",
    pistonVersion: "18.15.0",
    monacoLanguage: "javascript",
    boilerplate: `// JavaScript Boilerplate
// Write your code here

function main() {
  // Your main code goes here
}

main();`,
    formatOptions: {
      insertSpaces: true,
      tabSize: 2,
    },
  },
  {
    name: "Python",
    pistonLanguage: "python",
    pistonVersion: "3.10.0",
    monacoLanguage: "python",
    boilerplate: `# Python Boilerplate
# Write your code here

def main():
    # Your main code goes here
    pass

if __name__ == "__main__":
    main()`,
    formatOptions: {
      insertSpaces: true,
      tabSize: 4,
    },
  },
  {
    name: "Java",
    pistonLanguage: "java",
    pistonVersion: "15.0.2",
    monacoLanguage: "java",
    boilerplate: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`,
    formatOptions: {
      insertSpaces: true,
      tabSize: 4,
    },
  },
  {
    name: "C++",
    pistonLanguage: "c++",
    pistonVersion: "10.2.0",
    monacoLanguage: "cpp",
    boilerplate: `// C++ Boilerplate
#include <iostream>

int main() {
    // Write your code here
    return 0;
}`,
    formatOptions: {
      insertSpaces: true,
      tabSize: 2,
    },
  }
];

