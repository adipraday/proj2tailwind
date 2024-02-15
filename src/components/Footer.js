const Footer = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer className="bg-gray-800 text-center lg:text-left fixed bottom-0 left-0 right-0">
        <div
          className="text-violet-100 text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright :
          <a className="text-violet-300" href="https://tailwind-elements.com/">
            {" "}
            Kujang Management System
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
