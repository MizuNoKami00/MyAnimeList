import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Anime {
  id: number;
  Title: string;
  Description: string;
  Image: {
    url: string; // Cloudinary image URL
  };
  Released: string;
}

interface BlogPost {
  id: number;
  Title: string;
  Description: string;
}

const Home = () => {
  const [randomAnimes, setRandomAnimes] = useState<Anime[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const token = '0e1f0dcf2cfe9e34723843f282c46576d3c7e5a934acc72a4957d7637e45a474d237c19ae22366824b440e4bd081412b8c204ef19bde1df4e52154256e4baa4eb71c299cf53af539c3ef29aeafad21fd925fbf606b0d4674c932a1ef5b7e920f04af9d01ce87df731b614af58925206cbf2af647cf40322fce280c93e99eb625'; 

      try {
        const response = await fetch('http://localhost:1337/api/a-posts?populate=*', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Fetched data:', data);

        if (Array.isArray(data) || (data && typeof data === 'object' && Object.keys(data).length > 0)) {
          const formattedData: Anime[] = Array.isArray(data)
            ? data.map((anime: any) => ({
                id: anime.id,
                Title: anime.attributes?.Title || '', // Add a check for 'Title'
                Description: anime.attributes?.Description || '', // Add a check for 'Description'
                Image: {
                  url: anime.attributes?.Image.data.attributes.url || '', // Add a check for 'Image'
                },
                Released: anime.attributes?.Released || '', // Add a check for 'Released'
              }))
            : Object.values(data).map((anime: any) => ({
                id: anime.id,
                Title: anime.attributes?.Title || '', // Add a check for 'Title'
                Description: anime.attributes?.Description || '', // Add a check for 'Description'
                Image: {
                  url: anime.attributes?.Image.data.attributes.url || '', // Add a check for 'Image'
                },
                Released: anime.attributes?.Released || '', // Add a check for 'Released'
              }));

          setRandomAnimes(formattedData.slice(0, 3)); // Display only the first 3 items
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch blog posts from Strapi
    fetchBlogPostsFromStrapi().then(postsData => {
      setBlogPosts(postsData);
    });
  }, []);

  const fetchBlogPostsFromStrapi = async () => {
    try {
      // Fetch blog posts from Strapi
      const response = await fetch('http://localhost:1337/posts?populate=*');
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedData: BlogPost[] = data.map((post: any) => ({
          id: post.id,
          Title: post.Title || '', // Add a check for 'Title'
          Description: post.Description || '', // Add a check for 'Description'
        }));

        return formattedData;
      } else {
        console.error('Fetched data is not an array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const filteredBlogPosts = blogPosts.filter(post =>
    post.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <section>
        <h2 className="text-3xl font-bold mb-6">Anime Recommendations</h2>
        <div className="grid grid-cols-3 gap-8">
          {randomAnimes.map(anime => (
            <div key={anime.id} className="border p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <Link href={`/animes/${anime.id}`}>
                <Image src={anime.Image.url} alt={anime.Title} width={300} height={400} className="transform hover:scale-105 transition duration-300" />
              </Link>
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">{anime.Title}</h3>
                <p className="text-gray-600">{anime.Description}</p>
                <p className="text-gray-600">{anime.Released}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
        <input
          type="text"
          placeholder="Search by anime name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-3 gap-8">
          {filteredBlogPosts.map(post => (
            <div key={post.id} className="border p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold mb-2">{post.Title}</h3>
              <p className="text-gray-600">{post.Description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
