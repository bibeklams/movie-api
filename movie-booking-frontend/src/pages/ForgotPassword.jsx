import React from "react";
import { Formik, Form, Field } from "formik";
import { forgetPassword } from "../services/authService";

function ForgotPassword() {
  const handleForgotPassword = async (values, { resetForm }) => {
    try {
      const response = await forgetPassword(values);

      alert(response.message);

      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>

        <p className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={handleForgotPassword}
        >
          <Form className="space-y-4">
            <Field
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              Send Reset Link
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
