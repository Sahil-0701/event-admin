import React from "react";

const Dashboard = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const name = admin?.name || "Admin";

 return (
  <div className="space-y-8 my-6 sm:my-8 md:my-10 lg:my-12 max-w-4xl mx-auto px-4">
    <div className="text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800">
        Welcome back, <span className="text-red-500">{name}</span>!
      </h1>
      <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-xl mx-auto">
        Here's a quick overview of your event management metrics.
      </p>
    </div>
  </div>
);

};

export default Dashboard;
