import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUserPlus, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [bioError, setBioError] = useState("");

  // Resend OTP validation
  const [resendAttempts, setResendAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [isCooldownActive, setIsCooldownActive] = useState(false);

  // Country codes for dropdown
  const countryCodes = [
    { code: "+91", name: "India" },
    { code: "+880", name: "Bangladesh" },
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

  // Handle Backspace key press
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input box
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password in Step 3
    if (step === 3) {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      } else {
        setPasswordError("");
      }

      // Validate username in Step 3
      if (username.length < 4 || username.length > 20) {
        setUsernameError("Username must be between 4 and 20 characters.");
        return;
      } else {
        setUsernameError("");
      }
    }

    // Validate bio in Step 4
    if (step === 4 && bio.length > 60) {
      setBioError("Bio must be less than 60 characters.");
      return;
    } else {
      setBioError("");
    }

    if (step === 1) {
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
      console.log("Registration details:", {
        email,
        username,
        password,
        phone: `${countryCode}${phone}`,
        bio,
      });
      alert("Registration successful!");
    }
  };

  // Handle back button click
  const handleBack = () => {
    setStep(step - 1); // Go back to the previous step
  };

  // Handle Resend OTP button click
  const handleResendOTP = () => {
    if (resendAttempts < 3) {
      setResendAttempts((prev) => prev + 1);
      setIsCooldownActive(true);
      setCooldown(10); // Set cooldown to 10 seconds
      console.log("OTP resent!");
    } else {
      alert("Maximum resend attempts reached.");
    }
  };

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCooldownActive(false);
    }
  }, [cooldown]);

  // Check if username meets criteria
  const isUsernameValid = username.length >= 4 && username.length <= 20;

  // Check if password meets criteria
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,16}$/.test(
      password
    );

  // Check if bio meets criteria
  const isBioValid = bio.length <= 60;

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
            <FontAwesomeIcon icon={faUserPlus} className="mr-1" />
            Register
          </span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Form Container */}
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
          {/* Form Heading */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
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
                <div className="flex flex-col items-center justify-center">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
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
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isCooldownActive || resendAttempts >= 3}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCooldownActive
                    ? `Resend OTP in ${cooldown}s`
                    : resendAttempts >= 3
                    ? "Maximum attempts reached"
                    : "Resend OTP"}
                </button>
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
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Choose a username"
                      className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                      required
                    />
                    {isUsernameValid && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {username.length}/20
                  </p>
                  {usernameError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{usernameError}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                      required
                    />
                    {isPasswordValid && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                      />
                    )}
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{passwordError}</p>
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
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Phone Number
                  </label>
                  <div className="flex flex-col sm:flex-row">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full sm:w-24 px-4 py-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Bio
                  </label>
                  <div className="relative">
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a little about yourself"
                      className="w-full px-4 py-3 mt-1 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                      rows={4}
                    />
                    {isBioValid && bio.length > 0 && (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="absolute right-3 top-4 text-green-500"
                      />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bio.length}/60</p>
                  {bioError && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{bioError}</p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-1/2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-500 transition-all"
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