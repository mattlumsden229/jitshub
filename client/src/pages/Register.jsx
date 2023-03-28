import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER_USER } from "../mutations/userMutations";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../components/assets/logo.png";

export default function Register() {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function registerUserCallback() {
    console.log("Callback hit");
  }

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/login");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { userInput: values },
  });

  return (
    <>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center justify-content-center"
              >
                <h4 classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Register
                </h4>

                <div className="d-flex flex-row align-items-center mt-3 mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label="Username"
                    id="username"
                    type="text"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput label="Your Email" id="email" type="email" />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput label="Password" id="password" type="password" />
                </div>

                <div className="d-flex flex-row align-items-center mb-1">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    label="Confirm your password"
                    id="confirmPassword"
                    type="password"
                  />
                </div>

                <Link to={"/login"} className="link-secondary mb-4">
                  Already have an account? Login
                </Link>

                <MDBBtn className="mb-4" color="dark" size="lg">
                  Register
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src={logo} fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
