import './HeroSection.css';

export default function HeroSection({ couple, heroMessage }) {
  return (
    <section className="hero-section" aria-label="Hero welcome section">
      <div className="hero-section__bg" aria-hidden="true" />
      <div className="hero-section__content">
        <div className="hero-section__icon" aria-hidden="true">❤</div>
        <p className="hero-section__message">{heroMessage}</p>
        <div className="hero-section__divider">
          <span className="hero-section__line" />
          <span className="hero-section__heart">❤</span>
          <span className="hero-section__line" />
        </div>
        <div className="hero-section__names">
          <h1>{couple.groom}</h1>
          <p className="hero-section__amp">&</p>
          <h1>{couple.bride}</h1>
        </div>
      </div>
      <div className="hero-section__scroll" aria-hidden="true">
        <span>SCROLL</span>
        <span className="hero-section__arrow">↓</span>
      </div>
    </section>
  );
}
