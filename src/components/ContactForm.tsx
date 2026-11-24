import { useState, type SubmitEvent } from 'react';
import { decodeMail, buildMailto } from '../lib/mail';

type Subject = 'project' | 'outsource' | 'job' | 'cv';

interface Props {
  /** Formspree uyumlu adres; boşsa form ziyaretçinin e-posta uygulamasını açar (mailto). */
  endpoint?: string;
  /** Kodlanmış e-posta adresi (lib/mail.ts); HTML'de düz metin olarak durmaz. */
  mail?: string;
  labels: {
    name: string;
    email: string;
    company: string;
    subject: string;
    purpose: string;
    message: string;
    send: string;
    sendMail: string;
    mailOpened: string;
    sending: string;
    success: string;
    error: string;
    required: string;
  };
  subjects: Record<Subject, string>;
}

type State = 'idle' | 'sending' | 'success' | 'error' | 'mailto';

/**
 * Statik site için iletişim formu (React island).
 * Formspree uyumlu bir endpoint'e JSON gönderir. "CV talebi" seçilince firma ve amaç zorunlu olur.
 */
export default function ContactForm({ endpoint, mail, labels, subjects }: Props) {
  const [subject, setSubject] = useState<Subject>('project');
  const [state, setState] = useState<State>('idle');
  const cv = subject === 'cv';

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return; // bot tuzağı
    if (!endpoint) {
      if (!mail) return;
      const head = [
        `${labels.name}: ${data.name ?? ''}`,
        `${labels.email}: ${data.email ?? ''}`,
        data.company ? `${labels.company}: ${data.company}` : '',
        data.purpose ? `${labels.purpose}: ${data.purpose}` : '',
      ].filter(Boolean);
      const subjectLine = `[${subjects[subject]}] ${data.name ?? ''}`;
      window.location.href = buildMailto(decodeMail(mail), subjectLine, `${head.join('\n')}\n\n${data.message ?? ''}`);
      setState('mailto');
      return;
    }
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
        {state === 'sending' ? labels.sending : endpoint ? labels.send : labels.sendMail}
      </button>
      {state === 'mailto' && (
        <p className="form-msg form-msg--ok" role="status">
          {labels.mailOpened}
        </p>
      )}
      {state === 'error' && (
        <p className="form-msg form-msg--err" role="alert">
          {labels.error}
        </p>
      )}
    </form>
  );
}
