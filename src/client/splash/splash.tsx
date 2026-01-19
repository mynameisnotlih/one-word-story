import '../index.css';
import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      
      {/* Title */}
      <h1 style={{ 
        fontSize: '2.5rem', 
        color: '#D93A00', 
        fontWeight: 'bold',
        marginBottom: '10px' 
      }}>
        The One-Word Story
      </h1>
      
      {/* Description */}
      <p style={{ 
        fontSize: '1.2rem', 
        color: '#555', 
        maxWidth: '400px',
        lineHeight: '1.5'
      }}>
        Together, we are writing a legend. <br/>
        Add your word to the history books!
      </p>

      {/* The Magic Button (Switches to Game Mode) */}
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          backgroundColor: '#D93A00',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        Enter the Story 📖
      </button>

    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
