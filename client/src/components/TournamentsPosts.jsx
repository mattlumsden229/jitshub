import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../queries/postQueries'
import PostCard from './PostCard';
// import Footer from './Footer';

export default function TournamentsPosts() {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Something Went Wrong</p>

    return (
        <div className="container">
            {data.posts.length > 0 ? (
                <div className="row mt-4">
                    {data.posts.map((post) => (
                        post.forum === "Tournaments" ? <PostCard key={post.id} post={post} /> : null
                    ))}
                </div>
            ) : (
                <p>No Posts Yet...</p>
            )}
            {/* <div className="d-flex justify-content-center">
                <Footer />
            </div> */}
        </div>
    )
}