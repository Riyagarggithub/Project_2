import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

const ROOMS = {
  'AI-Room': { name: 'AI Room', subject: 'Artificial Intelligence' },
  'Cyber-Room': { name: 'Cyber Security', subject: 'Network Security & Ethical Hacking' },
  'FullStack-Room': { name: 'Full Stack', subject: 'Web Development' },
  'Data Science-Room': { name: 'Data Science', subject: 'Machine Learning & Analytics' },
  'General-Room': { name: 'General', subject: 'Open Discussion' }
};

const ROOM_IMAGES = {
  'AI-Room': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'Cyber-Room': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'FullStack-Room': 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'Data Science-Room': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'General-Room': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
};
export default function App() {
  const [selectedRoom, setSelectedRoom] = React.useState(null);

  let myMeeting = async (element) => {
    if (!element || !selectedRoom) return;
    
    const appID = 1778898539;
    const serverSecret = "eb001447936736a10467081c3b0311f8";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret,
      selectedRoom, 
      randomID(5), 
      randomID(5)
    );
    
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [{
        name: 'Copy link',
        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${selectedRoom}`,
      }],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  if (!selectedRoom) {
    return (
      <div style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background: 'linear-gradient(135deg, #1e272e 0%, #34495e 50%, #39536d 100%)',
        color: '#1a1a1a',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{ 
          maxWidth: 1200, 
          margin: '0 auto', 
          padding: '40px 20px',
          position: 'relative'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '48px',
            padding: '0 20px'
          }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '12px',
              fontWeight: 700,
              color: '#ffffff'
            }}>Study Rooms</h1>
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: 0,
              color: '#ecf0f1',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6
            }}>Join subject-specific rooms to collaborate with peers and educators in real-time</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px',
            padding: '20px'
          }}>
            {Object.entries(ROOMS).map(([roomId, roomData]) => (
              <div 
                key={roomId}
                onClick={() => setSelectedRoom(roomId)}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  position: 'relative',
                  border: '1px solid rgba(210, 225, 243, 0.6)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  height: '180px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={ROOM_IMAGES[roomId]} 
                    alt={roomData.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      filter: 'brightness(0.9)'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                    padding: '20px',
                    color: 'white'
                  }}>
                    <h3 style={{ 
                      fontSize: '22px',
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: '4px'
                    }}>{roomData.name}</h3>
                    <p style={{
                      fontSize: '14px',
                      margin: 0,
                      opacity: 0.9
                    }}>{roomData.subject}</p>
                  </div>
                </div>
                <div style={{
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#718096',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 6V12L16 14" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Live 24/7
                    </p>
                  </div>
                  <div style={{
                    background: '#34495e',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}>
                    Join Now
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 10000,
      background: '#1e272e'
    }}>
      <button 
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          zIndex: 10001,
          background: '#34495e',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          transition: 'all 0.2s ease',
          color: 'white'
        }}
        onClick={() => setSelectedRoom(null)}
        onMouseOver={(e) => {
          e.currentTarget.style.background = '#39536d';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = '#34495e';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.57 5.92999L3.5 12L9.57 18.07" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.5 12H3.67004" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to Rooms
      </button>
      <div
        ref={myMeeting}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      />
    </div>
  );
}