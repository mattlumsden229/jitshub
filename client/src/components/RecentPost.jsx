export default function RecentPost({ post }) {
  return (
    <>
      <div className="col-md-12">
        <div className="card mb-3">
          <div className="card-body">
            <a href={`/posts/${post.id}`} className="link-secondary">
              <div className="d-flex justify-content-center">
                <div>
                  <h5 className="card-title text-center">{post.title}</h5>
                  <p className="small text-center">
                    Date Posted: {post.createdAt}
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
