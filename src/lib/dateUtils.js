/**
 * 날짜 포맷팅 유틸리티 함수
 */

// 날짜를 'YYYY년 MM월 DD일' 형식으로 변환
export function formatDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  
  return `${year}년 ${month}월 ${day}일`;
}

// 시간을 'HH:MM' 형식으로 변환
export function formatTime(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  
  // 오전/오후 표시
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 || 12; // 12시간제로 변환
  
  return `${ampm} ${displayHours}시 ${minutes.toString().padStart(2, '0')}분`;
}

// 요일 반환
export function getDayOfWeek(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[d.getDay()];
}

// 날짜와 요일 함께 표시 (YYYY년 MM월 DD일 (요일))
export function formatDateWithDay(date) {
  if (!date) return '';
  
  const formattedDate = formatDate(date);
  const dayOfWeek = getDayOfWeek(date);
  
  return `${formattedDate} (${dayOfWeek})`;
}
