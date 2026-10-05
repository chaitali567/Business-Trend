import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const NewsletterBox: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work or personal email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <div id="newsletter-section" className="bg-[#121211] text-white p-8 sm:p-12 lg:p-14 border border-stone-800 relative">
      <div className="max-w-2xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#d9381e]">
          <Mail className="w-3.5 h-3.5" />
          <span>The Trend Memo — Weekly Dispatch</span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
          Never miss the business behind the next viral wave.
        </h2>

        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
          Every Tuesday morning: a 4-minute diagnostic dissecting consumer psychology, margin structures, and cultural trends. No PR spin. Zero fluff. Pure market intelligence.
        </p>

        {status === 'success' ? (
          <div className="bg-stone-900 border border-stone-700 p-5 rounded-[2px] max-w-md mx-auto flex items-center justify-center gap-3 text-stone-200 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-left">
              You are on the list. Look out for next Tuesday’s dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-2.5">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Your email address"
                className="flex-1 bg-stone-900 border border-stone-700 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-hidden focus:border-[#d9381e] transition-colors rounded-[2px]"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#d9381e] hover:bg-[#bd2c15] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0 rounded-[2px] disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Join Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-400 text-left pl-1">{errorMessage}</p>
            )}

            <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400 pt-1 font-mono">
              <span>42,000+ readers</span>
              <span>·</span>
              <span>No spam</span>
              <span>·</span>
              <span>One-click unsubscribe</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
