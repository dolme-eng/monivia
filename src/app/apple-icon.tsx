import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
        }}
      >
        <div
          style={{
            fontSize: '90px',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            color: '#00d4ff',
            marginTop: '8px',
          }}
        >
          Mo
        </div>
      </div>
    ),
    { ...size }
  );
}
