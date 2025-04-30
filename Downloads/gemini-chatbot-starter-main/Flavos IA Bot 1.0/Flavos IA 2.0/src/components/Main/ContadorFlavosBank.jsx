import React, { useState, useEffect } from 'react';

function CountdownTimer({ targetDate, eventName }) {
  const [remainingTime, setRemainingTime] = useState(
    calculateTimeRemaining(targetDate)
  ); // Certifique-se de que o valor inicial está sendo calculado

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTime(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]); // O useEffect depende de targetDate

  function calculateTimeRemaining(endDate) {
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      // O evento já passou
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  // Agora remainingTime está definido
  const timeString = `${remainingTime.days} dias ${remainingTime.hours} horas ${remainingTime.minutes} minutos e ${remainingTime.seconds} segundos`;

  return (
    <span>
      <b>Dias até o {eventName}<br></br></b>
      Faltam {timeString} até {targetDate.toLocaleDateString()} às{" "}
      {targetDate.toLocaleTimeString()}
    </span>
  );
}

export default CountdownTimer;

