const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

// ── 전역 설정 ──────────────────────────────────────────────
pptx.layout = 'LAYOUT_WIDE'; // 16:9 wide

const C = {
  primary:   '#2563EB',
  dark:      '#1D4ED8',
  light:     '#3B82F6',
  bg:        '#F9FAFB',
  surface:   '#FFFFFF',
  border:    '#E5E7EB',
  textMain:  '#212121',
  textSub:   '#6B7280',
  textMuted: '#9CA3AF',
  success:   '#10B981',
  error:     '#EF4444',
  warning:   '#F59E0B',
  navy:      '#1E3A5F',
};

const FONT = 'Pretendard';

// ── 슬라이드 헬퍼 ─────────────────────────────────────────
function addSlide(title, subtitle) {
  const slide = pptx.addSlide();

  // 좌측 컬러 바
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.18, h: '100%',
    fill: { color: C.primary },
  });

  // 타이틀 배경 띠
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.18, y: 0, w: '100%', h: 1.2,
    fill: { color: C.navy },
  });

  // 타이틀
  slide.addText(title, {
    x: 0.45, y: 0.18, w: 8.5, h: 0.55,
    fontSize: 26, bold: true, color: C.surface,
    fontFace: FONT,
  });

  // 서브타이틀
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.45, y: 0.72, w: 8.5, h: 0.38,
      fontSize: 13, color: C.textMuted,
      fontFace: FONT,
    });
  }

  // 로고 텍스트 (우상단)
  slide.addText('GRI 채용자격검증', {
    x: 8.2, y: 0.08, w: 3.0, h: 0.35,
    fontSize: 10, color: '#93C5FD', align: 'right',
    fontFace: FONT,
  });

  return slide;
}

function row(slide, x, y, w, h, cells, opts = {}) {
  const colW = cells.map(c => c.w || (w / cells.length));
  let cx = x;
  cells.forEach((cell, i) => {
    const cw = colW[i];
    if (cell.bg) {
      slide.addShape(pptx.ShapeType.rect, {
        x: cx, y, w: cw, h,
        fill: { color: cell.bg },
        line: { color: C.border, w: 0.5 },
      });
    }
    if (cell.text !== undefined) {
      slide.addText(String(cell.text), {
        x: cx + 0.06, y, w: cw - 0.12, h,
        fontSize: cell.size || opts.size || 10,
        bold: cell.bold || false,
        color: cell.color || opts.color || C.textMain,
        fontFace: FONT,
        valign: 'middle',
        align: cell.align || 'left',
      });
    }
    cx += cw;
  });
}

function swatch(slide, x, y, color, label, sub) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 1.5, h: 0.8,
    fill: { color },
    line: { color: C.border, w: 0.5 },
    shadow: { type: 'outer', color: '000000', opacity: 0.08, blur: 4, offset: 2, angle: 45 },
  });
  slide.addText(label, {
    x, y: y + 0.82, w: 1.5, h: 0.22,
    fontSize: 9, bold: true, color: C.textMain,
    fontFace: FONT, align: 'center',
  });
  if (sub) {
    slide.addText(sub, {
      x, y: y + 1.02, w: 1.5, h: 0.18,
      fontSize: 8, color: C.textMuted,
      fontFace: FONT, align: 'center',
    });
  }
}

function pill(slide, x, y, text, bg, textColor) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: 1.3, h: 0.32,
    fill: { color: bg },
    line: { color: bg, w: 0 },
    rectRadius: 0.16,
  });
  slide.addText(text, {
    x, y, w: 1.3, h: 0.32,
    fontSize: 9.5, bold: true, color: textColor,
    fontFace: FONT, align: 'center', valign: 'middle',
  });
}

