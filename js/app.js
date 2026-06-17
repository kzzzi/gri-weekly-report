/**
 * ==========================================================================
 * GRI 주간보고 취합 및 채용검증 서비스 공통 애플리케이션 로직 (app.js)
 * 경기연구원 Gyeonggi Research Institute
 * ==========================================================================
 */

// 전역 모듈 및 상태 관리 정의 (13개 지정 부서 및 채용 후보자 상태 통합)
const AppState = {
  currentPage: 'weekly-report', // 'home', 'weekly-report', 'recruitment'
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
    }
  ],

  sessions: [], // 1차 ~ 23차 데이터
  currentSession: 23,
  mergedPdfBytes: null,
  previewPdfDocument: null,
  currentPreviewPage: 1,
  totalPreviewPages: 1,
  previewZoom: 1.0,
  isDarkMode: false,
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
    
    document.getElementById('globalLoading').style.display = 'flex';
    document.getElementById('globalLoadingText').innerText = '업로드된 파일명 및 본문 전체 텍스트 추출 분석 중...';
    document.getElementById('globalProgressBar').style.display = 'block';
    
    const progressFill = document.getElementById('globalProgressFill');
    progressFill.style.width = '0%';

    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      const percent = Math.round(((i + 1) / newFiles.length) * 100);
      progressFill.style.width = `${percent}%`;

      const ext = file.name.split('.').pop().toLowerCase();
      if (!['pdf', 'hwp', 'hwpx'].includes(ext)) {
        document.getElementById('globalLoading').style.display = 'none';
        ModalModule.showModal('format_error', { fileName: file.name });
        return;
      }

      const maxSizeBytes = 50 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        document.getElementById('globalLoading').style.display = 'none';
        ModalModule.showModal('size_error', { fileName: file.name });
        return;
      }

      const parsedDeptName = await this.analyzeFileContentAndName(file);
      let matchedDept = AppState.departments.find(d => d.name === parsedDeptName);

      const existingFile = matchedDept && AppState.files.find(f => f.departmentName === matchedDept.name);
      if (existingFile) {
        document.getElementById('globalLoading').style.display = 'none';
        ModalModule.showModal('replace_confirm', {
          oldFileName: existingFile.name,
          newFileName: file.name,
          file: file,
          deptName: matchedDept.name
        });
        return;
      }

      this.addFileToState(file, matchedDept ? matchedDept.name : null, ext);
    }

    document.getElementById('globalLoading').style.display = 'none';
    this.renderFileList();
    DeptModule.renderDeptStatus();

    const listWrapper = document.getElementById('fileListWrapper');
    if (listWrapper) {
      listWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showToast('success', '업로드 및 매칭 완료', `${newFiles.length}개의 파일 본문 분석이 완료되어 부서별로 자동 매칭되었습니다.`);
  },

  async analyzeFileContentAndName(file) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
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

  renderFileList() {
    const fileListWrapper = document.getElementById('fileListWrapper');
    const fileList = document.getElementById('fileList');
    const fileCount = document.getElementById('fileCount');
    const statTotalFiles = document.getElementById('statTotalFiles');

    if (!fileListWrapper || !fileList) return;

    const emptyState = document.getElementById('fileEmptyState');
    if (fileCount) fileCount.innerText = AppState.files.length > 0 ? `${AppState.files.length}개` : '0개';
    if (statTotalFiles) statTotalFiles.innerText = AppState.files.length;
    fileList.innerHTML = '';
    if (AppState.files.length === 0) {
      fileListWrapper.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }
    fileListWrapper.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';

    AppState.files.forEach(fileData => {
      const sizeStr = formatFileSize(fileData.size);
      const fileTypeClass = `file-chip--${fileData.type}`;

      const fileChip = document.createElement('div');
      fileChip.className = `file-chip ${fileTypeClass} ${fileData.status === 'error' ? 'file-chip--error' : ''}`;
      fileChip.innerHTML = `
        <div class="file-chip__icon">${fileData.type.toUpperCase()}</div>
        <div class="file-chip__info">
          <span class="file-chip__name" title="${fileData.name}">${fileData.name}</span>
          <span class="file-chip__meta">
            <span class="file-chip__dept-badge">${fileData.departmentName}</span>
            <span>${sizeStr}</span>
          </span>
        </div>
        <div class="file-chip__actions">
          <button class="file-chip__btn file-chip__btn--download" onclick="UploadModule.downloadFile('${fileData.id}')" title="다운로드">
            <i data-lucide="download" style="width:14px;height:14px"></i>
          </button>
          <button class="file-chip__btn file-chip__btn--remove" onclick="UploadModule.removeFile('${fileData.id}')" title="삭제">
            <i data-lucide="trash-2" style="width:14px;height:14px"></i>
          </button>
        </div>
      `;
      fileList.appendChild(fileChip);
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

    this.renderDeptList();
  },

  renderDeptList() {
    const deptList = document.getElementById('deptList');
    if (!deptList) return;

    const existingForm = document.getElementById('deptAddForm');
    deptList.innerHTML = '';

    const sorted = [...AppState.departments].sort((a, b) => (a.submitted ? 1 : 0) - (b.submitted ? 1 : 0));

    sorted.forEach(dept => {
      const matchedFile = AppState.files.find(f => f.id === dept.fileId);
      const card = document.createElement('div');
      card.className = `dept-card ${dept.submitted ? 'dept-card--submitted' : 'dept-card--missing'}`;

      let bottomHtml = '';
      if (dept.submitted && matchedFile) {
        const isReplaced = !!matchedFile.replacedAt;
        const timeStr = isReplaced
          ? '교체 ' + formatUploadTime(matchedFile.replacedAt)
          : formatUploadTime(matchedFile.uploadedAt);
        bottomHtml = `
          <div class="dept-card-file" title="${matchedFile.name}">${matchedFile.name}</div>
          <div class="dept-card-time">${timeStr}</div>
        `;
      } else {
        bottomHtml = `
          <label class="dept-card-upload-btn">
            <i data-lucide="plus" style="width:11px;height:11px"></i> 업로드
            <input type="file" accept=".pdf,.hwp,.hwpx" hidden onchange="UploadModule.handleDeptUpload(this.files,${dept.id})">
          </label>
        `;
      }

      card.innerHTML = `
        <div class="dept-card-top">
          <span class="dept-card-name" title="${dept.name}">${dept.name}</span>
          <div class="dept-card-btns">
            ${dept.submitted
              ? `<button onclick="UploadModule.downloadFile('${dept.fileId}')" title="다운로드"><i data-lucide="download" style="width:11px;height:11px"></i></button>`
              : ''}
            <button onclick="DeptModule.editDepartment(${dept.id})" title="수정"><i data-lucide="edit-3" style="width:11px;height:11px"></i></button>
            <button onclick="DeptModule.deleteDepartment(${dept.id})" title="삭제"><i data-lucide="trash-2" style="width:11px;height:11px"></i></button>
          </div>
        </div>
        ${bottomHtml}
      `;
      deptList.appendChild(card);
    });

    if (existingForm) deptList.appendChild(existingForm);
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

    const missingDepts = AppState.departments.filter(d => !d.submitted);
    if (missingDepts.length > 0) {
      const missingNames = missingDepts.map(d => d.name);
      ModalModule.showModal('missing_depts', { missingNames: missingNames });
      return;
    }

    await this.executeMerge();
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

      for (let i = 0; i < AppState.files.length; i++) {
        const fileData = AppState.files[i];
        progressFill.style.width = `${40 + Math.round((i / AppState.files.length) * 40)}%`;

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

      document.getElementById('downloadPdfBtn').removeAttribute('disabled');
      document.getElementById('downloadHwpxBtn').removeAttribute('disabled');

      // 미리보기 버튼 표시
      const previewBtn = document.getElementById('previewOpenBtn');
      if (previewBtn) previewBtn.style.display = 'inline-flex';

      showToast('success', '병합 성공', '모든 부서의 파일들이 HWPX 기준 통합 문서로 병합 완료되었습니다. 미리보기를 확인하세요.');

      PreviewModule.openPreview(mergedPdfBytes);

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

  openPreviewModal() {
    const overlay = document.getElementById('previewModalOverlay');
    if (overlay) overlay.classList.add('preview-modal-overlay--open');
    if (AppState.previewPdfDocument) {
      this.renderPage(AppState.currentPreviewPage);
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

  init() {
    // 페이지 진입마다 상태 유지
    this._showView(this._hasUploaded);
    if (this._hasUploaded) {
      this._updateTabCounts();
      this.renderTable();
    }
  },

  _showView(uploaded) {
    const zone = document.getElementById('recruitUploadZone');
    const list = document.getElementById('recruitListView');
    if (zone) zone.style.display = uploaded ? 'none' : 'flex';
    if (list) list.style.display = uploaded ? 'flex' : 'none';
  },

  _isAnomalous(c) {
    const doc = c.verification.documents.status !== 'ok' && c.verification.documents.status !== 'pending';
    const paper = c.verification.paper.applicable && c.verification.paper.status !== 'ok' && c.verification.paper.status !== 'na' && c.verification.paper.status !== 'pending';
    const blind = c.verification.blind.issues && c.verification.blind.issues.length > 0;
    const ev = c.verification.evaluator.recommended && c.verification.evaluator.recommended.some(e => e.conflict);
    return doc || paper || blind || ev;
  },

  _filtered() {
    let list = AppState.candidates.filter(c => {
      if (this._filter === 'done') return c.reviewStatus === 'completed';
      if (this._filter === 'pending') return this._isAnomalous(c) && c.reviewStatus !== 'completed';
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

  _evalAvg(c) {
    const scores = (c.verification.evaluator.recommended || [])
      .filter(e => !e.conflict && e.score != null)
      .map(e => e.score);
    return scores.length ? scores.reduce((s, v) => s + v, 0) / scores.length : null;
  },

  _updateTabCounts() {
    const total = AppState.candidates.length;
    const done = AppState.candidates.filter(c => c.reviewStatus === 'completed').length;
    const pending = AppState.candidates.filter(c => this._isAnomalous(c) && c.reviewStatus !== 'completed').length;
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.innerText = v; };
    set('rtcAll', total); set('rtcPending', pending); set('rtcDone', done);
  },

  // ── 폴더 드래그앤드롭 ──
  onDragOver(e) {
    e.preventDefault();
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.add('recruit-upload-zone--over');
  },
  onDragLeave(e) {
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.remove('recruit-upload-zone--over');
  },
  onDrop(e) {
    e.preventDefault();
    const zone = document.getElementById('recruitUploadZone');
    if (zone) zone.classList.remove('recruit-upload-zone--over');
    const files = e.dataTransfer ? e.dataTransfer.files : null;
    this.handleUpload(files);
  },

  handleUpload(files) {
    if (files && files.length > 0) {
      const validExts = ['pdf', 'hwpx', 'docx'];
      const invalid = Array.from(files).find(f => !validExts.includes(f.name.split('.').pop().toLowerCase()));
      if (invalid) {
        ModalModule.showModal('recruit_format_error', { fileName: invalid.name });
        return;
      }
    }
    this._loadDummyData();
  },

  _loadDummyData() {
    // 더미 5명 데이터는 이미 AppState.candidates에 있음 — 그냥 뷰 전환
    this._hasUploaded = true;
    this._showView(true);
    this._filter = 'all';
    document.querySelectorAll('.recruit-tab').forEach(btn => {
      btn.classList.toggle('recruit-tab--active', btn.dataset.filter === 'all');
    });
    this._updateTabCounts();
    this.renderTable();
  },

  setFilter(filter) {
    this._filter = filter;
    document.querySelectorAll('.recruit-tab').forEach(btn => {
      btn.classList.toggle('recruit-tab--active', btn.dataset.filter === filter);
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
    const tbody = document.getElementById('recruitTableBody');
    if (!tbody) return;
    const list = this._filtered();
    tbody.innerHTML = '';
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--gri-text-secondary);font-size:0.82rem;">해당하는 지원자가 없습니다</td></tr>`;
      return;
    }
    list.forEach((c, idx) => {
      const anomaly = this._isAnomalous(c);
      const isSelected = this._selectedId === c.id;
      const docS = c.verification.documents.status;
      const paperS = c.verification.paper.applicable ? c.verification.paper.status : 'na';
      const blindS = (c.verification.blind.issues && c.verification.blind.issues.length > 0) ? 'warning'
        : (c.verification.blind.status === 'pending' ? 'pending' : 'ok');
      const evalAvg = this._evalAvg(c);
      const hasConflict = c.verification.evaluator.recommended && c.verification.evaluator.recommended.some(e => e.conflict);
      const evalCell = evalAvg != null
        ? `<span class="rc-eval-avg${hasConflict ? ' rc-eval-avg--conflict' : ''}">${evalAvg.toFixed(1)}</span>`
        : `<span class="rc-badge rc-badge--pending">—</span>`;

      const reviewBadge = c.reviewStatus === 'completed'
        ? '<span class="rc-status rc-status--done">검토완료</span>'
        : (anomaly ? '<span class="rc-status rc-status--anomaly">이상탐지</span>' : '<span class="rc-status rc-status--pending">대기</span>');

      const tr = document.createElement('tr');
      tr.className = `rc-row${isSelected ? ' rc-row--selected' : ''}`;
      tr.onclick = () => this.selectCandidate(c.id);
      tr.innerHTML = `
        <td class="rc-td rc-td--num">${idx + 1}</td>
        <td class="rc-td rc-td--main">
          <div class="rc-cand-name">${c.name}</div>
          <div class="rc-cand-meta">${c.position} · ${c.field}</div>
        </td>
        <td class="rc-td rc-td--badge">${this._statusBadge(docS)}</td>
        <td class="rc-td rc-td--badge">${this._statusBadge(paperS)}</td>
        <td class="rc-td rc-td--badge">${this._statusBadge(blindS)}</td>
        <td class="rc-td rc-td--badge">${evalCell}</td>
        <td class="rc-td rc-td--status">${reviewBadge}</td>
      `;
      tbody.appendChild(tr);
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

    // ── 서류 검증 (아코디언) ──
    const docRows = c.verification.documents.categories.map((cat, ci) => {
      const icon = this._docIcon(cat.status);
      const cls  = this._docCls(cat.status);
      const hasIssue = cat.status !== 'ok' && cat.status !== 'na';
      const hasSub = cat.subItems && cat.subItems.length > 0;
      const subHtml = hasSub ? cat.subItems.map(s => `
        <div class="rd-sub-row">
          <span class="rd-sub-icon rc-badge--${this._docCls(s.status)}">${this._docIcon(s.status)}</span>
          <span class="rd-sub-name">${s.name}</span>
          ${s.note ? `<span class="rd-sub-note">${s.note}</span>` : ''}
        </div>`).join('') : '';
      return `
        <div class="rd-doc-accordion${hasIssue ? ' rd-doc-accordion--issue' : ''}">
          <div class="rd-doc-header" onclick="this.parentElement.classList.toggle('rd-doc-accordion--open')">
            <span class="rc-badge rc-badge--${cls} rd-doc-badge">${icon}</span>
            <span class="rd-doc-name">${cat.name}</span>
            ${cat.note ? `<span class="rd-doc-note">${cat.note}</span>` : ''}
            ${hasSub ? `<span class="rd-doc-chevron">›</span>` : ''}
          </div>
          ${hasSub ? `<div class="rd-doc-subs">${subHtml}</div>` : ''}
        </div>`;
    }).join('');

    // ── 논문 검증 ──
    let paperHtml = '';
    if (!c.verification.paper.applicable) {
      paperHtml = `<p class="rd-na">연구직이 아니므로 해당 없음</p>`;
    } else if (!c.verification.paper.items || c.verification.paper.items.length === 0) {
      paperHtml = `<p class="rd-na">논문 정보 없음</p>`;
    } else {
      paperHtml = c.verification.paper.items.map(p => {
        const cls = p.status === 'ok' ? 'ok' : 'warn';
        const label = { ok: '등재확인', warning: '주의', unverified: '미확인' }[p.status] || p.status;
        return `<div class="rd-paper-item">
          <div class="rd-paper-row">
            <span class="rd-paper-title">${p.title}</span>
            <span class="rc-badge rc-badge--${cls} rd-paper-badge">${label}</span>
          </div>
          <div class="rd-paper-meta">${p.journal} · ${p.year} · ${p.authors}</div>
          ${p.note ? `<div class="rd-paper-note">${p.note}</div>` : ''}
        </div>`;
      }).join('');
    }

    // ── 블라인드 ──
    let blindHtml = '';
    if (!c.verification.blind.issues || c.verification.blind.issues.length === 0) {
      blindHtml = `<div class="rd-blind-clear"><span class="rc-badge rc-badge--ok" style="margin-right:6px;">✓</span>위반 문구 미탐지</div>`;
    } else {
      blindHtml = c.verification.blind.issues.map(issue => `
        <div class="rd-blind-item rd-blind-item--${issue.severity}">
          <span class="rd-blind-type">${issue.type}</span>
          <span class="rd-blind-excerpt">${issue.excerpt}</span>
        </div>`).join('');
    }

    // ── 평가위원 (점수 내림차순 정렬) ──
    let evalHtml = '';
    const evalList = c.verification.evaluator.recommended || [];
    if (evalList.length === 0) {
      evalHtml = `<p class="rd-na">평가위원 추천 정보 없음</p>`;
    } else {
      const sorted = [...evalList].sort((a, b) => {
        if (a.conflict && !b.conflict) return 1;
        if (!a.conflict && b.conflict) return -1;
        return (b.score || 0) - (a.score || 0);
      });
      evalHtml = sorted.map((ev, i) => {
        const rank = !ev.conflict ? `<span class="rd-eval-rank">${i + 1}</span>` : '';
        const scorePart = ev.conflict
          ? `<span class="rd-eval-conflict-badge">이해충돌${ev.conflictReason ? ' · ' + ev.conflictReason : ''}</span>`
          : `<span class="rd-eval-score">${ev.score != null ? ev.score.toFixed(1) : '—'}<small>/10</small></span>`;
        return `<div class="rd-eval-row${ev.conflict ? ' rd-eval-row--conflict' : ''}">
          ${rank}
          <span class="rd-eval-name">${ev.name}</span>
          <span class="rd-eval-affil">${ev.affil}</span>
          ${scorePart}
        </div>`;
      }).join('');
    }

    content.innerHTML = `
      <div class="rd-header">
        <div>
          <div class="rd-cand-name">${c.name}</div>
          <div class="rd-cand-meta">${c.position} · ${c.field}</div>
        </div>
        ${c.reviewStatus === 'completed'
          ? `<button class="btn btn--sm" style="border:1px solid var(--gri-border);color:var(--gri-text-secondary);" onclick="RecruitModule.cancelReviewed(${c.id})">검토취소</button>`
          : `<button class="btn btn--primary btn--sm" onclick="RecruitModule.markReviewed(${c.id})">검토완료</button>`}
      </div>
      <div class="rd-body">
        <div class="rd-section">
          <div class="rd-section-title"><i data-lucide="file-check" style="width:12px;height:12px"></i> 서류 검증</div>
          <div class="rd-doc-list">${docRows}</div>
        </div>
        <div class="rd-section">
          <div class="rd-section-title"><i data-lucide="book-open" style="width:12px;height:12px"></i> 논문 검증</div>
          ${paperHtml}
        </div>
        <div class="rd-section">
          <div class="rd-section-title"><i data-lucide="eye-off" style="width:12px;height:12px"></i> 블라인드 검토</div>
          ${blindHtml}
        </div>
        <div class="rd-section">
          <div class="rd-section-title"><i data-lucide="users" style="width:12px;height:12px"></i> 평가위원 매칭</div>
          ${evalHtml}
        </div>
        ${c.reviewNote ? `<div class="rd-note"><strong>검토 메모:</strong> ${c.reviewNote}</div>` : ''}
      </div>
    `;
    lucide.createIcons();
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

  renderSidebar(filterText) {
    const list = document.getElementById('sessionSidebarList');
    if (!list) return;

    list.innerHTML = '';
    const query = (filterText || '').toLowerCase().trim();
    const allSessions = [...AppState.sessions].reverse();
    const filtered = query
      ? allSessions.filter(s => String(s.number).includes(query) || s.date.includes(query))
      : allSessions;

    if (filtered.length === 0) {
      list.innerHTML = '<div style="padding:12px 14px;font-size:0.8rem;color:var(--gri-text-muted);">검색 결과 없음</div>';
      return;
    }

    if (query) {
      // 검색 중: flat 목록
      const label = document.createElement('div');
      label.className = 'session-search-result-label';
      label.textContent = filtered.length + '건 검색됨';
      list.appendChild(label);
      filtered.forEach(sess => list.appendChild(this._makeSessionBtn(sess)));
    } else {
      // 연도 → 월 그룹
      const byYear = {};
      filtered.forEach(sess => {
        const parts = sess.date.split('-');
        const y = parts[0];
        const m = parts[1];
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
    }
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

  onSearch(value) { this.renderSidebar(value); },

  // 구버전 호환
  renderDropdown() { this.renderSidebar(); },
  toggleDropdown() {},

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
// 11. 다크 모드 모듈 (DarkMode)
// ==========================================================================
const DarkMode = {
  init() {
    const savedTheme = localStorage.getItem('gri_theme');
    if (savedTheme === 'dark') {
      this.setTheme(true);
    } else {
      this.setTheme(false);
    }
  },

  toggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    this.setTheme(!isDark);
  },

  setTheme(isDark) {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('gri_theme', 'dark');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i data-lucide="sun"></i>';
      }
      AppState.isDarkMode = true;
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('gri_theme', 'light');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i data-lucide="moon"></i>';
      }
      AppState.isDarkMode = false;
    }
    lucide.createIcons();
  }
};

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
  DarkMode.init();
});
