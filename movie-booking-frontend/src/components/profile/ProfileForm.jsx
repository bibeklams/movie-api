import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  getProfile,
  changeProfile,
  changePassword,
} from "../../services/authService";

function ProfileForm() {
  const [profile, setProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleChangeProfile = async (values, { resetForm }) => {
    try {
      const response = await changeProfile(values);

      setProfile(response.user);
      alert(response.message);

      setShowProfileForm(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChangePassword = async (values, { resetForm }) => {
    try {
      const response = await changePassword(values);

      alert(response.message);

      setShowPasswordForm(false);
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.user);
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      }
    };

    getUserProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <p className="text-blue-100 mt-1">Manage your account information</p>
        </div>

        <div className="p-6">
          {/* Profile Info */}
          <div className="bg-gray-50 rounded-xl p-5 border mb-6">
            <div className="space-y-3">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {profile.name}
              </p>

              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {profile.email}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              type="button"
              onClick={() => {
                setShowProfileForm(true);
                setShowPasswordForm(false);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Change Profile
            </button>

            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(true);
                setShowProfileForm(false);
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition duration-300"
            >
              Change Password
            </button>
          </div>

          {/* Profile Form */}
          {showProfileForm && (
            <Formik
              enableReinitialize
              initialValues={{
                name: profile.name,
                email: profile.email,
              }}
              onSubmit={handleChangeProfile}
            >
              <Form className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Update Profile
                </h3>

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter New Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter New Email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowProfileForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          )}

          {/* Password Form */}
          {showPasswordForm && (
            <Formik
              initialValues={{
                oldPassword: "",
                newPassword: "",
              }}
              onSubmit={handleChangePassword}
            >
              <Form className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Change Password
                </h3>

                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Enter Old Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />

                <Field
                  type="password"
                  name="newPassword"
                  placeholder="Enter New Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                  >
                    Change Password
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPasswordForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
