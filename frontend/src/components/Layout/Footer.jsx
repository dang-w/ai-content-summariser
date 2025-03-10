const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} AI Content Summariser. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;