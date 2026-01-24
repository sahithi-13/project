import { FileText, AlertCircle, Scale, UserCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'Terms of Service | eTaxMentor',
  description: 'Terms and conditions for using eTaxMentor platform',
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-blue-100 text-lg">Last updated: January 21, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-700 leading-relaxed">
              Welcome to eTaxMentor. These Terms of Service ("Terms") govern your access to and use of our tax filing 
              and consultation platform. By accessing or using eTaxMentor, you agree to be bound by these Terms. 
              If you do not agree, please do not use our services.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-600" />
            Acceptance of Terms
          </h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>
                By creating an account or using any part of our services, you confirm that:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>You will provide accurate and complete information</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>You have read and understood our Privacy Policy</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Provided</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Tax Filing Services</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Income Tax Return (ITR) filing assistance</li>
                  <li>GST return filing and compliance</li>
                  <li>Document preparation and review</li>
                  <li>E-filing on government portals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. CA Consultation</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Connection with qualified Chartered Accountants</li>
                  <li>Tax planning and advisory services</li>
                  <li>Financial consultation</li>
                  <li>Audit support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Platform Features</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Document storage and management</li>
                  <li>Tax calculators and tools</li>
                  <li>Payment processing</li>
                  <li>Support ticket system</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibilities</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Accurate Information:</strong> Provide truthful and complete information for tax filings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Document Upload:</strong> Submit clear, legible copies of required documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Account Security:</strong> Maintain confidentiality of your login credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Timely Response:</strong> Respond promptly to CA requests for information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Payment:</strong> Pay all fees on time as per selected services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Legal Compliance:</strong> Ensure all provided information complies with tax laws</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Prohibited Activities */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Prohibited Activities
          </h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-3">You agree NOT to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide false, misleading, or fraudulent information</li>
                <li>Use the platform for illegal tax evasion or money laundering</li>
                <li>Share your account credentials with unauthorized persons</li>
                <li>Attempt to hack, breach, or compromise platform security</li>
                <li>Upload viruses, malware, or harmful code</li>
                <li>Scrape, copy, or reproduce platform content without permission</li>
                <li>Harass, abuse, or threaten CA experts or support staff</li>
                <li>Use the platform for commercial purposes without authorization</li>
                <li>Reverse engineer or decompile any platform software</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Fees & Payment */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fees & Payment</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service fees are displayed before purchase and must be paid in full</li>
                <li>All payments are processed securely through Stripe or authorized payment gateways</li>
                <li>Prices are in Indian Rupees (INR) and include applicable GST</li>
                <li>Payment confirmation is required before service commencement</li>
                <li>Late payment may result in service suspension</li>
                <li>Refunds are subject to our Refund Policy (see separate document)</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CA Expert Terms */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CA Expert Agreement</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>For Chartered Accountants using our platform:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Must hold valid ICAI membership</li>
                <li>Maintain professional standards and ethical conduct</li>
                <li>Provide accurate and timely service to clients</li>
                <li>Comply with all tax laws and regulations</li>
                <li>Pay platform commission as per agreed terms (typically 15-20%)</li>
                <li>Handle client data with confidentiality</li>
                <li>Respond to client queries within 24-48 hours</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Disclaimers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-600" />
            Disclaimers & Limitations
          </h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-900 mb-2">Important Notice:</p>
                <ul className="space-y-1 text-yellow-800">
                  <li>• eTaxMentor is a platform connecting users with CA experts</li>
                  <li>• We do not provide direct tax advice or legal counsel</li>
                  <li>• Services are provided by independent CA professionals</li>
                  <li>• Platform is provided "AS IS" without warranties</li>
                  <li>• We are not liable for CA errors or tax authority decisions</li>
                </ul>
              </div>
              <p className="font-semibold">
                Limitation of Liability: Our liability is limited to the amount paid for services. We are not responsible 
                for indirect, incidental, or consequential damages.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>
                All platform content, including logos, text, graphics, software, and design, is owned by eTaxMentor 
                or licensed to us. You may not:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Copy, reproduce, or distribute platform content</li>
                <li>Use our trademarks or branding without written permission</li>
                <li>Create derivative works based on our platform</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
              <p>
                You retain ownership of documents you upload, but grant us a license to use them for providing services.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p><strong>We may suspend or terminate your account if:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>You violate these Terms of Service</li>
                <li>You provide false or fraudulent information</li>
                <li>You engage in illegal activities</li>
                <li>Payment defaults occur</li>
                <li>You abuse or harass our staff or CA experts</li>
              </ul>
              <p><strong>You may terminate your account anytime by:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Contacting support@etaxmentor.com</li>
                <li>Using account deletion option in settings</li>
              </ul>
              <p className="text-sm">
                Note: Termination does not relieve you of payment obligations for completed services.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law & Disputes</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>
                These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction 
                of courts in Bangalore, Karnataka.
              </p>
              <p>
                <strong>Dispute Resolution:</strong> We encourage resolving disputes through direct communication. 
                If unresolved, disputes may be settled through arbitration in Bangalore as per the Arbitration and 
                Conciliation Act, 1996.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an 
                updated date. Significant changes will be communicated via email. Continued use after changes constitutes 
                acceptance. If you disagree with changes, discontinue use of the platform.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p className="mb-4">For questions about these Terms, contact us:</p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> legal@etaxmentor.com</p>
                <p><strong>Support:</strong> support@etaxmentor.com</p>
                <p><strong>Phone:</strong> +91 1800-123-4567</p>
                <p><strong>Address:</strong> eTaxMentor Pvt Ltd, Bangalore, Karnataka, India</p>
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
