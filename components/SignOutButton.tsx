'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function out() {
    setBusy(true);
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } finally {
      router.push('/signin');
    }
  }

  return (
    <button onClick={out} disabled={busy} className="btn-ghost disabled:opacity-60">
      {busy ? 'Closing…' : 'Sign out'}
    </button>
  );
}
