export const events = [
    {
        id: 1,
        title: "Gaming Expo 2025",
        location: "New York",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: 2,
        title: "Indie Game Developers Meetup",
        location: "San Francisco",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070",
    },
    {
        id: 3,
        title: "Esports Championship",
        location: "Los Angeles",
        image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&q=80&w=2070",
    },
];

export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(events);
        }, 500);
    });
};
