import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Topbar from '@/components/en/Topbar';
import Footer from '@/components/en/Footer';

export default function TermsOfServicePage() {
  return (
    <div className='min-h-screen bg-white font-sans'>
      <Topbar />
      {/* Blue background for the top bar area */}
      <div className='bg-blue-700 pt-12 md:pt-16'>
        {/* Header Section */}
        <header className='bg-blue-700 text-white'>
          <div className='container mx-auto px-4 max-w-4xl py-8'>
            <Link href='/en' className='inline-flex items-center text-white/80 hover:text-white mb-6 text-sm transition-colors duration-300'>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to Home
            </Link>
            
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Terms of Service</h1>
            <p className='text-white/90'>Effective Date: May 25, 2025</p>
          </div>
        </header>
      </div>

      {/* Main content section */}
      <main className='container mx-auto px-4 max-w-4xl py-12'>
        <div className='prose prose-gray max-w-none'>
          {/* Section 1: Purpose */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 1: Purpose</h2>
            <p className='text-gray-700 leading-relaxed'>
              These Terms of Service are intended to define the conditions of use and operation of services provided by &quot;Elnino&quot; (hereinafter referred to as the &apos;Site&apos;).
            </p>
          </section>

          {/* Section 2: Definitions */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 2: Definitions</h2>
            <p className='text-gray-700 mb-4 leading-relaxed'>The definitions of key terms used in these Terms are as follows:</p>
            <ul className='list-none pl-0 text-gray-700 space-y-3'>
              <li><span className='font-semibold'>① Member:</span> A person who agrees to the Site&apos;s terms, provides personal information for registration, enters into a usage agreement with the Site, and uses the Site.</li>
              <li><span className='font-semibold'>② Usage Agreement:</span> The agreement entered into between the Site and the Member regarding the use of the Site.</li>
              <li><span className='font-semibold'>③ Member ID (hereinafter &apos;ID&apos;):</span> A unique combination of letters and numbers assigned to each member for identification and service use.</li>
              <li><span className='font-semibold'>④ Password:</span> A combination of letters and numbers selected by the member to confirm their identity and protect their rights.</li>
              <li><span className='font-semibold'>⑤ Administrator:</span> The operator who establishes and manages the website for services.</li>
              <li><span className='font-semibold'>⑥ Termination:</span> The cancellation of the usage agreement by the member.</li>
            </ul>
          </section>

          {/* Section 3: Application of Rules */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 3: Application of Rules Outside These Terms</h2>
            <p className='text-gray-700 leading-relaxed'>
              For matters not specified in these Terms, the provisions of the Telecommunications Business Act and other relevant laws shall apply.
            </p>
          </section>

          {/* Section 4: Effectiveness and Changes */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 4: Effectiveness and Changes to the Terms</h2>
            <ul className='list-none pl-0 text-gray-700 space-y-3'>
              <li><span className='font-semibold'>①</span> These Terms become effective when posted on the service screen or otherwise notified to members.</li>
              <li><span className='font-semibold'>②</span> The Site may change these Terms when deemed necessary, and the changed Terms become effective in the manner described in paragraph 1.</li>
            </ul>
          </section>

          {/* Section 5: Member Registration */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 5: Membership Registration</h2>
            <ul className='list-none pl-0 text-gray-700 space-y-3'>
              <li><span className='font-semibold'>①</span> Users become members by filling out the membership information according to the registration form set by the Site and expressing their agreement to these Terms.</li>
              <li><span className='font-semibold'>②</span> The Site may restrict membership registration for users who fall under any of the following categories:
                <ul className='list-disc pl-6 mt-2 space-y-1'>
                  <li>Applicants who have previously lost their membership under these Terms</li>
                  <li>Those who provide false information during registration</li>
                  <li>Those whose registration is deemed to significantly hinder the Site&apos;s technical operations</li>
                </ul>
              </li>
            </ul>
          </section>

          {/* Section 6: Service Use */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 6: Use of Services</h2>
            <p className='text-gray-700 leading-relaxed'>
              The Site provides interpretation-related services to members, and the specific content of services may change according to the Site&apos;s circumstances.
            </p>
          </section>

          {/* Section 7: Obligations */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 7: Obligations of the Site and Members</h2>
            <ul className='list-none pl-0 text-gray-700 space-y-3'>
              <li><span className='font-semibold'>①</span> The Site shall not disclose or distribute members&apos; personal information to third parties without their consent.</li>
              <li><span className='font-semibold'>②</span> Members must comply with these Terms and relevant laws and must not engage in activities that hinder the Site&apos;s operations.</li>
            </ul>
          </section>

          {/* Section 8: Termination */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 8: Termination of Agreement</h2>
            <p className='text-gray-700 leading-relaxed'>
              Members may request termination at any time, and the Site shall process such requests without delay. The Site may restrict or suspend services for members who violate these Terms.
            </p>
          </section>

          {/* Section 9: Disclaimer */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>Article 9: Disclaimer</h2>
            <p className='text-gray-700 leading-relaxed'>
              The Site shall not be liable for service interruptions due to natural disasters, wars, or other force majeure events, nor for damages arising from members&apos; intentional or negligent acts.
            </p>
          </section>

          {/* Additional Terms Notice */}
          <div className='mt-12 p-6 bg-blue-50 rounded-lg'>
            <p className='text-blue-900 font-semibold'>
              These Terms are effective as of May 25, 2025.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}