import React, { useEffect } from "react";
import { Container, Form, Button, Toast } from "react-bootstrap";

import * as Yup from "yup";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useLoginUserMutation } from "@/app/api/authApi";
import { errorToast } from "@/utils/toastify";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  useEffect(() => {
    // redirect to home if already logged in
    if (false) {
      router.push("/");
    }
  }, []);


  const handleSubmit = async (values) => {
    try {
      if (values.remember_me) {
        localStorage.setItem("remember_me", values.remember_me);
      }
      await loginUser(values).unwrap();
    } catch (err) {
      errorToast(err.data.message);
    }
  };

  return (
    <Container className="p-3 my-5 d-flex flex-column w-50">
      <Formik
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                placeholder="Email"
                aria-label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback
                className="text-danger"
                type={errors.email ? "invalid" : "valid"}
              >
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback
                className="text-danger"
                type={errors.password ? "invalid" : "valid"}
              >
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between mb-4">
              <Form.Group className="mb-3">
                <Form.Check
                  required
                  name="rememberMe"
                  label="Remember Me"
                  feedbackType="invalid"
                />
              </Form.Group>
            </div>

            <Button type="submit" className="mb-4">
              Sign in
            </Button>

            <div className="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
