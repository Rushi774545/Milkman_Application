export const getCategoryEmoji = (categoryName) => {
    const name = (categoryName || '').toLowerCase();
    if (name.includes('milk')) return '🥛';
    if (name.includes('curd') || name.includes('yogurt')) return '🥣';
    if (name.includes('butter')) return '🧈';
    if (name.includes('cheese')) return '🧀';
    if (name.includes('ghee')) return '🍯';
    if (name.includes('paneer')) return '🧊';
    return '🥛'; // Default emoji
};

export const getCategoryColor = (categoryName) => {
    const name = (categoryName || '').toLowerCase();
    if (name.includes('milk')) return '#e3f2fd'; // Light blue
    if (name.includes('curd') || name.includes('yogurt')) return '#f3e5f5'; // Light purple
    if (name.includes('butter')) return '#fffde7'; // Light yellow
    if (name.includes('cheese')) return '#fff3e0'; // Light orange
    if (name.includes('ghee')) return '#fff8e1'; // Amber
    if (name.includes('paneer')) return '#f1f8e9'; // Light green
    return '#f5f5f5'; // Default light gray
};
