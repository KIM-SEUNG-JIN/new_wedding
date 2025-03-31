import { useWeddingData } from '../context/WeddingContext.js';

export default function Home() {
  const { weddingData } = useWeddingData();
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{weddingData.groomInfo.name} ♥ {weddingData.brideInfo.name}</h1>
      <p>{weddingData.date}</p>
      <p>{weddingData.location.name}</p>
      <p>{weddingData.message}</p>
    </div>
  );
}
