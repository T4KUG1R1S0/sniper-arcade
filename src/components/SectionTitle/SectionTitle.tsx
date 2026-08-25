import React from 'react';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  highlightTitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  subtitle,
  title,
  highlightTitle,
  description,
  align = 'center',
}: SectionTitleProps) {
  const alignStyles: Record<string, React.CSSProperties> = {
    left: { textAlign: 'left', alignItems: 'flex-start' },
    center: { textAlign: 'center', alignItems: 'center' },
    right: { textAlign: 'right', alignItems: 'flex-end' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...alignStyles[align], marginBottom: '3rem' }}>
      {subtitle && (
        <span style={{ 
          color: 'var(--secondary)', 
          fontSize: '0.8rem', 
          fontWeight: 'bold', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          marginBottom: '0.5rem' 
        }}>
          ● {subtitle}
        </span>
      )}
      <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)', lineHeight: 1.1 }}>
        {title} {highlightTitle && <span className="text-primary glow-text-primary">{highlightTitle}</span>}
      </h2>
      {description && (
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.8rem', fontSize: '1rem', lineHeight: 1.6 }}>
          {description}
        </p>
      )}
    </div>
  );
}