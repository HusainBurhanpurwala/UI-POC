import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { STORY_CONFIG } from '@/config/storyConfig';
import { InteractiveDrawer } from '@/components/vengeance/InteractiveDrawer';
import { useLiveCounter } from '@/hooks/useLiveCounters';
import { ArrowLeft, Heart, Clock, Mail, BookOpen } from 'lucide-react';
import { soundEngine } from '@/audio/audioEngine';

interface AmbientArchiveModeProps {
  visitorName: string;
  onExitArchive: () => void;
}

export const AmbientArchiveMode: React.FC<AmbientArchiveModeProps> = ({
  visitorName,
  onExitArchive,
}) => {
  const [activeTab, setActiveTab] = useState<'letter' | 'memories' | 'clocks' | 'future'>('letter');

  const talkCounter = useLiveCounter(STORY_CONFIG.dates.firstConversation);
  const askedCounter = useLiveCounter(STORY_CONFIG.dates.askedOut);
  const meetCounter = useLiveCounter(STORY_CONFIG.dates.meetingStart);

  const handleTabChange = (tab: typeof activeTab) => {
    soundEngine.playGentleClick();
    setActiveTab(tab);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 flex flex-col justify-between"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-dusty-rose/20 pb-4 mb-8">
          <button
            type="button"
            onClick={onExitArchive}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-dusty-rose/70 hover:text-ivory transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to story</span>
          </button>
          <span className="font-editorial italic text-lg text-ivory/80">
            Memory Archive · Private Space
          </span>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10">
          <button
            type="button"
            onClick={() => handleTabChange('letter')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'letter'
                ? 'bg-burgundy text-warm-white border border-accent-red/60 shadow-md'
                : 'bg-wine/20 text-dusty-rose/70 border border-dusty-rose/20 hover:text-ivory'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>The Letter</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('memories')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'memories'
                ? 'bg-burgundy text-warm-white border border-accent-red/60 shadow-md'
                : 'bg-wine/20 text-dusty-rose/70 border border-dusty-rose/20 hover:text-ivory'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Unsaid Notes</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('clocks')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'clocks'
                ? 'bg-burgundy text-warm-white border border-accent-red/60 shadow-md'
                : 'bg-wine/20 text-dusty-rose/70 border border-dusty-rose/20 hover:text-ivory'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Live Clocks</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('future')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all cursor-pointer ${
              activeTab === 'future'
                ? 'bg-burgundy text-warm-white border border-accent-red/60 shadow-md'
                : 'bg-wine/20 text-dusty-rose/70 border border-dusty-rose/20 hover:text-ivory'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>The Unwritten</span>
          </button>
        </div>

        {/* Content per tab */}
        <div className="w-full">
          {activeTab === 'letter' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 sm:p-12 rounded-sm bg-[#FFFDFC] text-ink paper-texture vintage-shadow border border-[#e5d5c5]"
            >
              <h3 className="font-handwritten text-4xl text-burgundy mb-6">
                Dear {visitorName || 'You'},
              </h3>
              <div className="space-y-4 font-editorial text-xl sm:text-2xl text-ink/90 leading-relaxed">
                {STORY_CONFIG.letter.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#e5d5c5] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="font-editorial italic text-burgundy text-lg">
                  "{STORY_CONFIG.letter.postscriptContent}"
                </span>
                <span className="font-handwritten text-2xl text-burgundy">
                  {STORY_CONFIG.letter.closing}
                </span>
              </div>
            </motion.div>
          )}

          {activeTab === 'memories' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <InteractiveDrawer notes={STORY_CONFIG.unsaidEnvelopes} />
            </motion.div>
          )}

          {activeTab === 'clocks' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/20 text-center">
                <div className="font-mono text-xs text-dusty-rose/60 mb-2">28.06.2026</div>
                <div className="font-editorial text-xl text-ivory mb-4">First Words</div>
                <div className="font-mono text-3xl text-ivory mb-2">{talkCounter.days} DAYS</div>
                <div className="font-mono text-xs text-accent-red">
                  {talkCounter.hours}h {talkCounter.minutes}m {talkCounter.seconds}s
                </div>
              </div>

              <div className="p-6 rounded-xl bg-burgundy/30 border border-burgundy/40 text-center">
                <div className="font-mono text-xs text-accent-red/80 mb-2">01.09.2026</div>
                <div className="font-editorial text-xl text-ivory mb-4">The Question</div>
                <div className="font-mono text-3xl text-warm-white mb-2">{askedCounter.days} DAYS</div>
                <div className="font-mono text-xs text-accent-red">
                  {askedCounter.hours}h {askedCounter.minutes}m {askedCounter.seconds}s
                </div>
              </div>

              <div className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/20 text-center">
                <div className="font-mono text-xs text-dusty-rose/60 mb-2">24.09.2026</div>
                <div className="font-editorial text-xl text-ivory mb-4">The Three Days</div>
                <div className="font-mono text-3xl text-ivory mb-2">{meetCounter.days} DAYS</div>
                <div className="font-mono text-xs text-accent-red">
                  {meetCounter.hours}h {meetCounter.minutes}m {meetCounter.seconds}s
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'future' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {STORY_CONFIG.emptyFrames.map((frame) => (
                <div
                  key={frame.id}
                  className="p-5 rounded border border-dashed border-dusty-rose/30 bg-wine/10 text-center flex flex-col justify-center items-center aspect-[4/3]"
                >
                  <div className="font-editorial text-xl text-ivory">{frame.title}</div>
                  <div className="font-editorial italic text-xs text-dusty-rose/60 mt-2">
                    {frame.subtext}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="mt-16 text-center font-editorial italic text-lg text-dusty-rose/60">
        "Some stories are meant to be continued every single day."
      </div>
    </motion.div>
  );
};
