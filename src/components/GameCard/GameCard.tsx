import React from 'react';
import styles from './GameCard.module.css';

interface GameCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function GameCard({ icon, title, description }: GameCardProps) {
  return (
    <div className={styles.card}>
      <div className="corner-accent top-left" />
      <div className="corner-accent top-right" />
      
      <div className={styles.iconWrapper}>
        {icon}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}