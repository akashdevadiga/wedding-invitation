import './Timeline.css';

export default function Timeline({ items }) {
  return (
    <section className="timeline" aria-label="Program timeline">
      <div className="timeline__wrapper">
        <h2>Program Timeline</h2>
        <div className="timeline__list">
          {items.map((event, index) => (
            <div className="timeline__item" key={`${event.title}-${index}`}>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__content">
                <p className="timeline__meta">{event.date} · {event.time}</p>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
