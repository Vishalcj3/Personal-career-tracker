export const extractTextFromFile = async (file) => {
  // No extraction needed - we'll send the file directly
  return file;
};

export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * easeOutQuart;
    
    callback(current);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'danger';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'success';
    default:
      return 'primary';
  }
};

export const getTierColor = (tier) => {
  switch (tier) {
    case 'Tier 1':
      return 'primary';
    case 'Tier 2':
      return 'success';
    case 'Tier 3':
      return 'warning';
    default:
      return 'primary';
  }
};