import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Topbar 영역을 위한 파란 배경 */}
      <div className="bg-blue-700 pt-16">
        {/* 헤더 */}
        <header className="bg-blue-700 text-white">
          <div className="container mx-auto px-4 max-w-4xl py-8">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            홈으로 돌아가기
          </Link>
          
          <h1 className="text-3xl font-bold text-white mb-2">개인정보처리방침</h1>
          <p className="text-white/90">시행일: 2024년 1월 1일</p>
          </div>
        </header>
      </div>

      {/* 본문 */}
      <main className="container mx-auto px-4 max-w-4xl py-12">
        <div className="prose prose-gray max-w-none">
          {/* 1. 개요 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. 개인정보처리방침 개요</h2>
            <p className="text-gray-700 mb-3">
              Knoc(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.
            </p>
            <p className="text-gray-700">
              본 개인정보처리방침은 회사가 제공하는 AI 실시간 번역 서비스(이하 "서비스")와 관련하여 이용자의 개인정보를 어떻게 수집, 이용, 보관, 파기하는지에 대한 내용을 담고 있습니다.
            </p>
          </section>

          {/* 2. 수집 항목 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. 수집하는 개인정보 항목</h2>
            <p className="text-gray-700 mb-4">회사는 서비스 제공을 위해 최소한의 개인정보를 수집합니다.</p>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">필수 수집 항목</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>회원가입 시: 이메일, 비밀번호, 이름(닉네임)</li>
              <li>유료 서비스 이용 시: 결제 정보(카드번호, 계좌정보 등)</li>
              <li>기업 고객: 회사명, 사업자등록번호, 담당자 연락처</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">자동 수집 항목</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>서비스 이용 기록, IP 주소, 쿠키, 기기 정보</li>
              <li>음성 데이터 (실시간 번역 시 일시적으로 처리, 저장하지 않음)</li>
            </ul>
          </section>

          {/* 3. 수집 목적 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-700 mb-4">수집한 개인정보는 다음의 목적을 위해 이용됩니다:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별</li>
              <li>서비스 제공: AI 번역 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공</li>
              <li>서비스 개선: 신규 서비스 개발, 서비스 품질 향상</li>
              <li>마케팅 활용: 이벤트 및 광고성 정보 제공 (동의한 경우에 한함)</li>
              <li>고객 지원: 문의사항 처리, 공지사항 전달</li>
              <li>법적 의무 준수: 관련 법령에 따른 의무 이행</li>
            </ul>
          </section>

          {/* 4. 보유 기간 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-700 mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>회원 정보: 회원 탈퇴 시까지</li>
              <li>전자상거래 관련 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 또는 분쟁처리 기록: 3년 (소비자보호법)</li>
              <li>로그 기록: 3개월 (통신비밀보호법)</li>
            </ul>
            <p className="text-gray-700">
              단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
            </p>
          </section>

          {/* 5. 제3자 제공 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 mb-4">
              회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>
            <p className="text-gray-700 mb-2">현재 개인정보를 제공하는 제3자:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>결제 서비스 제공업체 (PG사): 결제 처리를 위한 최소 정보</li>
              <li>클라우드 서비스 제공업체: 데이터 저장 및 처리 (암호화된 상태)</li>
            </ul>
          </section>

          {/* 6. 보안 조치 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. 개인정보의 안전성 확보 조치</h2>
            <p className="text-gray-700 mb-4">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>개인정보 암호화: 비밀번호는 단방향 암호화되어 저장</li>
              <li>해킹 등에 대비한 기술적 대책: 방화벽, 침입탐지시스템 운영</li>
              <li>개인정보 접근 제한: 최소한의 인원만 접근 가능</li>
              <li>정기적인 보안 점검 및 교육 실시</li>
              <li>SSL 인증서를 통한 데이터 전송 구간 암호화</li>
              <li>음성 데이터는 실시간 처리 후 즉시 삭제</li>
            </ul>
          </section>

          {/* 7. 이용자 권리 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. 이용자의 권리와 행사 방법</h2>
            <p className="text-gray-700 mb-4">이용자는 언제든지 다음과 같은 권리를 행사할 수 있습니다:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>
            <p className="text-gray-700 mb-2">권리 행사 방법:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>웹사이트 내 "마이페이지"에서 직접 열람, 정정, 탈퇴</li>
              <li>고객센터(support@knoc.ai)로 서면, 이메일 요청</li>
            </ul>
            <p className="text-gray-700">회사는 이용자의 요청을 받은 날로부터 10일 이내에 조치하겠습니다.</p>
          </section>

          {/* 8. 쿠키 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. 쿠키의 운영</h2>
            <p className="text-gray-700 mb-4">회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키를 사용합니다.</p>
            <p className="text-gray-700 mb-2">쿠키 사용 목적:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>로그인 유지</li>
              <li>이용자 선호 설정 저장</li>
              <li>서비스 이용 통계 분석</li>
            </ul>
            <p className="text-gray-700 mb-2">쿠키 거부 방법:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>브라우저 설정에서 쿠키 허용/차단 설정 가능</li>
              <li>쿠키 거부 시 일부 서비스 이용에 제한이 있을 수 있습니다</li>
            </ul>
          </section>

          {/* 9. 개인정보보호 책임자 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. 개인정보 보호책임자</h2>
            <p className="text-gray-700 mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-medium text-gray-800 mb-2">개인정보 보호책임자</p>
              <p className="text-gray-700">성명: 홍길동</p>
              <p className="text-gray-700">직책: 정보보호팀장</p>
              <p className="text-gray-700">이메일: privacy@knoc.ai</p>
              <p className="text-gray-700">전화: 02-1234-5678</p>
            </div>
            
            <p className="text-gray-700 mb-2">기타 개인정보 침해에 대한 신고나 상담:</p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>개인정보침해신고센터 (privacy.kisa.or.kr / 118)</li>
              <li>대검찰청 사이버수사과 (www.spo.go.kr / 1301)</li>
              <li>경찰청 사이버안전국 (cyberbureau.police.go.kr / 182)</li>
            </ul>
          </section>

          {/* 10. 변경사항 */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. 개인정보처리방침의 변경</h2>
            <p className="text-gray-700 mb-4">이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.</p>
            <p className="text-gray-700 mb-4">
              회사는 법령이나 서비스의 변경사항을 반영하기 위한 목적 등으로 개인정보처리방침을 수정할 수 있습니다.
            </p>
            <p className="text-gray-700 mb-4">
              개인정보처리방침이 변경되는 경우 회사는 변경 사항을 게시하며, 변경된 개인정보처리방침은 게시한 날로부터 7일 후부터 효력이 발생합니다.
            </p>
            <p className="text-gray-700">
              다만, 이용자의 권리에 중대한 변경이 발생하는 경우에는 최소 30일 전에 공지하겠습니다.
            </p>
          </section>
        </div>

        {/* 하단 정보 */}
        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-600 text-center">
            본 개인정보처리방침에 대한 문의사항은 contact@elnino.kr로 연락주시기 바랍니다.
          </p>
        </div>
      </main>
    </div>
  )
}