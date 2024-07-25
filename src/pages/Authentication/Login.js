import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import logo from "../../assets/group.png";
//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Social Media Imports
import { GoogleLogin } from "react-google-login";
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../slices/thunks";

import logoLight from "../../assets/images/logo-light.png";
//Import config
import { facebook, google } from "../../config";
//import images

const Login = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.Account.user,
  }));

  const [userLogin, setUserLogin] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);

  useEffect(() => {
    if (user && user) {
      setUserLogin({
        email: user.user.email,
        password: user.user.confirm_password,
      });
    }
  }, [user]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "admin@gmail.com" || "",
      password: userLogin.password || "admin" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    },
  });

  const { error, errorFlag, loading } = useSelector((state) => ({
    error: state.Login.error,
    loading: state.Login.loading,
    errorFlag: state.Login.errorFlag,
  }));

  document.title = "Basic SignIn | ABMC SCADA - Kibera Technology";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4 login__wrapper">
                  <div className="text-center mt-2 d-flex justify-content-center align-item-center">
                    {/* <svg
                      width="44"
                      height="33"
                      viewBox="0 0 44 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M41.5581 30.881H2.44214H41.5581Z"
                        fill="#27374D"
                        fill-opacity="0"
                      />
                      <path
                        d="M41.5581 30.881H2.44214"
                        stroke="#27374D"
                        stroke-opacity="0.9"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.01578 19.148C1.83082 20.9186 3.29694 22.3686 5.07716 22.3686H38.9229C40.7032 22.3686 42.1692 20.9186 41.9842 19.148C40.8483 8.27371 33.7774 2.22241 22 2.22241C10.2226 2.22241 3.15176 8.27371 2.01578 19.148Z"
                        fill="#4B5320"
                        fill-opacity="0"
                        stroke="#27374D"
                        stroke-opacity="0.9"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg> */}

                    <h5 className="text-primary fs-24">ABMC SCADA</h5>
                  </div>
                  {error && error ? (
                    <Alert color="danger"> {error} </Alert>
                  ) : null}
                  <div className="p-2 mt-4">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                      action="#"
                    >
                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Электронная почта
                        </Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <div className="float-end">
                          <Link className="text-muted">Забыли пароль?</Link>
                        </div>
                        <Label className="form-label" htmlFor="password-input">
                          Пароль
                        </Label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type={passwordShow ? "text" : "password"}
                            className="form-control pe-5"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            onClick={() => setPasswordShow(!passwordShow)}
                            id="password-addon"
                          >
                            <i className="ri-eye-fill align-middle"></i>
                          </button>
                        </div>
                      </div>

                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="auth-remember-check"
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="auth-remember-check"
                        >
                          Запомнить меня
                        </Label>
                      </div>

                      <div className="mt-4">
                        <Button
                          disabled={error ? null : loading ? true : false}
                          className="w-100  btn-army "
                          type="submit"
                        >
                          {loading ? (
                            <Spinner size="sm" className="me-2">
                              {" "}
                              Loading...{" "}
                            </Spinner>
                          ) : null}
                          Войти
                        </Button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              {/* <div className="mt-4 text-center">
                  <p className="mb-0">
                    У вас нет учетной записи?{" "}
                    <Link className="fw-semibold text-primary text-decoration-underline">
                      {" "}
                      Зарегистрироваться{" "}
                    </Link>{" "}
                  </p>
                </div> */}
            </Col>
          </Row>
        </Container>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
