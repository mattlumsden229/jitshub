import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../queries/userQueries';
import { GET_POSTS } from '../queries/postQueries';
import PostCard from '../components/PostCard';

export default function User() {
    const { id } = useParams();
    const userQuery = useQuery(GET_USER,
        {
            variables: { id }
        });
    const postsQuery = useQuery(GET_POSTS)

    if (userQuery.loading || postsQuery.loading) return <p>Loading...</p>;
    if (userQuery.error || postsQuery.error) return <p>Something Went Wrong</p>;

    return (
        <>
            <h1>{userQuery.data.user.username}'s Posts</h1>
            {userQuery.data.user.posts.length > 0 ? (
                <div className="row mt-4">
                    {postsQuery.data.posts.map((post) => (
                        post.user.id === userQuery.data.user.id ? <PostCard key={post.id} post={post} /> : null
                    ))}
                </div>

            ) : (
                <p>No Posts Yet...</p>
            )}
        </>
    )
}