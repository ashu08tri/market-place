"use client"
import Countdown from 'react-countdown';

const currentDate = new Date().getDate() + 1;
const endingDate = new Date(`2024-08-${currentDate}`);

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Time's up!</span>;
  } else {
    // Render the countdown
    return (
      <div className="flex space-x-6 text-center">
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{days}</span>
          <span className="text-sm">DAYS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{hours}</span>
          <span className="text-sm">HOURS</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{minutes}</span>
          <span className="text-sm">MINUTES</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-5xl font-semibold">{seconds}</span>
          <span className="text-sm">SECONDS</span>
        </div>
      </div>
    );
  }
};

function CountDown() {
  return (
    <Countdown
      className="countDown"
      date={endingDate}
      renderer={renderer}
    />
  );
}

export default CountDown;
