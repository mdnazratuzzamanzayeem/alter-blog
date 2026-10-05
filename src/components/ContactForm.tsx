import React, { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botcheck) return; // honeypot
    
    setStatus('submitting');
    setFeedbackMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '20c41191-09b3-4c3e-b1c5-ef157eb38720',
          subject: 'New message from Alter Contact Form',
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      const result = await response.json();
      if (response.status === 200 || result.success) {
        setStatus('success');
        setFeedbackMsg('Thank you. Your message has been received.');
        setFormData({ name: '', email: '', message: '', botcheck: '' });
        setTimeout(() => {
          setStatus('idle');
          setFeedbackMsg('');
        }, 5000);
      } else {
        setStatus('error');
        setFeedbackMsg(result.message || 'Failed to submit. Please try again.');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setFeedbackMsg('Network error. Please check your connection and try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl mx-auto items-center w-full">
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        checked={!!formData.botcheck}
        onChange={e => setFormData(p => ({ ...p, botcheck: e.target.checked ? 'bot' : '' }))}
      />

      <div className="flex flex-col gap-2 w-full text-center">
        <label htmlFor="contact-name" className="text-sm font-medium text-[var(--text-main)]">
          Full Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Jane Doe"
          className="w-full p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:bg-[var(--input-focus)] focus:border-[var(--input-focus-border)] focus:outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/10 transition-all text-center text-base"
        />
      </div>

      <div className="flex flex-col gap-2 w-full text-center">
        <label htmlFor="contact-email" className="text-sm font-medium text-[var(--text-main)]">
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="jane@example.com"
          className="w-full p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:bg-[var(--input-focus)] focus:border-[var(--input-focus-border)] focus:outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/10 transition-all text-center text-base"
        />
      </div>

      <div className="flex flex-col gap-2 w-full text-center">
        <label htmlFor="contact-message" className="text-sm font-medium text-[var(--text-main)]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="How can we help you?"
          className="w-full p-4 rounded-2xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-main)] placeholder-[var(--text-light)] focus:bg-[var(--input-focus)] focus:border-[var(--input-focus-border)] focus:outline-none focus:ring-4 focus:ring-black/5 dark:focus:ring-white/10 transition-all text-center text-base resize-y"
        />
      </div>

      {feedbackMsg && (
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium ${
            status === 'success'
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
          }`}
        >
          {status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{feedbackMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={`inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-medium text-base transition-all duration-300 shadow-md ${
          status === 'submitting'
            ? 'opacity-70 cursor-not-allowed bg-[var(--btn-bg)] text-[var(--btn-text)]'
            : status === 'success'
            ? 'bg-emerald-600 text-white'
            : 'bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)] hover:-translate-y-0.5 hover:shadow-xl cursor-pointer'
        }`}
      >
        {status === 'submitting' ? (
          <>
            <span>Sending...</span>
            <Loader2 className="w-5 h-5 animate-spin" />
          </>
        ) : status === 'success' ? (
          <>
            <span>Message Sent</span>
            <CheckCircle2 className="w-5 h-5" />
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
