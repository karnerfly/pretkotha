import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faKey,
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const SettingsPage = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleDeleteAccount = () => {
    // Add logic to delete the account
    alert("Your account has been deleted.");
    setShowDeleteConfirmation(false);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    // Add logic to reset the password
    alert("Your password has been reset successfully.");
    setShowResetPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
      </div>

      {/* Delete Account Section */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-600" />
              Delete Account
            </h3>
            <p className="text-gray-500">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        </div>

        {/* Delete Account Confirmation Modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 w-full max-w-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2 text-red-600"
                />
                Confirm Account Deletion
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Password Section */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <FontAwesomeIcon icon={faKey} className="mr-2 text-indigo-600" />
              Reset Password
            </h3>
            <p className="text-gray-500">
              Change your password to keep your account secure.
            </p>
          </div>
          <button
            onClick={() => setShowResetPassword(true)}
            className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </div>

        {/* Reset Password Modal */}
        {showResetPassword && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300 w-full max-w-md">
              <h3 className="text-xl font-bold flex items-center mb-4">
                <FontAwesomeIcon icon={faKey} className="mr-2 text-indigo-600" />
                Reset Password
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                  placeholder="Confirm New Password"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowResetPassword(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetPassword}
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature Card 1: Two-Factor Authentication */}
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Two-Factor Authentication</h3>
          <p className="text-gray-500 mb-4">
            Add an extra layer of security to your account.
          </p>
          <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Enable 2FA
          </button>
        </div>

        {/* Feature Card 2: Notification Preferences */}
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Notification Preferences</h3>
          <p className="text-gray-500 mb-4">
            Manage how you receive notifications.
          </p>
          <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Manage Notifications
          </button>
        </div>

        {/* Feature Card 3: Privacy Settings */}
        <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Privacy Settings</h3>
          <p className="text-gray-500 mb-4">
            Control who can see your information.
          </p>
          <button className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Manage Privacy
          </button>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;