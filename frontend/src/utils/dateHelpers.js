export const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const startFormatted = start.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
  
  const endFormatted = end.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
  
  return `${startFormatted} – ${endFormatted}`;
};

export const getTimeRemaining = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  const difference = target - now;
  
  if (difference <= 0) {
    return { expired: true };
  }
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return {
    expired: false,
    days,
    hours,
    totalHours: Math.floor(difference / (1000 * 60 * 60)),
  };
};