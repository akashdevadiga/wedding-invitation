import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import './ScratchCard.css';

export default function ScratchCard({ wedding }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const drawState = useRef({ isDrawing: false, lastX: null, lastY: null, strokes: 0, finished: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(ratio, ratio);
      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#f2d6c9');
      gradient.addColorStop(1, '#cda0a8');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(0.75, 0.75, rect.width - 1.5, rect.height - 1.5);
      ctx.font = '600 18px "Cormorant Garamond", serif';
      ctx.fillStyle = '#6c3a46';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Scratch Here', rect.width / 2, rect.height / 2 - 10);
      ctx.font = '22px "Great Vibes", cursive';
      ctx.fillText('❤', rect.width / 2, rect.height / 2 + 25);
    };

    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  const revealOverlay = () => {
    if (drawState.current.finished) return;
    drawState.current.finished = true;
    setRevealed(true);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.transition = 'opacity 0.9s ease';
      canvas.style.opacity = '0';
      window.setTimeout(() => {
        if (canvas) canvas.style.display = 'none';
      }, 900);
    }
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f6d3cb', '#d4717a', '#f0b5ae', '#fff1ea']
    });
  };

  const calculateReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparentCount = 0;
    let sampleCount = 0;
    const step = 4 * 15;
    for (let i = 3; i < image.length; i += step) {
      sampleCount += 1;
      if (image[i] < 128) {
        transparentCount += 1;
      }
    }
    if (sampleCount > 0 && transparentCount / sampleCount >= 0.35) {
      revealOverlay();
    }
  };

  const drawPoint = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const currentX = x - rect.left;
    const currentY = y - rect.top;
    const brushRadius = 22;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = brushRadius * 2;
    if (drawState.current.lastX !== null) {
      ctx.beginPath();
      ctx.moveTo(drawState.current.lastX, drawState.current.lastY);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(currentX, currentY, brushRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawState.current.lastX = currentX;
    drawState.current.lastY = currentY;
  };

  const handlePointerDown = (event) => {
    if (drawState.current.finished) return;
    event.preventDefault();
    drawState.current.isDrawing = true;
    drawState.current.lastX = null;
    drawState.current.lastY = null;
    drawPoint(event.clientX, event.clientY);
  };

  const handlePointerMove = (event) => {
    if (!drawState.current.isDrawing || drawState.current.finished) return;
    event.preventDefault();
    drawPoint(event.clientX, event.clientY);
    drawState.current.strokes += 1;
    if (drawState.current.strokes % 6 === 0) {
      calculateReveal();
    }
  };

  const handlePointerUp = () => {
    if (!drawState.current.isDrawing) return;
    drawState.current.isDrawing = false;
    drawState.current.lastX = null;
    drawState.current.lastY = null;
    if (!drawState.current.finished) {
      calculateReveal();
    }
  };

  return (
    <section className="scratch-card" aria-label="Scratch to reveal wedding card">
      <div className="scratch-card__header">
        <h2>{revealed ? 'Our forever begins' : 'Scratch to Reveal'}</h2>
      </div>
      <div className="scratch-card__divider">
        <span className="scratch-card__divider-line" />
        <span className="scratch-card__divider-heart">❤</span>
        <span className="scratch-card__divider-line" />
      </div>
      <div className="scratch-card__frame" ref={containerRef}>
        <div className="scratch-card__content">
          <div className="scratch-card__text">
            <p className="scratch-card__line">You're Invited!</p>
            <p className="scratch-card__line">{wedding.date}</p>
            <p className="scratch-card__line">{wedding.day}</p>
            <p className="scratch-card__line">{wedding.time}</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className={`scratch-card__overlay ${revealed ? 'scratch-card__overlay--revealed' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Scratch surface"
        />
      </div>
      {revealed && <p className="scratch-card__note">Scratch gently with your finger or mouse.</p>}
    </section>
  );
}
