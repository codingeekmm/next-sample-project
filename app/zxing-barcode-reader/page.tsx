'use client';

import { useState, useEffect } from 'react';
import { ZxingReader } from './_components/ZxingReader'

import styles from '../page.module.css';

export default function BarcodeAndQRCodeReader() {
  const [data, setData] = useState('No result');


  // Error: Hydration failed because the initial UI does not match what was rendered on the server.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])
  if (!hasMounted) return null;

  return (
    <main className={styles.main}>
      <div>
        <ZxingReader
          onResult={(result, error) => {
            if (error) {
              console.info(error);
              return;
            }
            if (result) {
              setData(result.getText());
            }
          }}
        />
      </div>
      <div>{data}</div>
    </main>
  );
}
