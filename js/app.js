/**
 * ==========================================================================
 * GRI 주간보고 취합 및 채용검증 서비스 공통 애플리케이션 로직 (app.js)
 * 경기연구원 Gyeonggi Research Institute
 * ==========================================================================
 */

const EVAL_PROFILES = {
  '강민철': { school: '서울대학교', dept: '교통공학과', degree: '공학박사', advisor: '박영수 교수', company: '한국교통연구원', role: '선임연구위원', period: '2015~현재', region: '서울', family: '해당 없음', specialty: ['교통계획', '네트워크 최적화', '대중교통 정책'] },
  '이준호': { school: 'KAIST', dept: '건설환경공학과', degree: '공학박사', advisor: '최민석 교수', company: 'KAIST', role: '부교수', period: '2019~현재', region: '대전', family: '해당 없음', specialty: ['교통공학', '교통류 분석', '자율주행'] },
  '박성은': { school: '서울시립대학교', dept: '도시공학과', degree: '공학박사', advisor: '이재원 교수', company: '서울시립대학교', role: '조교수', period: '2020~현재', region: '서울', family: '해당 없음', specialty: ['도시계획', '토지이용', '도시재생'] },
  '최현우': { school: '연세대학교', dept: '도시공학과', degree: '공학박사', advisor: '정상훈 교수', company: '국토연구원', role: '연구위원', period: '2012~현재', region: '세종', family: '해당 없음', specialty: ['도시계획', '스마트시티', '공간계획'] },
  '정수연': { school: '경기대학교', dept: '도시공학과', degree: '공학석사', advisor: '김현수 교수', company: '경기대학교', role: '강사', period: '2018~현재', region: '수원', family: '해당 없음', specialty: ['지역계획', '도시재생', '주거정책'] },
  '윤상혁': { school: '한양대학교', dept: '도시공학과', degree: '공학박사', advisor: '이태현 교수', company: '한국토지주택공사', role: '수석연구원', period: '2013~현재', region: '진주', family: '해당 없음', specialty: ['도시재생', '공공주택', '재개발'] },
  '강태인': { school: '고려대학교', dept: '환경생태공학과', degree: '공학박사', advisor: '박기수 교수', company: '한국환경연구원', role: '연구위원', period: '2014~현재', region: '세종', family: '해당 없음', specialty: ['환경정책', '대기환경', '기후변화 대응'] },
  '류세진': { school: '서울대학교', dept: '환경대학원', degree: '환경학박사', advisor: '최영진 교수', company: '국토연구원', role: '연구위원', period: '2016~현재', region: '세종', family: '해당 없음', specialty: ['환경관리', '환경영향평가', '지속가능개발'] },
  '임재홍': { school: '서울대학교', dept: '경제학과', degree: '경제학박사', advisor: '이성호 교수', company: '한국개발연구원', role: '선임연구위원', period: '2010~현재', region: '세종', family: '해당 없음', specialty: ['경제정책', '공공재정', '정책평가'] },
  '신동욱': { school: '성균관대학교', dept: '행정학과', degree: '행정학박사', advisor: '강수환 교수', company: '경기연구원', role: '연구위원', period: '2017~현재', region: '수원', family: '해당 없음', specialty: ['재정분석', '지방재정', '예산정책'] },
  '노혜경': { school: '연세대학교', dept: '사회복지학과', degree: '사회복지학박사', advisor: '이미정 교수', company: '한국보건사회연구원', role: '연구위원', period: '2013~현재', region: '세종', family: '해당 없음', specialty: ['복지정책', '노인복지', '사회보장'] },
  '김재원': { school: '성균관대학교', dept: '사회복지학과', degree: '사회복지학박사', advisor: '박상훈 교수', company: '성균관대학교', role: '조교수', period: '2019~현재', region: '서울', family: '해당 없음', specialty: ['사회복지', '복지급여', '취약계층 지원'] },
  '조현석': { school: '고려대학교', dept: '에너지환경대학원', degree: '에너지공학박사', advisor: '장한술 교수', company: '에너지경제연구원', role: '선임연구위원', period: '2012~현재', region: '울산', family: '해당 없음', specialty: ['기후정책', '에너지전환', '탄소중립'] },
  '류재원': { school: '한양대학교', dept: '에너지공학과', degree: '공학박사', advisor: '최민규 교수', company: '한국환경연구원', role: '연구위원', period: '2015~현재', region: '세종', family: '해당 없음', specialty: ['에너지정책', '신재생에너지', '에너지효율'] },
  '박현수': { school: '서울대학교', dept: '전기공학부', degree: '공학박사', advisor: '이충훈 교수', company: '한국전자통신연구원', role: '책임연구원', period: '2011~현재', region: '대전', family: '해당 없음', specialty: ['스마트시티', 'IoT', '도시데이터 플랫폼'] },
  '김태우': { school: 'KAIST', dept: '도시공학과', degree: '공학박사', advisor: '홍석현 교수', company: '국토연구원', role: '부연구위원', period: '2018~현재', region: '세종', family: '해당 없음', specialty: ['도시정보', 'GIS', '스마트도시'] },
  '이수민': { school: '서울대학교', dept: '컴퓨터공학부', degree: '공학박사', advisor: '박준영 교수', company: '스마트도시연구원', role: '선임연구원', period: '2019~현재', region: '서울', family: '해당 없음', specialty: ['스마트시티', 'AI 분석', '데이터 거버넌스'] },
  '최영진': { school: '연세대학교', dept: '통계학과', degree: '통계학박사', advisor: '한영수 교수', company: '통계청', role: '통계연구관', period: '2009~현재', region: '대전', family: '해당 없음', specialty: ['데이터분석', '공식통계', '사회조사'] },
  '송민희': { school: '이화여자대학교', dept: '컴퓨터공학과', degree: '공학박사', advisor: '조현정 교수', company: '한국정보화진흥원', role: '수석연구원', period: '2014~현재', region: '서울', family: '해당 없음', specialty: ['빅데이터', '공공데이터', '디지털전환'] },
  '강수현': { school: '성균관대학교', dept: '경제학과', degree: '경제학박사', advisor: '김민재 교수', company: '한국은행 경기본부', role: '과장', period: '2014~현재', region: '수원', family: '해당 없음', specialty: ['지역경제', '거시경제 분석', '금융정책'] },
  '유재현': { school: '경기대학교', dept: '경영학과', degree: '경영학박사', advisor: '이상현 교수', company: '경기연구원', role: '연구위원', period: '2016~현재', region: '수원', family: '해당 없음', specialty: ['산업경제', '지역산업 육성', '중소기업 정책'] },
  '백승민': { school: '서울대학교', dept: '고고미술사학과', degree: '예술학박사', advisor: '박미리 교수', company: '한국문화관광연구원', role: '선임연구위원', period: '2013~현재', region: '서울', family: '해당 없음', specialty: ['문화정책', '관광정책', '문화유산 보전'] },
  '전혜진': { school: '성균관대학교', dept: '문화예술학과', degree: '문화학박사', advisor: '이혜원 교수', company: '경기문화재단', role: '연구위원', period: '2017~현재', region: '수원', family: '해당 없음', specialty: ['사회문화', '문화예술 지원', '지역문화 진흥'] },
};

