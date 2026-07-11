import { useEffect, useRef, useState } from 'react';
import './App.css';
import invitation from './data/invitation';
import InvitationCover from './components/InvitationCover/InvitationCover';
import HeroSection from './components/HeroSection/HeroSection';
import InvitationMessage from './components/InvitationMessage/InvitationMessage';
import ScratchCard from './components/ScratchCard/ScratchCard';
import Gallery from './components/Gallery/Gallery';
import Countdown from './components/Countdown/Countdown';
import Timeline from './components/Timeline/Timeline';
import Venue from './components/Venue/Venue';
import DressCode from './components/DressCode/DressCode';
import PreWeddingEvents from './components/PreWeddingEvents/PreWeddingEvents';
import RSVP from './components/RSVP/RSVP';
import MusicButton from './components/MusicButton/MusicButton';

function App() {
  const [opened, setOpened] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = opened ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [opened]);

  // Ensure the page starts at the top when the app first loads
  useEffect(() => {
    const scrollToTop = () => {
      try {
        // primary attempt
        window.scrollTo(0, 0);
      } catch (e) {
        // ignore
      }
      try {
        // DOM fallbacks
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } catch (e) {
        // ignore
      }
    };

    // Run on next paint and again shortly after to handle overflow/paint timing
    requestAnimationFrame(() => {
      scrollToTop();
      setTimeout(scrollToTop, 50);
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const handleOpen = async () => {
    // finalize opening (cover animation already started)
    setOpened(true);
  };

  const handleGesturePlay = async () => {
    // called directly from a user gesture to satisfy autoplay policies
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        // ensure unmuted for immediate playback
        setMuted(false);
      } catch (error) {
        console.warn('Audio playback not available on gesture', error);
      }
    }
  };

  const toggleMute = () => {
    setMuted((current) => !current);
  };

  return (
    <div className="App">
      <audio ref={audioRef} src="/music/track2.mp3" loop preload="metadata" />
      <HeroSection couple={invitation.couple} heroMessage={invitation.heroMessage} />
      <InvitationMessage message={invitation.invitationMessage} />
      <ScratchCard wedding={invitation.wedding} />
      <Gallery slides={invitation.gallery} />
      <Countdown targetDate={invitation.wedding.dateISO} />
      <Timeline items={invitation.timeline} />
      <Venue venue={invitation.venue} />
      {/* <DressCode />
      <PreWeddingEvents events={invitation.preWeddingEvents} />
      <RSVP /> */}
      {!opened && <InvitationCover onOpen={handleOpen} onGesture={handleGesturePlay} />}
      <MusicButton isMuted={muted} onToggle={toggleMute} />
    </div>
  );
}

export default App;
