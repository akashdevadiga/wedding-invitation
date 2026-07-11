import { useState } from 'react';
import './RSVP.css';

export default function RSVP() {
  const [form, setForm] = useState({ name: '', guests: '1', attending: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.attending) {
      setStatus('Please provide your name and attending status.');
      return;
    }
    setStatus('Thank you! Your RSVP has been recorded.');
    setForm({ name: '', guests: '1', attending: '', message: '' });
  };

  return (
    <section className="rsvp" aria-label="RSVP form">
      <div className="rsvp__wrapper">
        <h2>Send a Message</h2>
        <p className="rsvp__intro">Please let us know if you will join our celebration.</p>
        <form className="rsvp__form" onSubmit={handleSubmit}>
          <label>
            Guest Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Number of Guests
            <input
              type="number"
              name="guests"
              min="1"
              value={form.guests}
              onChange={handleChange}
            />
          </label>
          <fieldset className="rsvp__attendance">
            <legend>Attending</legend>
            <label>
              <input
                type="radio"
                name="attending"
                value="Yes"
                checked={form.attending === 'Yes'}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="attending"
                value="No"
                checked={form.attending === 'No'}
                onChange={handleChange}
              />
              No
            </label>
          </fieldset>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
            />
          </label>
          {status && <p className="rsvp__status">{status}</p>}
          <button type="submit" className="rsvp__button">Send RSVP</button>
        </form>
      </div>
    </section>
  );
}
