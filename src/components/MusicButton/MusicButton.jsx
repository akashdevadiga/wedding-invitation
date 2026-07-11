import './MusicButton.css';

export default function MusicButton({ isMuted, onToggle }) {
  return (
    <button
      type="button"
      className="music-button"
      onClick={onToggle}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      <span className="music-button__icon" aria-hidden="true">
        {isMuted ? '🔇' : '🎵'}
      </span>
      <span className="music-button__label">{isMuted ? 'Unmute' : 'Mute'}</span>
    </button>
  );
}
