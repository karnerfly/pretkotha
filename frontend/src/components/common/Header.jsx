import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-opacity-90 text-white shadow-lg relative">
      {/* Animated Particles (Placeholder for Future Implementation) */}
      <div
        id="particles"
        className="absolute inset-0 overflow-hidden pointer-events-none opacity-30"
      ></div>

      {/* Navbar */}
      <Navbar />
    </header>
  );
};

export default Header;
