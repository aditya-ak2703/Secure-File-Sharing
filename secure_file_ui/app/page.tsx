"use client"
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ROUTES from '@/constants/routes';
import LockIcon from '@mui/icons-material/Lock';
import { Button } from '@mui/material';

export default function Home() {

  const router = useRouter();

  return (
    <main className="flex h-lvh">
      <div className={`${styles['left-side']}`} >
        <h1 style={{
          fontSize: '32px', fontWeight: '700', background: 'white', color: 'black',
          padding: '7px', margin: 0,
        }}>
          Secure File Sharing
        </h1>
        <br />
        <div className='flex'>
          <div style={{ position: "relative", left: "-25vw" }}>
            <LockIcon style={{ height: '50vh', width: '50vw' }} />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-10 overflow-hidden" style={{ minWidth: '50vw' }}>
        <Button variant='contained' className={`${styles['arrow-button']}`} onClick={() => router.push(ROUTES.SIGNUP)}>Sign Up</Button>
        <Button variant='contained' className={`${styles['arrow-button']}`} onClick={() => router.push(ROUTES.LOGIN)} >Log In</Button>
        <div style={{ position: "relative", left: "-25vw" }}>
            <LockIcon style={{ height: '50vh', width: '50vw' }} />
          </div>
      </div>
    </main>
  );
}
