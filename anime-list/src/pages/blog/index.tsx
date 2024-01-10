import { GetStaticProps } from 'next';
import Link from 'next/link';

interface Blog {
  id: number;
  Title: string;
  Description: string;
}

interface BlogsProps {
  blogs: Blog[];
}

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  try {
    const strapiResponse = await fetch('http://localhost:1337/api/posts');
    const strapiBlogs = await strapiResponse.json();

    const blogs: Blog[] = strapiBlogs.map((blog: any) => ({
      id: blog.id,
      Title: blog.attributes.Title || '',
      Description: blog.attributes.Description || '',
    }));

    return {
      props: {
        blogs: blogs,
      },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: {
        blogs: [],
      },
    };
  }
};

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="flex flex-wrap gap-8">
      {blogs.map(blog => (
        <Link key={blog.id} href={`/blogs/${blog.id}`}>
          <a className="max-w-md border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{blog.Title}</h3>
              <p className="text-sm text-gray-700">{blog.Description}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
