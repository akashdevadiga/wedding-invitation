import { useState } from 'react';
import './InvitationCover.css';

export default function InvitationCover({ onOpen, onGesture }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    // Call gesture callback immediately so audio can be started
    onGesture?.();
    setOpening(true);
    window.setTimeout(() => {
      onOpen?.();
    }, 1400);
  };

  return (
    <div className={`invitation-cover ${opening ? 'invitation-cover--opening' : ''}`}>
      <div className="invitation-cover__content">
        <p className="invitation-cover__title">You're Invited</p>
        <button
          type="button"
          className="invitation-cover__seal"
          onClick={handleOpen}
          aria-label="Open invitation"
        >
          <span className="invitation-cover__seal-ring" aria-hidden="true" />
          <span className="invitation-cover__seal-face">
            <span className="invitation-cover__seal-icon">❤</span>
            <span className="invitation-cover__seal-text">tap to open</span>
          </span>
        </button>
        <p className="invitation-cover__hint">tap the seal to open</p>
      </div>
    </div>
  );
}