// 전역 모듈 및 상태 관리 정의 (13개 지정 부서 및 채용 후보자 상태 통합)
const AppState = {
  currentPage: 'recruitment', // 'home', 'weekly-report', 'recruitment'
  files: [], // {id, file, name, size, type: 'pdf'|'hwp'|'hwpx', departmentName, status: 'ok'|'error', errors: []}
  departments: [
    { id: 1, name: '전략실', submitted: false, fileId: null },
    { id: 2, name: '인구사회연구실', submitted: false, fileId: null },
    { id: 3, name: '감사실', submitted: false, fileId: null },
    { id: 4, name: '산업통상연구실', submitted: false, fileId: null },
    { id: 5, name: '모빌리티연구실', submitted: false, fileId: null },
    { id: 6, name: '자치혁신연구실', submitted: false, fileId: null },
    { id: 7, name: '북부발전연구실', submitted: false, fileId: null },
    { id: 8, name: '행정지원실', submitted: false, fileId: null },
    { id: 9, name: '도시주택연구실', submitted: false, fileId: null },
    { id: 10, name: '경기의정연구센터', submitted: false, fileId: null },
    { id: 11, name: 'AI연구실', submitted: false, fileId: null },
    { id: 12, name: '연구기획', submitted: false, fileId: null },
    { id: 13, name: '기후환경에너지연구실', submitted: false, fileId: null }
  ],
  
  // 채용 후보자 데이터 상태 (AI 검증 시나리오 반영)
  candidates: [
    {
      id: 1, rawFileName: '250303_연구위원나급_교통계획및공학_홍길동',
      date: '250303', position: '연구위원나급', field: '교통계획및공학', name: '홍길동', isResearch: true,
      candidateProfile: { school: '연세대학교', dept: '교통공학과', company: '한국교통공사', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'warning', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'missing', note: '학위수여증명서 미첨부', subItems: [
            { name: '학위수여증명서', status: 'missing', note: '미첨부' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' },
            { name: '대표논문 2편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '도로및공항기술사 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '경기도 교통 네트워크 최적화 연구', journal: '대한교통학회지', year: 2023, authors: '홍길동, 이민수', status: 'ok' },
          { title: '자율주행 기반 도심 교통류 시뮬레이션', journal: 'Transport Research', year: 2022, authors: '홍길동', status: 'ok' }
        ]},
        blind: { status: 'warning', issues: [
          { type: '출신학교', excerpt: '"연세대학교 졸업 후 바로 연구소에..."', severity: 'high' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '강민철', affil: '한국교통연구원', field: '교통계획', conflict: false, score: 8.4 },
          { name: '이준호', affil: 'KAIST 건설환경공학과', field: '교통공학', conflict: false, score: 7.9 },
          { name: '박성은', affil: '서울시립대학교', field: '도시계획', conflict: false, score: 7.2 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 2, rawFileName: '250303_부연구위원나급_도시및지역계획_김민준',
      date: '250303', position: '부연구위원나급', field: '도시및지역계획', name: '김민준', isResearch: true,
      candidateProfile: { school: '서울대학교', dept: '도시공학과', company: '한국토지주택공사', region: '세종', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '도시계획기사 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'warning', items: [
          { title: '스마트시티 지표 개발 연구', journal: '국토연구', year: 2023, authors: '김민준 외 2인', status: 'ok' },
          { title: '수도권 주거입지 패턴 분석', journal: '도시설계학회지', year: 2021, authors: '김민준', status: 'unverified', note: '해당 호 목차에서 미확인' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '최현우', affil: '국토연구원', field: '도시계획', conflict: false, score: 8.1 },
          { name: '정수연', affil: '경기대학교 도시공학과', field: '지역계획', conflict: false, score: 7.5 },
          { name: '윤상혁', affil: '한국토지주택공사', field: '도시재생', conflict: false, score: 6.8 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 3, rawFileName: '250303_연구위원가급_환경정책_이서연',
      date: '250303', position: '연구위원가급', field: '환경정책', name: '이서연', isResearch: true,
      candidateProfile: { school: '서울대학교', dept: '환경대학원', company: '경기연구원', region: '수원', coAuthors: ['박기훈'] },
      verification: {
        documents: { status: 'mismatch', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'mismatch', note: '재직기간 불일치', subItems: [
            { name: '재직(경력)증명서', status: 'mismatch', note: '기재 36개월 → 증빙 29개월' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' },
            { name: '대표논문 2편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '환경기사 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'warning', items: [
          { title: '기후변화 대응 환경정책 효과 분석', journal: '환경정책', year: 2023, authors: '이서연, 김태호', status: 'ok' },
          { title: '탄소중립 이행 지방정부 역량 평가', journal: '한국환경정책학회보', year: 2022, authors: '박기훈, 이서연', status: 'warning', note: '공저 관계 확인 필요 (박기훈 — 현 경기연구원 재직)' }
        ]},
        blind: { status: 'warning', issues: [
          { type: '가족관계', excerpt: '"부친이 환경부 근무 경력으로..."', severity: 'medium' },
          { type: '지역정보', excerpt: '"경기도 수원 출신으로..."', severity: 'low' }
        ]},
        evaluator: { status: 'conflict', recommended: [
          { name: '박기훈', affil: '경기연구원', field: '환경정책', conflict: true, conflictReason: '논문 공저 관계', score: null },
          { name: '강태인', affil: '한국환경연구원', field: '환경정책', conflict: false, score: 7.6 },
          { name: '오민영', affil: '서울대학교 환경대학원', field: '기후변화', conflict: false, score: 8.0 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 4, rawFileName: '250303_전문연구원_경제분석_박준혁',
      date: '250303', position: '전문연구원', field: '경제분석', name: '박준혁', isResearch: false,
      candidateProfile: { school: '성균관대학교', dept: '경제학과', company: '기획재정부', region: '대전', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'na', note: '행정직 — 해당 없음', subItems: [] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '공인회계사 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: false, status: 'na', items: [] },
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '임재홍', affil: '한국개발연구원', field: '경제정책', conflict: false, score: 8.7 },
          { name: '신동욱', affil: '경기연구원', field: '재정분석', conflict: false, score: 7.3 },
          { name: '황지수', affil: '인천대학교 경제학과', field: '경제분석', conflict: false, score: 6.9 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '서류 이상 없음. 면접 진행 추천.'
    },
    {
      id: 5, rawFileName: '250303_부연구위원나급_복지정책_최수진',
      date: '250303', position: '부연구위원나급', field: '복지정책', name: '최수진', isResearch: true,
      candidateProfile: { school: '이화여자대학교', dept: '사회복지학과', company: '경기복지재단', region: '수원', coAuthors: [] },
      verification: {
        documents: { status: 'missing', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'missing', note: '사회복지사 자격증 사본 미첨부', subItems: [
            { name: '사회복지사 자격증 사본', status: 'missing', note: '미첨부' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '경기도 고령화 복지 인프라 현황 및 개선방안', journal: '사회복지연구', year: 2023, authors: '최수진', status: 'ok' }
        ]},
        blind: { status: 'warning', issues: [
          { type: '출신지역', excerpt: '"경기도 성남 토박이로서 지역 복지..."', severity: 'low' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '노혜경', affil: '한국보건사회연구원', field: '복지정책', conflict: false, score: 8.2 },
          { name: '김재원', affil: '성균관대학교 사회복지학과', field: '사회복지', conflict: false, score: 7.7 },
          { name: '이광민', affil: '경기복지재단', field: '복지행정', conflict: false, score: 6.5 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 6, rawFileName: '250303_부연구위원나급_기후에너지정책_윤지현',
      date: '250303', position: '부연구위원나급', field: '기후에너지정책', name: '윤지현', isResearch: true,
      candidateProfile: { school: '연세대학교', dept: '에너지공학과', company: '한국환경공단', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [{ name: '기본인적사항', status: 'ok', note: '' }, { name: '학력사항', status: 'ok', note: '' }, { name: '경력사항', status: 'ok', note: '' }, { name: '자기소개서', status: 'ok', note: '' }] },
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [{ name: '수집·이용 동의서', status: 'ok', note: '' }, { name: '제3자 제공 동의서', status: 'ok', note: '' }] },
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [{ name: '학위수여증명서', status: 'ok', note: '' }, { name: '성적증명서', status: 'ok', note: '' }] },
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [{ name: '재직(경력)증명서', status: 'ok', note: '' }, { name: '건강보험료납부확인서', status: 'ok', note: '' }] },
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [{ name: '연구실적목록', status: 'ok', note: '' }, { name: '대표논문 1편', status: 'ok', note: '' }] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [{ name: '에너지관리기사 사본', status: 'ok', note: '' }] }
        ]},
        paper: { applicable: true, status: 'ok', items: [{ title: '재생에너지 보급 정책의 지역 수용성 분석', journal: '에너지공학', year: 2023, authors: '윤지현', status: 'ok' }] },
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '조현석', affil: '에너지경제연구원', field: '기후정책', conflict: false, score: 8.6 },
          { name: '류재원', affil: '한국환경연구원', field: '에너지정책', conflict: false, score: 7.4 },
          { name: '정민아', affil: '서울대학교 환경대학원', field: '기후변화', conflict: false, score: 7.9 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 7, rawFileName: '250303_연구위원나급_스마트시티_장민서',
      date: '250303', position: '연구위원나급', field: '스마트시티', name: '장민서', isResearch: true,
      candidateProfile: { school: 'KAIST', dept: '도시공학과', company: 'NHN', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'warning', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [{ name: '기본인적사항', status: 'ok', note: '' }, { name: '학력사항', status: 'ok', note: '' }, { name: '경력사항', status: 'ok', note: '' }, { name: '자기소개서', status: 'ok', note: '' }] },
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [{ name: '수집·이용 동의서', status: 'ok', note: '' }, { name: '제3자 제공 동의서', status: 'ok', note: '' }] },
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [{ name: '학위수여증명서', status: 'ok', note: '' }, { name: '성적증명서', status: 'ok', note: '' }] },
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [{ name: '재직(경력)증명서', status: 'ok', note: '' }, { name: '건강보험료납부확인서', status: 'ok', note: '' }] },
          { id: 'research', name: '연구실적', status: 'missing', note: '연구실적목록 미첨부', subItems: [{ name: '연구실적목록', status: 'missing', note: '미첨부' }, { name: '대표논문 1편', status: 'ok', note: '' }] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [{ name: '정보처리기사 사본', status: 'ok', note: '' }] }
        ]},
        paper: { applicable: true, status: 'ok', items: [{ title: 'IoT 기반 도시 데이터 플랫폼 설계', journal: '스마트시티학회지', year: 2023, authors: '장민서, 김도현', status: 'ok' }] },
        blind: { status: 'warning', issues: [{ type: '출신학교', excerpt: '"KAIST 출신으로 AI 융합 연구에..."', severity: 'high' }] },
        evaluator: { status: 'ok', recommended: [
          { name: '박현수', affil: '한국전자통신연구원', field: '스마트시티', conflict: false, score: 9.1 },
          { name: '김태우', affil: '국토연구원', field: '도시정보', conflict: false, score: 8.3 },
          { name: '이수빈', affil: 'KAIST 도시공학과', conflict: true, conflictReason: '동일 출신 대학', score: null }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 8, rawFileName: '250303_전문연구원_데이터분석_한동훈',
      date: '250303', position: '전문연구원', field: '데이터분석', name: '한동훈', isResearch: false,
      candidateProfile: { school: '서울대학교', dept: '통계학과', company: 'LG CNS', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'mismatch', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [{ name: '기본인적사항', status: 'ok', note: '' }, { name: '학력사항', status: 'ok', note: '' }, { name: '경력사항', status: 'ok', note: '' }, { name: '자기소개서', status: 'ok', note: '' }] },
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [{ name: '수집·이용 동의서', status: 'ok', note: '' }, { name: '제3자 제공 동의서', status: 'ok', note: '' }] },
          { id: 'academic', name: '학력증명서', status: 'mismatch', note: '전공 불일치', subItems: [{ name: '학위수여증명서', status: 'mismatch', note: '기재: 통계학 → 증빙: 수학' }, { name: '성적증명서', status: 'ok', note: '' }] },
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [{ name: '재직(경력)증명서', status: 'ok', note: '' }, { name: '건강보험료납부확인서', status: 'ok', note: '' }] },
          { id: 'research', name: '연구실적', status: 'na', note: '행정직 — 해당 없음', subItems: [] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [{ name: '데이터분석준전문가 사본', status: 'ok', note: '' }] }
        ]},
        paper: { applicable: false, status: 'na', items: [] },
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '최영진', affil: '통계청', field: '데이터분석', conflict: false, score: 7.8 },
          { name: '송민희', affil: '한국정보화진흥원', field: '빅데이터', conflict: false, score: 8.2 },
          { name: '권대웅', affil: '경기연구원', field: '데이터정책', conflict: false, score: 6.7 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '전공 불일치 확인 후 면접에서 소명 필요.'
    },
    {
      id: 9, rawFileName: '250303_부연구위원나급_지역경제_오수아',
      date: '250303', position: '부연구위원나급', field: '지역경제', name: '오수아', isResearch: true,
      candidateProfile: { school: '고려대학교', dept: '경제학과', company: '경기연구원', region: '수원', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [{ name: '기본인적사항', status: 'ok', note: '' }, { name: '학력사항', status: 'ok', note: '' }, { name: '경력사항', status: 'ok', note: '' }, { name: '자기소개서', status: 'ok', note: '' }] },
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [{ name: '수집·이용 동의서', status: 'ok', note: '' }, { name: '제3자 제공 동의서', status: 'ok', note: '' }] },
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [{ name: '학위수여증명서', status: 'ok', note: '' }, { name: '성적증명서', status: 'ok', note: '' }] },
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [{ name: '재직(경력)증명서', status: 'ok', note: '' }, { name: '건강보험료납부확인서', status: 'ok', note: '' }] },
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [{ name: '연구실적목록', status: 'ok', note: '' }, { name: '대표논문 1편', status: 'ok', note: '' }] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [{ name: '경제학사 자격 사본', status: 'ok', note: '' }] }
        ]},
        paper: { applicable: true, status: 'warning', items: [
          { title: '수도권 역외유출 산업 재편 전략', journal: '지역경제연구', year: 2023, authors: '오수아', status: 'ok' },
          { title: '경기북부 산업클러스터 효과 분석', journal: '한국지역학회지', year: 2022, authors: '오수아, 박민준', status: 'unverified', note: '게재 여부 확인 중' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '강수현', affil: '한국은행 경기본부', field: '지역경제', conflict: false, score: 8.5 },
          { name: '유재현', affil: '경기연구원', field: '산업경제', conflict: false, score: 7.6 },
          { name: '문성식', affil: '인하대학교 경제학과', field: '지역개발', conflict: false, score: 7.1 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 10, rawFileName: '250303_연구위원가급_사회문화정책_임채원',
      date: '250303', position: '연구위원가급', field: '사회문화정책', name: '임채원', isResearch: true,
      candidateProfile: { school: '성균관대학교', dept: '문화예술학과', company: '경기문화재단', region: '수원', coAuthors: [] },
      verification: {
        documents: { status: 'missing', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [{ name: '기본인적사항', status: 'ok', note: '' }, { name: '학력사항', status: 'ok', note: '' }, { name: '경력사항', status: 'ok', note: '' }, { name: '자기소개서', status: 'ok', note: '' }] },
          { id: 'privacy', name: '개인정보동의서', status: 'missing', note: '동의서 미첨부', subItems: [{ name: '수집·이용 동의서', status: 'missing', note: '미첨부' }, { name: '제3자 제공 동의서', status: 'missing', note: '미첨부' }] },
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [{ name: '학위수여증명서', status: 'ok', note: '' }, { name: '성적증명서', status: 'ok', note: '' }] },
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [{ name: '재직(경력)증명서', status: 'ok', note: '' }, { name: '건강보험료납부확인서', status: 'ok', note: '' }] },
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [{ name: '연구실적목록', status: 'ok', note: '' }, { name: '대표논문 1편', status: 'ok', note: '' }, { name: '대표논문 2편', status: 'ok', note: '' }] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [{ name: '문화예술교육사 사본', status: 'ok', note: '' }] }
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '경기도 문화다양성 정책 효과 연구', journal: '문화정책논총', year: 2023, authors: '임채원', status: 'ok' },
          { title: '지역 문화재단 운영 성과 평가 지표 개발', journal: '한국문화행정학회보', year: 2022, authors: '임채원, 서지민', status: 'ok' }
        ]},
        blind: { status: 'warning', issues: [{ type: '성별유추', excerpt: '"여성 연구자로서 젠더 관점을..."', severity: 'medium' }] },
        evaluator: { status: 'ok', recommended: [
          { name: '백승민', affil: '한국문화관광연구원', field: '문화정책', conflict: false, score: 8.8 },
          { name: '전혜진', affil: '경기문화재단', field: '사회문화', conflict: false, score: 8.0 },
          { name: '손재민', affil: '중앙대학교 문화콘텐츠학과', field: '문화정책', conflict: false, score: 7.3 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 11, rawFileName: '250303_연구위원나급_교통계획_정재현',
      date: '250303', position: '연구위원나급', field: '교통계획', name: '정재현', isResearch: true,
      candidateProfile: { school: '한양대학교', dept: '교통공학과', company: '한국교통안전공단', region: '수원', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '경기도 간선급행버스 노선 최적화 연구', journal: '대한교통학회지', year: 2023, authors: '정재현', status: 'ok' }
        ]},
        blind: { status: 'warning', issues: [
          { type: '출신학교', excerpt: '"한양대학교 교통공학과 재학 시절부터..."', severity: 'high' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '강민철', affil: '한국교통연구원', field: '교통계획', conflict: false, score: 8.1 },
          { name: '이준호', affil: 'KAIST 건설환경공학과', field: '교통공학', conflict: false, score: 7.6 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 12, rawFileName: '250303_연구위원가급_주거정책_남궁혜린',
      date: '250303', position: '연구위원가급', field: '주거정책', name: '남궁혜린', isResearch: true,
      candidateProfile: { school: '서울대학교', dept: '도시공학과', company: '국토연구원', region: '세종', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '수도권 공공임대주택 정책 효과 분석', journal: '국토연구', year: 2023, authors: '남궁혜린', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '최현우', affil: '국토연구원', field: '도시계획', conflict: false, score: 8.5 },
          { name: '윤상혁', affil: '한국토지주택공사', field: '주거정책', conflict: false, score: 7.9 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '서류 전체 이상 없음. 면접 진행 추천.'
    },
    {
      id: 13, rawFileName: '250303_부연구위원나급_복지정책_손태양',
      date: '250303', position: '부연구위원나급', field: '복지정책', name: '손태양', isResearch: true,
      candidateProfile: { school: '연세대학교', dept: '사회복지학과', company: '한국보건사회연구원', region: '세종', coAuthors: [] },
      verification: {
        documents: { status: 'missing', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'missing', note: '성적증명서 미첨부', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'missing', note: '미첨부' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '경기도 기초생활보장 수급자 실태 및 지원방안', journal: '사회복지연구', year: 2023, authors: '손태양', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '노혜경', affil: '한국보건사회연구원', field: '복지정책', conflict: false, score: 7.8 },
          { name: '김재원', affil: '성균관대학교 사회복지학과', field: '사회복지', conflict: false, score: 7.2 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 14, rawFileName: '250303_전문연구원_문화정책_백지유',
      date: '250303', position: '전문연구원', field: '문화정책', name: '백지유', isResearch: false,
      candidateProfile: { school: '이화여자대학교', dept: '문화예술학과', company: '경기문화재단', region: '수원', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'na', note: '행정직 — 해당 없음', subItems: [] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: false, status: 'na', items: [] },
        blind: { status: 'warning', issues: [
          { type: '출신지역', excerpt: '"경기도 수원에서 태어나 문화 기획자로..."', severity: 'low' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '백승민', affil: '한국문화관광연구원', field: '문화정책', conflict: false, score: 8.0 },
          { name: '전혜진', affil: '경기문화재단', field: '사회문화', conflict: false, score: 7.4 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '서류 이상 없음. 면접 진행 추천.'
    },
    {
      id: 15, rawFileName: '250303_연구위원나급_경제정책_류민호',
      date: '250303', position: '연구위원나급', field: '경제정책', name: '류민호', isResearch: true,
      candidateProfile: { school: '고려대학교', dept: '경제학과', company: '한국개발연구원', region: '세종', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '지역 산업정책의 경제적 파급효과 분석', journal: '경제학연구', year: 2023, authors: '류민호', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '임재홍', affil: '한국개발연구원', field: '경제정책', conflict: false, score: 8.3 },
          { name: '강수현', affil: '한국은행 경기본부', field: '지역경제', conflict: false, score: 7.7 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 16, rawFileName: '250303_부연구위원나급_환경정책_신예은',
      date: '250303', position: '부연구위원나급', field: '환경정책', name: '신예은', isResearch: true,
      candidateProfile: { school: '성균관대학교', dept: '환경공학부', company: '한국환경연구원', region: '세종', coAuthors: ['최재영'] },
      verification: {
        documents: { status: 'mismatch', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'mismatch', note: '경력기간 불일치', subItems: [
            { name: '재직(경력)증명서', status: 'mismatch', note: '기재 48개월 → 증빙 41개월' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'warning', items: [
          { title: '경기도 미세먼지 저감 정책 실효성 평가', journal: '환경정책', year: 2023, authors: '신예은, 최재영', status: 'warning', note: '공저 관계 확인 필요 (최재영 — 현 한국환경연구원 재직)' }
        ]},
        blind: { status: 'warning', issues: [
          { type: '출신학교', excerpt: '"성균관대학교 환경공학부 수석 졸업..."', severity: 'high' },
          { type: '가족관계', excerpt: '"모친이 환경부 산하기관 근무 중..."', severity: 'medium' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '강태인', affil: '한국환경연구원', field: '환경정책', conflict: false, score: 7.9 },
          { name: '류재원', affil: '한국환경연구원', field: '에너지정책', conflict: false, score: 7.5 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 17, rawFileName: '250303_연구위원가급_도시재생_황준성',
      date: '250303', position: '연구위원가급', field: '도시재생', name: '황준성', isResearch: true,
      candidateProfile: { school: '서울시립대학교', dept: '도시공학과', company: '한국토지주택공사', region: '진주', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '구도심 도시재생뉴딜사업 성과평가 연구', journal: '국토계획', year: 2023, authors: '황준성', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '박성은', affil: '서울시립대학교 도시공학과', field: '도시재생', conflict: false, score: 8.6 },
          { name: '윤상혁', affil: '한국토지주택공사', field: '도시재생', conflict: false, score: 8.0 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '서류 전체 이상 없음. 면접 진행 추천.'
    },
    {
      id: 18, rawFileName: '250303_전문연구원_데이터분석_강나리',
      date: '250303', position: '전문연구원', field: '데이터분석', name: '강나리', isResearch: false,
      candidateProfile: { school: 'KAIST', dept: '전산학부', company: '카카오엔터프라이즈', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'na', note: '행정직 — 해당 없음', subItems: [] },
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: false, status: 'na', items: [] },
        blind: { status: 'warning', issues: [
          { type: '출신학교', excerpt: '"KAIST 전산학부 출신으로 AI 분석..."', severity: 'high' }
        ]},
        evaluator: { status: 'ok', recommended: [
          { name: '최영진', affil: '통계청', field: '데이터분석', conflict: false, score: 8.4 },
          { name: '송민희', affil: '한국정보화진흥원', field: '빅데이터', conflict: false, score: 8.0 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 19, rawFileName: '250303_부연구위원나급_기후변화_조현아',
      date: '250303', position: '부연구위원나급', field: '기후변화', name: '조현아', isResearch: true,
      candidateProfile: { school: '서울대학교', dept: '환경대학원', company: '에너지경제연구원', region: '울산', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '탄소중립 시나리오별 지역 경제영향 분석', journal: '에너지경제연구', year: 2023, authors: '조현아', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '조현석', affil: '에너지경제연구원', field: '기후정책', conflict: false, score: 8.7 },
          { name: '강태인', affil: '한국환경연구원', field: '환경정책', conflict: false, score: 8.1 }
        ]}
      },
      reviewStatus: 'pending', reviewNote: ''
    },
    {
      id: 20, rawFileName: '250303_연구위원나급_사회정책_문지훈',
      date: '250303', position: '연구위원나급', field: '사회정책', name: '문지훈', isResearch: true,
      candidateProfile: { school: '성균관대학교', dept: '행정학과', company: '한국행정연구원', region: '서울', coAuthors: [] },
      verification: {
        documents: { status: 'ok', categories: [
          { id: 'application', name: '입사지원서', status: 'ok', note: '', subItems: [
            { name: '기본인적사항', status: 'ok', note: '' },
            { name: '학력사항', status: 'ok', note: '' },
            { name: '경력사항', status: 'ok', note: '' },
            { name: '자기소개서', status: 'ok', note: '' }
          ]},
          { id: 'privacy', name: '개인정보동의서', status: 'ok', note: '', subItems: [
            { name: '수집·이용 동의서', status: 'ok', note: '' },
            { name: '제3자 제공 동의서', status: 'ok', note: '' }
          ]},
          { id: 'academic', name: '학력증명서', status: 'ok', note: '', subItems: [
            { name: '학위수여증명서', status: 'ok', note: '' },
            { name: '성적증명서', status: 'ok', note: '' }
          ]},
          { id: 'career', name: '경력증명서', status: 'ok', note: '', subItems: [
            { name: '재직(경력)증명서', status: 'ok', note: '' },
            { name: '건강보험료납부확인서', status: 'ok', note: '' }
          ]},
          { id: 'research', name: '연구실적', status: 'ok', note: '', subItems: [
            { name: '연구실적목록', status: 'ok', note: '' },
            { name: '대표논문 1편', status: 'ok', note: '' }
          ]},
          { id: 'license', name: '자격증', status: 'ok', note: '', subItems: [
            { name: '관련자격증 사본', status: 'ok', note: '' }
          ]}
        ]},
        paper: { applicable: true, status: 'ok', items: [
          { title: '사회정책 거버넌스 구조 개선방안 연구', journal: '한국행정학보', year: 2023, authors: '문지훈', status: 'ok' }
        ]},
        blind: { status: 'ok', issues: [] },
        evaluator: { status: 'ok', recommended: [
          { name: '신동욱', affil: '경기연구원', field: '행정정책', conflict: false, score: 8.2 },
          { name: '임재홍', affil: '한국개발연구원', field: '경제정책', conflict: false, score: 7.6 }
        ]}
      },
      reviewStatus: 'completed', reviewNote: '서류 전체 이상 없음. 면접 진행 추천.'
    }
  ],

  sessions: [], // 1차 ~ 23차 데이터
  currentSession: 23,
  mergedPdfBytes: null,
  previewPdfDocument: null,
  currentPreviewPage: 1,
  totalPreviewPages: 1,
  previewZoom: 1.0,

  isFileListCollapsed: false,
  isDeptPopupOpen: false,
  nextDeptId: 14,
};

// ==========================================================================
// 1. 라우터 모듈 (Router)
// ==========================================================================
const Router = {
  init() {
    this.navigate(AppState.currentPage);
  },

  navigate(pageId) {
    AppState.currentPage = pageId;

    const navItems = document.querySelectorAll('#navMenu .nav-item');
    navItems.forEach(item => {
      item.classList.toggle('nav-item--active', item.getAttribute('data-page') === pageId);
    });

    const pages = {
      'home': { el: document.getElementById('page-home'), display: 'block' },
      'weekly-report': { el: document.getElementById('page-weekly-report'), display: 'flex' },
      'recruitment': { el: document.getElementById('page-recruitment'), display: 'flex' }
    };
    Object.entries(pages).forEach(([key, { el, display }]) => {
      if (el) el.style.display = key === pageId ? display : 'none';
    });

    // 세션 사이드바는 주간보고 취합 페이지에서만 표시
    const sidebar = document.getElementById('sessionSidebar');
    if (sidebar) sidebar.style.display = pageId === 'weekly-report' ? 'flex' : 'none';

    if (pageId === 'weekly-report') {
      UploadModule.renderFileList();
      DeptModule.renderDeptStatus();
    } else if (pageId === 'recruitment') {
      RecruitModule.init();
    }

    const labels = { home: '홈', 'weekly-report': '주간보고 취합', recruitment: '채용검증' };
    showToast('info', '화면 전환', `[${labels[pageId]}] 화면으로 이동했습니다.`);
  }
};

// ==========================================================================
// 2. 파일 업로드 모듈 (UploadModule)
// ==========================================================================
const UploadModule = {
  init() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    if (!uploadZone || !fileInput) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.add('upload-zone--dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadZone.classList.remove('upload-zone--dragover');
      }, false);
    });

    uploadZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        this.handleFiles(files);
      }
    }, false);

    fileInput.addEventListener('change', (e) => {
      if (fileInput.files.length > 0) {
        this.handleFiles(fileInput.files);
        fileInput.value = '';
      }
    });
  },

  async handleFiles(fileList) {
    const newFiles = Array.from(fileList);
    let added = 0;
    for (const file of newFiles) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'hwp', 'hwpx'].includes(ext)) {
        ModalModule.showModal('format_error', { fileName: file.name });
        return;
      }
      const maxSizeBytes = 50 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        ModalModule.showModal('size_error', { fileName: file.name });
        return;
      }
      const deptName = await this.analyzeFileContentAndName(file);
      this.addFileToState(file, deptName, ext);
      added++;
    }
    this.renderFileList();
    DeptModule.renderDeptStatus();
    if (added > 0) showToast('success', '업로드 완료', `${added}개 파일이 추가되었습니다.`);
  },

  async analyzeFileContentAndName(file) {
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    
    for (const dept of AppState.departments) {
      if (cleanName.includes(dept.name)) {
        return dept.name;
      }
    }

    const mockContentKeywords = {
      '전략': '전략실',
      '인구': '인구사회연구실',
      '감사': '감사실',
      '산업': '산업통상연구실',
      '모빌리티': '모빌리티연구실',
      '교통': '모빌리티연구실',
      '자치': '자치혁신연구실',
      '북부': '북부발전연구실',
      '지원': '행정지원실',
      '도시': '도시주택연구실',
      '주택': '도시주택연구실',
      '의정': '경기의정연구센터',
      'AI': 'AI연구실',
      '인공지능': 'AI연구실',
      '기획': '연구기획',
      '기후': '기후환경에너지연구실',
      '환경': '기후환경에너지연구실'
    };

    for (const [key, value] of Object.entries(mockContentKeywords)) {
      if (cleanName.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return null;
  },

  addFileToState(file, departmentName, ext) {
    const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    AppState.files.push({
      id: fileId,
      file: file,
      name: file.name,
      size: file.size,
      type: ext,
      departmentName: departmentName,
      status: 'ok',
      errors: [],
      uploadedAt: new Date().toISOString(),
      replacedAt: null
    });

    const dept = AppState.departments.find(d => d.name === departmentName);
    if (dept) {
      dept.submitted = true;
      dept.fileId = fileId;
    }

    this.saveFilesToLocalStorage();
  },

  replaceFile(file, departmentName) {
    const oldFileIndex = AppState.files.findIndex(f => f.departmentName === departmentName);
    if (oldFileIndex > -1) {
      AppState.files.splice(oldFileIndex, 1);
    }

    const ext = file.name.split('.').pop().toLowerCase();
    this.addFileToState(file, departmentName, ext);

    // 교체 시각 별도 기록
    const newFile = AppState.files.find(f => f.departmentName === departmentName);
    if (newFile) newFile.replacedAt = new Date().toISOString();

    this.renderFileList();
    DeptModule.renderDeptStatus();
    showToast('success', '파일 교체 완료', `[${departmentName}] 파일이 교체되었습니다.`);
  },

  removeFile(fileId) {
    const fileIndex = AppState.files.findIndex(f => f.id === fileId);
    if (fileIndex > -1) {
      const deptName = AppState.files[fileIndex].departmentName;
      AppState.files.splice(fileIndex, 1);

      const dept = AppState.departments.find(d => d.name === deptName);
      if (dept) {
        dept.submitted = false;
        dept.fileId = null;
      }

      this.saveFilesToLocalStorage();
      this.renderFileList();
      DeptModule.renderDeptStatus();
      showToast('warning', '파일 삭제', `부서 [${deptName}]의 파일이 삭제되었습니다.`);
    }
  },

  handleDeptUpload(files, deptId) {
    if (!files || files.length === 0) return;
    const file = files[0];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'hwp', 'hwpx'].includes(ext)) {
      ModalModule.showModal('format_error', { fileName: file.name });
      return;
    }
    const dept = AppState.departments.find(d => d.id === deptId);
    if (!dept) return;
    if (dept.submitted && dept.fileId) {
      const oldFile = AppState.files.find(f => f.id === dept.fileId);
      if (oldFile) {
        AppState.files = AppState.files.filter(f => f.id !== dept.fileId);
        dept.submitted = false;
        dept.fileId = null;
      }
    }
    this.addFileToState(file, dept.name, ext);
  },

  clearAllFiles() {
    if (AppState.files.length === 0) return;

    if (confirm('등록된 모든 주간보고 파일을 일괄 삭제하시겠습니까?')) {
      AppState.files = [];
      AppState.departments.forEach(dept => {
        dept.submitted = false;
        dept.fileId = null;
      });

      this.saveFilesToLocalStorage();
      this.renderFileList();
      DeptModule.renderDeptStatus();
      showToast('error', '전체 파일 제거', '모든 제출 파일이 일괄 제거되었습니다.');
    }
  },

  reassignDepartment(fileId, newDeptName) {
    const fileData = AppState.files.find(f => f.id === fileId);
    if (!fileData) return;

    const oldDeptName = fileData.departmentName;
    if (oldDeptName === newDeptName) return;

    const conflict = AppState.files.find(f => f.departmentName === newDeptName && f.id !== fileId);
    if (conflict) {
      showToast('error', '부서 재지정 불가', `이미 [${newDeptName}] 부서의 파일이 존재합니다.`);
      this.renderFileList();
      return;
    }

    const oldDept = AppState.departments.find(d => d.name === oldDeptName);
    if (oldDept) {
      oldDept.submitted = false;
      oldDept.fileId = null;
    }

    const newDept = AppState.departments.find(d => d.name === newDeptName);
    if (newDept) {
      newDept.submitted = true;
      newDept.fileId = fileId;
    }

    fileData.departmentName = newDeptName;
    this.saveFilesToLocalStorage();
    
    DeptModule.renderDeptStatus();
    this.renderFileList();
    showToast('success', '부서 수동 재지정', `파일의 연결 부서가 [${newDeptName}](으)로 변경되었습니다.`);
  },

  downloadFile(fileId) {
    const fileData = AppState.files.find(f => f.id === fileId);
    if (!fileData) return;

    const blob = fileData.file.size > 0 ? fileData.file : new Blob(["가상 문서 구조"], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileData.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('success', '다운로드 완료', `부서 파일 [${fileData.name}] 다운로드가 시작되었습니다.`);
  },

  _dragSrcIdx: null,

  renderFileList() {
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const section = document.getElementById('wrFileListSection');

    if (!fileList) return;
    if (fileCount) fileCount.innerText = `${AppState.files.length}개`;
    if (section) section.style.display = AppState.files.length > 0 ? 'block' : 'none';

    fileList.innerHTML = '';

    AppState.files.forEach((fileData, idx) => {
      const sizeStr = formatFileSize(fileData.size);
      const row = document.createElement('div');
      row.className = 'wr-file-row';
      row.draggable = true;
      row.dataset.idx = idx;
      row.innerHTML = `
        <div class="wr-file-handle" title="드래그하여 순서 변경">
          <i data-lucide="grip-vertical" style="width:14px;height:14px"></i>
        </div>
        <div class="wr-file-order">${idx + 1}</div>
        <div class="wr-file-type-badge wr-file-type--${fileData.type}">${fileData.type.toUpperCase()}</div>
        <div class="wr-file-info">
          <span class="wr-file-name" title="${fileData.name}">${fileData.name}</span>
          <span class="wr-file-size">${sizeStr}</span>
        </div>
        <button class="wr-file-btn" onclick="UploadModule.removeFile('${fileData.id}')" title="삭제">
          <i data-lucide="x" style="width:13px;height:13px"></i>
        </button>
      `;

      row.addEventListener('dragstart', e => {
        this._dragSrcIdx = idx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => row.classList.add('wr-file-row--dragging'), 0);
      });
      row.addEventListener('dragend', () => {
        row.classList.remove('wr-file-row--dragging');
        fileList.querySelectorAll('.wr-file-row--over').forEach(r => r.classList.remove('wr-file-row--over'));
      });
      row.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        fileList.querySelectorAll('.wr-file-row--over').forEach(r => r.classList.remove('wr-file-row--over'));
        if (this._dragSrcIdx !== idx) row.classList.add('wr-file-row--over');
      });
      row.addEventListener('drop', e => {
        e.preventDefault();
        if (this._dragSrcIdx === null || this._dragSrcIdx === idx) return;
        const moved = AppState.files.splice(this._dragSrcIdx, 1)[0];
        AppState.files.splice(idx, 0, moved);
        this.saveFilesToLocalStorage();
        this.renderFileList();
      });

      fileList.appendChild(row);
    });

    lucide.createIcons();
  },

  toggleFileList() {
    const fileListWrapper = document.getElementById('fileListWrapper');
    if (!fileListWrapper) return;
    
    fileListWrapper.classList.toggle('file-list-wrapper--collapsed');
  },

  saveFilesToLocalStorage() {
    const fileMeta = AppState.files.map(f => ({
      id: f.id,
      name: f.name,
      size: f.size,
      type: f.type,
      departmentName: f.departmentName,
      status: f.status
    }));
    localStorage.setItem('gri_uploaded_files_meta', JSON.stringify(fileMeta));
  }
};

// ==========================================================================
// 3. 부서 관리 모듈 (DeptModule)
// ==========================================================================
const DeptModule = {
  // 기존 팝업 방식 제거 — 인라인 패널로 통합
  openPopup() { /* no-op: dept panel is always visible inline */ },
  closePopup() { /* no-op */ },

  renderDeptStatus() {
    const totalDepts = AppState.departments.length;
    const submittedCount = AppState.departments.filter(d => d.submitted).length;
    const missingCount = totalDepts - submittedCount;
    const pct = totalDepts > 0 ? Math.round((submittedCount / totalDepts) * 100) : 0;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('deptSubmittedCount', submittedCount);
    set('deptMissingCount', missingCount);
    set('deptTotalCount', totalDepts);
    set('statPendingDepts', missingCount);
    set('statTotalDepts', totalDepts);

    const fill = document.getElementById('deptProgressFill');
    if (fill) fill.style.width = `${pct}%`;

    const hasFiles = AppState.files.length > 0;
    const circles = document.getElementById('wrStatCircles');
    if (circles) circles.style.display = hasFiles ? 'flex' : 'none';
    const deptListEl = document.getElementById('deptList');
    if (deptListEl) deptListEl.style.display = hasFiles ? 'grid' : 'none';
    const previewBtn = document.getElementById('previewOpenBtn');
    if (previewBtn) previewBtn.disabled = !hasFiles;

    this.renderDeptList();
  },

  _dragSrcIdx: null,

  renderDeptList() {
    const deptList = document.getElementById('deptList');
    if (!deptList) return;
    deptList.innerHTML = '';

    AppState.departments.forEach((dept, idx) => {
      const matchedFile = AppState.files.find(f => f.id === dept.fileId);
      const card = document.createElement('div');
      card.className = `dept-card ${dept.submitted ? 'dept-card--submitted' : 'dept-card--missing'}`;
      card.draggable = true;
      card.dataset.idx = idx;

      let bodyHtml = '';
      if (dept.submitted && matchedFile) {
        bodyHtml = `
          <div class="dept-card-file" title="${matchedFile.name}">${matchedFile.name}</div>
          <div class="dept-card-time">${formatUploadTime(matchedFile.uploadedAt)}</div>
          <div class="dept-card-actions">
            <button class="dept-card-action-btn dept-card-action-btn--del" title="파일 삭제" onclick="UploadModule.removeFile('${dept.fileId}')">
              <i data-lucide="trash-2" style="width:12px;height:12px"></i>
            </button>
          </div>
        `;
      } else {
        bodyHtml = `
          <label class="dept-card-upload-btn">
            <i data-lucide="plus" style="width:12px;height:12px"></i>
            <input type="file" accept=".pdf,.hwp,.hwpx" hidden onchange="UploadModule.handleDeptUpload(this.files,${dept.id})">
          </label>
        `;
      }

      card.innerHTML = `
        <div class="dept-card-top">
          <div class="dept-card-drag-handle" title="드래그하여 순서 변경">
            <i data-lucide="grip-vertical" style="width:13px;height:13px"></i>
          </div>
          <span class="dept-card-order">${idx + 1}</span>
          <span class="dept-card-name" title="${dept.name}">${dept.name}</span>
        </div>
        ${bodyHtml}
      `;

      card.addEventListener('dragstart', e => {
        DeptModule._dragSrcIdx = idx;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => card.classList.add('dept-card--dragging'), 0);
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dept-card--dragging');
        deptList.querySelectorAll('.dept-card--over').forEach(c => c.classList.remove('dept-card--over'));
      });
      card.addEventListener('dragover', e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        deptList.querySelectorAll('.dept-card--over').forEach(c => c.classList.remove('dept-card--over'));
        if (DeptModule._dragSrcIdx !== idx) card.classList.add('dept-card--over');
      });
      card.addEventListener('drop', e => {
        e.preventDefault();
        const src = DeptModule._dragSrcIdx;
        if (src === null || src === idx) return;
        const moved = AppState.departments.splice(src, 1)[0];
        AppState.departments.splice(idx, 0, moved);
        DeptModule.renderDeptList();
      });

      deptList.appendChild(card);
    });

    lucide.createIcons();
  },

  addDepartment() {
    const deptList = document.getElementById('deptList');
    if (!deptList) return;

    if (document.getElementById('deptAddForm')) return;

    const addForm = document.createElement('div');
    addForm.className = 'dept-add-form animate-in';
    addForm.id = 'deptAddForm';
    addForm.innerHTML = `
      <input type="text" class="dept-add-input" id="newDeptNameInput" placeholder="부서명을 입력하세요 (예: 전략기획실)" focus>
      <div class="dept-add-form-actions">
        <button class="btn btn--sm btn--secondary" onclick="DeptModule.cancelAdd()">취소</button>
        <button class="btn btn--sm btn--primary" onclick="DeptModule.saveNewDepartment()">추가</button>
      </div>
    `;

    deptList.appendChild(addForm);
    document.getElementById('newDeptNameInput').focus();
  },

  cancelAdd() {
    const form = document.getElementById('deptAddForm');
    if (form) form.remove();
  },

  saveNewDepartment() {
    const input = document.getElementById('newDeptNameInput');
    if (!input) return;

    const name = input.value.trim();
    if (!name) {
      showToast('error', '부서 등록 실패', '부서명을 입력해주세요.');
      return;
    }

    if (AppState.departments.some(d => d.name === name)) {
      showToast('error', '부서 중복', '이미 존재하는 부서명입니다.');
      return;
    }

    const newDept = {
      id: AppState.nextDeptId++,
      name: name,
      submitted: false,
      fileId: null
    };

    AppState.departments.push(newDept);
    this.cancelAdd();
    this.renderDeptList();
    this.renderDeptStatus();
    showToast('success', '부서 추가 완료', `신규 부서 [${name}]가 추가되어 넘버링되었습니다.`);
  },

  editDepartment(deptId) {
    const dept = AppState.departments.find(d => d.id === deptId);
    if (!dept) return;

    const newName = prompt('수정할 부서명을 입력하세요:', dept.name);
    if (newName === null) return;

    const cleanNewName = newName.trim();
    if (!cleanNewName) {
      showToast('error', '부서 수정 실패', '부서명이 공백일 수 없습니다.');
      return;
    }

    if (AppState.departments.some(d => d.name === cleanNewName && d.id !== deptId)) {
      showToast('error', '부서 중복', '이미 존재하는 부서명입니다.');
      return;
    }

    const oldName = dept.name;
    dept.name = cleanNewName;

    AppState.files.forEach(file => {
      if (file.departmentName === oldName) {
        file.departmentName = cleanNewName;
      }
    });

    this.renderDeptList();
    UploadModule.renderFileList();
    showToast('success', '부서명 수정', `부서명이 [${oldName}]에서 [${cleanNewName}]으로 변경되었습니다.`);
  },

  deleteDepartment(deptId) {
    const dept = AppState.departments.find(d => d.id === deptId);
    if (!dept) return;

    ModalModule.showModal('delete_confirm', {
      deptId: deptId,
      deptName: dept.name
    });
  },

  confirmDelete(deptId) {
    const deptIndex = AppState.departments.findIndex(d => d.id === deptId);
    if (deptIndex > -1) {
      const deptName = AppState.departments[deptIndex].name;
      const fileId = AppState.departments[deptIndex].fileId;

      AppState.departments.splice(deptIndex, 1);

      if (fileId) {
        const fileIndex = AppState.files.findIndex(f => f.id === fileId);
        if (fileIndex > -1) {
          AppState.files.splice(fileIndex, 1);
        }
      }

      this.renderDeptList();
      this.renderDeptStatus();
      UploadModule.renderFileList();
      showToast('warning', '부서 삭제 완료', `부서 [${deptName}]가 삭제되었습니다.`);
    }
  }
};

