"use client"

import { useState } from "react"
import { Moon, Sun, Network, GitBranch, Layers, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import Link from "next/link"  // Import Link from Next.js
import { NavbarComponent } from "@/components/navbar"

export default function Component() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // useEffect to set mounted to true on client-side
    useState(() => setMounted(true))

    if (!mounted) return null

    const puzzleCategories = [
        { name: "Arrays & Strings", icon: Layers },
        { name: "Trees & Graphs", icon: GitBranch },
        { name: "Dynamic Programming", icon: Workflow },
        { name: "Sorting & Searching", icon: Network },
    ]

    const puzzles = [
        { id: "p1", title: "The Palindromic Labyrinth", category: "Arrays & Strings", difficulty: "Medium" },
        { id: "p2", title: "Binary Tree's Hidden Treasure", category: "Trees & Graphs", difficulty: "Hard" },
        { id: "p3", title: "The Fibonacci Fortress", category: "Dynamic Programming", difficulty: "Medium" },
        { id: "p4", title: "Quicksort's Time Warp", category: "Sorting & Searching", difficulty: "Hard" },
        { id: "p5", title: "Anagram Archipelago", category: "Arrays & Strings", difficulty: "Easy" },
        { id: "p6", title: "The Dijkstra Dimension", category: "Trees & Graphs", difficulty: "Medium" },
    ]

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <NavbarComponent showBackButton={true} backButtonRoute="/pages/interface" />
            <main className="container mx-auto p-6">
                <section className="mb-12">
                    <h2 className="text-3xl font-sans mb-4">Algorithm Realms</h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {puzzleCategories.map((category) => (
                            <motion.div
                                key={category.name}
                                className="rounded-lg overflow-hidden h-24"
                                whileHover={{
                                    scale: 1.05, // Scale the inner content only
                                    transition: { duration: 0.2 },
                                }}
                            >
                                <Button
                                    variant="outline"
                                    className="h-full w-48 flex flex-col items-center justify-center relative overflow-hidden"
                                >
                                    <div className="flex items-center justify-center transition-transform duration-200 hover:scale-105">
                                        <category.icon className="mb-2 h-6 w-6" />
                                        <span className="text-center">{category.name}</span>
                                    </div>
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Coding Quests</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {puzzles.map((puzzle, index) => (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: theme === "dark" ? "#fff" : "#000",
                                    borderWidth: "2px",
                                }}
                                className="rounded-lg overflow-hidden flex flex-col h-full"  // Ensure the card takes full height
                            >
                                <div className="flex-grow flex flex-col">
                                    <Card className="flex-grow h-full">
                                        <CardHeader className="flex-grow">
                                            <CardTitle>{puzzle.title}</CardTitle>
                                            <CardDescription>{puzzle.category}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <Badge
                                                variant={
                                                    puzzle.difficulty === "Easy"
                                                        ? "secondary"
                                                        : puzzle.difficulty === "Medium"
                                                            ? "default"
                                                            : "destructive"
                                                }
                                            >
                                                {puzzle.difficulty}
                                            </Badge>
                                        </CardContent>
                                        <CardFooter className="flex justify-center">
                                            {/* Wrap the Button with Link */}
                                            <Link href={`/pages/puzzles/${puzzle.id}`} className="w-full">
                                                <Button className="w-full">
                                                    Embark on Quest
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
            <footer className="bg-background py-8">
                <div className="mx-auto px-6 text-center text-muted-foreground">
                    <p>&copy; Daccy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
