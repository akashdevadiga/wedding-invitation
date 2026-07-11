import { useEffect, useState } from 'react';
import './Gallery.css';

export default function Gallery({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => slides.map(() => false));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  const handleImageLoad = (index) => {
    setLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section className="gallery" aria-label="Photo gallery slideshow">
      <div className="gallery__inner">
        <h2>Wedding Memories</h2>
        <div className="gallery__frame">
          {slides.map((slide, index) => (
            <div
              key={slide.src || index}
              className={`gallery__slide ${index === activeIndex ? 'gallery__slide--active' : ''}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={`gallery__image ${loaded[index] ? 'gallery__image--loaded' : ''}`}
                onLoad={() => handleImageLoad(index)}
                onError={(event) => {
                  handleImageLoad(index);
                  event.currentTarget.style.display = 'none';
                }}
              />
              {/* <div className="gallery__placeholder"> 
                <span>{slide.alt}</span>
              </div> */}
            </div>
          ))}
        </div>
        <div className="gallery__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={`gallery__dot ${index === activeIndex ? 'gallery__dot--active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
