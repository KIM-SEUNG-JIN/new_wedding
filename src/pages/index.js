import { useState, useEffect } from 'react';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/sections/HeroSection';
import CoupleSection from '../components/sections/CoupleSection';
import DateLocationSection from '../components/sections/DateLocationSection';
import GallerySection from '../components/sections/GallerySection';
import MessageSection from '../components/sections/MessageSection';
import { useWeddingData } from '../context/WeddingContext';

export default function Home() {
  const { weddingData, isLoading } = useWeddingData();
  
  if (isLoading) return <div className="loading">로딩 중...</div>;
  
  return (
    <MainLayout>
      <Head>
        <title>{weddingData.brideInfo.name} ♥ {weddingData.groomInfo.name} 결혼합니다</title>
        <meta name="description" content="모바일 청첩장" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection 
        mainImage={weddingData.mainImage}
        date={weddingData.date}
        coupleNames={`${weddingData.brideInfo.name} & ${weddingData.groomInfo.name}`}
      />
      
      <CoupleSection 
        brideInfo={weddingData.brideInfo}
        groomInfo={weddingData.groomInfo}
      />
      
      <DateLocationSection 
        date={weddingData.date}
        location={weddingData.location}
      />
      
      <GallerySection 
        images={weddingData.galleryImages}
      />
      
      <MessageSection 
        messages={weddingData.messages}
      />
      
      {weddingData.customSections && weddingData.customSections.map((section, index) => (
        <div key={section.id || index} className="custom-section">
          <h2>{section.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </div>
      ))}
    </MainLayout>
  );
}
