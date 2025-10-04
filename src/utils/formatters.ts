export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount);
};

export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
};

export const formatDateTime = (date: string | Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const getStatusColor = (status: 'green' | 'yellow' | 'red'): string => {
  const colors = {
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  };
  return colors[status];
};

export const getStatusEmoji = (status: 'green' | 'yellow' | 'red'): string => {
  const emojis = {
    green: '🟢',
    yellow: '🟡',
    red: '🔴',
  };
  return emojis[status];
};
