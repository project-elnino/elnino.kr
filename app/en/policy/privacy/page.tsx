import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Topbar from '@/components/en/Topbar';
import Footer from '@/components/en/Footer';

export default function PrivacyPolicyPage() {
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
            
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>Privacy Policy</h1>
            <p className='text-white/90'>Effective Date: May 25, 2025</p>
          </div>
        </header>
      </div>

      {/* Main content section */}
      <main className='container mx-auto px-4 max-w-4xl py-12'>
        <div className='prose prose-gray max-w-none'>
          {/* Section 1: Collected Personal Information */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Personal Information We Collect</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              The company collects the following personal information to provide interpretation quotations and services.
            </p>
            <div className='bg-gray-50 p-6 rounded-lg'>
                <p className='text-gray-800 mb-2 font-semibold'>ο Items Collected</p>
                <p className='text-gray-700 leading-relaxed'>Company name (Organization name), Name, Position, Mobile phone, E-mail, Interpretation languages, Type of interpretation, Date and time of interpretation, Detailed interpretation content, Interpretation location, Interpretation materials, Cookies, etc.</p>
                <p className='text-gray-800 mt-4 mb-2 font-semibold'>ο Collection Method</p>
                <p className='text-gray-700 leading-relaxed'>Website (Quotation request form submission)</p>
            </div>
          </section>

          {/* Section 2: Purpose of Collection and Use */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Purpose of Collecting and Using Personal Information</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              The company uses the collected personal information for the following purposes.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
                <li>Interpretation quotation consultation, service provision, and contract fulfillment</li>
                <li>Customer management, inquiry response, and dispute resolution</li>
                <li>Service improvement and new service development</li>
                <li>Marketing and advertising information provision (with prior consent)</li>
            </ul>
          </section>

          {/* Section 3: Retention Period */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Retention and Use Period of Personal Information</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              In principle, the company destroys personal information without delay when the purpose of collection and use is achieved. However, the following information is retained for the specified period for the reasons stated.
            </p>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <p className='text-gray-800 mb-2 font-semibold'>ο Records related to contracts or subscription withdrawals</p>
              <p className='text-gray-700 mb-4'>Retention period: 5 years (Act on Consumer Protection in Electronic Commerce)</p>
              
              <p className='text-gray-800 mb-2 font-semibold'>ο Records of payment and supply of goods</p>
              <p className='text-gray-700 mb-4'>Retention period: 5 years (Act on Consumer Protection in Electronic Commerce)</p>
              
              <p className='text-gray-800 mb-2 font-semibold'>ο Records of consumer complaints or dispute handling</p>
              <p className='text-gray-700'>Retention period: 3 years (Act on Consumer Protection in Electronic Commerce)</p>
            </div>
          </section>

          {/* Section 4: Third Party Provision */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Provision of Personal Information to Third Parties</h2>
            <p className='text-gray-700 leading-relaxed'>
              In principle, the company does not provide users&apos; personal information to third parties without their consent. However, exceptions apply in the following cases:
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 mt-4'>
                <li>When the user has given prior consent</li>
                <li>When required by law or when there is a request from an investigative agency in accordance with the procedures and methods prescribed by law for investigation purposes</li>
            </ul>
          </section>

          {/* Section 5: User Rights */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Rights of Users and Legal Representatives</h2>
            <p className='text-gray-700 leading-relaxed'>
              Users can view or modify their registered personal information at any time and request deletion. For inquiries about viewing, modifying, or deleting personal information, please contact the person in charge of personal information protection via email or phone, and we will take action without delay.
            </p>
          </section>

          {/* Section 6: Contact Information */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-gray-900 mb-4 border-b pb-2'>■ Contact Information</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              For any questions or concerns regarding our privacy policy, please visit our <a href="/en/contact" className="text-blue-600 hover:underline">Contact</a> page.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}