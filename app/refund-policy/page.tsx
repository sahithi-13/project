import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'Refund Policy | eTaxMentor',
  description: 'Understand our refund and cancellation policy',
}

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Refund & Cancellation Policy</h1>
          </div>
          <p className="text-green-100 text-lg">Last updated: January 21, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              At eTaxMentor, we strive to provide excellent service. This Refund Policy outlines the terms under which 
              refunds may be issued for our tax filing and consultation services. Please read this policy carefully 
              before purchasing any services.
            </p>
          </CardContent>
        </Card>

        {/* Refund Eligibility */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Refund Eligibility
          </h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">You are eligible for a refund if:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Service Not Started:</strong> You cancel before the CA expert begins work on your filing (within 24 hours of payment)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Technical Issues:</strong> Platform errors prevent you from accessing paid services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Duplicate Payment:</strong> You were charged twice for the same service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Service Unavailable:</strong> We cannot assign a CA expert within 7 days of payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Major Errors:</strong> CA expert makes significant errors that cannot be rectified (subject to review)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Non-Refundable */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6 text-red-600" />
            Non-Refundable Situations
          </h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Refunds will NOT be issued if:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Work Commenced:</strong> CA expert has already started processing your filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Filing Submitted:</strong> ITR/GST return has been e-filed with government portals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Incomplete Information:</strong> You fail to provide required documents or information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Service Completed:</strong> Filing or consultation has been successfully completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Change of Mind:</strong> You simply change your mind after service commencement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Third-Party Decisions:</strong> Tax department rejects or queries your return (not our error)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Past Deadline:</strong> Request made after 30 days from payment date</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Refund Amounts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Amounts</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-2">100% Refund</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Cancelled within 24 hours</li>
                      <li>• Service not started</li>
                      <li>• Duplicate payment</li>
                      <li>• Technical errors</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">50% Refund</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Work in progress (not submitted)</li>
                      <li>• Cancelled within 7 days</li>
                      <li>• CA not assigned yet</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">No Refund (0%)</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Return filed/submitted to government</li>
                    <li>• Service completed</li>
                    <li>• After 30 days from payment</li>
                    <li>• Customer fault (incomplete info, non-cooperation)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How to Request */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <strong>Contact Support:</strong> Email <a href="mailto:refunds@etaxmentor.com" className="text-blue-600 hover:underline">refunds@etaxmentor.com</a> with your order ID and reason
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <strong>Provide Details:</strong> Include payment proof, booking ID, and detailed explanation
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <strong>Review Process:</strong> Our team will review within 3-5 business days
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <strong>Decision:</strong> You'll receive approval/rejection via email
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <strong>Processing:</strong> Approved refunds processed within 7-10 business days
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Processing Time */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-600" />
            Refund Processing Timeline
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 px-3 py-1 rounded text-blue-700 font-semibold text-sm">3-5 Days</div>
                  <div>
                    <strong>Review Period:</strong> Our team reviews your refund request
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 px-3 py-1 rounded text-blue-700 font-semibold text-sm">7-10 Days</div>
                  <div>
                    <strong>Processing:</strong> Once approved, refund is initiated to original payment method
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 px-3 py-1 rounded text-blue-700 font-semibold text-sm">5-7 Days</div>
                  <div>
                    <strong>Bank Credit:</strong> Your bank/card issuer takes additional time to credit your account
                  </div>
                </div>
                <p className="text-sm bg-yellow-50 p-3 rounded border border-yellow-200">
                  <strong>Total Time:</strong> Expect 15-20 business days from refund request to money in your account
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cancellation Policy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>You can cancel your service booking:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Before Assignment:</strong> Full refund if CA not yet assigned</li>
                <li><strong>After Assignment:</strong> Partial refund (50%) if work hasn't started</li>
                <li><strong>After Work Begins:</strong> No refund once CA starts processing</li>
                <li><strong>Consultation Services:</strong> Can cancel up to 24 hours before scheduled time for full refund</li>
              </ul>
              <p className="font-semibold mt-4">
                To cancel, email support@etaxmentor.com or use the "Cancel Booking" option in your dashboard.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Payment Method */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Payment Method</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p className="mb-3">Refunds are processed to the original payment method:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Credit/Debit Card:</strong> Refunded to the same card</li>
                <li><strong>UPI:</strong> Credited to UPI account used for payment</li>
                <li><strong>Net Banking:</strong> Refunded to source bank account</li>
                <li><strong>Wallet:</strong> Credited back to eTaxMentor wallet (instant) or source wallet</li>
              </ul>
              <p className="text-sm mt-4 bg-gray-50 p-3 rounded">
                Note: We cannot process refunds to different accounts/cards than the one used for payment for security reasons.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Disputes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p>If your refund request is rejected and you disagree:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4 mt-3">
                <li>Reply to the rejection email with additional details</li>
                <li>Request escalation to senior management</li>
                <li>Provide evidence supporting your claim</li>
                <li>Final decision will be communicated within 7 days</li>
              </ol>
              <p className="mt-4">
                For unresolved disputes, you may contact our grievance officer at grievance@etaxmentor.com
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Refunds</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p><strong>Refund Queries:</strong> refunds@etaxmentor.com</p>
                <p><strong>General Support:</strong> support@etaxmentor.com</p>
                <p><strong>Phone:</strong> +91 1800-123-4567 (Mon-Fri, 9 AM - 6 PM)</p>
                <p><strong>Response Time:</strong> Within 24-48 hours</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Back to Home */}
        <div className="text-center pt-6">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
