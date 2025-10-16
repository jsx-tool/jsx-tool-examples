import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const buttonStyles: React.CSSProperties = {
    padding: '16px',
    borderRadius: '6px',
    fontWeight: '500',
    backgroundColor: 'blue',
    color: 'inherit',
    border: 'none'
  };

  if (variant === 'primary') {
    Object.assign(buttonStyles, {
      color: '#fff',
      border: '1px solid #3b82f6'
    });
  } else if (variant === 'secondary') {
    Object.assign(buttonStyles, {
      color: '#1f2937'
    });
  }
  
  return (
    <button 
      onClick={onClick} 
      style={buttonStyles}
    >
      {children}
    </button>
  );
}