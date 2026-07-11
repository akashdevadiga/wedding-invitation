import './DressCode.css';

export default function DressCode() {
  return (
    <section className="dress-code" aria-label="Dress code">
      <div className="dress-code__wrapper">
        <h2>Dress Code</h2>
        <div className="dress-code__grid">
          <div className="dress-code__card">
            <p className="dress-code__role">Women</p>
            <p>Elegant formal attire in pastel or jewel tones.</p>
          </div>
          <div className="dress-code__card dress-code__card--alt">
            <p className="dress-code__role">Men</p>
            <p>Suit or traditional formal wear.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
