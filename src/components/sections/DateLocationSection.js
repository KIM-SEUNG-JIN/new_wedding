import { useEffect, useRef } from 'react';
import styles from '../../styles/DateLocationSection.module.css';
import { formatDate, formatTime } from '../../lib/dateUtils';

export default function DateLocationSection({ date, location }) {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // 카카오맵 API 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_API_KEY&autoload=false&libraries=services`;
    document.head.appendChild(script);
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(
            location.lat || 37.5665, 
            location.lng || 126.9780
          ),
          level: 3
        };
        
        const map = new window.kakao.maps.Map(container, options);
        
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(
            location.lat || 37.5665, 
            location.lng || 126.9780
          )
        });
        
        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${location.name}</div>`
        });
        infowindow.open(map, marker);
      });
    };
    
    return () => {
      document.head.removeChild(script);
    };
  }, [location]);
  
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);
  
  return (
    <section className={styles.dateLocationSection}>
      <h2 className={styles.sectionTitle}>날짜 & 장소</h2>
      
      <div className={styles.dateContainer}>
        <div className={styles.dateInfo}>
          <h3 className={styles.dateTitle}>결혼식 일시</h3>
          <p className={styles.date}>{formattedDate}</p>
          <p className={styles.time}>{formattedTime}</p>
        </div>
      </div>
      
      <div className={styles.locationContainer}>
        <h3 className={styles.locationTitle}>예식장 정보</h3>
        <p className={styles.locationName}>{location.name}</p>
        <p className={styles.locationAddress}>{location.address}</p>
        <p className={styles.locationTel}>{location.tel}</p>
        
        <div className={styles.mapContainer}>
          <div ref={mapRef} className={styles.map}></div>
        </div>
        
        <div className={styles.actions}>
          <a 
            href={`https://map.kakao.com/link/to/${location.name},${location.lat || 37.5665},${location.lng || 126.9780}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.directionButton}
          >
            길찾기
          </a>
        </div>
      </div>
    </section>
  );
}
