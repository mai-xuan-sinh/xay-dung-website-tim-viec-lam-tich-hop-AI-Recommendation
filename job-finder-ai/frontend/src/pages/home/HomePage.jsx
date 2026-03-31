import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import StatsMarquee from './StatsMarquee';
import CategoryShowcase from './CategoryShowcase';
import FeaturedJobsSlider from './FeaturedJobsSlider';
import AIShowcase from './AIShowcase';
import CompanyShowcase from './CompanyShowcase';
import NewsletterSection from './NewsletterSection';
import CTASection from './CTASection';
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

// Import hình ảnh các quận
import bannerchinhImg from '../../assets/banner_chinh.jpg';
import haiChauImg from '../../assets/quan-hai-chau.jpg';
import thanhKheImg from '../../assets/quan-thanh-khe.jpg';
import sonTraImg from '../../assets/quan-son-tra.jpg';
import nguHanhSonImg from '../../assets/quan-ngu-hanh-son.jpg';
import lienChieuImg from '../../assets/quan-lien-chieu.jpg';
import camLeImg from '../../assets/quan-cam-le.png';
import hoaVangImg from '../../assets/huyen-hoa-vang.webp';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const slides = [
    { image: haiChauImg, title: "Quận Hải Châu", desc: "Trung tâm hành chính - kinh tế" },
    { image: thanhKheImg, title: "Quận Thanh Khê", desc: "Khu vực công nghiệp - dịch vụ" },
    { image: sonTraImg, title: "Quận Sơn Trà", desc: "Thiên đường du lịch biển" },
    { image: nguHanhSonImg, title: "Quận Ngũ Hành Sơn", desc: "Tâm linh - nghỉ dưỡng" },
    { image: lienChieuImg, title: "Quận Liên Chiểu", desc: "Công nghệ cao - giáo dục" },
    { image: camLeImg, title: "Quận Cẩm Lệ", desc: "Khu dân cư hiện đại" },
    { image: hoaVangImg, title: "Huyện Hòa Vang", desc: "Vùng ven đô phát triển" }
  ];

 
  const totalJobs = itJobs.length + tourismJobs.length + businessJobs.length + constructionJobs.length + serviceJobs.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/jobs?search=${encodeURIComponent(searchTerm)}`;
    if (location) {
      url += `&location=${encodeURIComponent(location)}`;
    }
    window.location.href = url;
  };

  return (
    <>
      <HeroSection 
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        handleSearch={handleSearch}
        totalJobs={totalJobs}
      />
      <StatsMarquee totalJobs={totalJobs} />
      <CategoryShowcase />
      <FeaturedJobsSlider />
      <AIShowcase />
      <CompanyShowcase />
      <NewsletterSection />
      <CTASection />
    </>
  );
};

export default HomePage;