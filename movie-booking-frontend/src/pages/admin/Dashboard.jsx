import React from "react";
import DashboardSats from "../../components/admin/DashboardSats";

function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Stats Cards */}
        <DashboardSats />
      </div>
    </main>
  );
}

export default Dashboard;
