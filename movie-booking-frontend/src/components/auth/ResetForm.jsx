import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";

function ResetForm() {
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async (values, { resetForm }) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        return alert("Passwords do not match");
      }

      const response = await resetPassword(token, values.newPassword);

      alert(response.message);

      resetForm();

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

        <Formik
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={handleResetPassword}
        >
          <Form className="space-y-4">
            <Field
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              className="w-full border p-3 rounded-lg"
            />

            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ResetForm;
