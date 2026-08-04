import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Claim intelligence for the AI-generated internet.';
      
    const score = searchParams.get('score');
    const type = searchParams.get('type') || 'Scrutexity AuditGPT';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#fbf7ef',
            padding: '80px',
            fontFamily: 'serif',
          }}
        >
          {/* Top Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div
              style={{
                fontSize: 32,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#5E7A5A',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              SCRUTEXITY · EVIDENCE-GROUNDED REVIEW
            </div>
            {score && (
              <div
                style={{
                  fontSize: 32,
                  fontFamily: 'monospace',
                  color: '#b9825f',
                  border: '2px solid #e1d4c5',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  backgroundColor: '#fffaf2'
                }}
              >
                Risk Score: {score}
              </div>
            )}
          </div>

          {/* Main Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div
              style={{
                fontSize: 40,
                color: '#6b6259',
                fontFamily: 'sans-serif',
              }}
            >
              {type}
            </div>
            <div
              style={{
                fontSize: 84,
                color: '#221f1b',
                lineHeight: 1.1,
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
          </div>

          {/* Bottom Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '2px solid #e1d4c5',
              paddingTop: '40px',
            }}
          >
            <div style={{ fontSize: 32, color: '#6b6259', fontFamily: 'sans-serif' }}>
              scrutexity.com
            </div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: 24, padding: '8px 16px', backgroundColor: '#e1d4c5', borderRadius: '20px', color: '#221f1b' }}>Public Record</div>
              <div style={{ fontSize: 24, padding: '8px 16px', backgroundColor: '#e1d4c5', borderRadius: '20px', color: '#221f1b' }}>Evidence Map</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : 'Unknown Open Graph image error');
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
