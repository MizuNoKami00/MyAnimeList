import { useState } from 'react';
import { useRouter } from 'next/router';

interface Blog {
  id: number;
  Title: string;
  Description: string;
}

interface BlogProps {
  blog: Blog;
}

interface Comment {
  id: number;
  text: string;
}

const BlogDetails = ({ blog }: BlogProps) => {
  const router = useRouter();
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentsArray = [...comments, { id: comments.length + 1, text: newComment }];
      setComments(newCommentsArray);
      setNewComment('');
    }
  };

  return (
    <div className="max-w-md border rounded-lg overflow-hidden shadow-md p-4">
      <h1 className="text-2xl font-bold mb-2">{blog.Title}</h1>
      <p className="text-gray-600 mb-4">{/* Display blog date or any relevant information */}</p>
      <p className="text-gray-700 mb-4">{blog.Description}</p>

      <div className="flex items-center space-x-4">
        <button onClick={handleLike}>Like ({likes})</button>
        <button onClick={handleDislike}>Dislike ({dislikes})</button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Comments</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetails;
