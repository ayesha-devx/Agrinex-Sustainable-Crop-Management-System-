import logo from '../assets/images/agrinex icon.png';

const Footer = () => {
  return (
    <footer className="footer" style={{ 
      background: 'rgba(15, 23, 42, 0.95)', 
      padding: '80px 0 40px', 
      color: 'white', 
      borderTop: '1px solid rgba(255, 255, 255, 0.05)' 
    }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-4" style={{ gap: '4px' }}>
                <img src={logo} alt="AgriNex Logo" style={{ width: '55px', height: '55px', objectFit: 'contain' }} />
                <h4 className="font-weight-bold mb-0" style={{ 
                  color: '#10b981',
                  letterSpacing: '-0.01em'
                }}>AGR<span style={{ color: '#fff' }}>INEX</span></h4>
            </div>
            <p className="small pr-lg-5" style={{ lineHeight: 2, color: 'white' }}>
              Empowering global agriculture through precision medicine for plants. 
              Our mission is to ensure food security through accessible, cutting-edge AI technology for every farmer.
            </p>
          </div>
          
          <div className="col-md-4 col-lg-2">
            <h6 className="text-white font-weight-bold mb-4">The Project</h6>
            <ul style={{ listStyle: 'none', padding: 0 }} className="small">
              <li className="mb-2"><a href="#" className="text-white nav-link p-0 hover-opacity">Sustainable Farming</a></li>
              <li className="mb-2"><a href="#" className="text-white nav-link p-0 hover-opacity">Machine Learning</a></li>
              <li className="mb-2"><a href="#" className="text-white nav-link p-0 hover-opacity">CNN Architectures</a></li>
              <li className="mb-2"><a href="#" className="text-white nav-link p-0 hover-opacity">Eco-System</a></li>
            </ul>
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="text-white font-weight-bold mb-4">Developed By</h6>
            <ul style={{ listStyle: 'none', padding: 0 }} className="small">
              <li className="mb-2">Prathmesh Sawant</li>
              <li className="mb-2">Ayesha Topiwala</li>
              <li className="mb-2">Christina D'souza</li>
              <li className="mb-2">Sam Shelton</li>
            </ul>
          </div>

          <div className="col-md-4 col-lg-3">
            <h6 className="text-white font-weight-bold mb-4">Academic Mention</h6>
            <ul style={{ listStyle: 'none', padding: 0 }} className="small">
              <li className="mb-2">Mis. Jayshree Sanap</li>
              <li className="mb-2">Dept. of Computer Engineering</li>
              <li className="mb-2">Sustainability Lab Inc.</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 pt-4 text-center border-top border-secondary-subtle small opacity-100 text-white">
          © {new Date().getFullYear()} AgriNex Global. All Rights Reserved. Built with Precision.
        </div>
      </div>
      
      <style>{`
        .hover-white:hover { color: #fff !important; }
        .footer a { transition: color 0.2s ease; }
      `}</style>
    </footer>
  );
};

export default Footer;