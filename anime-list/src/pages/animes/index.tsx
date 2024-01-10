import { getAnimes, Anime as LocalAnime } from '@/api/animes';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Anime {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  reviews: string[];
}

interface AnimesProps {
  animes: Anime[];
}

export const getStaticProps: GetStaticProps<AnimesProps> = async () => {
  let localAnimes: LocalAnime[] = await getAnimes(); // Fetch anime images from local API
  const localAnimeImages: Record<string, string> = {
    "The Garden of Words": "/Garden_of_Words.jpeg",
    "Re:Zero − Starting Life in Another World": "/rezero.jpg",
    "Death Note": "/deathnnote.jpg",
    "The Seven Deadly Sins (Nanatsu no Taizai)": "/TheSevenDeadlySins.jpg",
    "Naruto": "/naruto.jpg",
    "My Hero Academia (Boku no Hero Academia)": "/boku.jpg",
  };

  const strapiResponse = await fetch('http://localhost:1337/api/a-posts');
  const strapiAnimes = await strapiResponse.json();

  const animes: Anime[] = strapiAnimes.map((anime: any) => {
    const localAnime = localAnimes.find((localAnime) => localAnime.title === anime.attributes.Title);
    const imageURL = localAnime ? localAnimeImages[localAnime.title] || "/default-image.jpg" : "/default-image.jpg";
    return {
      id: anime.id,
      title: anime.attributes.Title || '',
      description: anime.attributes.Description || '',
      date: anime.attributes.Released || '',
      image: imageURL,
      reviews: [], 
    };
  });

  return {
    props: {
      animes: animes,
    },
  };
};

const getRandomReview = (reviews: string[]): string => {
  const randomIndex = Math.floor(Math.random() * reviews.length);
  return reviews[randomIndex];
};

const Animes = ({ animes }: AnimesProps) => {
  return (
    <div className="flex flex-wrap gap-8">
      {animes.map(anime => (
        <div key={anime.id} className="max-w-md border rounded-lg overflow-hidden shadow-md">
          <Link href={`/animes/${anime.id}`}>
            <div className="w-full h-56 overflow-hidden transition-transform duration-300 transform hover:scale-105">
              <img src={anime.image} alt={anime.title} className="w-full h-full object-cover" />
            </div>
          </Link>
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">{anime.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{new Date(anime.date).toLocaleDateString('nl-BE')}</p>
            <p className="text-sm text-gray-700">{getRandomReview(anime.reviews)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animes;
