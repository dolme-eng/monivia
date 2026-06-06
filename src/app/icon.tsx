import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '48px',
        }}
      >
        <div
          style={{
            fontSize: '96px',
            fontFamily: 'sans-serif',
            fontWeight: 900,
            color: '#06b6d4',
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
