import './Venue.css';

export default function Venue({ venue }) {
  const query = encodeURIComponent(`${venue.name}, ${venue.address}`);
  const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section className="venue" aria-label="Venue information">
      <div className="venue__wrapper">
        <h2>Venue</h2>
        <div className="venue__details">
          <div>
            <p className="venue__name">{venue.name}</p>
            <p className="venue__address">{venue.address}</p>
          </div>
          <a
            className="venue__button"
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Google Maps
          </a>
        </div>
        <div className="venue__map">
          <iframe
            title="Wedding venue map"
            src={mapUrl}
            loading="lazy"
            aria-hidden="false"
          />
        </div>
      </div>
    </section>
  );
}
