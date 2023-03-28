import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
    return (
        <>
            <div className="col-md-6">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="card-title">{post.title}</h5>
                                <p className="small">
                                    Created By: <a href={`/users/${post.user.id}`} className="link-secondary">{post.user.username}</a>
                                </p>
                                <p className="small">
                                    Date Posted: {post.createdAt}
                                </p>
                            </div>
                            <div className="d-flex flex-column">
                                <Link to={`/posts/${post.id}`} className="btn btn-dark">
                                    <FaRegEye /> View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}