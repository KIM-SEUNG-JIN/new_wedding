import { createContext, useContext, useState, useEffect } from 'react';

// WeddingData 컨텍스트 생성
const WeddingContext = createContext();

// WeddingData 제공자 컴포넌트
export function WeddingProvider({ children }) {
  const [weddingData, setWeddingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 초기 데이터 로드
  useEffect(() => {
    async function loadData() {
      try {
        // 로컬 스토리지에서 먼저 확인
        const localData = localStorage.getItem('wedding-data');
        if (localData) {
          setWeddingData(JSON.parse(localData));
          setIsLoading(false);
        }
        
        // 서버에서 최신 데이터 가져오기
        const response = await fetch('/api/wedding-data');
        if (!response.ok) {
          throw new Error('데이터를 불러오는데 실패했습니다');
        }
        
        const serverData = await response.json();
        setWeddingData(serverData);
        
        // 로컬 스토리지 업데이트
        localStorage.setItem('wedding-data', JSON.stringify(serverData));
      } catch (err) {
        console.error('데이터 로드 오류:', err);
        setError(err.message);
        
        // 로컬 데이터가 없고 서버 요청이 실패한 경우 기본 데이터 사용
        if (!weddingData) {
          setWeddingData(defaultWeddingData);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);
  
  // 데이터 업데이트 함수
  const updateWeddingData = async (newData) => {
    try {
      setIsLoading(true);
      
      // 기존 데이터와 새 데이터 병합
      const updatedData = { ...weddingData, ...newData };
      
      // 서버에 데이터 저장
      const response = await fetch('/api/wedding-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error('데이터 저장에 실패했습니다');
      }
      
      // 상태 및 로컬 스토리지 업데이트
      setWeddingData(updatedData);
      localStorage.setItem('wedding-data', JSON.stringify(updatedData));
      
      return true;
    } catch (err) {
      console.error('데이터 업데이트 오류:', err);
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <WeddingContext.Provider value={{ weddingData, isLoading, error, updateWeddingData }}>
      {children}
    </WeddingContext.Provider>
  );
}

// 커스텀 훅
export function useWeddingData() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWeddingData는 WeddingProvider 내에서 사용해야 합니다');
  }
  return context;
}

// 기본 데이터
const defaultWeddingData = {
  mainImage: '/images/default-main.jpg',
  date: new Date('2023-12-31T12:00:00'),
  brideInfo: {
    name: '신부 이름',
    phone: '010-1234-5678',
    image: '/images/default-bride.jpg',
    parents: [
      { relation: '아버지', name: '신부 아버지' },
      { relation: '어머니', name: '신부 어머니' }
    ]
  },
  groomInfo: {
    name: '신랑 이름',
    phone: '010-8765-4321',
    image: '/images/default-groom.jpg',
    parents: [
      { relation: '아버지', name: '신랑 아버지' },
      { relation: '어머니', name: '신랑 어머니' }
    ]
  },
  location: {
    name: '웨딩홀 이름',
    address: '서울특별시 강남구 테헤란로 123',
    tel: '02-123-4567',
    lat: 37.5665,
    lng: 126.9780
  },
  galleryImages: [],
  messages: [],
  customSections: []
};
