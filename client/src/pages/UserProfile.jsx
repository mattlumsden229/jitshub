import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../queries/userQueries";
import { GET_POSTS } from "../queries/postQueries";
import RecentPost from "../components/RecentPost";
import { Link } from "react-router-dom";
import kjj from "../components/assets/kjj.png";
import me from "../components/assets/me.jpg";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

export default function UserProfile() {
  const { id } = useParams();
  const userQuery = useQuery(GET_USER, {
    variables: { id },
  });
  const postsQuery = useQuery(GET_POSTS);

  if (userQuery.loading || postsQuery.loading) return <p>Loading...</p>;
  if (userQuery.error || postsQuery.error) return <p>Something Went Wrong</p>;

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="p-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={me}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Matt Lumsden</p>
                  <p className="text-muted mb-4">Saint Peter, MN</p>
                  <button className="btn btn-dark">Add Friend</button>
                  <button className="btn btn-outline-dark">Message</button>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0">
                  <MDBListGroup className="rounded-3">
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon fas icon="globe fa-lg text-warning" />
                      <MDBCardText>
                        <a
                          href="https://mattlumsden.netlify.app"
                          className="link-secondary"
                        >
                          https://mattlumsden.netlify.app
                        </a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <MDBCardText>
                        <a
                          href="https://github.com/mattlumsden229"
                          className="link-secondary"
                        >
                          mattlumsden229
                        </a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <MDBCardText>
                        <a
                          href="https://twitter.com/MLumsdenCodes"
                          className="link-secondary"
                        >
                          @MLumsdenCodes
                        </a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <MDBCardText>
                        <a
                          href="https://www.instagram.com/mattiswest22/?hl=en"
                          className="link-secondary"
                        >
                          mattiswest22
                        </a>
                      </MDBCardText>
                    </MDBListGroupItem>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBIcon
                        fab
                        icon="facebook fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <MDBCardText>
                        <a
                          href="https://www.facebook.com/matt.lumsden.39/"
                          className="link-secondary"
                        >
                          Matt Lumsden
                        </a>
                      </MDBCardText>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Username</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {userQuery.data.user.username}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        mattlumsden229@gmail.com
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        (229) 392-1132
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                <MDBCol md="6">
                  <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBCol>
                        <h4 className="text-center">Jiu Jitsu Info</h4>
                      </MDBCol>
                      <hr />
                      <MDBCol>
                        <span className="mt-3 mb-5">
                          Rank: 🟪🟪🟪🟪🟪⬛⬛🟪
                        </span>
                      </MDBCol>
                      <hr />
                      <MDBCol>
                        <MDBCardText>
                          Group:{" "}
                          <Link to={"/groups"}>
                            <img
                              src={kjj}
                              alt="KJJ"
                              className="rounded-circle rounded-icon"
                            />
                          </Link>{" "}
                        </MDBCardText>
                      </MDBCol>
                      <hr />
                      <MDBCol>
                        <span className="mb-5">Medals: 🥈 🥉 🥉</span>
                      </MDBCol>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="6">
                  <h3 className="text-center">Most Recent Post</h3>
                  {userQuery.data.user.posts.length > 0 ? (
                    <div>
                      {postsQuery.data.posts.map((post) =>
                        post.id ===
                        userQuery.data.user.posts[
                          userQuery.data.user.posts.length - 1
                        ].id ? (
                          <RecentPost key={post.id} post={post} />
                        ) : null
                      )}
                    </div>
                  ) : (
                    <p className="text-center">No Posts Yet...</p>
                  )}
                  <div className="d-flex  justify-content-center">
                    <Link to={"posts"} className="btn btn-outline-dark">
                      See All Posts
                    </Link>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
