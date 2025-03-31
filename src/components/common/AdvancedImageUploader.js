import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import styles from './AdvancedImageUploader.module.css';

export default function AdvancedImageUploader({ 
  currentImage, 
  onImageUpload,
  aspectRatio = 1, // 기본 1:1 비율
  cropShape = 'rect', // 'rect' 또는 'round'
  maxFileSize = 5, // MB 단위
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  
  // 이미지 크롭 관련 상태
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  
  // react-dropzone 설정
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: maxFileSize * 1024 * 1024,
    multiple: false,
    onDrop: handleDrop,
    onDropRejected: handleDropRejected
  });
  
  // 파일 드롭 처리
  function handleDrop(acceptedFiles) {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    const reader = new FileReader();
    
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
      setError(null);
    };
    
    reader.readAsDataURL(file);
  }
  
  // 파일 드롭 거부 처리
  function handleDropRejected(fileRejections) {
    const rejection = fileRejections[0];
    if (rejection.errors[0].code === 'file-too-large') {
      setError(`파일 크기가 너무 큽니다. 최대 ${maxFileSize}MB까지 가능합니다.`);
    } else {
      setError('지원되지 않는 파일 형식입니다. JPG, PNG, GIF, WebP 형식만 가능합니다.');
    }
  }
  
  // 크롭 완료 처리
  function handleCropComplete(croppedArea, croppedAreaPixels) {
    setCroppedAreaPixels(croppedAreaPixels);
  }
  
  // 크롭된 이미지 생성 및 업로드
  async function handleCropConfirm() {
    try {
      setIsUploading(true);
      setUploadProgress(10);
      
      // 크롭된 이미지 생성
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setUploadProgress(30);
      
      // 이미지 업로드 (실제 구현에서는 API 호출)
      // 여기서는 시뮬레이션을 위해 setTimeout 사용
      setTimeout(() => {
        setUploadProgress(70);
        
        setTimeout(() => {
          setUploadProgress(100);
          onImageUpload(croppedImage);
          
          // 상태 초기화
          setShowCropper(false);
          setImageSrc(null);
          setIsUploading(false);
        }, 500);
      }, 500);
      
    } catch (error) {
      console.error('이미지 처리 중 오류:', error);
      setError('이미지 처리 중 오류가 발생했습니다.');
      setIsUploading(false);
    }
  }
  
  // 크롭 취소
  function handleCropCancel() {
    setShowCropper(false);
    setImageSrc(null);
  }
  
  // 이미지 크롭 유틸리티 함수
  async function getCroppedImg(imageSrc, pixelCrop) {
    const image = new Image();
    image.src = imageSrc;
    
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    
    // 캔버스를 Blob으로 변환
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.95);
    });
  }
  
  return (
    <div className={styles.imageUploader}>
      {!showCropper && !isUploading && (
        <div 
          {...getRootProps()} 
          className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${error ? styles.error : ''}`}
        >
          <input {...getInputProps()} />
          
          {currentImage ? (
            <div className={styles.currentImage}>
              <img src={currentImage} alt="현재 이미지" />
              <div className={styles.overlay}>
                <span>이미지 변경하기</span>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
              <span className={styles.fileInfo}>JPG, PNG, GIF, WebP / 최대 {maxFileSize}MB</span>
            </div>
          )}
          
          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      )}
      
      {showCropper && (
        <div className={styles.cropperContainer}>
          <div className={styles.cropper}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          
          <div className={styles.cropperControls}>
            <div className={styles.zoomControl}>
              <label>확대/축소</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
              />
            </div>
            
            <div className={styles.cropperActions}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={handleCropCancel}
              >
                취소
              </button>
              <button 
                type="button" 
                className={styles.confirmButton}
                onClick={handleCropConfirm}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
      
      {isUploading && (
        <div className={styles.uploadingContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>이미지 업로드 중... {uploadProgress}%</p>
          <svg className={styles.spinner} viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
        </div>
      )}
    </div>
  );
}