// ==========================================================================
// 4. PDF 병합 모듈 (MergerModule)
// ==========================================================================
const MergerModule = {
  async merge() {
    if (AppState.files.length === 0) {
      ModalModule.showModal('no_files');
      return;
    }
    await this.executeMerge();
    if (AppState.mergedPdfBytes) {
      ModalModule.showModal('merge_complete');
    }
  },

  async executeMerge() {
    document.getElementById('globalLoading').style.display = 'flex';
    document.getElementById('globalLoadingText').innerText = '부서별 주간보고 자료를 추출 및 통합하여 HWP 포맷을 연계 변환 중...';
    document.getElementById('globalProgressBar').style.display = 'block';
    
    const progressFill = document.getElementById('globalProgressFill');
    progressFill.style.width = '0%';

    try {
      for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 15));
        progressFill.style.width = `${i}%`;
      }

      const mergedPdf = await PDFLib.PDFDocument.create();

      // dept 순서대로 파일 정렬
      const orderedFiles = AppState.departments
        .filter(d => d.submitted && d.fileId)
        .map(d => AppState.files.find(f => f.id === d.fileId))
        .filter(Boolean);
      // dept 미매핑 파일은 뒤에 추가
      const unmapped = AppState.files.filter(f => !AppState.departments.some(d => d.fileId === f.id));
      const filesToMerge = [...orderedFiles, ...unmapped];

      for (let i = 0; i < filesToMerge.length; i++) {
        const fileData = filesToMerge[i];
        progressFill.style.width = `${40 + Math.round((i / filesToMerge.length) * 40)}%`;

        if (fileData.type === 'pdf') {
          const arrayBuffer = await fileData.file.arrayBuffer();
          const srcPdf = await PDFLib.PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(srcPdf, srcPdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        } else {
          const dummyPage = mergedPdf.addPage([595.276, 841.89]);
        }
      }

      if (mergedPdf.getPageCount() === 0) {
        mergedPdf.addPage([595.276, 841.89]);
      }

      progressFill.style.width = '95%';
      
      const mergedPdfBytes = await mergedPdf.save();
      AppState.mergedPdfBytes = mergedPdfBytes;

      progressFill.style.width = '100%';
      await new Promise(r => setTimeout(r, 200));

      document.getElementById('globalLoading').style.display = 'none';

      document.getElementById('downloadHwpBtn').removeAttribute('disabled');
      document.getElementById('downloadPdfBtn').removeAttribute('disabled');
      document.getElementById('downloadHwpxBtn').removeAttribute('disabled');
      document.getElementById('previewOpenBtn').removeAttribute('disabled');

    } catch (error) {
      console.error(error);
      document.getElementById('globalLoading').style.display = 'none';
      ModalModule.showModal('upload_failed', { fileName: '취합 전체자료' });
    }
  },

  downloadPdf() {
    if (!AppState.mergedPdfBytes) return;

    const blob = new Blob([AppState.mergedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `[취합 완료] 제${AppState.currentSession}차 주간점검회의자료.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('success', 'PDF 다운로드', '통합 보고서 PDF 다운로드가 완료되었습니다.');
  },

  downloadHwp() {
    showToast('success', 'HWP 다운로드 완료', `[최종] 제${AppState.currentSession}차 주간점검회의자료.hwp 가 성공적으로 저장되었습니다.`);
  },

  downloadHwpx() {
    showToast('success', 'HWPX 다운로드 완료', `[최종] 제${AppState.currentSession}차 주간점검회의자료.hwpx 가 성공적으로 저장되었습니다.`);
  }
};

// ==========================================================================
// 5. 병합 미리보기 모듈 (PreviewModule) — 팝업 모달 방식
// ==========================================================================
const PreviewModule = {
  async openPreview(pdfBytes) {
    // 모달 열기
    const overlay = document.getElementById('previewModalOverlay');
    if (overlay) overlay.classList.add('preview-modal-overlay--open');

    // 액션바 미리보기 버튼 표시
    const previewBtn = document.getElementById('previewOpenBtn');
    if (previewBtn) previewBtn.style.display = 'inline-flex';

    document.getElementById('globalLoading').style.display = 'flex';
    document.getElementById('globalLoadingText').innerText = '미리보기 렌더링 중...';
    document.getElementById('globalProgressBar').style.display = 'none';

    try {
      const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
      const pdf = await loadingTask.promise;

      AppState.previewPdfDocument = pdf;
      AppState.totalPreviewPages = pdf.numPages;
      AppState.currentPreviewPage = 1;

      document.getElementById('previewPageTotal').innerText = pdf.numPages;
      await this.renderPage(1);
      document.getElementById('globalLoading').style.display = 'none';
    } catch (e) {
      console.error(e);
      document.getElementById('globalLoading').style.display = 'none';
      showToast('error', '렌더링 실패', '미리보기 렌더링 도중 오류가 발생했습니다.');
    }
  },

  async openPreviewModal() {
    if (!AppState.mergedPdfBytes) {
      await MergerModule.executeMerge();
    }
    if (AppState.mergedPdfBytes) {
      await this.openPreview(AppState.mergedPdfBytes);
    }
  },

  handleOverlayClick(e) {
    if (e.target && e.target.id === 'previewModalOverlay') {
      this.closePreview();
    }
  },

  async renderPage(pageNum) {
    if (!AppState.previewPdfDocument) return;

    const container = document.getElementById('previewCanvas');
    if (!container) return;

    container.innerHTML = '';

    try {
      const page = await AppState.previewPdfDocument.getPage(pageNum);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      const viewport = page.getViewport({ scale: AppState.previewZoom });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const pageContainer = document.createElement('div');
      pageContainer.className = 'pdf-page-container';
      pageContainer.style.width = `${viewport.width}px`;
      pageContainer.style.height = `${viewport.height}px`;
      pageContainer.appendChild(canvas);

      const textOverlay = document.createElement('div');
      textOverlay.className = 'editor-text-overlay';
      
      textOverlay.innerHTML = `
        <div class="editor-page-content" contenteditable="true" spellcheck="false" style="padding: 60px 50px; line-height: 1.6;">
          <h2 style="text-align: center; font-size: 22px; margin-bottom: 24px; font-weight: 800; font-family: '함초롬바탕', serif;">
            제${AppState.currentSession}차 주간업무보고 취합본
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
            <tr style="background-color: var(--gri-bg); font-weight: bold;">
              <th style="border: 1px solid var(--gri-border); padding: 8px; text-align: center;">실/부서명</th>
              <th style="border: 1px solid var(--gri-border); padding: 8px; text-align: center;">주요 추진 업무</th>
              <th style="border: 1px solid var(--gri-border); padding: 8px; text-align: center;">검토 결과</th>
            </tr>
            <tr>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; font-weight: bold;">전략실</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px;">경기연구원 2026 중장기 발전계획 수립 및 정책 수립 세션 조율</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; color: var(--gri-success); font-weight: bold;">제출완료</td>
            </tr>
            <tr>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; font-weight: bold;">도시주택연구실</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px;">3기 신도시 광역교통체계 편익 분석 및 공간 구조 재편 전략 제언</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; color: var(--gri-success); font-weight: bold;">제출완료</td>
            </tr>
            <tr>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; font-weight: bold;">AI연구실</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px;">행정 AI 파이프라인 PoC 모델 구조 검토 및 도정 자동화 로드맵 발표</td>
              <td style="border: 1px solid var(--gri-border); padding: 8px; text-align: center; color: var(--gri-success); font-weight: bold;">제출완료</td>
            </tr>
          </table>
          <p style="font-size: 13px; font-family: '함초롬바탕', serif; text-indent: 10px;">
            위 부서별 취합 결과보고서를 근거로 다음 주간점검회의 아젠다를 상정하고자 합니다. 기타 상세 개별 연구과제 추진실적은 개별 부서 자료(HWPX) 원본을 참고하여 주시기 바랍니다.
          </p>
        </div>
      `;
      pageContainer.appendChild(textOverlay);
      container.appendChild(pageContainer);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      document.getElementById('previewPageNum').innerText = pageNum;
      document.getElementById('prevPageBtn').disabled = (pageNum <= 1);
      document.getElementById('nextPageBtn').disabled = (pageNum >= AppState.totalPreviewPages);

    } catch (error) {
      console.error('Page rendering error:', error);
    }
  },

  async nextPage() {
    if (AppState.currentPreviewPage < AppState.totalPreviewPages) {
      AppState.currentPreviewPage++;
      await this.renderPage(AppState.currentPreviewPage);
    }
  },

  async prevPage() {
    if (AppState.currentPreviewPage > 1) {
      AppState.currentPreviewPage--;
      await this.renderPage(AppState.currentPreviewPage);
    }
  },

  async zoomIn() {
    AppState.previewZoom += 0.15;
    if (AppState.previewZoom > 2.0) AppState.previewZoom = 2.0;
    await this.renderPage(AppState.currentPreviewPage);
  },

  async zoomOut() {
    AppState.previewZoom -= 0.15;
    if (AppState.previewZoom < 0.6) AppState.previewZoom = 0.6;
    await this.renderPage(AppState.currentPreviewPage);
  },

  closePreview() {
    const overlay = document.getElementById('previewModalOverlay');
    if (overlay) overlay.classList.remove('preview-modal-overlay--open');
    showToast('info', '미리보기 닫힘', '미리보기 팝업을 닫았습니다.');
  }
};

// ==========================================================================
// 6. 편집 기능 모듈 (EditorModule)
// ==========================================================================
const EditorModule = {
  toolAction(actionType) {
    showToast('info', '한글 서식 적용', `[${actionType}] 속성이 선택된 블록/단락 영역에 실시간 연계 적용되었습니다.`);
  },

  saveAction() {
    ModalModule.showModal('save_complete_double_download');
  }
};

// ==========================================================================
// 6-2. 채용검증 비즈니스 모듈 (RecruitModule)
// ==========================================================================
const RecruitModule = {
  _filter: 'all',
  _selectedId: null,
  _hasUploaded: false,
  _sortField: null,
  _sortDir: 'asc',
  _filterPosition: null,
  _filterField: null,

  init() {
    const layout = document.getElementById('recruitMainLayout');
    if (layout) {
      layout.style.display = 'flex';
      layout.classList.toggle('recruit-main--loaded', this._hasUploaded);
    }
    this._renderPositionFilters();
    this._renderFieldFilters();
    this._updateTabCounts();
    this.renderTable();
  },

  _showView(uploaded) {
    const layout = document.getElementById('recruitMainLayout');
    if (layout) layout.style.display = 'flex';
  },

  // 4가지 체크 기준으로 적합/검토필요/부적합 판정
  _computeConflict(cand, ev) {
    const profile = cand.candidateProfile;
    const ep = EVAL_PROFILES[ev.name];

    const checks = {
      coAuthor:        false,
      sameSchoolDept:  false,
      sameSchoolOnly:  false,
      sameCompany:     false,
      sameRegion:      false
    };

    if (profile && profile.coAuthors) checks.coAuthor = profile.coAuthors.includes(ev.name);

    if (profile && ep) {
      const ss = !!(profile.school && ep.school && profile.school === ep.school);
      const sd = !!(profile.dept   && ep.dept   && profile.dept   === ep.dept);
      checks.sameSchoolDept = ss && sd;
      checks.sameSchoolOnly = ss && !sd;
      checks.sameCompany    = !!(profile.company && ep.company && profile.company === ep.company);
      checks.sameRegion     = !!(profile.region  && ep.region  && profile.region  === ep.region);
    }

    const isBad     = checks.coAuthor || checks.sameSchoolDept || checks.sameCompany;
    const isCaution = !isBad && (checks.sameSchoolOnly || checks.sameRegion);
    const verdict   = isBad ? '부적합' : isCaution ? '검토필요' : '적합';

    const reasons = [];
    if (checks.coAuthor)       reasons.push('논문 공동저자');
    if (checks.sameSchoolDept) reasons.push('동일 학교 + 동일 학과');
    if (checks.sameCompany)    reasons.push('동일 직장 경력');
    if (checks.sameSchoolOnly) reasons.push('동일 학교');
    if (checks.sameRegion && !isBad && !checks.sameSchoolOnly) reasons.push('지역 겹침');

    // 프로필 없는 심사위원: 하드코딩 conflict 사용
    if (reasons.length === 0 && ev.conflict) {
      const reason = ev.conflictReason || '이해충돌';
      const fallbackChecks = {
        coAuthor: reason.includes('공저') || reason.includes('공동저자'),
        sameSchoolDept: reason.includes('학과') || reason.includes('출신'),
        sameSchoolOnly: false,
        sameCompany: reason.includes('직장') || reason.includes('경력'),
        sameRegion: false
      };
      return { verdict: '부적합', reasons: [reason], checks: fallbackChecks };
    }

    return { verdict, reasons, checks };
  },

  _isAnomalous(c) {
    const doc = c.verification.documents.status !== 'ok' && c.verification.documents.status !== 'pending';
    const paper = c.verification.paper.applicable && c.verification.paper.status !== 'ok' && c.verification.paper.status !== 'na' && c.verification.paper.status !== 'pending';
    const blind = c.verification.blind.issues && c.verification.blind.issues.length > 0;
    const ev = (c.verification.evaluator.recommended || []).some(e =>
      this._computeConflict(c, e).verdict === '부적합'
    );
    return doc || paper || blind || ev;
  },

  _filtered() {
    let list = AppState.candidates.filter(c => {
      if (this._filterPosition && c.position !== this._filterPosition) return false;
      if (this._filterField && c.field !== this._filterField) return false;
      if (this._filter === 'done') return c.reviewStatus === 'completed';
      if (this._filter === 'pending') return c.reviewStatus !== 'completed';
      return true;
    });
    if (this._sortField) {
      const f = this._sortField;
      const dir = this._sortDir === 'asc' ? 1 : -1;
      list = [...list].sort((a, b) => {
        const av = (a[f] || '').localeCompare(b[f] || '', 'ko');
        return av * dir;
      });
    }
    return list;
  },

  sortBy(field) {
    if (this._sortField === field) {
      this._sortDir = this._sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortField = field;
      this._sortDir = 'asc';
    }
    // 버튼 활성 표시 업데이트
    ['position', 'field'].forEach(f => {
      const btn = document.getElementById('sortBtn' + (f === 'position' ? 'Position' : 'Field'));
      if (!btn) return;
      btn.classList.toggle('rc-sort-btn--active', this._sortField === f);
      btn.dataset.dir = (this._sortField === f) ? this._sortDir : '';
    });
    this.renderTable();
  },

  setPositionFilter(pos) {
    this._filterPosition = (pos === this._filterPosition) ? null : pos;
    this._filterField = null;
    this._renderPositionFilters();
    this._renderFieldFilters();
    this._updateTabCounts();
    this.renderTable();
  },

  setFieldFilter(field) {
    this._filterField = (field === this._filterField) ? null : field;
    this._renderFieldFilters();
    this._updateTabCounts();
    this.renderTable();
  },

  _renderDropdownBtns() {
    const posBtn = document.getElementById('rcPosBtn');
    const fieldBtn = document.getElementById('rcFieldBtn');
    if (posBtn) {
      posBtn.classList.toggle('rc-dd-btn--active', !!this._filterPosition);
      posBtn.innerHTML = (this._filterPosition || '직책') + ' <i data-lucide="chevron-down" style="width:11px;height:11px;"></i>';
    }
    if (fieldBtn) {
      fieldBtn.classList.toggle('rc-dd-btn--active', !!this._filterField);
      fieldBtn.innerHTML = (this._filterField || '분야') + ' <i data-lucide="chevron-down" style="width:11px;height:11px;"></i>';
    }
    lucide.createIcons();
  },

  toggleDropdown(type) {
    const menuId = type === 'position' ? 'rcPosMenu' : 'rcFieldMenu';
    const otherId = type === 'position' ? 'rcFieldMenu' : 'rcPosMenu';
    const menu = document.getElementById(menuId);
    const other = document.getElementById(otherId);
    if (!menu) return;
    const isOpen = menu.classList.contains('rc-dd-menu--open');
    if (other) other.classList.remove('rc-dd-menu--open');
    if (isOpen) { menu.classList.remove('rc-dd-menu--open'); return; }
    // 내용 렌더
    const items = type === 'position'
      ? [...new Set(AppState.candidates.map(c => c.position))].sort((a, b) => a.localeCompare(b, 'ko'))
      : [...new Set(AppState.candidates.map(c => c.field))].sort((a, b) => a.localeCompare(b, 'ko'));
    const cur = type === 'position' ? this._filterPosition : this._filterField;
    const fn = type === 'position' ? 'setPositionFilter' : 'setFieldFilter';
    menu.innerHTML = `
      <div class="rc-dd-item${!cur ? ' rc-dd-item--checked' : ''}" onclick="RecruitModule.${fn}(null)">
        <span class="rc-dd-check">${!cur ? '✓' : ''}</span> 전체
      </div>
      ${items.map(v => `
        <div class="rc-dd-item${cur === v ? ' rc-dd-item--checked' : ''}" onclick="RecruitModule.${fn}('${v}')">
          <span class="rc-dd-check">${cur === v ? '✓' : ''}</span> ${v}
        </div>`).join('')}`;
    menu.classList.add('rc-dd-menu--open');
    // 외부 클릭 닫기
    setTimeout(() => {
      const close = (e) => {
        if (!menu.contains(e.target) && e.target.id !== (type === 'position' ? 'rcPosBtn' : 'rcFieldBtn')) {
          menu.classList.remove('rc-dd-menu--open');
          document.removeEventListener('click', close);
        }
      };
      document.addEventListener('click', close);
    }, 10);
  },

  _renderPositionFilters() { this._renderDropdownBtns(); },
  _renderFieldFilters() { this._renderDropdownBtns(); },

  _evalAvg(c) {
    const scores = (c.verification.evaluator.recommended || [])
      .filter(e => !e.conflict && e.score != null)
      .map(e => e.score);
    return scores.length ? scores.reduce((s, v) => s + v, 0) / scores.length : null;
  },

  _updateTabCounts() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    if (!this._hasUploaded) {
      set('rtcAll', 0); set('rtcPending', 0); set('rtcDone', 0);
      set('rdTotal', 0); set('rdPending', 0); set('rdDone', 0);
      return;
    }
    const total = AppState.candidates.length;
    const done = AppState.candidates.filter(c => c.reviewStatus === 'completed').length;
    const pending = AppState.candidates.filter(c => this._isAnomalous(c) && c.reviewStatus !== 'completed').length;
    const inReview = total - done;
    set('rtcAll', total); set('rtcPending', pending); set('rtcDone', done);
    set('rdTotal', total); set('rdPending', inReview); set('rdDone', done);
  },

  // ── 폴더 드래그앤드롭 ──
  onDragOver(e) {
    e.preventDefault();
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.add('recruit-upload-card--over');
  },
  onDragLeave(e) {
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.remove('recruit-upload-card--over');
  },
  onDrop(e) {
    e.preventDefault();
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.remove('recruit-upload-card--over');
    const files = e.dataTransfer ? e.dataTransfer.files : null;
    this.handleUpload(files);
  },

  handleUpload(files) {
    this._loadDummyData();
  },

  _loadDummyData() {
    this._hasUploaded = true;
    this._showView(true);
    const layout = document.getElementById('recruitMainLayout');
    if (layout) layout.classList.add('recruit-main--loaded');
    this._filter = 'all';
    this._filterPosition = null;
    this._filterField = null;
    document.querySelectorAll('.rc-tab').forEach(btn => {
      btn.classList.toggle('rc-tab--active', btn.dataset.filter === 'all');
    });
    this._renderPositionFilters();
    this._renderFieldFilters();
    this._updateTabCounts();
    this.renderTable();
  },

  setFilter(filter) {
    this._filter = filter;
    document.querySelectorAll('.rc-tab').forEach(btn => {
      btn.classList.toggle('rc-tab--active', btn.dataset.filter === filter);
    });
    this.renderTable();
  },

  _statusBadge(status) {
    const map = {
      ok:       ['ok',      '✓'],
      warning:  ['warn',    '!'],
      mismatch: ['warn',    '!'],
      missing:  ['miss',    '✕'],
      conflict: ['warn',    '!'],
      pending:  ['pending', '…'],
      na:       ['na',      '—']
    };
    const [cls, label] = map[status] || ['pending', '?'];
    return `<span class="rc-badge rc-badge--${cls}">${label}</span>`;
  },

  renderTable() {
    const container = document.getElementById('recruitTableBody');
    if (!container) return;
    if (!this._hasUploaded) {
      container.innerHTML = `<div class="rc-empty" style="color:var(--gri-text-muted);padding:32px 0;">파일을 업로드하면 지원자 목록이 표시됩니다</div>`;
      return;
    }
    const list = this._filtered();
    // 검토필요 먼저, 그다음 이름 가나다순
    list.sort((a, b) => {
      const aFlag = this._isAnomalous(a) && a.reviewStatus !== 'completed';
      const bFlag = this._isAnomalous(b) && b.reviewStatus !== 'completed';
      if (aFlag !== bFlag) return aFlag ? -1 : 1;
      return a.name.localeCompare(b.name, 'ko');
    });
    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = `<div class="rc-empty">해당하는 지원자가 없습니다</div>`;
      return;
    }
    list.forEach((c, idx) => {
      const anomaly = this._isAnomalous(c);
      const isSelected = this._selectedId === c.id;
      let statusHtml;
      if (c.reviewStatus === 'completed') {
        statusHtml = '<span class="rc-status rc-status--done">검수완료</span>';
      } else if (anomaly) {
        statusHtml = '<span class="rc-status rc-status--anomaly">확인필요</span>';
      } else {
        statusHtml = '<span class="rc-status rc-status--pending">검수대기</span>';
      }

      const row = document.createElement('div');
      row.className = `rc-row${isSelected ? ' rc-row--selected' : ''}`;
      row.onclick = () => this.selectCandidate(c.id);
      row.innerHTML = `
        <span class="rc-row-num">${idx + 1}</span>
        <div class="rc-row-body">
          <div class="rc-cand-name">${c.name}</div>
        </div>
        ${statusHtml}
      `;
      container.appendChild(row);
    });
  },

  selectCandidate(id) {
    this._selectedId = id;
    this.renderTable();
    const c = AppState.candidates.find(a => a.id === id);
    if (c) this.renderDetail(c);
  },

  _docIcon(status) {
    return { ok: '✓', missing: '✕', mismatch: '!', na: '—', pending: '…' }[status] || '?';
  },
  _docCls(status) {
    return { ok: 'ok', missing: 'miss', mismatch: 'warn', na: 'na', pending: 'pending' }[status] || 'pending';
  },

  renderDetail(c) {
    const empty = document.getElementById('recruitDetailEmpty');
    const content = document.getElementById('recruitDetailContent');
    if (!empty || !content) return;
    empty.style.display = 'none';
    content.style.display = 'flex';

    // ── 서류 검증: 대분류에만 ! 표시, 하위는 사유 텍스트 ──
    const missingDocs = c.verification.documents.categories
      .filter(cat => cat.status !== 'ok' && cat.status !== 'na')
      .map(cat => {
        const missingSubs = (cat.subItems || []).filter(s => s.status !== 'ok' && s.status !== 'na');
        return missingSubs.length > 0
          ? missingSubs.map(s => s.name + (s.note ? ': ' + s.note : '')).join(', ')
          : cat.name + (cat.note ? ': ' + cat.note : '');
      }).join(' / ');

    const docRows = c.verification.documents.categories.map(cat => {
      const hasIssue = cat.status !== 'ok' && cat.status !== 'na';
      const hasSub = cat.subItems && cat.subItems.length > 0;
      const missingSubs = hasSub ? cat.subItems.filter(s => s.status !== 'ok' && s.status !== 'na') : [];
      const tooltip = missingSubs.length > 0
        ? missingSubs.map(s => s.name + (s.note ? ': ' + s.note : '')).join(', ')
        : (cat.note || '');
      // 대분류에만 ! (하위에는 사유 텍스트)
      const badge = hasIssue
        ? `<span class="rc-badge rc-badge--miss rd-doc-badge" title="${tooltip}">!</span>`
        : '';
      const subHtml = hasSub ? cat.subItems.map(s => {
        const subIssue = s.status !== 'ok' && s.status !== 'na';
        const reason = s.note || (s.status === 'missing' ? '미첨부' : s.status === 'mismatch' ? '내용불일치' : '');
        return `<div class="rd-sub-row">
          <span class="rd-sub-name">${s.name}</span>
          ${subIssue && reason ? `<span class="rd-sub-reason">${reason}</span>` : ''}
        </div>`;
      }).join('') : '';
      return `
        <div class="rd-doc-accordion${hasIssue ? ' rd-doc-accordion--issue' : ''}">
          <div class="rd-doc-header" onclick="this.parentElement.classList.toggle('rd-doc-accordion--open')">
            ${badge}
            <span class="rd-doc-name">${cat.name}</span>
            ${hasSub ? `<span class="rd-doc-chevron">›</span>` : ''}
          </div>
          ${hasSub ? `<div class="rd-doc-subs">${subHtml}</div>` : ''}
        </div>`;
    }).join('');

    // ── 논문 검증 ──
    let paperHtml = '';
    const paperIssueItems = [];
    if (!c.verification.paper.applicable) {
      paperHtml = `<p class="rd-na">연구직이 아니므로 해당 없음</p>`;
    } else if (!c.verification.paper.items || c.verification.paper.items.length === 0) {
      paperHtml = `<p class="rd-na">논문 정보 없음</p>`;
    } else {
      paperHtml = c.verification.paper.items.map(p => {
        const isIssue = p.status !== 'ok';
        if (isIssue) paperIssueItems.push(p.title);
        const label = { ok: '등재확인', warning: '주의', unverified: '미확인' }[p.status] || p.status;
        const badge = isIssue ? `<span class="rc-badge rc-badge--miss rd-paper-badge" title="${p.note || '확인 필요'}">${label}</span>` : '';
        return `<div class="rd-paper-item">
          <div class="rd-paper-row">
            <span class="rd-paper-title">${p.title}</span>
            ${badge}
          </div>
          <div class="rd-paper-meta">${p.journal} · ${p.year} · ${p.authors}</div>
          ${p.note ? `<div class="rd-paper-note">${p.note}</div>` : ''}
        </div>`;
      }).join('');
    }

    // ── 블라인드 검토 ──
    let blindHtml = '';
    const blindIssues = c.verification.blind.issues || [];
    if (blindIssues.length === 0) {
      blindHtml = `<div class="rd-blind-clear" style="color:#111;font-weight:400;">위반문구 미탐지</div>`;
    } else {
      blindHtml = blindIssues.map(issue => `
        <div class="rd-blind-item rd-blind-item--${issue.severity}">
          <span class="rd-blind-type">${issue.type}</span>
          <span class="rd-blind-excerpt">${issue.excerpt}</span>
        </div>`).join('');
    }

    // ── 심사위원: 적합만 표시, 매핑점수 순 ──
    const allEvals = (c.verification.evaluator.recommended || []).map(ev => ({
      ev, cf: this._computeConflict(c, ev)
    }));
    const suitableEvals = allEvals
      .filter(x => x.cf.verdict === '적합')
      .sort((a, b) => (b.ev.score || 0) - (a.ev.score || 0));

    const evalRow = (ev, idx) => {
      const score = ev.score || 0;
      const matchCount = score >= 8.5 ? 3 : score >= 7.5 ? 2 : 1;
      return `<div class="rd-eval-row" onclick="RecruitModule.openEvalProfile('${ev.name}', ${c.id})">
        <span class="rd-eval-rank">${idx + 1}</span>
        <div class="rd-eval-info">
          <span class="rd-eval-name">${ev.name}</span>
          <span class="rd-eval-affil">${ev.affil}</span>
        </div>
        <span class="rd-eval-match">${matchCount}개 일치</span>
        <span class="rd-eval-arrow">›</span>
      </div>`;
    };

    let evalHtml = '';
    if (suitableEvals.length === 0) {
      evalHtml = allEvals.length === 0
        ? `<p class="rd-na">심사위원 정보가 없습니다</p>`
        : `<p class="rd-na">추천 가능한 심사위원이 없습니다</p>`;
    } else {
      evalHtml = suitableEvals.map((x, i) => evalRow(x.ev, i)).join('');
    }

    // ── 섹션 배지: 문제 있을 때만 ! ──
    const docIssue = missingDocs.length > 0;
    const paperIssue = c.verification.paper.applicable && c.verification.paper.status !== 'ok';
    const blindIssue = blindIssues.length > 0;
    const badge = (hasIssue, tip) => hasIssue
      ? `<span class="rc-badge rc-badge--miss rd-section-badge" title="${tip}">!</span>`
      : '';

    content.innerHTML = `
      <div class="rd-header">
        <div class="rd-header-info">
          <div class="rd-cand-name">${c.name}</div>
          <div class="rd-cand-meta">${c.position} · ${c.field}</div>
        </div>
        ${c.reviewStatus === 'completed'
          ? `<button class="btn btn--primary btn--sm" onclick="RecruitModule.cancelReviewed(${c.id})">완료취소</button>`
          : `<button class="btn btn--ghost btn--sm rd-btn-inactive" onclick="RecruitModule.markReviewed(${c.id})">검수완료</button>`}
      </div>
      <div class="rd-body">
        <div class="rd-section">
          <div class="rd-section-label">
            서류 검증
            ${badge(docIssue, missingDocs || '서류 미비 항목 있음')}
          </div>
          <div class="rd-doc-list">${docRows}</div>
        </div>
        <div class="rd-section">
          <div class="rd-section-label">
            논문 검증
            ${badge(paperIssue, paperIssueItems.join(', ') || '논문 등재 확인 필요')}
          </div>
          ${paperHtml}
        </div>
        <div class="rd-section">
          <div class="rd-section-label">
            블라인드 검토
            ${badge(blindIssue, blindIssues.map(i => i.type).join(', ') || '블라인드 위반 항목 있음')}
          </div>
          ${blindHtml}
        </div>
        <div class="rd-section">
          <div class="rd-section-label">
            심사위원 추천
          </div>
          ${evalHtml}
        </div>
        ${c.reviewNote ? `<div class="rd-note"><strong>메모</strong> ${c.reviewNote}</div>` : ''}
      </div>
    `;
    lucide.createIcons();
  },

  openEvalProfile(name, candidateId) {
    const cand = AppState.candidates.find(x => x.id === candidateId);
    const candidateField = cand ? cand.field : '';
    const evObj = cand ? (cand.verification.evaluator.recommended || []).find(e => e.name === name) || { name } : { name };
    const p = EVAL_PROFILES[name] || {};
    const body = document.getElementById('evalPanelBody');
    const initials = name.length >= 2 ? name.slice(0, 2) : name;

    // 매핑 기준 (score 기반)
    const score = evObj.score || 0;
    const matchCount = score >= 8.5 ? 3 : score >= 7.5 ? 2 : 1;
    const CRITERIA = ['전문분야 직접 일치', '연구방법론 연관성', '정책분야 경험'];

    // 전문분야 태그
    const matched = (p.specialty || []).filter(s =>
      candidateField && (s.includes(candidateField.replace('및', '').slice(0, 4)) ||
      candidateField.includes(s.slice(0, 4)))
    );
    const tags = (p.specialty || []).map(t => {
      const isMatch = matched.includes(t);
      return `<span class="eval-profile-tag${isMatch ? ' eval-profile-tag--match' : ''}">${t}</span>`;
    }).join('');

    // 프로필 정보 행
    const rows = [
      ['출신교', p.school], ['학과', p.dept], ['학위', p.degree], ['지도교수', p.advisor],
      ['소속', p.company || evObj.affil], ['직위', p.role], ['재직기간', p.period], ['지역', p.region]
    ];

    const matchHtml = `
      <div class="ep-divider"></div>
      <div class="ep-checks">
        <div class="ep-checks-title">매핑 기준 <span class="ep-verdict ep-verdict--ok">${matchCount}/3 일치</span></div>
        ${CRITERIA.map((label, i) => `
          <div class="ep-check-row">
            <span class="ep-check-icon ep-check-icon--${i < matchCount ? 'ok' : 'neutral'}">${i < matchCount ? '✓' : '✕'}</span>
            <span class="ep-check-label">${label}</span>
          </div>`).join('')}
      </div>`;

    body.innerHTML = `
      <div class="ep-top ep-top--ok">
        <div class="ep-avatar">${initials}</div>
        <div class="ep-top-info">
          <div class="ep-name">${name}</div>
          <div class="ep-role">${p.role || evObj.field || ''}</div>
          <div class="ep-org">${p.company || evObj.affil || ''}</div>
        </div>
      </div>
      <div class="ep-divider"></div>
      <div class="ep-rows">
        ${rows.map(([label, val]) => val ? `
          <div class="ep-row">
            <span class="ep-label">${label}</span>
            <span class="ep-value">${val}</span>
          </div>` : '').join('')}
      </div>
      ${matchHtml}
      ${tags ? `<div class="ep-divider"></div>
        <div class="ep-spec-title">전문 분야${matched.length > 0 ? ' <span class="ep-match-badge">매핑 ' + matched.length + '개</span>' : ''}</div>
        <div class="eval-profile-tags">${tags}</div>` : ''}
    `;
    document.getElementById('evalOverlay').classList.add('eval-overlay--active');
    lucide.createIcons();
  },

  closeEvalProfile(e) {
    if (e && e.target !== document.getElementById('evalOverlay')) return;
    document.getElementById('evalOverlay').classList.remove('eval-overlay--active');
  },

  markReviewed(id) {
    const c = AppState.candidates.find(a => a.id === id);
    if (!c) return;
    c.reviewStatus = 'completed';
    this._updateTabCounts();
    this.renderTable();
    this.renderDetail(c);
  },

  cancelReviewed(id) {
    const c = AppState.candidates.find(a => a.id === id);
    if (!c) return;
    c.reviewStatus = 'pending';
    this._updateTabCounts();
    this.renderTable();
    this.renderDetail(c);
  },

  downloadExcel() {
    const rows = [['지원자', '직책', '분야', '서류', '논문', '블라인드', '평가위원', '검토상태']];
    AppState.candidates.forEach(c => {
      rows.push([
        c.name, c.position, c.field,
        c.verification.documents.status,
        c.verification.paper.applicable ? c.verification.paper.status : 'N/A',
        (c.verification.blind.issues && c.verification.blind.issues.length > 0) ? '이슈' : '이상없음',
        (c.verification.evaluator.recommended && c.verification.evaluator.recommended.some(e => e.conflict)) ? '이해충돌' : '이상없음',
        c.reviewStatus === 'completed' ? '검토완료' : '대기'
      ]);
    });
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = '채용검증_결과.csv'; a.click();
    URL.revokeObjectURL(url);
  }
};

// ==========================================================================
// 6-1. 일반 파일 병합 모듈 (GeneralMerge)
// ==========================================================================
const GeneralMerge = {
  _files: [],
  _mergedBytes: null,
  _dragSrcIdx: null,

  open() {
    this._files = [];
    this._mergedBytes = null;
    const overlay = document.getElementById('gmOverlay');
    if (overlay) overlay.classList.add('gm-overlay--active');
    const fd = document.getElementById('gmFormatDialog');
    if (fd) fd.style.display = 'none';
    // wire up file input
    const inp = document.getElementById('gmFileInput');
    if (inp) { inp.value = ''; inp.onchange = (e) => { GeneralMerge.addFiles(e.target.files); inp.value = ''; }; }
    // wire up dropzone DnD
    const dz = document.getElementById('gmDropzone');
    if (dz) {
      dz.ondragover = (e) => { e.preventDefault(); e.stopPropagation(); dz.classList.add('gm-dropzone--over'); };
      dz.ondragleave = (e) => { e.stopPropagation(); dz.classList.remove('gm-dropzone--over'); };
      dz.ondrop = (e) => {
        e.preventDefault(); e.stopPropagation();
        dz.classList.remove('gm-dropzone--over');
        GeneralMerge.addFiles(e.dataTransfer.files);
      };
    }
    this._renderList();
    this._updateCount();
    lucide.createIcons();
  },

  close() {
    const overlay = document.getElementById('gmOverlay');
    if (overlay) overlay.classList.remove('gm-overlay--active');
    this._files = [];
    this._mergedBytes = null;
  },

  _handleOverlayClick(e) {
    if (e.target === document.getElementById('gmOverlay')) this.close();
  },

  addFiles(fileList) {
    let added = 0;
    Array.from(fileList).forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'hwp', 'hwpx'].includes(ext)) {
        showToast('error', '형식 오류', `${file.name}: PDF/HWP/HWPX만 가능합니다.`);
        return;
      }
      const uid = 'gm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      this._files.push({ id: uid, file, name: file.name, ext });
      added++;
    });
    if (added > 0) this._mergedBytes = null;
    this._renderList();
    this._updateCount();
  },

  _updateCount() {
    const el = document.getElementById('gmFileCount');
    if (el) el.textContent = `${this._files.length}개 파일`;
  },

  _renderList() {
    const container = document.getElementById('gmFileList');
    if (!container) return;
    container.innerHTML = '';
    if (this._files.length === 0) {
      container.innerHTML = '<div style="color:var(--gri-text-muted);font-size:0.8rem;text-align:center;padding:12px 0;">파일을 위 영역에 드래그하거나 클릭하여 추가하세요.</div>';
      return;
    }
    this._files.forEach((f, idx) => {
      const row = document.createElement('div');
      row.className = 'gm-file-row';
      row.draggable = true;
      row.dataset.idx = idx;
      row.innerHTML = `
        <i data-lucide="grip-vertical" style="width:14px;height:14px;color:var(--gri-text-muted);flex-shrink:0;"></i>
        <span class="gm-file-num">${idx + 1}</span>
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gri-text-primary);" title="${f.name}">${f.name}</span>
        <button class="btn btn--icon btn--ghost" style="padding:2px 4px;flex-shrink:0;" data-gm-del="${f.id}">
          <i data-lucide="x" style="width:13px;height:13px;"></i>
        </button>
      `;
      row.querySelector('[data-gm-del]').onclick = (e) => {
        e.stopPropagation();
        GeneralMerge.removeFile(f.id);
      };
      row.addEventListener('dragstart', (e) => {
        GeneralMerge._dragSrcIdx = idx;
        setTimeout(() => row.classList.add('gm-file-row--dragging'), 0);
        e.dataTransfer.effectAllowed = 'move';
      });
      row.addEventListener('dragend', () => row.classList.remove('gm-file-row--dragging'));
      row.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); row.classList.add('gm-file-row--over'); });
      row.addEventListener('dragleave', (e) => { e.stopPropagation(); row.classList.remove('gm-file-row--over'); });
      row.addEventListener('drop', (e) => {
        e.preventDefault(); e.stopPropagation();
        row.classList.remove('gm-file-row--over');
        const src = GeneralMerge._dragSrcIdx;
        if (src === null || src === idx) return;
        const moved = GeneralMerge._files.splice(src, 1)[0];
        GeneralMerge._files.splice(idx, 0, moved);
        GeneralMerge._mergedBytes = null;
        GeneralMerge._renderList();
        GeneralMerge._updateCount();
      });
      container.appendChild(row);
    });
    lucide.createIcons();
  },

  removeFile(id) {
    this._files = this._files.filter(f => f.id !== id);
    this._mergedBytes = null;
    this._renderList();
    this._updateCount();
  },

  async merge() {
    if (this._files.length === 0) {
      showToast('warning', '파일 없음', '파일을 먼저 추가하세요.');
      return;
    }
    document.getElementById('globalLoading').style.display = 'flex';
    document.getElementById('globalLoadingText').innerText = '파일 병합 중...';
    document.getElementById('globalProgressBar').style.display = 'none';
    try {
      const mergedPdf = await PDFLib.PDFDocument.create();
      for (const f of this._files) {
        if (f.ext === 'pdf') {
          const buf = await f.file.arrayBuffer();
          const src = await PDFLib.PDFDocument.load(buf);
          const pages = await mergedPdf.copyPages(src, src.getPageIndices());
          pages.forEach(p => mergedPdf.addPage(p));
        } else {
          mergedPdf.addPage([595.276, 841.89]);
        }
      }
      if (mergedPdf.getPageCount() === 0) mergedPdf.addPage([595.276, 841.89]);
      this._mergedBytes = await mergedPdf.save();
      document.getElementById('globalLoading').style.display = 'none';
      this._showFormatDialog();
    } catch (e) {
      document.getElementById('globalLoading').style.display = 'none';
      showToast('error', '병합 실패', '파일 병합 중 오류가 발생했습니다.');
    }
  },

  _showFormatDialog() {
    const fd = document.getElementById('gmFormatDialog');
    if (fd) { fd.style.display = 'flex'; lucide.createIcons(); }
  },

  closeFormatDialog() {
    const fd = document.getElementById('gmFormatDialog');
    if (fd) fd.style.display = 'none';
  },

  downloadSelected() {
    if (!this._mergedBytes) return;
    const formats = [];
    if (document.getElementById('gfPdf') && document.getElementById('gfPdf').checked) formats.push('pdf');
    if (document.getElementById('gfHwp') && document.getElementById('gfHwp').checked) formats.push('hwp');
    if (document.getElementById('gfHwpx') && document.getElementById('gfHwpx').checked) formats.push('hwpx');
    if (formats.length === 0) {
      showToast('warning', '형식 선택', '하나 이상의 형식을 선택하세요.');
      return;
    }
    formats.forEach(fmt => this._downloadAs(fmt));
    this.closeFormatDialog();
    showToast('success', '다운로드 완료', `${formats.map(f => f.toUpperCase()).join(', ')} 파일이 저장되었습니다.`);
  },

  _downloadAs(format) {
    const blob = new Blob([this._mergedBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `[병합완료]_통합자료.${format}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  reset() { this._files = []; this._mergedBytes = null; }
};

// ==========================================================================
// 7. 모달 관리 모듈 (ModalModule)
// ==========================================================================
const ModalModule = {
  showModal(type, data = {}) {
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    overlay.classList.add('modal-overlay--active');

    let html = '';

    switch (type) {
      case 'no_files':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="alert-triangle"></i>
          </div>
          <h3 class="modal__title">파일 미첨부</h3>
          <p class="modal__message">파일이 첨부되지 않았습니다.<br>하나 이상의 PDF, HWP, HWPX 파일을 업로드한 후에 병합을 진행해주세요.</p>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'format_error':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="file-warning"></i>
          </div>
          <h3 class="modal__title">파일 형식 오류</h3>
          <p class="modal__message">PDF, HWP, HWPX 파일만 첨부 가능합니다.<br>(.jpg, .png 등 이미지 파일이나 타 폴더 구조는 업로드할 수 없습니다.)</p>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'recruit_format_error':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="file-warning"></i>
          </div>
          <h3 class="modal__title">파일 형식 오류</h3>
          <p class="modal__message">PDF, HWPX, DOCX 파일만 업로드 가능합니다.<br>지원되지 않는 파일: <strong>${data && data.fileName ? data.fileName : ''}</strong></p>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'size_error':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="hard-drive"></i>
          </div>
          <h3 class="modal__title">파일 용량 제한 초과</h3>
          <p class="modal__message">업로드 하신 파일 [${data.fileName}]의 용량이 초과되었습니다.<br>안정적 취합을 위해 파일 크기는 50MB 이하로 나눠서 올려주세요.</p>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'replace_confirm':
        html = `
          <div class="modal__icon modal__icon--question">
            <i data-lucide="help-circle"></i>
          </div>
          <h3 class="modal__title">부서 중복 파일 발생</h3>
          <p class="modal__message">해당 부서에 이미 등록된 파일이 존재합니다.<br>기존 제출 자료를 [${data.newFileName}] 파일로 교체할까요?</p>
          <div class="modal__actions">
            <button class="btn btn--secondary" onclick="ModalModule.closeModal()">아니오 (유지)</button>
            <button class="btn btn--primary" id="confirmReplaceBtn">네 (교체)</button>
          </div>
        `;
        break;

      case 'missing_depts':
        html = `
          <div class="modal__icon modal__icon--question">
            <i data-lucide="help-circle"></i>
          </div>
          <h3 class="modal__title">미제출 부서 존재 경고</h3>
          <p class="modal__message">아직 파일 업로드가 완료되지 않은 부서가 존재합니다.<br>이대로 진행할까요?</p>
          <div class="modal__example" style="font-size:0.8rem; text-align:left; max-height:80px; overflow-y:auto;">
            ${data.missingNames.join('<br>')}
          </div>
          <div class="modal__actions">
            <button class="btn btn--secondary" onclick="ModalModule.closeModal()">취소</button>
            <button class="btn btn--primary" id="confirmMergeBtn">이대로 병합 진행</button>
          </div>
        `;
        break;

      case 'upload_failed':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="x-octagon"></i>
          </div>
          <h3 class="modal__title">업로드 실패</h3>
          <p class="modal__message">파일 [${data.fileName}] 업로드 처리에 오류가 발생했습니다.</p>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'dept_match_error':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="user-x"></i>
          </div>
          <h3 class="modal__title">부서 매칭 오류 (양식 미준수)</h3>
          <p class="modal__message">파일명 및 본문 텍스트 분석 결과, 부서를 매칭하지 못했습니다.<br>부서명을 넣거나 날짜 형식을 맞춰주시기 바랍니다.</p>
          <div class="modal__example">
            예시: 0304_도시주택연구실.hwp (날짜_부서 양식 주의)
          </div>
          <div class="modal__actions">
            <button class="btn btn--primary" onclick="ModalModule.closeModal()">확인</button>
          </div>
        `;
        break;

      case 'delete_confirm':
        html = `
          <div class="modal__icon modal__icon--warning">
            <i data-lucide="trash-2"></i>
          </div>
          <h3 class="modal__title">부서 삭제 확인</h3>
          <p class="modal__message">부서 [${data.deptName}]을(를) 시스템에서 영구 삭제하시겠습니까?<br>연계된 제출물도 함께 지워집니다.</p>
          <div class="modal__actions">
            <button class="btn btn--secondary" onclick="ModalModule.closeModal()">취소</button>
            <button class="btn btn--danger" id="confirmDeleteDeptBtn">삭제</button>
          </div>
        `;
        break;

      case 'merge_complete':
        html = `
          <div class="modal__icon modal__icon--success">
            <i data-lucide="circle-check"></i>
          </div>
          <h3 class="modal__title">자료병합 완료</h3>
          <p class="modal__message">파일이 순서대로 병합되었습니다.<br>다운로드 형식을 선택하세요.</p>
          <div class="modal__actions" style="flex-direction:column;gap:8px;width:100%;">
            <div style="display:flex;gap:8px;width:100%;">
              <button class="btn btn--secondary" id="mc_hwp" style="flex:1;">HWP</button>
              <button class="btn btn--secondary" id="mc_pdf" style="flex:1;">PDF</button>
              <button class="btn btn--secondary" id="mc_hwpx" style="flex:1;">HWPX</button>
            </div>
            <div style="display:flex;gap:8px;width:100%;">
              <button class="btn btn--primary" id="mc_preview" style="flex:1;">미리보기</button>
              <button class="btn btn--ghost" id="mc_close" style="flex:1;">닫기</button>
            </div>
          </div>
        `;
        break;

      case 'save_complete_double_download':
        html = `
          <div class="modal__icon modal__icon--success">
            <i data-lucide="check-circle2"></i>
          </div>
          <h3 class="modal__title">업데이트되었습니다</h3>
          <p class="modal__message">편집하신 서식 내역이 반영되어 최종 취합본이 완성되었습니다.<br>원하는 문서 포맷으로 즉시 내려받으세요.</p>
          <div class="modal__actions" style="flex-direction: column; gap: 8px; width: 100%;">
            <div style="display:flex; gap:10px; width:100%;">
              <button class="btn btn--primary" onclick="ModalModule.closeModal(); MergerModule.downloadPdf();" style="flex:1;">
                <i data-lucide="download" style="width:16px;height:16px"></i> PDF 다운로드
              </button>
              <button class="btn btn--primary" onclick="ModalModule.closeModal(); MergerModule.downloadHwpx();" style="flex:1; background:linear-gradient(135deg, #3B82F6, #1D4ED8)">
                <i data-lucide="file-down" style="width:16px;height:16px"></i> HWPX 다운로드
              </button>
            </div>
            <button class="btn btn--ghost btn--sm" onclick="ModalModule.closeModal()" style="margin-top:4px;">창 닫기</button>
          </div>
        `;
        break;
    }

    content.innerHTML = html;
    lucide.createIcons();

    if (type === 'replace_confirm') {
      document.getElementById('confirmReplaceBtn').onclick = () => {
        this.closeModal();
        UploadModule.replaceFile(data.file, data.deptName);
      };
    } else if (type === 'missing_depts') {
      document.getElementById('confirmMergeBtn').onclick = () => {
        this.closeModal();
        MergerModule.executeMerge();
      };
    } else if (type === 'delete_confirm') {
      document.getElementById('confirmDeleteDeptBtn').onclick = () => {
        this.closeModal();
        DeptModule.confirmDelete(data.deptId);
      };
    } else if (type === 'merge_complete') {
      document.getElementById('mc_hwp').onclick = () => { this.closeModal(); MergerModule.downloadHwp(); };
      document.getElementById('mc_pdf').onclick = () => { this.closeModal(); MergerModule.downloadPdf(); };
      document.getElementById('mc_hwpx').onclick = () => { this.closeModal(); MergerModule.downloadHwpx(); };
      document.getElementById('mc_preview').onclick = () => { this.closeModal(); PreviewModule.openPreviewModal(); };
      document.getElementById('mc_close').onclick = () => { this.closeModal(); };
    }
  },

  closeModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.classList.remove('modal-overlay--active');
    }
  },

  handleOverlayClick(e) {
    if (e.target.id === 'modalOverlay') {
      this.closeModal();
    }
  }
};

// ==========================================================================
// 8. 세션 히스토리 모듈 (SessionModule) — 좌측 사이드바 방식
// ==========================================================================
const SessionModule = {
  init() {
    const sessions = [];
    const baseDate = new Date();
    for (let i = 23; i >= 1; i--) {
      const sessionDate = new Date(baseDate.getTime() - (23 - i) * 7 * 24 * 60 * 60 * 1000);
      const year = sessionDate.getFullYear();
      const month = String(sessionDate.getMonth() + 1).padStart(2, '0');
      const day = String(sessionDate.getDate()).padStart(2, '0');
      sessions.unshift({
        number: i,
        date: `${year}-${month}-${day}`,
        status: i === 23 ? 'current' : 'complete'
      });
    }
    AppState.sessions = sessions;
    this.renderSidebar();
  },

  renderSidebar() {
    const list = document.getElementById('sessionSidebarList');
    if (!list) return;
    list.innerHTML = '';

    const currentSess = AppState.sessions.find(s => s.status === 'current');
    const pastSessions = [...AppState.sessions]
      .filter(s => s.status !== 'current')
      .sort((a, b) => b.number - a.number);

    // ── 금주 회의 ──
    const thisWeekLabel = document.createElement('div');
    thisWeekLabel.className = 'session-section-label';
    thisWeekLabel.textContent = '금주 회의';
    list.appendChild(thisWeekLabel);

    if (currentSess) {
      list.appendChild(this._makeSessionBtn(currentSess));
    } else {
      const empty = document.createElement('div');
      empty.style.cssText = 'padding:8px 14px;font-size:0.78rem;color:var(--gri-text-muted);';
      empty.textContent = '등록된 금주 회의 없음';
      list.appendChild(empty);
    }

    if (pastSessions.length === 0) { lucide.createIcons(); return; }

    // ── 이전 회의 ──
    const histLabel = document.createElement('div');
    histLabel.className = 'session-section-label session-section-label--history';
    histLabel.textContent = '이전 회의';
    list.appendChild(histLabel);

    const byYear = {};
    pastSessions.forEach(sess => {
      const [y, m] = sess.date.split('-');
      if (!byYear[y]) byYear[y] = {};
      if (!byYear[y][m]) byYear[y][m] = [];
      byYear[y][m].push(sess);
    });
    const MONTH_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    Object.keys(byYear).sort((a, b) => b - a).forEach(year => {
      const byMonth = byYear[year];
      const yearTotal = Object.values(byMonth).reduce((s, a) => s + a.length, 0);
      const yearHasActive = Object.values(byMonth).some(arr => arr.some(s => s.number === AppState.currentSession));
      const yearGroup = document.createElement('div');
      yearGroup.className = 'session-year-group';
      const yearHeader = document.createElement('button');
      yearHeader.className = 'session-year-header' + (yearHasActive ? ' session-year-header--open' : '');
      yearHeader.onclick = () => this._toggleYear(yearHeader);
      yearHeader.innerHTML = '<span>' + year + '년</span><span class="session-year-count">' + yearTotal + '</span><i data-lucide="chevron-right" style="width:12px;height:12px;"></i>';
      const yearItems = document.createElement('div');
      yearItems.className = 'session-year-items';
      yearItems.style.display = yearHasActive ? 'block' : 'none';
      Object.keys(byMonth).sort((a, b) => b - a).forEach(month => {
        const sessions = byMonth[month];
        const monthHasActive = sessions.some(s => s.number === AppState.currentSession);
        const monthGroup = document.createElement('div');
        monthGroup.className = 'session-month-group';
        const monthHeader = document.createElement('button');
        monthHeader.className = 'session-month-header' + (monthHasActive ? ' session-month-header--open' : '');
        monthHeader.onclick = () => this._toggleMonth(monthHeader);
        monthHeader.innerHTML = '<span>' + MONTH_KO[parseInt(month, 10) - 1] + '</span><span class="session-month-count">' + sessions.length + '</span><i data-lucide="chevron-right" style="width:11px;height:11px;"></i>';
        const monthItems = document.createElement('div');
        monthItems.className = 'session-month-items';
        monthItems.style.display = monthHasActive ? 'block' : 'none';
        sessions.forEach(sess => monthItems.appendChild(this._makeSessionBtn(sess)));
        monthGroup.appendChild(monthHeader);
        monthGroup.appendChild(monthItems);
        yearItems.appendChild(monthGroup);
      });
      yearGroup.appendChild(yearHeader);
      yearGroup.appendChild(yearItems);
      list.appendChild(yearGroup);
    });

    lucide.createIcons();
  },

  _makeSessionBtn(sess) {
    const isCurrent = sess.number === AppState.currentSession;
    const parts = sess.date.split('-');
    const btn = document.createElement('button');
    btn.className = 'session-item' + (isCurrent ? ' session-item--active' : '');
    btn.onclick = () => this.selectSession(sess.number);
    btn.innerHTML = '<span class="session-item-num">제' + sess.number + '차</span><span class="session-item-date-sm">' + parts[1] + '.' + parts[2] + '</span>';
    return btn;
  },

  _toggleYear(headerBtn) {
    const items = headerBtn.nextElementSibling;
    const isOpen = items.style.display !== 'none';
    items.style.display = isOpen ? 'none' : 'block';
    headerBtn.classList.toggle('session-year-header--open', !isOpen);
  },

  _toggleMonth(headerBtn) {
    const items = headerBtn.nextElementSibling;
    const isOpen = items.style.display !== 'none';
    items.style.display = isOpen ? 'none' : 'block';
    headerBtn.classList.toggle('session-month-header--open', !isOpen);
  },

  renderDropdown() { this.renderSidebar(); },
  toggleDropdown() {},

  saveSession() {
    const current = AppState.sessions.find(s => s.status === 'current');
    if (!current) { showToast('warning', '저장 실패', '현재 세션이 없습니다.'); return; }
    // 현재 세션을 완료 처리 → 히스토리로
    current.status = 'complete';
    // 새 세션 생성
    const newNum = current.number + 1;
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    AppState.sessions.unshift({ number: newNum, date: dateStr, status: 'current' });
    AppState.currentSession = newNum;
    // 파일·병합 상태 초기화
    AppState.files = [];
    AppState.mergedPdfBytes = null;
    AppState.departments.forEach(d => { d.submitted = false; d.fileId = null; });
    // 다운로드 버튼 다시 비활성화
    ['downloadHwpBtn','downloadPdfBtn','downloadHwpxBtn','previewOpenBtn'].forEach(id => {
      const el = document.getElementById(id); if (el) el.disabled = true;
    });
    DeptModule.renderDeptStatus();
    this.renderSidebar();
    showToast('success', '저장 완료', `6월2주차 회의가 히스토리에 저장되었습니다. 새 세션이 시작됩니다.`);
  },

  startNewSession() {
    const maxNum = Math.max(...AppState.sessions.map(s => s.number));
    const newNum = maxNum + 1;
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    AppState.sessions.unshift({ number: newNum, date: dateStr, status: 'current' });
    this.selectSession(newNum);
    showToast('success', '새 회의 등록', `제 ${newNum}차 주간점검회의가 새로 등록되었습니다.`);
  },

  selectSession(sessionNum) {
    AppState.currentSession = sessionNum;
    const el = document.getElementById('statCurrentSession');
    if (el) el.innerText = sessionNum;

    this.renderSidebar();
    showToast('success', '회의 차수 변경', `제 ${sessionNum}차 점검회의 세션으로 전환되었습니다.`);

    if (!AppState.sessions.find(s => s.number === sessionNum && s.status === 'current')) {
      // 과거 회의: 더미 데이터 로드
      AppState.files = [];
      AppState.departments.forEach((dept, i) => {
        dept.submitted = true;
        dept.fileId = `dummy_file_${i}`;
      });
      const sessObj = AppState.sessions.find(s => s.number === sessionNum);
      const sessDate = sessObj ? sessObj.date : new Date().toISOString().split('T')[0];
      AppState.departments.forEach((dept, i) => {
        const baseTime = new Date(sessDate + 'T09:00:00');
        baseTime.setMinutes(baseTime.getMinutes() + i * 7);
        AppState.files.push({
          id: `dummy_file_${i}`,
          file: new Blob([]),
          name: `${sessDate.slice(5,7)}${sessDate.slice(8,10)}_${dept.name}.hwpx`,
          size: 1024 * 120 + (i * 2400),
          type: 'hwpx',
          departmentName: dept.name,
          status: 'ok',
          errors: [],
          uploadedAt: baseTime.toISOString(),
          replacedAt: null
        });
      });
    } else {
      // 현재 세션: 초기화
      AppState.files = [];
      AppState.departments.forEach(dept => {
        dept.submitted = false;
        dept.fileId = null;
      });
    }

    UploadModule.renderFileList();
    DeptModule.renderDeptStatus();
    PreviewModule.closePreview();
  }
};

// ==========================================================================
// 9. 마감 타이머 모듈 (DeadlineTimer)
// ==========================================================================
const DeadlineTimer = {
  timerInterval: null,

  init() {
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 18);
    targetTime.setMinutes(30);
    targetTime.setSeconds(0);

    this.updateTimer(targetTime);

    this.timerInterval = setInterval(() => {
      this.updateTimer(targetTime);
    }, 1000);
  },

  updateTimer(target) {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const timerText = document.getElementById('deadlineTimer');

    if (!timerText) return;

    if (diff <= 0) {
      timerText.innerText = '마감 완료';
      timerText.style.color = 'var(--gri-error)';
      clearInterval(this.timerInterval);
      return;
    }

    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    timerText.innerText = `${hours}:${minutes}:${seconds}`;
  }
};

// ==========================================================================
// 10. 토스트 알림 모듈 (Toast Module)
// ==========================================================================
function showToast(type, title, message) {
  return; // 알림 비활성화
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toastId = 'toast_' + Date.now();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.id = toastId;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-octagon';
  if (type === 'warning') iconName = 'alert-triangle';

  toast.innerHTML = `
    <div class="toast__icon">
      <i data-lucide="${iconName}"></i>
    </div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" onclick="document.getElementById('${toastId}').remove()">
      <i data-lucide="x" style="width:14px;height:14px"></i>
    </button>
    <div class="toast__progress"></div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('toast--show');
  }, 10);

  setTimeout(() => {
    if (document.getElementById(toastId)) {
      toast.classList.remove('toast--show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }
  }, 3000);
}


// ==========================================================================
// 12. 공통 유틸리티 함수
// ==========================================================================
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatUploadTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const day = days[d.getDay()];
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${mm}.${dd}(${day}) ${hh}:${min}`;
}

window.addEventListener('click', (e) => {
  const dropdown = document.getElementById('sessionDropdown');
  const btn = document.querySelector('.session-dropdown-btn');
  if (dropdown && dropdown.classList.contains('session-dropdown--open')) {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      SessionModule.toggleDropdown();
    }
  }
});

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
    e.preventDefault();
    if (AppState.currentPage === 'weekly-report') {
      MergerModule.merge();
    }
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    if (AppState.currentPage === 'weekly-report') {
      MergerModule.downloadPdf();
    }
  }
  if (e.key === 'Escape') {
    ModalModule.closeModal();
    PreviewModule.closePreview();
    RecruitModule.closeVerifyDetail();
  }
});

// ==========================================================================
// 13. DOM 로드 완료 후 앱 초기화
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  Router.init();
  UploadModule.init();
  DeptModule.renderDeptStatus();
  SessionModule.init();
  DeadlineTimer.init();
});
