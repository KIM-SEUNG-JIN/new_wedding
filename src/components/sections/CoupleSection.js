import Image from 'next/image';
import styles from '../../styles/CoupleSection.module.css';

export default function CoupleSection({ brideInfo, groomInfo }) {
  return (
    <section className={styles.coupleSection}>
      <h2 className={styles.sectionTitle}>신랑 & 신부</h2>
      
      <div className={styles.coupleContainer}>
        <div className={styles.person}>
          <div className={styles.imageContainer}>
            {groomInfo.image ? (
              <Image
                src={groomInfo.image}
                alt={`${groomInfo.name} 사진`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className={styles.placeholder}>
                <span>신랑 사진</span>
              </div>
            )}
          </div>
          <h3 className={styles.name}>{groomInfo.name}</h3>
          <p className={styles.parents}>
            {groomInfo.parents && groomInfo.parents.map((parent, index) => (
              <span key={index}>
                {parent.relation}: {parent.name}
                {index < groomInfo.parents.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <p className={styles.contact}>{groomInfo.phone}</p>
        </div>
        
        <div className={styles.divider}>
          <span>♥</span>
        </div>
        
        <div className={styles.person}>
          <div className={styles.imageContainer}>
            {brideInfo.image ? (
              <Image
                src={brideInfo.image}
                alt={`${brideInfo.name} 사진`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className={styles.placeholder}>
                <span>신부 사진</span>
              </div>
            )}
          </div>
          <h3 className={styles.name}>{brideInfo.name}</h3>
          <p className={styles.parents}>
            {brideInfo.parents && brideInfo.parents.map((parent, index) => (
              <span key={index}>
                {parent.relation}: {parent.name}
                {index < brideInfo.parents.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
          <p className={styles.contact}>{brideInfo.phone}</p>
        </div>
      </div>
    </section>
  );
}
