import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../../styles/MainLayout.module.css';

export default function MainLayout({ children, title }) {
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    // 화면 크기 감지
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 초기 설정
    handleResize();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', handleResize);
    
    // 클린업
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className={styles.layout}>
      <Head>
        <title>{title || '모바일 청첩장'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </Head>
      
      <main className={`${styles.main} ${isMobile ? styles.mobile : styles.desktop}`}>
        {children}
      </main>
      
      <footer className={styles.footer}>
        <div className="container">
          <p>© {new Date().getFullYear()} 모바일 청첩장</p>
        </div>
      </footer>
    </div>
  );
}
