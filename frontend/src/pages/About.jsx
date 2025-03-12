import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faHeart,
  faLightbulb,
  faHome,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import { useState } from "react";

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "CEO & Founder",
      bio: "With over 15 years of industry experience, Sarah leads our vision and strategy.",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Michael Chen",
      position: "Creative Director",
      bio: "Michael brings artistic excellence and innovation to all our projects.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlfGVufDB8fDB8fHww",
    },
    {
      name: "Priya Sharma",
      position: "Lead Developer",
      bio: "Priya's technical expertise ensures we deliver cutting-edge solutions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Robert Williams",
      position: "Marketing Specialist",
      bio: "Robert creates strategies that connect our clients with their audiences.",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  // Company values data
  const values = [
    {
      icon: faLightbulb,
      title: "Innovation",
      description:
        "We constantly push boundaries and explore new possibilities to bring fresh ideas to the table.",
    },
    {
      icon: faHeart,
      title: "Passion",
      description:
        "We're driven by a genuine love for what we do, bringing enthusiasm to every project we undertake.",
    },
    {
      icon: faCheckCircle,
      title: "Excellence",
      description:
        "We maintain the highest standards in all aspects of our work, never settling for less than exceptional.",
    },
    {
      icon: faClock,
      title: "Reliability",
      description:
        "We honor our commitments, deliver on time, and stand behind everything we produce.",
    },
  ];

  // Milestones data
  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started with a small team of 3 passionate individuals.",
    },
    {
      year: "2015",
      title: "National Recognition",
      description:
        "Received the Innovation Award for our groundbreaking projects.",
    },
    {
      year: "2018",
      title: "Global Expansion",
      description:
        "Opened our first international office to better serve our growing client base.",
    },
    {
      year: "2023",
      title: "Industry Leadership",
      description:
        "Recognized as one of the top companies in our field by Industry Magazine.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen pt-16">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 dark:text-primary-400 font-semibold flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
            About Us
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Heading directly in the body - exactly like Contact Us page */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Our Story
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 text-center">
          We're a dedicated team of creative professionals passionate about
          delivering exceptional solutions that transform ideas into reality.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Card - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <h3 className="text-2xl font-bold text-white">
                  Company Information
                </h3>
                <p className="text-indigo-100 mt-2">
                  Learn more about our journey
                </p>
              </div>

              <div className="p-6">
                {/* Info Items with enhanced styling */}
                <div className="flex items-start mb-6 group">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-600 dark:text-indigo-300 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faLightbulb} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Founded</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">2010, Innovation City</p>
                  </div>
                </div>

                <div className="flex items-start mb-6 group">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-600 dark:text-indigo-300 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faHeart} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Employees</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      40+ Passionate Professionals
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-6 group">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-600 dark:text-indigo-300 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Projects</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      250+ Successfully Completed
                    </p>
                  </div>
                </div>

                <div className="flex items-start mb-8 group">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-600 dark:text-indigo-300 mr-4 transition group-hover:bg-indigo-600 group-hover:text-white">
                    <FontAwesomeIcon icon={faClock} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Global Presence
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Serving clients in 20+ countries
                    </p>
                  </div>
                </div>

                {/* Mission & Vision with styling */}
                <div className="border-t dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Our Mission & Vision
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To empower businesses through innovative solutions that
                    solve real problems and create meaningful impact.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    We envision a world where technology and creativity
                    seamlessly integrate to drive positive change globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Right Columns */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Who We Are
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Founded in 2010, Creative World has grown from a small startup
                to a leading innovator in our industry. We combine technical
                expertise with creative thinking to deliver solutions that
                exceed expectations.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our diverse team brings together perspectives from various
                backgrounds, allowing us to approach challenges from multiple
                angles and develop truly unique solutions for our clients
                worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We believe in the power of innovation and collaboration. By
                working closely with our clients and understanding their unique
                needs, we create personalized solutions that drive real results.
                Our commitment to excellence and continuous improvement has
                earned us recognition as industry leaders.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8">
                Our Journey
              </h3>
              <div className="space-y-6 mb-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l-2 border-indigo-200 dark:border-indigo-800"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-500"></div>
                    <div className="mb-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {milestone.year}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 mt-8">
                Our Core Values
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-start"
                  >
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full text-indigo-600 dark:text-indigo-300 mr-3 flex-shrink-0">
                      <FontAwesomeIcon icon={value.icon} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Meet Our Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{member.name}</h4>
                  <div className="text-indigo-600 dark:text-indigo-400 text-sm mb-2">
                    {member.position}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            What Our Clients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  "Exceptional Service"
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Working with Creative World has been a game-changer for our
                  business. Their innovative approach and attention to detail
                  exceeded our expectations.
                </p>
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">
                    John Anderson
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400 text-sm">
                    Marketing Director, TechSolutions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section - Exactly like Contact Us */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                What industries do you serve?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We work with clients across various industries including
                technology, healthcare, education, finance, and retail. Our
                diverse expertise allows us to adapt to different business
                needs.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Do you work with international clients?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we serve clients globally with teams equipped to handle
                different time zones and cultural considerations. We have
                experience working with organizations across North America,
                Europe, Asia, and Australia.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                What makes your approach different?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Our client-centered approach focuses on understanding your
                unique challenges and goals. We combine technical expertise with
                creative thinking to develop customized solutions that deliver
                measurable results.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                How do you ensure quality in your work?
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                We implement rigorous quality assurance processes throughout
                every project. Our team follows industry best practices and
                conducts thorough testing to ensure all deliverables meet our
                high standards of excellence.
              </p>
            </div>
          </div>
        </div>

        {/* CTA - Similar to Contact Us page */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
            Ready to Work With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Let's Start a Conversation
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Ready to transform your ideas into reality? Reach out to our
                  team today to discuss how we can help you achieve your goals.
                </p>
                <div className="mt-4">
                  <Link
                    to="/contact"
                    className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;