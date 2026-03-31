import React from 'react';

const TrustBadges = () => {
  const partners = [
    'FPT Software', 'Viettel', 'Vingroup', 'Sun Group', 
    'Coteccons', 'Thế Giới Di Động', 'Shopee', 'Grab'
  ];

  return (
    <div className="py-12 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm mb-8">Được tin tưởng bởi các doanh nghiệp hàng đầu</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, idx) => (
            <div key={idx} className="opacity-60 hover:opacity-100 transition-opacity">
              <span className="text-gray-400 font-medium text-lg">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;