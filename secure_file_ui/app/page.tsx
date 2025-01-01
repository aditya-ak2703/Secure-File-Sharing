import styles from './page.module.css';

export default function Home() {
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
        <button className={`${styles['arrow-button']}`}>Sign Up</button>
        <button className={`${styles['arrow-button']}`}>Log In</button>
      </div>
    </main>
  );
}
