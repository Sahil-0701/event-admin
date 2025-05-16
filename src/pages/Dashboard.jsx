import React from "react";
import {
  FaCalendarAlt,
  FaUserFriends,
  FaChartLine,
  FaThumbsUp,
} from "react-icons/fa";
import Card from "../components/Card";

const Dashboard = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-50  min-h-screen transition-colors">
      {/* Welcome Heading */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 ">
          Welcome <span className="text-red-500">Back</span>
        </h1>
        <p className="text-gray-500  mt-1 text-sm">
          Here’s a quick overview of your event management metrics.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Upcoming Events"
          value="8"
          icon={<FaCalendarAlt className="text-blue-500 text-xl" />}
          footer="Next week"
        />
        <Card
          title="Registered Attendees"
          value="1,520"
          icon={<FaUserFriends className="text-green-500 text-xl" />}
          footer="Total since event started"
        />
        <Card
          title="Events Scheduled"
          value="45"
          icon={<FaChartLine className="text-purple-500 text-xl" />}
          footer="This quarter"
        />
        <Card
          title="Event Feedback"
          value="4.7/5"
          icon={<FaThumbsUp className="text-yellow-500 text-xl" />}
          footer="Average Rating"
        />
      </div>
    </div>
  );
};

export default Dashboard;
