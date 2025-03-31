import { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/GallerySection.module.css';

export default function GallerySection({ images = [] }) {
  const [activeImage, setActiveImage] = useState(null);
  
  const openLightbox = (index) => {
    setActiveImage(index);
  };
  
  const closeLightbox = () => {
    setActiveImage(null);
  };
  
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <section className={styles.gallerySection}>
      <h2 className={styles.sectionTitle}>갤러리</h2>
      
      {images.length > 0 ? (
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={styles.galleryItem}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={image.url}
                  alt={image.alt || `갤러리 이미지 ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyGallery}>
          <p>갤러리 이미지를 추가해주세요</p>
        </div>
      )}
      
      {activeImage !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeLightbox}>×</button>
            <button className={styles.navButton} onClick={prevImage}>‹</button>
            <div className={styles.lightboxImageContainer}>
              <Image
                src={images[activeImage].url}
                alt={images[activeImage].alt || `갤러리 이미지 ${activeImage + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <button className={styles.navButton} onClick={nextImage}>›</button>
          </div>
        </div>
      )}
    </section>
  );
}
