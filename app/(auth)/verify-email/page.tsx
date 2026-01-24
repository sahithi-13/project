'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'already-verified' | 'no-token'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('no-token')
      return
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`)
        const data = await res.json()

        if (res.ok) {
          if (data.alreadyVerified) {
            setStatus('already-verified')
            setMessage('Your email was already verified.')
          } else {
            setStatus('success')
            setMessage(data.message || 'Email verified successfully!')
          }
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed.')
        }
      } catch {
        setStatus('error')
        setMessage('Network error. Please try again.')
      }
    }

    verifyEmail()
  }, [token])

  // No token provided
  if (status === 'no-token') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Email Verification</h1>
            <p className="text-gray-600 mb-6">
              Please check your email inbox for the verification link. If you haven&apos;t received it, you can request a new one.
            </p>
            <div className="space-y-3">
              <Link href="/login">
                <Button className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Verifying your email...</p>
        </div>
      </div>
    )
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Email Verified!</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-700">
                Your account is now fully activated. You can access all features of eTaxMentor.
              </p>
            </div>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Continue to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Already verified state
  if (status === 'already-verified') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Already Verified</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Continue to Login
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="space-y-3">
            <Link href="/login">
              <Button className="w-full">
                Go to Login
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              Need a new verification link? Log in and request one from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
