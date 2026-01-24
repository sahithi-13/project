'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react'
import { Button, Input } from '@/components/ui'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)
  const [tokenError, setTokenError] = useState('')
  const [email, setEmail] = useState('')
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Password strength indicators
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  }

  const allChecksPassed = Object.values(passwordChecks).every(Boolean)

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      setIsVerifying(false)
      setTokenError('No reset token provided. Please request a new password reset link.')
      return
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/reset-password?token=${token}`)
        const data = await res.json()

        if (data.valid) {
          setIsValidToken(true)
          setEmail(data.email || '')
        } else {
          setTokenError(data.error || 'Invalid or expired reset link.')
        }
      } catch {
        setTokenError('Failed to verify reset link. Please try again.')
      } finally {
        setIsVerifying(false)
      }
    }

    verifyToken()
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!allChecksPassed) {
      newErrors.password = 'Password does not meet all requirements'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSuccess(true)
      } else {
        if (data.details?.fieldErrors) {
          const fieldErrors: Record<string, string> = {}
          Object.entries(data.details.fieldErrors).forEach(([key, value]) => {
            fieldErrors[key] = (value as string[])[0]
          })
          setErrors(fieldErrors)
        } else {
          setErrors({ general: data.error || 'Failed to reset password. Please try again.' })
        }
      }
    } catch {
      setErrors({ general: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while verifying token
  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Verifying your reset link...</p>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">{tokenError}</p>
            <div className="space-y-3">
              <Link href="/forgot-password">
                <Button className="w-full">
                  Request New Reset Link
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="w-full">
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

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Password Reset Successful!</h1>
            <p className="text-gray-600 mb-6">
              Your password has been changed successfully. You can now login with your new password.
            </p>
            <Link href="/login">
              <Button className="w-full" size="lg">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#F97316] to-[#EA580C] items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-3xl font-bold mb-6">Create New Password</h2>
          <p className="text-orange-100 text-lg mb-8">
            Choose a strong password that you haven&apos;t used before. Your security is our priority.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-semibold mb-4">Password Requirements:</h3>
            <ul className="space-y-3 text-sm">
              <li className={`flex items-center gap-2 ${passwordChecks.length ? 'text-green-300' : 'text-orange-200'}`}>
                {passwordChecks.length ? '✓' : '○'} At least 8 characters
              </li>
              <li className={`flex items-center gap-2 ${passwordChecks.uppercase ? 'text-green-300' : 'text-orange-200'}`}>
                {passwordChecks.uppercase ? '✓' : '○'} One uppercase letter (A-Z)
              </li>
              <li className={`flex items-center gap-2 ${passwordChecks.lowercase ? 'text-green-300' : 'text-orange-200'}`}>
                {passwordChecks.lowercase ? '✓' : '○'} One lowercase letter (a-z)
              </li>
              <li className={`flex items-center gap-2 ${passwordChecks.number ? 'text-green-300' : 'text-orange-200'}`}>
                {passwordChecks.number ? '✓' : '○'} One number (0-9)
              </li>
              <li className={`flex items-center gap-2 ${passwordChecks.special ? 'text-green-300' : 'text-orange-200'}`}>
                {passwordChecks.special ? '✓' : '○'} One special character (!@#$%^&*)
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
            {email && (
              <p className="text-gray-600">
                Reset password for <strong>{email}</strong>
              </p>
            )}
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your new password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile password requirements */}
            <div className="lg:hidden bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Password must have:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className={passwordChecks.length ? 'text-green-600' : 'text-gray-400'}>
                  {passwordChecks.length ? '✓' : '○'} 8+ characters
                </div>
                <div className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'}>
                  {passwordChecks.uppercase ? '✓' : '○'} Uppercase
                </div>
                <div className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'}>
                  {passwordChecks.lowercase ? '✓' : '○'} Lowercase
                </div>
                <div className={passwordChecks.number ? 'text-green-600' : 'text-gray-400'}>
                  {passwordChecks.number ? '✓' : '○'} Number
                </div>
                <div className={`col-span-2 ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                  {passwordChecks.special ? '✓' : '○'} Special character
                </div>
              </div>
            </div>

            <div className="relative">
              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                error={errors.confirmPassword}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                Passwords do not match
              </p>
            )}

            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Passwords match
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              isLoading={isLoading}
              disabled={!allChecksPassed || formData.password !== formData.confirmPassword}
            >
              <Lock className="w-5 h-5 mr-2" />
              Reset Password
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-[#1E3A8A] font-semibold hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#1E3A8A] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
