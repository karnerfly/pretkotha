import { faBell, faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyPosts = () => {
  return (
    <main className="flex-1 ml-0 md:ml-6">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, John!
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Total Stories</h3>
          <p className="text-3xl font-bold text-indigo-600">42</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Followers</h3>
          <p className="text-3xl font-bold text-indigo-600">1.2K</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">Following</h3>
          <p className="text-3xl font-bold text-indigo-600">350</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="text-indigo-600 mr-3" />
            <p className="text-gray-700">You published a new story.</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faChartLine}
              className="text-indigo-600 mr-3"
            />
            <p className="text-gray-700">Your story got 50 new views.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPosts;
