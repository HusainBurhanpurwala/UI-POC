import React, { useState, useEffect } from 'react';
import { MagneticCursor } from '@/components/animmaster/MagneticCursor';
import { FilmGrainOverlay } from '@/components/animmaster/FilmGrainOverlay';
import { DustMotesOverlay } from '@/components/animmaster/DustMotesOverlay';
import { SceneTransition } from '@/components/animmaster/SceneTransition';
import { AudioToggle } from '@/components/audio/AudioToggle';
import { SceneNavigator } from '@/components/navigation/SceneNavigator';
import { Act1Genesis } from '@/components/scenes/Act1Genesis';
import { Act2TheQuestion } from '@/components/scenes/Act2TheQuestion';
import { Act3ThreeDays } from '@/components/scenes/Act3ThreeDays';
import { Act4TheArchive } from '@/components/scenes/Act4TheArchive';
import { Act5TheHeart } from '@/components/scenes/Act5TheHeart';
import { Act6TheFuture } from '@/components/scenes/Act6TheFuture';
import { AmbientArchiveMode } from '@/components/archive/AmbientArchiveMode';
import { getColorWorldForScene } from '@/config/colorWorlds';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [visitorName, setVisitorName] = useState(() => {
    return localStorage.getItem('tbc_visitor_name') || '';
  });
  const [isArchiveMode, setIsArchiveMode] = useState(false);

  const activeWorld = getColorWorldForScene(currentScene);

  // Easter egg in console
  useEffect(() => {
    console.log(
      "%c If you're reading this, you found another little secret. ❤️",
      'color: #C98291; font-size: 14px; font-family: serif; font-style: italic;'
    );
  }, []);

  const handleUpdateName = (name: string) => {
    setVisitorName(name);
    try {
      localStorage.setItem('tbc_visitor_name', name);
    } catch {
      // localStorage fallback
    }
  };

  const handleNext = () => {
    if (currentScene < 47) {
      setCurrentScene((prev) => prev + 1);
    } else {
      setIsArchiveMode(true);
    }
  };

  const handlePrev = () => {
    if (currentScene > 1) {
      setCurrentScene((prev) => prev - 1);
    }
  };

  // Determine current chapter title for the contextual navigation bar
  const getChapterTitle = (scene: number): string => {
    if (scene <= 4) return 'Act I · The Threshold';
    if (scene <= 8) return 'Act I · Whispers';
    if (scene <= 16) return 'Act II · The Question';
    if (scene <= 28) return 'Act III · The Three Days';
    if (scene <= 37) return 'Act IV · The Archive';
    if (scene <= 40) return 'Act V · The Heart';
    return 'Act VI · To Be Continued';
  };

  return (
    <div
      style={{
        background: isArchiveMode ? '#12090B' : activeWorld.bgGradient,
        color: activeWorld.textPrimary,
        ['--color-world-primary' as any]: activeWorld.textPrimary,
        ['--color-world-secondary' as any]: activeWorld.textSecondary,
        ['--color-world-accent' as any]: activeWorld.textAccent,
        ['--color-world-card-bg' as any]: activeWorld.cardBg,
        ['--color-world-card-border' as any]: activeWorld.cardBorder,
      }}
      className="min-h-screen w-full relative overflow-x-hidden transition-all duration-1000 ease-out"
    >
      {/* 35mm Procedural Film Grain Overlay */}
      <FilmGrainOverlay />

      {/* Luminous Floating Dust Motes Tinted to Current World */}
      <DustMotesOverlay color={activeWorld.motesColor} />

      {/* Animmaster Magnetic Custom Cursor (Desktop) */}
      <MagneticCursor />

      {/* Floating Audio Controller */}
      <AudioToggle />

      {/* Contextual Navigation Bar (Keyboard & Tap) */}
      <SceneNavigator
        currentScene={currentScene}
        totalScenes={47}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={currentScene === 2 ? Boolean(visitorName) : true}
        canGoPrev={currentScene > 1}
        chapterTitle={getChapterTitle(currentScene)}
        isArchiveMode={isArchiveMode}
      />

      {/* Main Cinematic Viewport (Rack-Focus Morphing) */}
      {isArchiveMode ? (
        <AmbientArchiveMode
          visitorName={visitorName}
          onExitArchive={() => setIsArchiveMode(false)}
        />
      ) : (
        <SceneTransition sceneKey={currentScene}>
          {currentScene <= 8 && (
            <Act1Genesis
              scene={currentScene}
              visitorName={visitorName}
              setVisitorName={handleUpdateName}
              onNext={handleNext}
            />
          )}

          {currentScene >= 9 && currentScene <= 16 && (
            <Act2TheQuestion scene={currentScene} onNext={handleNext} />
          )}

          {currentScene >= 17 && currentScene <= 28 && (
            <Act3ThreeDays scene={currentScene} onNext={handleNext} />
          )}

          {currentScene >= 29 && currentScene <= 37 && (
            <Act4TheArchive
              scene={currentScene}
              visitorName={visitorName}
              onNext={handleNext}
            />
          )}

          {currentScene >= 38 && currentScene <= 40 && (
            <Act5TheHeart scene={currentScene} onNext={handleNext} />
          )}

          {currentScene >= 41 && currentScene <= 47 && (
            <Act6TheFuture
              scene={currentScene}
              onEnterArchive={() => setIsArchiveMode(true)}
              onNext={handleNext}
            />
          )}
        </SceneTransition>
      )}
    </div>
  );
};

export default App;
