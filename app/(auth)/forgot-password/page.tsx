'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSubmitted(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Check Your Email</h1>
            <p className="text-gray-600 mb-6">
              If an account exists with <strong>{email}</strong>, we&apos;ve sent a password reset link. 
              Please check your inbox and spam folder.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> The reset link will expire in 1 hour for security reasons.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail('')
                }}
                variant="outline"
                className="w-full"
              >
                Try a different email
              </Button>
              <Link href="/login">
                <Button className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Forgot Your Password?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Don&apos;t worry, it happens to the best of us. Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-3 text-blue-100">Security Tips:</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                Use a strong, unique password
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                Enable two-factor authentication
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                Never share your password with anyone
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                Check the URL before entering credentials
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">eT</span>
              </div>
              <span className="text-2xl font-bold text-[#1E3A8A]">eTaxMentor</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive reset instructions</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-9 w-5 h-5 text-gray-400" />
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link href="/login" className="text-[#1E3A8A] font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#1E3A8A] font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
