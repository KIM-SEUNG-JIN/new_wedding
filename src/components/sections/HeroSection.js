import Image from 'next/image';
import styles from '../../styles/HeroSection.module.css';
import { formatDate } from '../../lib/dateUtils';

export default function HeroSection({ mainImage, date, coupleNames }) {
  const formattedDate = formatDate(date);
  
  return (
    <section className={styles.heroSection}>
      <div className={styles.imageContainer}>
        {mainImage ? (
          <Image
            src={mainImage}
            alt="웨딩 메인 이미지"
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <div className={styles.placeholder}>
            <span>메인 이미지를 업로드해주세요</span>
          </div>
        )}
      </div>
      
      <div className={styles.overlay}>
        <h1 className={styles.title}>{coupleNames}</h1>
        <p className={styles.date}>{formattedDate}</p>
      </div>
    </section>
  );
}
