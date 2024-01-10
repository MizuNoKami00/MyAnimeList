export interface Anime {
    id: number;
    title: string;
    description: string;
    date: string;
    image: string;
    reviews: string[]; // Changed to an array of strings
}

const animes: Anime[] = [
    {
        id: 1,
        title: "The Garden of Words",
        description: "Takao, who dreams of becoming a shoemaker, skips school and is sketching shoes in a garden in the middle of Tokyo. He meets a mysterious woman, Yukino, who is older than him. Then, without arranging the times, the two start to see each other again and again, but only on rainy days.",
        date: "1/5/2013",
        image: "/Garden_of_Words.jpeg",
        reviews: [
            "A visually stunning masterpiece! The animation and artwork are breathtaking, enhancing the emotional depth of the story.",
        ]
    },
    {
        id: 2,
        title: "Re:Zero Starting Life in Another World",
        description: "A story about a boy named Subaru Natsuki who gets transported to another world and discovers he has the ability to 'Return by Death,' which allows him to reverse time by dying.",
        date: "5/9/2016",
        image: "/rezero.jpg",
        reviews: [
            "Re:Zero is an emotionally gripping series with intense plot twists.",
        ]
    },
    {
        id: 3,
        title: "Death Note",
        description: "A high school student discovers a supernatural notebook that allows him to kill anyone by writing the person's name while picturing their face.",
        date: "2/2/2006",
        image: "/deathnnote.jpg",
        reviews: [
            "Death Note is a psychological thriller that keeps you at the edge of your seat.",]
    },
    {
        id: 4,
        title: "The Seven Deadly Sins (Nanatsu no Taizai)",
        description: "A group of powerful knights, known as the Seven Deadly Sins, reunites to overthrow the corrupt Holy Knights and save the kingdom.",
        date: "1/10/2014",
        image: "/TheSevenDeadlySins.jpg",
        reviews: [
            "The Seven Deadly Sins offers a mix of action, adventure, and humor.",
        ]
    },
    {
        id: 5,
        title: "Naruto",
        description: "The story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
        date: "3/7/2002",
        image: "/naruto.jpg",
        reviews: [
            "Naruto is a classic shonen anime with a compelling story of growth and friendship.",
        ]
    },
    {
        id: 6,
        title: "My Hero Academia (Boku no Hero Academia)",
        description: "In a world where nearly everyone has superpowers, Izuku Midoriya dreams of becoming a hero despite being born without any powers.",
        date: "7/2/2016",
        image: "/boku.jpg",
        reviews: [
            "My Hero Academia is a fantastic superhero series with well-developed characters.",
        ]
    }
];

export const getAnimes = async (): Promise<Anime[]> => {
    return animes;
  };
  
  export const getAnimeById = async (id: number): Promise<Anime | undefined> => {
    return animes.find((anime) => anime.id === id);
  };