'use client'

import React, { useState, useEffect, KeyboardEvent } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

type Question = {
  id: number
  text: string
  type: 'text' | 'select' | 'textarea'
  options?: string[]
  required: boolean
  field: keyof INewcomer
}

const questions: Question[] = [
  { id: 1, text: "What's your artist name?", type: 'text', required: true, field: 'artistName' },
  { id: 2, text: "What's your primary genre?", type: 'select', options: ['Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'Other'], required: true, field: 'primaryGenre' },
  { id: 3, text: "How many years have you been performing?", type: 'text', required: false, field: 'yearsPerforming' },
  { id: 4, text: "Tell us about your musical journey:", type: 'textarea', required: false, field: 'musicalJourney' },
  { id: 5, text: "What's your preferred instrument?", type: 'text', required: false, field: 'preferredInstrument' },
]

export default function ArtistRegistration() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<INewcomer>({
    artistName: '',
    primaryGenre: '',
    yearsPerforming: '',
    musicalJourney: '',
    preferredInstrument: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        handleNext(event)
      }
    }

    document.addEventListener('keydown', handleKeyPress as any)

    return () => {
      document.removeEventListener('keydown', handleKeyPress as any)
    }
  }, [currentQuestion, answers])

  const handleNext = () => {
    const currentQuestionData = questions[currentQuestion]
    if (currentQuestionData.required && !answers[currentQuestionData.field]) {
      setError('This question is required. Please provide an answer.')
      return
    }
    setError(null)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    setError(null)
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswer = (answer: string) => {
    const currentQuestionData = questions[currentQuestion]
    setAnswers({ ...answers, [currentQuestionData.field]: answer })
    setError(null)
  }

  const handleSubmit = async () => {
    const currentQuestionData = questions[currentQuestion]
    if (currentQuestionData.required && !answers[currentQuestionData.field]) {
      setError('This question is required. Please provide an answer.')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/user/newcomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.log("[newcomer_GET]", error);

      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = () => {
    const question = questions[currentQuestion]
    return (
      <div className="space-y-4">
        {renderQuestionInput(question)}
        {question.required && (
          <p className="text-sm text-red-500">* Required</p>
        )}
      </div>
    )
  }

  const renderQuestionInput = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>{question.text}</Label>
            <Input
              id={`question-${question.id}`}
              value={answers[question.field] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleNext()
                }
              }}
            />
          </div>
        )
      case 'select':
        return (
          <div className="space-y-2">
            <Label>{question.text}</Label>
            <Select onValueChange={handleAnswer} value={answers[question.field]}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      case 'textarea':
        return (
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>{question.text}</Label>
            <Textarea
              id={`question-${question.id}`}
              value={answers[question.field] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleNext()
                }
              }}
            />
          </div>
        )
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Welcome, {answers.artistName}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for registering as an artist. We've received your information and we'll get back to you soon.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Artist Registration</CardTitle>
        </CardHeader>
        <CardContent>
          {renderQuestion()}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBack} disabled={currentQuestion === 0}>
            Back
          </Button>
          {currentQuestion === questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}