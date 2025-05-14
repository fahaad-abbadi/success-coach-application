import Navbar from "./Navbar"; // ✅ Import Fixed Navbar

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {/* ✅ Fix: Push Content Below Navbar */}
      <div className="pt-8">{children}</div>
    </>
  );
};

export default Layout;
