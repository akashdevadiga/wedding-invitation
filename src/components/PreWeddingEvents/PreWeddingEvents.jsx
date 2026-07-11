import './PreWeddingEvents.css';

export default function PreWeddingEvents({ events }) {
  return (
    <section className="pre-wedding-events" aria-label="Pre wedding events">
      <div className="pre-wedding-events__wrapper">
        <h2>Pre Wedding Events</h2>
        <div className="pre-wedding-events__grid">
          {events.map((event) => (
            <article className="pre-wedding-events__card" key={event.name}>
              <p className="pre-wedding-events__name">{event.name}</p>
              <p className="pre-wedding-events__meta">{event.date} · {event.time}</p>
              <p className="pre-wedding-events__venue">{event.venue}</p>
              <p className="pre-wedding-events__description">{event.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
