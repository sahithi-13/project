import { Shield, Lock, Eye, Database, Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | eTaxMentor',
  description: 'Learn how eTaxMentor protects and manages your personal information',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
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
              At eTaxMentor, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              tax filing and consultation platform.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Information We Collect
          </h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Name, email address, phone number</li>
                  <li>PAN (Permanent Account Number), Aadhaar number</li>
                  <li>Address and contact details</li>
                  <li>Date of birth and demographic information</li>
                  <li>Financial information for tax filing purposes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Data</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>IP address, browser type, and device information</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Interaction with features and services</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Payment card details (processed securely through Stripe)</li>
                  <li>Billing address and transaction history</li>
                  <li>UPI IDs and bank account details (encrypted)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600" />
            How We Use Your Information
          </h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Tax Filing Services:</strong> Process ITR and GST filings on your behalf</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>CA Consultation:</strong> Connect you with qualified Chartered Accountants</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Account Management:</strong> Create and maintain your user account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Communication:</strong> Send updates, notifications, and support responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Payment Processing:</strong> Handle transactions securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Compliance:</strong> Meet legal and regulatory requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span><strong>Improvement:</strong> Analyze usage to enhance our services</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            Data Security
          </h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>256-bit SSL/TLS encryption for data transmission</li>
                <li>Encrypted database storage for sensitive information</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Restricted access to personal data on a need-to-know basis</li>
                <li>Two-factor authentication for enhanced account security</li>
                <li>Secure payment processing through PCI-DSS compliant providers</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Data Sharing */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Chartered Accountants:</strong> To provide tax filing and consultation services</li>
                <li><strong>Payment Processors:</strong> Stripe and other payment gateways for transaction processing</li>
                <li><strong>Government Agencies:</strong> Income Tax Department, GST authorities as required by law</li>
                <li><strong>Service Providers:</strong> Cloud hosting, email services, analytics (under strict NDAs)</li>
                <li><strong>Legal Obligations:</strong> When required by court orders or legal processes</li>
              </ul>
              <p className="font-semibold">
                We do NOT sell your personal information to third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-2 text-gray-700">
                <li>✓ <strong>Access:</strong> Request a copy of your personal data</li>
                <li>✓ <strong>Correction:</strong> Update or correct inaccurate information</li>
                <li>✓ <strong>Deletion:</strong> Request deletion of your account and data (subject to legal requirements)</li>
                <li>✓ <strong>Portability:</strong> Receive your data in a structured format</li>
                <li>✓ <strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li>✓ <strong>Objection:</strong> Object to processing of your data for certain purposes</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
          <Card>
            <CardContent className="p-6 space-y-3 text-gray-700">
              <p>
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Essential cookies for platform functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p>
                You can control cookies through your browser settings. However, disabling cookies may affect platform functionality.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p className="mb-3">
                We retain your personal information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Provide our services to you</li>
                <li>Comply with legal and tax obligations (minimum 7 years for tax records)</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records for audit purposes</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p>
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children. If you believe a child has provided us with personal information, 
                please contact us immediately.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-600" />
            Contact Us
          </h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, contact us:
              </p>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> privacy@etaxmentor.com</p>
                <p><strong>Phone:</strong> +91 1800-123-4567</p>
                <p><strong>Address:</strong> eTaxMentor Pvt Ltd, Bangalore, Karnataka, India</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Policy Updates */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
          <Card>
            <CardContent className="p-6 text-gray-700">
              <p>
                We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
                revision date. Significant changes will be communicated via email or prominent notice on our platform. 
                Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
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
