import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faLightbulb,
  faHandshake,
  faCogs,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const FAQ = () => {
  // FAQ data
  const faqs = [
    {
      icon: faQuestionCircle,
      question: "What industries do you serve?",
      answer:
        "We work with clients across various industries including technology, healthcare, education, finance, and retail. Our diverse expertise allows us to adapt to different business needs.",
    },
    {
      icon: faLightbulb,
      question: "Do you work with international clients?",
      answer:
        "Yes, we serve clients globally with teams equipped to handle different time zones and cultural considerations. We have experience working with organizations across North America, Europe, Asia, and Australia.",
    },
    {
      icon: faHandshake,
      question: "What makes your approach different?",
      answer:
        "Our client-centered approach focuses on understanding your unique challenges and goals. We combine technical expertise with creative thinking to develop customized solutions that deliver measurable results.",
    },
    {
      icon: faCogs,
      question: "How do you ensure quality in your work?",
      answer:
        "We implement rigorous quality assurance processes throughout every project. Our team follows industry best practices and conducts thorough testing to ensure all deliverables meet our high standards of excellence.",
    },
    {
      icon: faQuestionCircle,
      question: "What is your pricing model?",
      answer:
        "Our pricing is tailored to each project based on scope, complexity, and duration. We offer transparent pricing models and provide detailed proposals before starting any work.",
    },
    {
      icon: faLightbulb,
      question: "Can you handle large-scale projects?",
      answer:
        "Absolutely! We have experience managing large-scale projects with multiple teams and stakeholders. Our project management processes ensure smooth execution and timely delivery.",
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-1" />
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 dark:text-primary-500 font-semibold flex items-center">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-1" />
            FAQ
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 text-center">
          Find answers to common questions about our services, processes, and
          more. If you don't find what you're looking for, feel free to contact
          us.
        </p>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-start mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full text-indigo-600 dark:text-indigo-400 mr-4">
                  <FontAwesomeIcon icon={faq.icon} className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {faq.question}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 pl-14">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
            Still Have Questions?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Contact Our Support Team
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is here to help you with any additional
                questions or concerns. Reach out to us, and we'll get back to
                you promptly.
              </p>
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                Schedule a Consultation
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Interested in learning more about our services? Schedule a free
                consultation with one of our experts to discuss your needs and
                how we can help.
              </p>
              <div className="mt-4">
                <Link
                  to="/contact"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Schedule Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;