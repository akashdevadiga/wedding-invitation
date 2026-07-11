import { useEffect, useState } from 'react';
import './Countdown.css';

function formatCount(value) {
  return String(value).padStart(2, '0');
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTime({
        days: formatCount(days),
        hours: formatCount(hours),
        minutes: formatCount(minutes),
        seconds: formatCount(seconds)
      });
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="countdown" aria-label="Wedding countdown">
      <div className="countdown__wrapper">
        <h2>Counting Down to Forever</h2>
        <div className="countdown__grid">
          <div className="countdown__card">
            <span>{time.days}</span>
            <small>Days</small>
          </div>
          <div className="countdown__card">
            <span>{time.hours}</span>
            <small>Hours</small>
          </div>
          <div className="countdown__card">
            <span>{time.minutes}</span>
            <small>Minutes</small>
          </div>
          <div className="countdown__card">
            <span>{time.seconds}</span>
            <small>Seconds</small>
          </div>
        </div>
      </div>
    </section>
  );
}
