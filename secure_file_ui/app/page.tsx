"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ROUTES from '@/constants/routes';

export default function Home() {

  const router = useRouter();

  return (
    <main className="flex h-lvh">
      <div className={`${styles['left-side']}`} >
        <h1 style={{fontSize: '32px', fontWeight: '700', background: 'white', color: 'black', display: 'inline-block',
          padding: '7px', margin: 0,
        }}>
          Secure File Sharing
        </h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <button className={`${styles['arrow-button']}`} onClick={() => router.push(ROUTES.SIGNUP)}>Sign Up</button>
        <button className={`${styles['arrow-button']}`} onClick={() => router.push(ROUTES.LOGIN)} >Log In</button>
      </div>
    </main>
  );
}
