import Activity from '../models/activityModel.js';

export const logActivity = async (action, details) => {
  try {
    await Activity.create({
      action,
      details,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(5);
    
    res.json(activities.map(activity => ({
      icon: getIconForAction(activity.action),
      description: activity.details,
      time: formatTime(activity.timestamp)
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching activity' });
  }
};

function getIconForAction(action) {
  const icons = {
    'product_added': '📦',
    'product_updated': '✏️',
    'login': '👤',
    'category_added': '🏷️',
    'default': '📝'
  };
  return icons[action] || icons.default;
}

function formatTime(timestamp) {
  const now = new Date();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  
  return timestamp.toLocaleDateString();
}