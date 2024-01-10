import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getAnimeById } from '@/api/animes';

interface Anime {
  id: number;
  title: string;
  description: string;
  image: string;
  reviews: string[];
  // Add other necessary fields
}

interface AnimeProps {
  anime: Anime;
}

interface Paths extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const res = await fetch('http://localhost:1337/api/a-posts?populate=*'); 
  const animes: Anime[] = await res.json();

  const paths = animes.map((anime) => ({
    params: { id: anime.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<AnimeProps, Paths> = async (context : any) => {
    const { id } = context.params || {};
    const animeId = Number(id);
    const anime = await getAnimeById(animeId); 
  
    return { props: { anime } };
  };

  const AnimeDetails = ({ anime }: AnimeProps) => {
    const router = useRouter();
  
    if (router.isFallback) {
      return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
          <article className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center">
              <Image src={anime.image} alt={anime.title} width={500} height={300} className="object-cover" />
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">{anime.title}</h2>
              <p className="text-gray-700 text-base">{anime.description}</p>
              <div className="text-gray-700 text-base mt-4">
                <p>Reviews:</p>
                <ul>
                  {anime.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-6 text-center">
              <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2" onClick={() => router.back()}>Go back</button>
            </div>
          </article>
        </div>
      );
};

export default AnimeDetails;
