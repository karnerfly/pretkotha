import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Link } from "react-router";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
          <Link
            to="/"
            className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center"
          >
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 dark:text-primary-400 font-semibold flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
            Contact Us
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Heading directly in the body */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          We're here to help with any questions you might have. Our team is just
          a message away.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <h3 className="text-2xl font-bold text-white">
                  Contact Information
                </h3>
                <p className="text-indigo-100 mt-2">
                  Reach out to us directly or fill out the form
                </p>
              </div>

              <div className="p-6">
                {/* Contact Items with enhanced styling */}
                <div className="flex items-start mb-6 group">
                  <div className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-xl"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Our Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      123 Creative Street, Innovation City, 56789
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6 group">
                  <div className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faPhone} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Phone Number
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      +1 234 567 8900
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-8 group">
                  <div className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Email Address
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      contact@creativeworld.com
                    </p>
                  </div>
                </div>

                {/* Social Media Links with enhanced styling */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Connect With Us
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                      href="#"
                      className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a
                      href="#"
                      className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                      href="#"
                      className="bg-indigo-100 dark:bg-indigo-200 p-3 rounded-full text-indigo-600 dark:text-indigo-800 transition hover:bg-indigo-600 hover:text-white"
                    >
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@example.com"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Map with improved styling */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Our Location
          </h3>
          <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl overflow-hidden">
            <iframe
              title="Google Map"
              className="w-full h-80 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093706!2d144.95592831531895!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df195fef1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1626171081329!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;