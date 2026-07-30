import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Award, Flame, Zap, Trophy, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export function JourneyReplay({ onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Your Interview Preparation Journey",
      subtitle: "Here's how far you've come on NextRound!",
      icon: Trophy,
      iconColor: "#f59e0b",
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--color-primary)', margin: '1rem 0' }}>
            200+
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
            DSA & Database Query Problems Solved Across 6 Core Technical Topics
          </p>
        </div>
      )
    },
    {
      title: "Current Active Streak",
      subtitle: "Consistency creates technical excellence!",
      icon: Flame,
      iconColor: "#ef4444",
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', fontWeight: '800', color: '#ef4444', margin: '1rem 0' }}>
            🔥 21 Days
          </div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
            You haven't missed a single practice check-in this month. Keep building momentum!
          </p>
        </div>
      )
    },
    {
      title: "Top Mastered Concept",
      subtitle: "Your strongest technical skill area",
      icon: Zap,
      iconColor: "#10b981",
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981', margin: '1rem 0' }}>
            Sliding Window (90%)
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
            Near-flawless execution on variable window size and sub-array optimization problems.
          </p>
        </div>
      )
    },
    {
      title: "Ready for the Next Round!",
      subtitle: "Keep practicing and stay focused.",
      icon: HeartHandshake,
      iconColor: "#8b5cf6",
      content: (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f0f6fc', margin: '1.5rem 0' }}>
            Target: Top Tech Product Companies
          </div>
          <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Back to Preparation Dashboard
          </button>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (currentSlide === slides.length - 1) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  }, [currentSlide, slides.length]);

  const SlideIcon = slides[currentSlide].icon;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0,
      bottom: 0,
      width: '100vw', 
      height: '100vh', 
      background: 'rgba(9, 13, 22, 0.95)', 
      backdropFilter: 'blur(20px)', 
      zIndex: 2500,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1rem'
    }}>
      <div className="glass-card" style={{ maxWidth: '520px', width: '92%', padding: '2.5rem', border: '1px solid #484f58', margin: '0 auto', boxShadow: '0 25px 60px rgba(0,0,0,0.9)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem', flex: 1, marginRight: '1rem' }}>
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                style={{ 
                  height: '4px', 
                  flex: 1, 
                  background: idx <= currentSlide ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
                  borderRadius: '2px',
                  transition: 'background 0.3s ease'
                }} 
              />
            ))}
          </div>

          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '1rem', 
            borderRadius: '50%', 
            background: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '1rem' 
          }}>
            <SlideIcon size={36} style={{ color: slides[currentSlide].iconColor }} />
          </div>

          <h2 style={{ fontSize: '1.5rem', color: '#f0f6fc', marginBottom: '0.35rem' }}>
            {slides[currentSlide].title}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {slides[currentSlide].subtitle}
          </p>
        </div>

        <div style={{ minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {slides[currentSlide].content}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid #30363d' }}>
          <button 
            className="btn btn-secondary" 
            disabled={currentSlide === 0}
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            style={{ opacity: currentSlide === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {currentSlide + 1} of {slides.length}
          </span>

          <button 
            className="btn btn-primary"
            disabled={currentSlide === slides.length - 1}
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            style={{ opacity: currentSlide === slides.length - 1 ? 0.4 : 1 }}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
