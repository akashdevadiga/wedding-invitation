import './SectionDivider.css';

export default function SectionDivider({ label }) {
  return (
    <div className="section-divider">
      <span className="section-divider__line" />
      {label ? <span className="section-divider__label">{label}</span> : <span className="section-divider__ornament">❤</span>}
      <span className="section-divider__line" />
    </div>
  );
}
