import { useState, type SubmitEvent } from 'react';

type Subject = 'project' | 'outsource' | 'job' | 'cv';

interface Props {
  endpoint: string;
  labels: {
    name: string;
    email: string;
    company: string;
    subject: string;
    purpose: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    required: string;
  };
  subjects: Record<Subject, string>;
}

type State = 'idle' | 'sending' | 'success' | 'error';

/**
 * Statik site için iletişim formu (React island).
 * Formspree uyumlu bir endpoint'e JSON gönderir. "CV talebi" seçilince firma ve amaç zorunlu olur.
 */
export default function ContactForm({ endpoint, labels, subjects }: Props) {
  const [subject, setSubject] = useState<Subject>('project');
  const [state, setState] = useState<State>('idle');
  const cv = subject === 'cv';

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // bot tuzağı
    setState('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, _subject: `[${subjects[subject]}] ${data.name ?? ''}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setSubject('project');
      setState('success');
    } catch {
      setState('error');
    }
  }

  const req = <span className="req"> ({labels.required})</span>;

  if (state === 'success') {
    return (
      <p className="form-msg form-msg--ok" role="status">
        {labels.success}
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="cf-subject">{labels.subject}</label>
        <select id="cf-subject" name="subject" value={subject} onChange={(e) => setSubject(e.target.value as Subject)}>
          {(Object.keys(subjects) as Subject[]).map((k) => (
            <option key={k} value={k}>
              {subjects[k]}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">
            {labels.name}
            {req}
          </label>
          <input id="cf-name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">
            {labels.email}
            {req}
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-company">
            {labels.company}
            {cv && req}
          </label>
          <input id="cf-company" name="company" required={cv} autoComplete="organization" />
        </div>
        {cv && (
          <div className="field">
            <label htmlFor="cf-purpose">
              {labels.purpose}
              {req}
            </label>
            <input id="cf-purpose" name="purpose" required />
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="cf-message">
          {labels.message}
          {!cv && req}
        </label>
        <textarea id="cf-message" name="message" rows={6} required={!cv} />
      </div>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? labels.sending : labels.send}
      </button>
      {state === 'error' && (
        <p className="form-msg form-msg--err" role="alert">
          {labels.error}
        </p>
      )}
    </form>
  );
}
