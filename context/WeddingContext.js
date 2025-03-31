import { createContext, useContext, useState } from 'react';

// 기본 데이터
const defaultWeddingData = {
  brideInfo: {
    name: '신부 이름',
    phone: '010-1234-5678',
    parents: {
      father: '신부 아버지',
      mother: '신부 어머니'
    }
  },
  groomInfo: {
    name: '신랑 이름',
    phone: '010-8765-4321',
    parents: {
      father: '신랑 아버지',
      mother: '신랑 어머니'
    }
  },
  date: '2023년 12월 31일 오후 12시',
  location: {
    name: '웨딩홀',
    address: '서울시 강남구 테헤란로 123',
    mapUrl: 'https://map.kakao.com/'
  },
  mainImage: '/images/main.jpg',
  galleryImages: [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg'
  ],
  message: '저희 두 사람이 사랑과 믿음으로 한 가정을 이루게 되었습니다.'
};

// 컨텍스트 생성
const WeddingContext = createContext() ;

// 컨텍스트 제공자 컴포넌트
export function WeddingProvider({ children }) {
  const [weddingData, setWeddingData] = useState(defaultWeddingData);
  const [isLoading, setIsLoading] = useState(false);
  
  // 데이터 업데이트 함수
  const updateWeddingData = (newData) => {
    setWeddingData(prev => ({ ...prev, ...newData }));
  };
  
  // 컨텍스트 값
  const value = {
    weddingData,
    isLoading,
    updateWeddingData
  };
  
  return (
    <WeddingContext.Provider value={value}>
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
