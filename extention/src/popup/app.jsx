import { useEffect, useState } from 'react';
import { ArrowRight, SignOut } from '@phosphor-icons/react';
import Input from '../components/Input/Input.jsx';
import Button from '../components/Button/Button.jsx';
import styles from './App.module.css';

const API = 'http://localhost:3000/api';

export default function App() {
  const [form, setForm] = useState({ code: '', name: '' });
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    chrome.storage.local.get('session').then((data) => {
      setSession(data.session ?? null);
      setLoading(false);
    });

    const onChange = (c) => {
      if (c.session) setSession(c.session.newValue ?? null);
    };
    chrome.storage.onChanged.addListener(onChange);
    return () => chrome.storage.onChanged.removeListener(onChange);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.code.trim() || !form.name.trim()) {
      return setError('Fill in all fields');
    }

    const code = form.code.trim().toUpperCase();

    try {
      const res = await fetch(`${API}/sessions/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          name: form.name.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.message || 'Could not join');

      const joined = {
        code,
        name: form.name.trim(),
        token: data.token,
      };
      await chrome.storage.local.set({ session: joined });
      setSession(joined);
    } catch {
      setError('Cannot reach server');
    }
  };

  const handleLeave = async () => {
    await chrome.storage.local.remove('session');
    setSession(null);
    setForm({ code: '', name: '' });
  };

  if (loading) return null;

  if (session) {
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>AssessWatch</h1>
        <p className={styles.subtitle}>Your activity is being monitored.</p>

        <div className={styles.status}>
          <span className={styles.dot} />
          Connected to session <strong>{session.code}</strong>
        </div>

        <p className={styles.meta}>
          Name: <strong>{session.name}</strong>
        </p>

        <Button onClick={handleLeave} icon={<SignOut weight="bold" size={14} />}>
          Leave Session
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Join Session</h1>
      <p className={styles.subtitle}>Enter the code from your teacher.</p>

      <form className={styles.form} onSubmit={handleJoin} noValidate>
        <Input id="code" name="code" label="Session Code" placeholder="ABC123" value={form.code} onChange={handleChange} />
        <Input id="name" name="name" label="Full Name" placeholder="Juan Dela Cruz" value={form.name} onChange={handleChange} error={error} />
        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" icon={<ArrowRight weight="bold" size={14} />}>
          Join
        </Button>
      </form>
    </div>
  );
}
