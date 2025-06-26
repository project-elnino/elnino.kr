import { ArrowLeft } from 'lucide-react';

// PrivacyPolicyPage is a React component that displays the privacy policy.
// It is designed with a consistent layout to the terms of service page.
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Blue background for the top bar area */}
      <div className="bg-blue-700 pt-12 md:pt-16">
        {/* Header Section */}
        <header className="bg-blue-700 text-white">
          <div className="container mx-auto px-4 max-w-4xl py-8">
            <a href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm transition-colors duration-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로 돌아가기
            </a>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">개인정보처리방침</h1>
            <p className="text-white/90">시행일: 2024년 1월 1일</p>
          </div>
        </header>
      </div>

      {/* Main content section */}
      <main className="container mx-auto px-4 max-w-4xl py-12">
        <div className="prose prose-gray max-w-none">
          {/* Section 1: Collected Personal Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">■ 수집하는 개인정보 항목</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 통역 견적의뢰 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800 mb-2 font-semibold">ο 수집항목</p>
                <p className="text-gray-700 leading-relaxed">회사명(기관명), 성명, 직위, 휴대폰, E-mail, 통역언어, 통역의 구분, 통역일시, 통역 상세 내용, 통역 장소, 통역자료, 쿠키 등</p>
                <p className="text-gray-800 mt-4 mb-2 font-semibold">ο 개인정보 수집방법</p>
                <p className="text-gray-700 leading-relaxed">홈페이지(견적의뢰 게시물 작성)</p>
            </div>
          </section>

          {/* Section 2: Purpose of Collection and Use */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">■ 개인정보의 수집 및 이용목적</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>통역 견적 상담, 서비스 제공 및 계약 이행</li>
                <li>고객 관리, 문의사항 응대 및 분쟁 해결</li>
                <li>서비스 개선 및 신규 서비스 개발</li>
                <li>마케팅 및 광고 정보 제공 (사전 동의 시)</li>
            </ul>
          </section>
          
          {/* Section 3: Retention and Use Period */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">■ 개인정보의 보유 및 이용기간</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 사유로 명시한 기간 동안 보존합니다.
            </p>
            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">내부 방침에 따른 정보 보유</p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li><span className="font-medium">보존 항목 :</span> 수집된 개인정보 항목 일체</li>
                        <li><span className="font-medium">보존 근거 :</span> 분쟁 해결 및 고객 문의 기록 보존</li>
                        <li><span className="font-medium">보존 기간 :</span> 문의 처리 완료 후 5년</li>
                    </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800">관계법령에 따른 보존</p>
                     <p className="text-sm text-gray-600 mb-3">상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 정보를 보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.</p>
                    <ul className="list-disc pl-5 mt-2 text-gray-700">
                        <li><span className="font-medium">계약 또는 청약철회 등에 관한 기록 :</span> 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                        <li><span className="font-medium">대금결제 및 재화 등의 공급에 관한 기록 :</span> 5년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                        <li><span className="font-medium">소비자의 불만 또는 분쟁처리에 관한 기록 :</span> 3년 (전자상거래등에서의 소비자보호에 관한 법률)</li>
                        <li><span className="font-medium">신용정보의 수집/처리 및 이용 등에 관한 기록 :</span> 3년 (신용정보의 이용 및 보호에 관한 법률)</li>
                    </ul>
                </div>
            </div>
          </section>
        </div>

        {/* Footer Information */}
        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-600 text-center">
            개인정보 처리방침에 대한 문의사항은 고객센터로 연락주시기 바랍니다.
          </p>
        </div>
      </main>
    </div>
  )
}