function section(slide, x, y, label) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.06, h: 0.28,
    fill: { color: C.primary },
  });
  slide.addText(label, {
    x: x + 0.12, y, w: 4, h: 0.28,
    fontSize: 13, bold: true, color: C.textMain,
    fontFace: FONT,
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 1 — 커버
// ════════════════════════════════════════════════════════════
{
  const slide = pptx.addSlide();

  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { color: C.navy },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 0.35, h: '100%',
    fill: { color: C.primary },
  });
  // 장식 원
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 7.5, y: -1, w: 4, h: 4,
    fill: { color: C.primary, transparency: 82 },
    line: { color: C.primary, transparency: 82 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: 9.5, y: 3.5, w: 2.5, h: 2.5,
    fill: { color: C.light, transparency: 88 },
    line: { color: C.light, transparency: 88 },
  });

  slide.addText('GRI 채용자격검증', {
    x: 0.7, y: 1.6, w: 9, h: 0.65,
    fontSize: 36, bold: true, color: C.surface,
    fontFace: FONT,
  });
  slide.addText('Style Guide', {
    x: 0.7, y: 2.3, w: 9, h: 0.5,
    fontSize: 28, color: '#93C5FD',
    fontFace: FONT,
  });
  slide.addText('컬러 · 타이포그래피 · 버튼 · 배지 · 테이블 · 레이아웃', {
    x: 0.7, y: 3.0, w: 9, h: 0.38,
    fontSize: 13, color: C.textMuted,
    fontFace: FONT,
  });
  slide.addText('경기연구원 채용자격검증 웹앱  |  2026-06-19', {
    x: 0.7, y: 4.8, w: 9, h: 0.28,
    fontSize: 10, color: '#4B5563',
    fontFace: FONT,
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 2 — 컬러 시스템
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('컬러 시스템', 'Brand · Text · Background · Status');

  section(slide, 0.45, 1.35, '브랜드 컬러');
  swatch(slide, 0.45, 1.7,  C.primary, 'Primary',     '#2563EB');
  swatch(slide, 2.05, 1.7,  C.dark,    'Primary Dark', '#1D4ED8');
  swatch(slide, 3.65, 1.7,  C.light,   'Primary Light','#3B82F6');
  swatch(slide, 5.25, 1.7,  '#EFF6FF',  'Primary 50',  '#EFF6FF');

  section(slide, 0.45, 3.1, '텍스트 & 배경');
  swatch(slide, 0.45, 3.45, C.textMain,  'Text Primary',   '#212121');
  swatch(slide, 2.05, 3.45, C.textSub,   'Text Secondary', '#6B7280');
  swatch(slide, 3.65, 3.45, C.textMuted, 'Text Muted',     '#9CA3AF');
  swatch(slide, 5.25, 3.45, C.bg,        'BG',             '#F9FAFB');
  swatch(slide, 6.85, 3.45, C.surface,   'Surface',        '#FFFFFF');

  section(slide, 0.45, 4.85, '상태 컬러');
  swatch(slide, 0.45, 5.2,  C.success, 'Success', '#10B981');
  swatch(slide, 2.05, 5.2,  C.error,   'Error',   '#EF4444');
  swatch(slide, 3.65, 5.2,  C.warning, 'Warning', '#F59E0B');
  swatch(slide, 5.25, 5.2,  C.textMuted, 'Border', '#E5E7EB');
}

// ════════════════════════════════════════════════════════════
// 슬라이드 3 — 타이포그래피
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('타이포그래피', 'Pretendard — 한글 최적화 폰트');

  const rows = [
    { label: '페이지 타이틀',   size: 22, weight: 'Bold',    sample: '채용자격검증 시스템' },
    { label: '섹션 헤더',       size: 16, weight: 'Bold',    sample: '지원자 상세 검증 결과' },
    { label: '본문 (기본)',      size: 13, weight: 'Regular', sample: '서류 미확인 2건이 탐지되었습니다.' },
    { label: '보조 텍스트',     size: 12, weight: 'Regular', sample: '소속기관 및 전문분야 정보' },
    { label: '라벨 · 캡션',    size: 11, weight: 'Medium',  sample: '서류 / 논문 / 블라인드' },
    { label: '마이크로 텍스트', size: 10, weight: 'Bold',    sample: '완료  검토  0.85' },
  ];

  const headerBg = C.navy;
  // header
  row(slide, 0.45, 1.35, 11.8, 0.36,
    [
      { text: '용도',         w: 2.2, bg: headerBg, bold: true, color: 'FFFFFF', align: 'center' },
      { text: '크기',         w: 1.2, bg: headerBg, bold: true, color: 'FFFFFF', align: 'center' },
      { text: '굵기',         w: 1.5, bg: headerBg, bold: true, color: 'FFFFFF', align: 'center' },
      { text: '예시 텍스트',  w: 6.9, bg: headerBg, bold: true, color: 'FFFFFF' },
    ], { size: 10 }
  );

  rows.forEach((r, i) => {
    const y = 1.35 + 0.36 + i * 0.48;
    const bg = i % 2 === 0 ? C.surface : C.bg;
    row(slide, 0.45, y, 11.8, 0.46,
      [
        { text: r.label,  w: 2.2, bg, color: C.textSub,  size: 10 },
        { text: r.size + 'pt', w: 1.2, bg, color: C.primary, bold: true, size: 10, align: 'center' },
        { text: r.weight, w: 1.5, bg, color: C.textMuted, size: 10, align: 'center' },
        { text: r.sample, w: 6.9, bg, bold: r.weight === 'Bold', size: r.size > 16 ? 14 : r.size > 12 ? 12 : r.size > 10 ? 11 : 10 },
      ]
    );
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 4 — 버튼
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('버튼 시스템', '크기 변형 · 스타일 변형 · 상태');

  section(slide, 0.45, 1.35, '스타일 변형');

  // Primary
  slide.addShape(pptx.ShapeType.roundRect, { x:0.45, y:1.75, w:2.0, h:0.52, fill:{color:C.primary}, line:{color:C.primary}, rectRadius:0.1 });
  slide.addText('Primary', { x:0.45, y:1.75, w:2.0, h:0.52, fontSize:12, bold:true, color:'FFFFFF', fontFace:FONT, align:'center', valign:'middle' });
  slide.addText('주요 액션 (검토완료, 추가)', { x:0.45, y:2.32, w:2.0, h:0.28, fontSize:8.5, color:C.textSub, fontFace:FONT, align:'center' });

  // Secondary
  slide.addShape(pptx.ShapeType.roundRect, { x:2.75, y:1.75, w:2.0, h:0.52, fill:{color:C.surface}, line:{color:C.border, w:1}, rectRadius:0.1 });
  slide.addText('Secondary', { x:2.75, y:1.75, w:2.0, h:0.52, fontSize:12, bold:true, color:C.textMain, fontFace:FONT, align:'center', valign:'middle' });
  slide.addText('보조 액션 (Map, 미리보기)', { x:2.75, y:2.32, w:2.0, h:0.28, fontSize:8.5, color:C.textSub, fontFace:FONT, align:'center' });

  // Ghost
  slide.addShape(pptx.ShapeType.roundRect, { x:5.05, y:1.75, w:2.0, h:0.52, fill:{color:'F3F4F6'}, line:{color:'F3F4F6'}, rectRadius:0.1 });
  slide.addText('Ghost', { x:5.05, y:1.75, w:2.0, h:0.52, fontSize:12, bold:true, color:C.textSub, fontFace:FONT, align:'center', valign:'middle' });
  slide.addText('최소화 동작 (완료해제, 저장)', { x:5.05, y:2.32, w:2.0, h:0.28, fontSize:8.5, color:C.textSub, fontFace:FONT, align:'center' });

  // Danger
  slide.addShape(pptx.ShapeType.roundRect, { x:7.35, y:1.75, w:2.0, h:0.52, fill:{color:C.error}, line:{color:C.error}, rectRadius:0.1 });
  slide.addText('Danger', { x:7.35, y:1.75, w:2.0, h:0.52, fontSize:12, bold:true, color:'FFFFFF', fontFace:FONT, align:'center', valign:'middle' });
  slide.addText('삭제 · 경고 액션', { x:7.35, y:2.32, w:2.0, h:0.28, fontSize:8.5, color:C.textSub, fontFace:FONT, align:'center' });

  // Disabled
  slide.addShape(pptx.ShapeType.roundRect, { x:9.65, y:1.75, w:2.0, h:0.52, fill:{color:C.primary, transparency:50}, line:{color:C.primary, transparency:50}, rectRadius:0.1 });
  slide.addText('Disabled', { x:9.65, y:1.75, w:2.0, h:0.52, fontSize:12, bold:true, color:'FFFFFF', fontFace:FONT, align:'center', valign:'middle' });
  slide.addText('비활성 (opacity 50%)', { x:9.65, y:2.32, w:2.0, h:0.28, fontSize:8.5, color:C.textSub, fontFace:FONT, align:'center' });

  section(slide, 0.45, 2.78, '크기 변형');

  const sizes = [
    { label: '.btn--lg',  pad: '12 / 28px', size: '1.05rem', radius: '10px', w: 2.5, h: 0.62 },
    { label: '.btn',      pad: '10 / 20px', size: '0.95rem', radius: '10px', w: 2.1, h: 0.52 },
    { label: '.btn--sm',  pad: '6 / 14px',  size: '0.85rem', radius: '8px',  w: 1.7, h: 0.42 },
    { label: '.btn--icon', pad: '40 × 40px', size: '—',       radius: '50%',  w: 0.65, h: 0.65 },
  ];

  let bx = 0.45;
  sizes.forEach(s => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: bx, y: 3.1, w: s.w, h: s.h,
      fill: { color: C.primary }, line: { color: C.primary },
      rectRadius: 0.08,
    });
    slide.addText(s.label, { x: bx, y: 3.1, w: s.w, h: s.h, fontSize: Math.min(11, s.w * 5), bold: true, color: 'FFFFFF', fontFace: FONT, align: 'center', valign: 'middle' });
    slide.addText(`패딩: ${s.pad}\n크기: ${s.size}\nradius: ${s.radius}`, {
      x: bx, y: 3.1 + s.h + 0.05, w: s.w + 0.3, h: 0.6,
      fontSize: 8, color: C.textSub, fontFace: FONT, align: 'center',
    });
    bx += s.w + 0.45;
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 5 — 배지 & 상태 칩
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('배지 & 상태 칩', '지원자 상태 · 건수 카운트 · 인라인 배지');

  section(slide, 0.45, 1.35, '지원자 목록 상태 (.rc-status)');
  pill(slide, 0.45, 1.72, '완료',   'DBEAFE', C.dark);
  pill(slide, 1.95, 1.72, '검토',   'FEE2E2', C.error);
  slide.addText('완료: primary 10% bg  |  검토: error 8% bg  |  font-size 0.68rem · weight 700', {
    x: 3.5, y: 1.72, w: 8.8, h: 0.32, fontSize: 9.5, color: C.textSub, fontFace: FONT, valign: 'middle',
  });

  section(slide, 0.45, 2.22, '건수 카운트 (.rc-cnt)');
  // N/M 예시
  slide.addShape(pptx.ShapeType.rect, { x:0.45, y:2.6, w:2.8, h:0.38, fill:{color:C.bg}, line:{color:C.border, w:0.5} });
  slide.addText('2', { x:0.55, y:2.6, w:0.3, h:0.38, fontSize:11, bold:true, color:C.error, fontFace:FONT, valign:'middle' });
  slide.addText('/', { x:0.83, y:2.6, w:0.25, h:0.38, fontSize:10, color:C.textMuted, fontFace:FONT, valign:'middle' });
  slide.addText('6', { x:1.05, y:2.6, w:0.3, h:0.38, fontSize:11, bold:true, color:C.textMuted, fontFace:FONT, valign:'middle' });
  slide.addText('이상건수 / 전체건수  →  오류: error색 / 전체: muted색', { x:1.55, y:2.6, w:5, h:0.38, fontSize:9, color:C.textSub, fontFace:FONT, valign:'middle' });

  section(slide, 0.45, 3.12, '인라인 배지 (.rc-badge)');
  const badges = [
    { text: 'O',  bg: 'DBEAFE', color: C.primary, label: '--ok' },
    { text: 'X',  bg: 'FEE2E2', color: C.error,   label: '--warn / --miss' },
    { text: '—',  bg: 'F3F4F6', color: C.textMuted,label: '--pending' },
    { text: 'N/A', bg: C.surface, color: C.textMuted,label: '--na (투명)' },
  ];
  let bx = 0.45;
  badges.forEach(b => {
    slide.addShape(pptx.ShapeType.roundRect, { x:bx, y:3.5, w:0.55, h:0.38, fill:{color:b.bg}, line:{color:C.border, w:0.5}, rectRadius:0.04 });
    slide.addText(b.text, { x:bx, y:3.5, w:0.55, h:0.38, fontSize:9, bold:true, color:b.color, fontFace:FONT, align:'center', valign:'middle' });
    slide.addText(b.label, { x:bx, y:3.92, w:1.3, h:0.24, fontSize:8, color:C.textMuted, fontFace:FONT, align:'center' });
    bx += 1.55;
  });

  section(slide, 0.45, 4.32, '일반 배지 (.badge)');
  const gb = [
    { text:'성공', bg:'D1FAE5', color:'065F46' },
    { text:'경고', bg:'FEF3C7', color:'92400E' },
    { text:'위험', bg:'FEE2E2', color:'991B1B' },
    { text:'정보', bg:'DBEAFE', color:'1E40AF' },
  ];
  let gx = 0.45;
  gb.forEach(b => {
    slide.addShape(pptx.ShapeType.roundRect, { x:gx, y:4.68, w:1.2, h:0.34, fill:{color:b.bg}, line:{color:b.bg}, rectRadius:0.17 });
    slide.addText(b.text, { x:gx, y:4.68, w:1.2, h:0.34, fontSize:10, bold:true, color:b.color, fontFace:FONT, align:'center', valign:'middle' });
    gx += 1.5;
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 6 — 테이블
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('테이블 구조', '지원자 목록 · 평가위원 테이블');

  section(slide, 0.45, 1.35, '지원자 목록 테이블');
  slide.addText('grid-template-columns: 24px  1fr  36px  36px  50px  52px', {
    x: 0.45, y: 1.68, w: 11, h: 0.26, fontSize: 9.5, color: C.primary, fontFace: FONT,
  });
  const h1 = ['번호','이름+직책','서류 N/M','논문 N/M','블라인드 N건','상태'];
  const w1 = [0.4, 3.5, 1.5, 1.5, 1.8, 2.0];
  let cx = 0.45;
  h1.forEach((t, i) => {
    slide.addShape(pptx.ShapeType.rect, { x:cx, y:1.98, w:w1[i], h:0.38, fill:{color:C.navy}, line:{color:C.border, w:0.5} });
    slide.addText(t, { x:cx, y:1.98, w:w1[i], h:0.38, fontSize:9.5, bold:true, color:'FFFFFF', fontFace:FONT, align:'center', valign:'middle' });
    cx += w1[i];
  });
  const rows1 = [
    ['01','홍길동  |  연구원','1/6','2/4','3건','검토'],
    ['02','이서연  |  선임연구원','0/6','0/3','0건','완료'],
  ];
  rows1.forEach((r, ri) => {
    cx = 0.45;
    r.forEach((t, i) => {
      const bg = ri % 2 === 0 ? C.surface : C.bg;
      slide.addShape(pptx.ShapeType.rect, { x:cx, y:2.36+ri*0.38, w:w1[i], h:0.38, fill:{color:bg}, line:{color:C.border, w:0.5} });
      const color = i===4 && t!=='0건' ? C.error : i===5 && t==='검토' ? C.error : i===5 && t==='완료' ? C.primary : C.textMain;
      slide.addText(t, { x:cx+0.05, y:2.36+ri*0.38, w:w1[i]-0.1, h:0.38, fontSize:9.5, color, bold:i===5, fontFace:FONT, align:'center', valign:'middle' });
      cx += w1[i];
    });
  });

  section(slide, 0.45, 3.35, '평가위원 테이블');
  slide.addText('grid-template-columns: 90px  1.6fr  1fr  90px  65px  65px', {
    x: 0.45, y: 3.68, w: 11, h: 0.26, fontSize: 9.5, color: C.primary, fontFace: FONT,
  });
  const h2 = ['이름','소속','전문분야','연관성 지수','최고','최저'];
  const w2 = [1.4, 3.0, 2.0, 1.5, 1.1, 1.1];
  cx = 0.45;
  h2.forEach((t, i) => {
    slide.addShape(pptx.ShapeType.rect, { x:cx, y:3.98, w:w2[i], h:0.38, fill:{color:C.navy}, line:{color:C.border, w:0.5} });
    slide.addText(t, { x:cx, y:3.98, w:w2[i], h:0.38, fontSize:9.5, bold:true, color:'FFFFFF', fontFace:FONT, align:'center', valign:'middle' });
    cx += w2[i];
  });
  const rows2 = [['강민철','경기연구원','도시계획','0.82','0.93','0.64']];
  rows2.forEach((r, ri) => {
    cx = 0.45;
    r.forEach((t, i) => {
      slide.addShape(pptx.ShapeType.rect, { x:cx, y:4.36, w:w2[i], h:0.38, fill:{color:C.surface}, line:{color:C.border, w:0.5} });
      slide.addText(t, { x:cx+0.05, y:4.36, w:w2[i]-0.1, h:0.38, fontSize:9.5, color:C.textMain, fontFace:FONT, align:'center', valign:'middle' });
      cx += w2[i];
    });
  });
  slide.addText('* 연관성 지수·최고·최저 모두 소수점 2자리 표기  |  색상 구분 없이 black 통일', {
    x: 0.45, y: 4.82, w: 11, h: 0.22, fontSize: 8.5, color: C.textMuted, fontFace: FONT,
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 7 — 간격 & 둥글기 & 그림자
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('간격 · 둥글기 · 그림자', 'Border Radius · Shadow · Scrollbar');

  section(slide, 0.45, 1.35, 'Border Radius');
  const radii = [
    { label: '--radius-sm', val: '4px',  r: 0.04,  w: 1.0 },
    { label: '--radius-md', val: '8px',  r: 0.08,  w: 1.2 },
    { label: '--radius-lg', val: '12px', r: 0.12,  w: 1.5 },
    { label: '--radius-xl', val: '16px', r: 0.16,  w: 1.8 },
    { label: '--radius-circle', val: '50%', r: 0.5, w: 0.7 },
  ];
  let rx = 0.45;
  radii.forEach(r => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: rx, y: 1.72, w: r.w, h: 0.55,
      fill: { color: 'DBEAFE' }, line: { color: C.primary, w: 1 },
      rectRadius: r.r,
    });
    slide.addText(r.label + '\n' + r.val, {
      x: rx, y: 2.32, w: r.w + 0.3, h: 0.38,
      fontSize: 8, color: C.textSub, fontFace: FONT, align: 'center',
    });
    rx += r.w + 0.55;
  });

  section(slide, 0.45, 2.88, '그림자 (Shadow)');
  const shadows = [
    { label: '--shadow-sm', sub: '버튼·입력',  s: { type:'outer', color:'000000', opacity:0.05, blur:2, offset:1, angle:45 } },
    { label: '--shadow-md', sub: '카드·드롭다운', s: { type:'outer', color:'000000', opacity:0.07, blur:6, offset:4, angle:45 } },
    { label: '--shadow-lg', sub: '모달·팝업',  s: { type:'outer', color:'000000', opacity:0.09, blur:12, offset:8, angle:45 } },
    { label: '--shadow-xl', sub: '최상위 레이어', s: { type:'outer', color:'000000', opacity:0.11, blur:20, offset:12, angle:45 } },
  ];
  let sx = 0.45;
  shadows.forEach(s => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: sx, y: 3.25, w: 2.4, h: 0.8,
      fill: { color: C.surface }, line: { color: C.border, w: 0.5 },
      rectRadius: 0.08, shadow: s.s,
    });
    slide.addText(s.label + '\n' + s.sub, {
      x: sx, y: 4.1, w: 2.4, h: 0.38,
      fontSize: 8.5, color: C.textSub, fontFace: FONT, align: 'center',
    });
    sx += 2.8;
  });

  section(slide, 0.45, 4.62, '스크롤바');
  slide.addText('width: 4px  |  thumb: rgba(0,0,0,0.12)  |  border-radius: 2px  |  hover: #9CA3AF', {
    x: 0.45, y: 4.95, w: 11, h: 0.3,
    fontSize: 10, color: C.textSub, fontFace: FONT,
  });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 8 — 레이아웃 구조
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('레이아웃 구조', '전체 페이지 구조 및 주요 수치');

  // Navbar
  slide.addShape(pptx.ShapeType.rect, { x:0.45, y:1.35, w:11.35, h:0.44, fill:{color:C.navy}, line:{color:C.border, w:0} });
  slide.addText('Navbar  (height: 56px)', { x:0.55, y:1.35, w:11, h:0.44, fontSize:10, bold:true, color:'FFFFFF', fontFace:FONT, valign:'middle' });

  // Session sidebar
  slide.addShape(pptx.ShapeType.rect, { x:0.45, y:1.82, w:1.8, h:4.35, fill:{color:'EFF6FF'}, line:{color:C.primary, w:0.5} });
  slide.addText('Session\nSidebar\n\n220px', { x:0.45, y:1.82, w:1.8, h:4.35, fontSize:9.5, color:C.primary, fontFace:FONT, align:'center', valign:'middle' });

  // Main content
  slide.addShape(pptx.ShapeType.rect, { x:2.3, y:1.82, w:9.5, h:4.35, fill:{color:C.bg}, line:{color:C.border, w:0.5} });
  slide.addText('Main Content (flex: 1)', { x:2.4, y:1.88, w:9.3, h:0.26, fontSize:9, color:C.textMuted, fontFace:FONT });
  slide.addText('max-width: 1200px  ·  margin: 0 auto  ·  padding: 0 16px', { x:2.4, y:2.12, w:9.3, h:0.26, fontSize:8.5, color:C.textMuted, fontFace:FONT });

  // rc-session-sidebar
  slide.addShape(pptx.ShapeType.rect, { x:2.4, y:2.45, w:1.5, h:3.65, fill:{color:'DBEAFE'}, line:{color:C.primary, w:0.5} });
  slide.addText('rc-session\nsidebar\n180px', { x:2.4, y:2.45, w:1.5, h:3.65, fontSize:8.5, color:C.primary, fontFace:FONT, align:'center', valign:'middle' });

  // rc-page-main
  slide.addShape(pptx.ShapeType.rect, { x:3.95, y:2.45, w:7.8, h:3.65, fill:{color:C.surface}, line:{color:C.border, w:0.5} });

  // top row
  slide.addShape(pptx.ShapeType.rect, { x:4.05, y:2.55, w:7.6, h:0.85, fill:{color:'F0FDF4'}, line:{color:'86EFAC', w:0.5} });
  slide.addText('recruit-top-row  (height: 140px)', { x:4.1, y:2.55, w:3.5, h:0.36, fontSize:8.5, color:'15803D', fontFace:FONT, valign:'middle' });
  slide.addShape(pptx.ShapeType.rect, { x:4.1, y:2.78, w:1.8, h:0.52, fill:{color:'DCFCE7'}, line:{color:'86EFAC', w:0.5} });
  slide.addText('Upload\nCard', { x:4.1, y:2.78, w:1.8, h:0.52, fontSize:7.5, color:'15803D', fontFace:FONT, align:'center', valign:'middle' });
  slide.addShape(pptx.ShapeType.rect, { x:6.0, y:2.78, w:5.5, h:0.52, fill:{color:'DCFCE7'}, line:{color:'86EFAC', w:0.5} });
  slide.addText('Dashboard Cards  ×4  (총인원 / 서류 / 논문 / 블라인드)', { x:6.05, y:2.78, w:5.4, h:0.52, fontSize:7.5, color:'15803D', fontFace:FONT, valign:'middle' });

  // recruit layout
  slide.addShape(pptx.ShapeType.rect, { x:4.05, y:3.45, w:7.6, h:2.6, fill:{color:C.bg}, line:{color:C.border, w:0.5} });
  slide.addText('recruit-layout  (flex, gap: 12px)', { x:4.1, y:3.48, w:7.5, h:0.26, fontSize:8, color:C.textMuted, fontFace:FONT });

  slide.addShape(pptx.ShapeType.rect, { x:4.1, y:3.78, w:3.0, h:2.2, fill:{color:'EFF6FF'}, line:{color:C.primary, w:0.5} });
  slide.addText('recruit-list-col\n(flex: 4)\n\n탭바 + 필터 + 목록', { x:4.1, y:3.78, w:3.0, h:2.2, fontSize:8.5, color:C.primary, fontFace:FONT, align:'center', valign:'middle' });

  slide.addShape(pptx.ShapeType.rect, { x:7.2, y:3.78, w:4.4, h:2.2, fill:{color:'F0F9FF'}, line:{color:C.light, w:0.5} });
  slide.addText('recruit-detail-col\n(flex: 6)\n\n상세 패널 (2탭)', { x:7.2, y:3.78, w:4.4, h:2.2, fontSize:8.5, color:'0369A1', fontFace:FONT, align:'center', valign:'middle' });
}

