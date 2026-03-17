"use client"

import * as React from "react"
import { ArrowRight, Check, Clipboard, Loader2, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const questions = [
  {
    id: "goal",
    question: "What is your #1 goal right now?",
    options: ["More leads/bookings", "Higher sales volume", "Brand authority/Trust", "Easier management"],
  },
  {
    id: "current_site",
    question: "Do you have a current site?",
    options: ["Yes, but it's outdated", "Yes, but it doesn't convert", "No, starting fresh", "Yes, just need tweaks"],
  },
  {
    id: "pain_point",
    question: "What's the biggest pain point?",
    options: ["Slow performance", "Hard to update content", "Unclear messaging", "Looks unprofessional"],
  },
  {
    id: "features",
    question: "Do you need advanced features?",
    options: ["Online booking/payments", "Customer portal/login", "Complex forms/data", "Just content display"],
  },
  {
    id: "timeline",
    question: "What is your preferred timeline?",
    options: ["ASAP (1-2 weeks)", "Standard (3-6 weeks)", "Flexible", "Planning for next quarter"],
  },
]

type AuditState = {
  answers: Record<string, string>
  step: number
  isAnalyzing: boolean
  isComplete: boolean
}

const initialState: AuditState = {
  answers: {},
  step: 0,
  isAnalyzing: false,
  isComplete: false,
}

export function AuditModal() {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = React.useState<AuditState>(initialState)
  const [copied, setCopied] = React.useState(false)

  const handleOptionSelect = (option: string) => {
    setState((prev) => {
      const currentQuestionId = questions[prev.step].id
      const nextStep = prev.step + 1
      const isLastStep = nextStep === questions.length

      if (isLastStep) {
        setTimeout(() => startAnalysis(), 300)
      }

      return {
        ...prev,
        answers: { ...prev.answers, [currentQuestionId]: option },
        step: isLastStep ? prev.step : nextStep, // Stay on last step briefly
      }
    })
  }

  const startAnalysis = () => {
    setState((prev) => ({ ...prev, isAnalyzing: true }))
    setTimeout(() => {
      setState((prev) => ({ ...prev, isAnalyzing: false, isComplete: true }))
    }, 1500)
  }

  const reset = () => {
    setState(initialState)
    setCopied(false)
  }

  const getRecommendation = () => {
    const { answers } = state
    if (answers.goal === "More leads/bookings" || answers.current_site === "Yes, but it doesn't convert") {
      return {
        leak: "Unclear value proposition or weak call-to-actions",
        fix: "Conversion-focused landing page restructure",
        engagement: "High-Performance Rebuild",
        deliverables: ["Conversion audit", "New sitemap", "Copywriting refinement", "Speed optimization"]
      }
    }
    if (answers.pain_point === "Slow performance" || answers.pain_point === "Hard to update content") {
      return {
        leak: "Technical debt slowing down users and admin",
        fix: "Migration to modern stack (Next.js + Headless CMS)",
        engagement: "Modernization Migration",
        deliverables: ["Tech stack migration", "CMS setup", "Performance overhaul", "Core Web Vitals fix"]
      }
    }
     if (answers.goal === "Brand authority/Trust") {
      return {
        leak: "Design doesn't reflect service quality",
        fix: "Premium visual identity refresh",
        engagement: "Brand & UI Overhaul",
        deliverables: ["Visual identity system", "High-fidelity UI design", "Animation/Interaction polish"]
      }
    }

    return {
      leak: "Generic positioning in a crowded market",
      fix: "Strategic differentiation & trust signals",
      engagement: "Trust-First Site Launch",
      deliverables: ["Competitor analysis", "Trust signal integration", "Professional copywriting", "Solid technical foundation"]
    }
  }

  const result = state.isComplete ? getRecommendation() : null

  const copyResult = () => {
    if (!result) return
    const text = `Audit Summary:\nLikely Leak: ${result.leak}\nFirst Fix: ${result.fix}\nRecommended: ${result.engagement}\n\nGenerated via Vantus Systems Audit`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val)
      if (!val) setTimeout(reset, 300) // Reset after close animation
    }}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full px-8 h-14 text-lg animate-pulse hover:animate-none shadow-lg shadow-primary/20">
          Get a 60-second audit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl min-h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {state.isComplete ? "Your 60-Second Audit Results" : "Let's diagnose your situation"}
          </DialogTitle>
          <DialogDescription>
            {state.isComplete
              ? "Based on your answers, here is a preliminary analysis."
              : "Answer a few quick questions to get a clear path forward."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 py-6 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!state.isAnalyzing && !state.isComplete && (
              <motion.div
                key={state.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <Label className="text-xl font-medium text-foreground">
                    {questions[state.step].question}
                  </Label>
                  <div className="grid gap-3">
                    {questions[state.step].options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="h-auto py-4 px-6 justify-start text-left text-base hover:border-primary hover:bg-primary/5 transition-all"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mt-8">
                  <span>Question {state.step + 1} of {questions.length}</span>
                  <div className="h-1.5 w-32 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${((state.step + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {state.isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4"
              >
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-lg font-medium text-muted-foreground">Analyzing your input...</p>
              </motion.div>
            )}

            {state.isComplete && result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 bg-signal-danger/10 border border-signal-danger/20 rounded-xl space-y-1">
                    <p className="text-xs uppercase tracking-wider text-signal-danger font-semibold">Likely Conversion Leak</p>
                    <p className="text-foreground font-medium">{result.leak}</p>
                  </div>
                  <div className="p-4 bg-signal-success/10 border border-signal-success/20 rounded-xl space-y-1">
                     <p className="text-xs uppercase tracking-wider text-signal-success font-semibold">First Best Fix</p>
                    <p className="text-foreground font-medium">{result.fix}</p>
                  </div>
                </div>

                <div className="p-6 bg-secondary/30 border border-border rounded-xl space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Recommended Engagement</p>
                    <h4 className="text-2xl font-bold text-primary">{result.engagement}</h4>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">What I&apos;d deliver:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={copyResult}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Clipboard className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy Summary"}
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1 gap-2"
                    onClick={() => window.location.href = `/contact?subject=Audit Results: ${result.engagement}`}
                  >
                    Start This Project <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center">
                   <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 mx-auto">
                     <RefreshCw className="w-3 h-3" /> Start Over
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
