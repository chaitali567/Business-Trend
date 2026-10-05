import React from 'react';
import { NewsletterBox } from '../components/NewsletterBox';
import { CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { AUTHOR_CHAITALI } from '../data/articles';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-[#e6e5df] pb-8">
        <span className="text-[#d9381e] text-[11px] font-bold uppercase tracking-[0.16em] block">
          About The Publication
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#121211] leading-tight uppercase">
          The Business Behind the Trend
        </h1>
        <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed">
          Why things become popular — and who makes money from them.
        </p>
      </div>

      {/* Core Mission */}
      <div className="prose-editorial">
        <p className="text-xl sm:text-2xl font-normal leading-relaxed text-[#121211] border-l-2 border-[#d9381e] pl-6 my-6">
          The Business Behind the Trend looks beyond viral moments and popular products to understand the psychology, marketing, business strategy, and cultural forces that make them successful.
        </p>

        <p>
          Have you ever wondered why everyone on campus suddenly started carrying the exact same $45 water cup? Or why your friends line up at 4:00 AM outside a shopping mall to buy a $20 furry monster toy with sharp teeth? Or why cafes charge $8 for green tea and make thousands of dollars doing it?
        </p>

        <p>
          Most news websites either report on these trends like silly internet jokes, or they use confusing corporate jargon that only people with an MBA can understand.
        </p>

        <p>
          We do something different: <strong>we explain the real business behind popular trends in simple, natural, conversational English</strong>. No boring textbook definitions. No corporate fluff. Just clear explanations of why people want things and how companies make money.
        </p>
      </div>

      {/* The 6 Core Questions */}
      <div className="space-y-6 pt-4 border-t border-[#e6e5df]">
        <div className="space-y-1">
          <span className="text-[11px] font-mono font-bold text-[#d9381e] uppercase">
            Our Editorial Framework
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#121211] uppercase tracking-tight">
            The 6 Questions We Answer for Every Trend
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Whenever an obsession takes over social media, we break it down with these six simple steps:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">01 / THE EVENT</span>
            <h3 className="font-display text-base text-stone-900">1. What Happened?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The straightforward facts: what product, brand, or moment suddenly exploded onto the scene.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">02 / THE SPARK</span>
            <h3 className="font-display text-base text-stone-900">2. Why Did It Become Popular?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The hidden reasons: the problem it solved, the cultural timing, or the new aesthetic that caught fire.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">03 / THE ENGINE</span>
            <h3 className="font-display text-base text-stone-900">3. How Did It Spread?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The mechanics: TikTok algorithms, viral morning routine videos, celebrity endorsements, or sound memes.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">04 / THE MONEY</span>
            <h3 className="font-display text-base text-stone-900">4. Who Made Money?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The math: who collected the profit, what the profit margins look like, and how businesses turned attention into cash.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">05 / THE PSYCHOLOGY</span>
            <h3 className="font-display text-base text-stone-900">5. Why Did People Want It?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The human brain: fear of missing out (FOMO), social status signaling, feeling part of a community, or comfort.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e6e5df] space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-[#d9381e]">06 / THE PLAYBOOK</span>
            <h3 className="font-display text-base text-stone-900">6. What Can Businesses Learn?</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              The practical takeaway: concrete lessons that any creator, student, or founder can use in their own projects.
            </p>
          </div>
        </div>
      </div>

      {/* Lead Editor & Team Masthead */}
      <div className="space-y-6 pt-4 border-t border-[#e6e5df]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d9381e] block">
            Who Writes This
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-[#121211] mt-1 uppercase tracking-tight">
            The Editorial Team
          </h2>
        </div>

        <div className="p-6 bg-white border border-[#e6e5df] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-4 border-b border-[#e6e5df]">
            <img
              src={AUTHOR_CHAITALI.avatar}
              alt={AUTHOR_CHAITALI.name}
              className="w-16 h-16 rounded-full object-cover shrink-0 border border-[#e6e5df]"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-lg">{AUTHOR_CHAITALI.name}</h3>
                <span className="text-stone-300">·</span>
                <span className="text-xs font-mono font-bold text-[#d9381e] uppercase">
                  Lead Writer & Editor
                </span>
              </div>
              <p className="text-xs text-stone-600 font-medium">
                The Business Behind the Trend Team
              </p>
            </div>
          </div>

          <p className="text-stone-700 text-sm leading-relaxed">
            {AUTHOR_CHAITALI.bio}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-500">
            <span className="bg-stone-100 px-2.5 py-1 rounded-[2px] font-medium text-stone-700">
              ✓ Plain English Only
            </span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-[2px] font-medium text-stone-700">
              ✓ Zero Jargon
            </span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-[2px] font-medium text-stone-700">
              ✓ Verified Numbers
            </span>
            <span className="bg-stone-100 px-2.5 py-1 rounded-[2px] font-medium text-stone-700">
              ✓ Real World Examples
            </span>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="p-8 bg-[#121211] text-white space-y-4 rounded-[2px]">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#d9381e]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Made For Curious Minds</span>
        </div>
        <h3 className="font-display text-2xl text-white uppercase tracking-tight">
          Who This Publication Is For
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
          Whether you are a college student wondering why a video blew up on your feed, a marketing student studying brand strategy, a young entrepreneur building your first brand, or just someone who loves understanding why people buy what they buy — this publication was made for you.
        </p>
        <div className="pt-2 flex flex-wrap gap-2 text-xs">
          {['College Students', 'Gen Z Creators', 'Young Professionals', 'First-Time Founders', 'Curious Consumers'].map((tag) => (
            <span key={tag} className="border border-stone-700 px-3 py-1 text-stone-300 font-mono text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};
