const generateRandomId = () => Math.random().toString(36).substring(2, 15);
const generateRandomName = () => {
    const adjectives = ['Brave', 'Curious', 'Energetic', 'Mighty', 'Wise'];
    const nouns = ['Fox', 'Bear', 'Hawk', 'Lion', 'Wolf'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};
const generateRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
    return colors[Math.floor(Math.random() * colors.length)];
};

class UserGenerator {
    static random() {
        return { 
            id: generateRandomId(),
            name: generateRandomName(),
            color: generateRandomColor()
        };
    }
}

export default UserGenerator;