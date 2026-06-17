import React from "react";
import UserList from "../../components/admin/UserList";

function Users() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-500 mt-1">
            View and manage all registered users.
          </p>
        </div>

        {/* Users Table */}
        <UserList />
      </div>
    </main>
  );
}

export default Users;
