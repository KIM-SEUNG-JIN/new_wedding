import { useState } from 'react';
import styles from '../../styles/MessageSection.module.css';

export default function MessageSection({ messages = [] }) {
  const [newMessage, setNewMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 여기서 메시지 저장 API를 호출합니다
    // 실제 구현에서는 API 호출 후 메시지 목록을 업데이트합니다
    console.log('메시지 저장:', { author, content: newMessage });
    
    // 폼 초기화
    setNewMessage('');
    setAuthor('');
    setShowForm(false);
  };
  
  return (
    <section className={styles.messageSection}>
      <h2 className={styles.sectionTitle}>축하 메시지</h2>
      
      <div className={styles.messageList}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={message.id || index} className={styles.messageCard}>
              <p className={styles.messageContent}>{message.content}</p>
              <p className={styles.messageAuthor}>- {message.author}</p>
              <p className={styles.messageDate}>{message.date}</p>
            </div>
          ))
        ) : (
          <div className={styles.emptyMessage}>
            <p>첫 번째 축하 메시지를 남겨보세요!</p>
          </div>
        )}
      </div>
      
      {!showForm ? (
        <div className={styles.addMessageButton}>
          <button onClick={() => setShowForm(true)}>
            축하 메시지 남기기
          </button>
        </div>
      ) : (
        <form className={styles.messageForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="author">이름</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message">메시지</label>
            <textarea
              id="message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className={styles.formActions}>
            <button type="button" onClick={() => setShowForm(false)}>
              취소
            </button>
            <button type="submit">
              저장
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
