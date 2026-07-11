import SectionDivider from '../SectionDivider/SectionDivider';
import './InvitationMessage.css';

export default function InvitationMessage({ message }) {
  return (
    <section className="invitation-message" aria-label="Invitation message">
      <div className="invitation-message__wrapper">
        <SectionDivider />
        <p className="invitation-message__text">{message}</p>
        <SectionDivider />
      </div>
    </section>
  );
}
