import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X, Sparkles, Trophy, Award, Flame, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { journeyStories } from '../data/initialData';

export function JourneyReplay({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const story = journeyStories[currentSlide];

  useEffect(() => {
    // Trigger confetti on final slide
    if (currentSlide === journeyStories.length - 1) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < journeyStories.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      background: story.bgColor, 
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center',
      transition: 'background 0.6s ease',
      color: '#fff',
      padding: '2rem'
    }}>
      {/* Top Close Button & Progress Indicator */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', right: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Story Progress Bars */}
        <div style={{ display: 'flex', gap: '0.5rem', flex: 1, maxWidth: '600px' }}>
          {journeyStories.map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                height: '4px', 
                flex: 1, 
                background: idx <= currentSlide ? '#fff' : 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                transition: 'background 0.3s ease'
              }} 
            />
          ))}
        </div>

        <button 
          onClick={onClose}
          style={{ 
            background: 'rgba(255, 255, 255, 0.15)', 
            border: 'none', 
            color: '#fff', 
            padding: '0.6rem', 
            borderRadius: '50%', 
            cursor: 'pointer',
            marginLeft: '1.5rem'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Slide Content Card */}
      <div style={{ textAlign: 'center', maxWidth: '640px', width: '100%', animation: 'floatNode 4s ease-in-out infinite' }}>
        
        <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>
          {story.icon}
        </div>

        <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.2)', color: '#fff', border: 'none', padding: '0.4rem 1rem', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {story.year} • {story.metric}
        </span>

        <h1 style={{ fontSize: '2.75rem', fontWeight: '800', lineHeight: '1.15', margin: '0.75rem 0' }}>
          {story.title}
        </h1>

        <h3 style={{ fontSize: '1.3rem', color: 'rgba(255, 255, 255, 0.8)', fontWeight: '500', marginBottom: '1.5rem' }}>
          {story.subtitle}
        </h3>

        <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6', background: 'rgba(0, 0, 0, 0.25)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(10px)' }}>
          "{story.content}"
        </p>

      </div>

      {/* Nav Controls */}
      <div style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentSlide === 0}
          style={{ opacity: currentSlide === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={20} /> Previous
        </button>

        <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          {currentSlide + 1} of {journeyStories.length}
        </span>

        {currentSlide < journeyStories.length - 1 ? (
          <button 
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next Story <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            className="btn btn-emerald"
            onClick={onClose}
          >
            Finish & Return to Dashboard 🎉
          </button>
        )}
      </div>

    </div>
  );
}