// ════════════════════════════════════════════════════════════
// 슬라이드 9 — 아이콘 & 트랜지션
// ════════════════════════════════════════════════════════════
{
  const slide = addSlide('아이콘 & 트랜지션', 'Lucide Icons · 애니메이션 설정');

  section(slide, 0.45, 1.35, 'Lucide Icons 사용 패턴');
  slide.addShape(pptx.ShapeType.rect, { x:0.45, y:1.68, w:11.2, h:0.38, fill:{color:C.navy}, line:{color:C.border, w:0} });
  slide.addText('<i data-lucide="아이콘명" style="width:Xpx;height:Xpx;color:var(--gri-primary);"></i>', {
    x:0.55, y:1.68, w:11, h:0.38, fontSize:9.5, color:'#93C5FD', fontFace:FONT, valign:'middle',
  });

  const icons = [
    { icon:'users',           size:'18px', usage:'총 인원 카드' },
    { icon:'file-text',       size:'18px', usage:'서류 카드' },
    { icon:'book-open',       size:'18px', usage:'논문 카드' },
    { icon:'eye-off',         size:'18px', usage:'블라인드 카드' },
    { icon:'share-2',         size:'13px', usage:'온톨로지 Map' },
    { icon:'plus',            size:'13px', usage:'새 채용 버튼' },
    { icon:'upload',          size:'13px', usage:'파일 업로드' },
    { icon:'file-spreadsheet',size:'14px', usage:'Excel 내보내기' },
    { icon:'chevron-down',    size:'11px', usage:'드롭다운' },
    { icon:'cloud-upload',    size:'20px', usage:'주간보고 업로드' },
  ];

  // header
  row(slide, 0.45, 2.15, 11.2, 0.32,
    [
      { text:'아이콘명', w:3.5, bg:C.navy, bold:true, color:'FFFFFF', align:'center' },
      { text:'크기',     w:1.5, bg:C.navy, bold:true, color:'FFFFFF', align:'center' },
      { text:'사용 위치', w:6.2, bg:C.navy, bold:true, color:'FFFFFF' },
    ], { size: 10 }
  );

  icons.forEach((ic, i) => {
    const y = 2.47 + i * 0.3;
    const bg = i % 2 === 0 ? C.surface : C.bg;
    row(slide, 0.45, y, 11.2, 0.3,
      [
        { text: ic.icon,  w:3.5, bg, color:C.primary, size:9.5 },
        { text: ic.size,  w:1.5, bg, color:C.textMain, size:9.5, align:'center' },
        { text: ic.usage, w:6.2, bg, color:C.textSub,  size:9.5 },
      ]
    );
  });

  section(slide, 0.45, 5.6, '트랜지션');
  slide.addText(
    '--gri-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)  →  일반 전환\n--gri-transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1)  →  버튼·호버',
    { x:0.45, y:5.92, w:11.2, h:0.44, fontSize:9.5, color:C.textSub, fontFace:FONT }
  );
}

// ════════════════════════════════════════════════════════════
// 저장
// ════════════════════════════════════════════════════════════
pptx.writeFile({ fileName: 'GRI_StyleGuide.pptx' })
  .then(() => console.log('✓ GRI_StyleGuide.pptx 생성 완료'))
  .catch(e => console.error('오류:', e));
