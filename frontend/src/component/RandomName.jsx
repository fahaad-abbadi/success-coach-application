const RandomName = () => {
    const adjectives = [
        "Chill", "Aura", "Witty", "Happy", "Chill", "Bouncy", "Goofy", 
        "Vibe", "Curious", "Zesty", "Snazzy", "Quirky", "Lively", "Wobbly"
    ];

    const nouns = [
        "Panda", "Penguin", "Taco", "Noodle", "Tiger", "Squirrel", "Rabbit", 
        "Octopus", "Sloth", "Burrito", "Cactus", "Toaster", "Camel", "Cat"
    ];

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(10 + Math.random() * 90); // 3-digit number

    return `${randomAdjective}${randomNoun}${randomNum}`;
};

export default RandomName;