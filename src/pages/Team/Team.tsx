import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import styles from './Team.module.css';

// SVG Inline Icon untuk GitHub & LinkedIn agar aman dari issue versi lucide-react
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar: string;
  github: string;
  linkedin: string;
}

export default function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: 'TAKUGIRISO',
      role: 'Lead Game Engineer',
      bio: 'Architected the HTML5 Canvas render pipeline, sub-pixel target collision logic, and Audio Context sound synthesis.',
      skills: ['Canvas 2D', 'TypeScript', 'Web Audio API'],
      avatar: '/images/p2.jpg',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'TAKUGIRISO',
      role: 'UI/UX & Cyberpunk Designer',
      bio: 'Designed the retro-futuristic arcade aesthetic, neon glow accents, responsive grid system, and HUD overlays.',
      skills: ['Framer Motion', 'CSS Modules', 'UI Architecture'],
      avatar: '/images/p1.jpg',
      github: '#',
      linkedin: '#',
    },
    {
      name: 'TAKUGIRISO',
      role: 'Frontend & State Developer',
      bio: 'Implemented global router layouts, local storage score sync, performance optimizations, and component architecture.',
      skills: ['React 18', 'React Router 6', 'Vite'],
      avatar: '/images/p3.jpg',
      github: '#',
      linkedin: '#',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SectionTitle
          title="DEVELOPMENT TEAM"
          subtitle="THE CREATORS BEHIND SNIPER ARCADE"
          align="center"
        />
        <p className={styles.subtitle}>
          Meet the engineers and designers building high-precision browser gaming experiences.
        </p>
      </div>

      <div className={styles.grid}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            className={styles.memberCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="corner-accent top-left" />
            <div className="corner-accent top-right" />

            <div className={styles.avatarWrapper}>
              <img src={member.avatar} alt={member.name} className={styles.avatarImg} />
            </div>

            <h3 className={styles.name}>{member.name}</h3>
            <div className={styles.role}>{member.role}</div>
            <p className={styles.bio}>{member.bio}</p>

            <div className={styles.skillsContainer}>
              {member.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.socialLinks}>
              <a href={member.github} className={styles.socialIcon} aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={member.linkedin} className={styles.socialIcon} aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}