import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Стать партнёром</h3>
  <a 
    href="https://t.me/@dbdbbd3737" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-white transition duration-300 block"
  >
    Telegram
  </a>
</div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="flex items-center space-x-2">
              <img src="/images/icons/free-icon-phone-call-5585562.png" alt="Телефон" className="w-4 h-4 brightness-0 invert" />
              <p className="text-gray-400">Телефон: <span className="text-white">+79089839345</span></p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Политика</h3>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition block">Политика конфиденциальности</Link>
          </div>
          <div>
  <h3 className="text-lg font-semibold mb-4 text-gray-200">Социальные сети</h3>
  <div className="space-y-2">
    <a 
      href="https://t.me/@dbdbbd3737" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition duration-300 block"
    >
      Telegram
    </a>
    <a 
      href="https://vk.com/id564432818" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition duration-300 block"
    >
      ВКонтакте
    </a>
    </div>
  </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">Made by Borovikov Dmitriy Alekseevich</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;