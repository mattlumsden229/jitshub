import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_POST } from "../queries/postQueries";
import { FaCaretLeft } from "react-icons/fa";
import DeletePostButton from "../components/DeletePostButton";
import EditPostModal from "../components/EditPostModal";
import stockImg from "../components/assets/gordon-taps.jpg";

export default function Post() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="d-flex justify-content-end mb-4">
            <Link
              to={`/forums/${data.post.forum}`}
              className="btn btn-dark btn-sm d-inline ms-auto"
            >
              <FaCaretLeft /> Back to {data.post.forum}
            </Link>
          </div>
          <div className="mx-auto w-100 card p-5">
            <div className="row">
              <div className="col">
                <img src={stockImg} alt="" className="img-fluid mb-3" />
              </div>
              <div className="col align-self-center">
                <div className="text-center">
                  <div className="container">
                    <h2 className="text-center">
                      <strong>{data.post.title}</strong>
                    </h2>
                  </div>
                  <p className="text-center">{data.post.description}</p>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <EditPostModal post={data.post} />
                <DeletePostButton postId={data.post.id} />
              </div>
              <div className="d-flex flex-column align-items-center">
                <span>
                  Created By:{" "}
                  <a
                    href={`/users/${data.post.user.id}`}
                    className="link-secondary"
                  >
                    {data.post.user.username}
                  </a>
                </span>
                <span>Date Posted: {data.post.createdAt}</span>
                <span>
                  Forums -{" "}
                  <a href="/forums/general" className="link-secondary">
                    {data.post.forum}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
