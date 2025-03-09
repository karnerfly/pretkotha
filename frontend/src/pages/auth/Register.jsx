import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [step, setStep] = useState(1); // Current step of the form
  const [email, setEmail] = useState(""); // Email input
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP input (6 boxes)
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [phone, setPhone] = useState(""); // Phone number input
  const [bio, setBio] = useState(""); // Bio input
  const [countryCode, setCountryCode] = useState("+1"); // Country code input
  const [passwordError, setPasswordError] = useState(""); // Password validation error

  // Country codes for dropdown
  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+880",name: "Bangladesh "},
    { code: "+44", name: "UK" },
    { code: "+61", name: "Australia" },
    { code: "+33", name: "France" },
  ];

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, ""); // Allow only digits
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password in Step 3
    if (step === 3) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      } else {
        setPasswordError("");
      }
    }

    if (step === 1) {
      // Simulate email verification request
      console.log("Email submitted:", email);
      setStep(2); // Move to OTP step
    } else if (step === 2) {
      // Simulate OTP verification
      console.log("OTP submitted:", otp.join(""));
      setStep(3); // Move to username/password step
    } else if (step === 3) {
      // Simulate username/password submission
      console.log("Username and Password submitted:", { username, password });
      setStep(4); // Move to additional info step
    } else if (step === 4) {
      // Simulate final registration
      console.log("Registration details:", { email, username, password, phone: `${countryCode}${phone}`, bio });
      alert("Registration successful!");
    }
  };

  // Handle back button click
  const handleBack = () => {
    setStep(step - 1); // Go back to the previous step
  };

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-6 py-4">
        <nav className="text-gray-600 text-sm">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primary-700 font-semibold">Register</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Form Container */}
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl p-8">
          {/* Form Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Register
          </h1>

          {/* Step Indicator */}
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  step === s
                    ? "bg-indigo-600"
                    : step > s
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Enter Email */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Login here
                  </Link>
                </p>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP (One-Time Password)
                  </label>
                  <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* Step 3: Set Username & Password */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-red-600 mt-2">{passwordError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                >
                  Next
                </button>
              </div>
            )}

            {/* Step 4: Additional Info (Phone Number & Bio) */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-24 px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} ({country.name})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                      className="flex-1 px-4 py-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us a little about yourself"
                    className="w-full px-4 py-3 mt-1 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    rows={4}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/2 bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-all"
                  >
                    Back
                  </button>
                  <Link to="/auth/login" className="w-1/2">
                  <button
                    type="button"
                    className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all w-full"
                  >
                    Register
                  </button>
                  </Link>

                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;