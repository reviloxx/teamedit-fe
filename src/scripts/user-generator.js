const adjectives = ['Brave', 'Curious', 'Energetic', 'Mighty', 'Wise', 'Wild', 'Dirty', 'Lost'];
const nouns = ['Fox', 'Bear', 'Hawk', 'Lion', 'Wolf', 'Horse', 'Hoe', 'Weirdo'];
const colors = ['#ff6666', '#ff9966', '#ffcc66', '#99ff33', '#66ff99', '#66ffcc', '#00ffff', '#33ccff', '#3399ff', '#9999ff', '#cc66ff', '#ff66ff', '#ff6699'];

const generateRandomId = () => Math.random().toString(36).substring(2, 15);
const generateRandomName = () => {
    const adjectives = ['Brave', 'Curious', 'Energetic', 'Mighty', 'Wise', 'Wild', 'Dirty', 'Lost'];
    const nouns = ['Fox', 'Bear', 'Hawk', 'Lion', 'Wolf', 'Horse', 'Hoe', 'Weirdo'];
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};
const generateRandomColor = () => {
    const colors = ['#ff6666', '#ff9966', '#ffcc66', '#99ff33', '#66ff99', '#66ffcc', '#00ffff', '#33ccff', '#3399ff', '#9999ff', '#cc66ff', '#ff66ff', '#ff6699'];
    return colors[Math.floor(Math.random() * colors.length)];
};

class UserGenerator {
    static random() {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return {
            id: generateRandomId(),
            name: `${adjective} ${noun}`,
            initials: `${adjective[0]} ${noun[0]}`,
            color: color
        };
    }
}

export default UserGenerator;