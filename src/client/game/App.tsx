import { useState, useEffect } from 'react';

export function App() {
  const [words, setWords] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [inputWord, setInputWord] = useState('');
  const [error, setError] = useState('');

  // Load Data on Start
  useEffect(() => {
    fetch('/api/init')
      .then((res) => res.json())
      .then((data) => {
        if (data.words) {
          setWords(data.words);
          setAuthors(data.authors);
        }
      });
  }, []);

  const handleSubmit = async () => {
    if (!inputWord) return;

    const response = await fetch('/api/submit-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: inputWord }),
    });

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      setWords(data.words);
      setAuthors(data.authors);
      setInputWord('');
      setError('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* --- NEW FUN TITLE --- */}
      <h1 style={{ 
        fontSize: '32px',
        fontWeight: '900',
        color: '#FF4500',          // Bright Orange-Red
        textAlign: 'center',
        textShadow: '2px 2px 0px #FFD700', // Gold "Pop Art" Shadow
        marginBottom: '20px',
        marginTop: '0',
        transform: 'rotate(-2deg)', // A playful tilt
        fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' // Fun font
      }}>
        ✨ The One-Word Story ✍️
      </h1>
      
      {/* 1. THE STORY DISPLAY */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '20px',
        lineHeight: '1.6',
        fontSize: '20px',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {words.join(' ')}
      </div>

      {/* 2. THE INPUT */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          placeholder="Type your word..."
          style={{ padding: '12px', flexGrow: 1, borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          onClick={handleSubmit}
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#D93A00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Post
        </button>
      </div>

      {error && <p style={{ color: 'red', marginTop: '-20px', marginBottom: '20px' }}>⚠️ {error}</p>}

      {/* 3. THE CONTRIBUTORS LIST (With System Filter) */}
      <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>History</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {words.map((word, index) => {
            // FILTER: If the author is "System", do not show this row!
            if (authors[index] === 'System') return null;

            return (
              <li key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '10px', 
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? 'white' : '#fafafa' 
              }}>
                <span>
                  <strong style={{ color: '#D93A00' }}>{authors[index]}</strong> added:
                </span>
                <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>"{word}"</span>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}
