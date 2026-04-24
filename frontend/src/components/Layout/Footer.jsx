import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/daredevilsjr', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/atul-anand-iiitbh/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/atulraajpoot', label: 'Instagram' },
    { icon: Mail, href: 'mailto:atulanand05241@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Portfolio</h3>
            <p className="text-gray-600 dark:text-gray-400">
              MERN Stack Developer passionate about creating amazing web experiences 
              and solving complex problems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {['Home', 'About', 'Projects', 'DSA/CP', 'Blog', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace('/', '')}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-primary-600 hover:text-white transition-all duration-200 group"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              © {currentYear} Portfolio. Made with{' '}
              <Heart size={16} className="mx-1 text-red-500" fill="currentColor" />
              using MERN Stack
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="/privacy"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
