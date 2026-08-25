import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-heading)',
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: '4px',
    transition: 'all var(--transition-normal)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 14px', fontSize: '0.8rem' },
    md: { padding: '10px 22px', fontSize: '0.9rem' },
    lg: { padding: '14px 32px', fontSize: '1.05rem' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary)',
      color: '#ffffff',
      boxShadow: '0 0 15px var(--primary-glow)',
    },
    secondary: {
      background: 'var(--secondary)',
      color: 'var(--bg-main)',
      boxShadow: '0 0 15px var(--secondary-glow)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-main)',
      border: '1px solid var(--border-color)',
    },
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  if (to) {
    return (
      <Link to={to} style={combinedStyles} className={`cyber-button ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={combinedStyles} className={`cyber-button ${className}`}>
      {children}
    </button>
  );
}