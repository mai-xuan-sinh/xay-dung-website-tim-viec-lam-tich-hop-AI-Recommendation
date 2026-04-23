// src/services/aiRecommendation.js
// ===========================================
// DỊCH VỤ GỢI Ý VIỆC LÀM THÔNG MINH (AI)
// ===========================================

/**
 * Chuẩn hóa text để so sánh (lowercase, bỏ dấu, bỏ ký tự đặc biệt)
 */
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Tính điểm tương đồng giữa 2 mảng skills
 * Sử dụng Jaccard similarity + overlap coefficient
 */
const calculateSkillsMatch = (userSkills, jobSkills) => {
  if (!userSkills?.length || !jobSkills?.length) return 0;
  
  const normalizedUserSkills = userSkills.map(s => normalizeText(s));
  const normalizedJobSkills = jobSkills.map(s => normalizeText(s));
  
  // Tìm kỹ năng chung
  const commonSkills = normalizedUserSkills.filter(skill => 
    normalizedJobSkills.some(jobSkill => jobSkill.includes(skill) || skill.includes(jobSkill))
  );
  
  // Jaccard similarity: |A ∩ B| / |A ∪ B|
  const unionSize = new Set([...normalizedUserSkills, ...normalizedJobSkills]).size;
  const jaccard = unionSize > 0 ? commonSkills.length / unionSize : 0;
  
  // Overlap coefficient: |A ∩ B| / min(|A|, |B|)
  const minSize = Math.min(normalizedUserSkills.length, normalizedJobSkills.length);
  const overlap = minSize > 0 ? commonSkills.length / minSize : 0;
  
  // Kết hợp cả 2 metrics (ưu tiên overlap hơn)
  return Math.min(100, Math.round((jaccard * 0.4 + overlap * 0.6) * 100));
};

/**
 * Tính điểm phù hợp theo category và subCategory
 */
const calculateCategoryMatch = (userSkills, job) => {
  let score = 0;
  const categoryKeywords = {
    it: ['react', 'javascript', 'python', 'java', 'node', 'angular', 'vue', 'html', 'css', 'docker', 'kubernetes', 'sql', 'mongodb', 'git', 'api', 'frontend', 'backend', 'fullstack', 'mobile', 'devops', 'data', 'ai', 'machine learning', 'tensorflow', 'pytorch'],
    tourism: ['khách sạn', 'resort', 'du lịch', 'tour', 'lễ tân', 'nhà hàng', 'spa', 'bếp', 'phục vụ', 'hướng dẫn viên', 'bellman', 'housekeeping'],
    business: ['kinh doanh', 'bán hàng', 'sales', 'marketing', 'thương mại', 'chăm sóc khách hàng', 'cskh', 'telesales', 'thu ngân', 'merchandiser'],
    construction: ['xây dựng', 'công trình', 'kiến trúc', 'kỹ thuật', 'thợ', 'bất động sản', 'giám sát', 'vật liệu'],
    service: ['dịch vụ', 'logistics', 'vận chuyển', 'kho vận', 'chăm sóc', 'giao hàng', 'tạp vụ', 'vệ sinh']
  };
  
  const normalizedSkills = userSkills.map(s => normalizeText(s)).join(' ');
  
  // Kiểm tra category match
  const categoryKeywordList = categoryKeywords[job.category] || [];
  const hasCategoryMatch = categoryKeywordList.some(keyword => 
    normalizedSkills.includes(keyword)
  );
  
  if (hasCategoryMatch) score += 20;
  
  // Kiểm tra subCategory match (thêm điểm)
  const subCategoryMap = {
    frontend: ['react', 'vue', 'angular', 'frontend', 'ui', 'giao diện', 'html', 'css'],
    backend: ['node', 'python', 'java', 'php', 'backend', 'api', 'server'],
    fullstack: ['fullstack', 'mern', 'mean', 'react node', 'java react'],
    mobile: ['flutter', 'react native', 'ios', 'android', 'swift', 'kotlin', 'mobile'],
    devops: ['docker', 'kubernetes', 'ci/cd', 'jenkins', 'aws', 'devops', 'cloud'],
    data: ['sql', 'python', 'data', 'analyst', 'pandas', 'power bi', 'tableau'],
    ai: ['ai', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'nlp', 'computer vision'],
    hotel: ['khách sạn', 'lễ tân', 'resort', 'hotel'],
    restaurant: ['nhà hàng', 'bếp', 'phục vụ', 'restaurant'],
    retail: ['bán hàng', 'thu ngân', 'retail', 'cửa hàng']
  };
  
  const subKeywordList = subCategoryMap[job.subCategory] || [];
  const hasSubMatch = subKeywordList.some(keyword => 
    normalizedSkills.includes(keyword)
  );
  
  if (hasSubMatch) score += 15;
  
  return Math.min(35, score);
};

/**
 * Tính điểm theo title (ưu tiên job title phù hợp)
 */
const calculateTitleMatch = (userSkills, jobTitle) => {
  if (!userSkills?.length) return 0;
  
  const normalizedTitle = normalizeText(jobTitle);
  let score = 0;
  
  for (const skill of userSkills) {
    const normalizedSkill = normalizeText(skill);
    if (normalizedTitle.includes(normalizedSkill)) {
      score += 10;
    }
  }
  
  return Math.min(20, score);
};

/**
 * TÍNH ĐIỂM PHÙ HỢP TỔNG THỂ
 * @param {Array} userSkills - Danh sách kỹ năng của user
 * @param {Object} job - Job object
 * @returns {Object} { score, breakdown }
 */
export const calculateMatchScore = (userSkills, job) => {
  if (!userSkills?.length || !job) {
    return { score: 0, breakdown: { skills: 0, category: 0, title: 0, bonus: 0 } };
  }
  
  // 1. Skills match (trọng số 50%)
  const skillsScore = calculateSkillsMatch(userSkills, job.skills || []);
  
  // 2. Category & SubCategory match (trọng số 30%)
  const categoryScore = calculateCategoryMatch(userSkills, job);
  
  // 3. Title match (trọng số 20%)
  const titleScore = calculateTitleMatch(userSkills, job.title);
  
  // Tính tổng điểm (có trọng số)
  let totalScore = (skillsScore * 0.5) + (categoryScore * 0.3) + (titleScore * 0.2);
  
  // Bonus: Nếu job đang HOT hoặc FEATURED (cộng thêm 5%)
  if (job.hot || job.featured) {
    totalScore = Math.min(100, totalScore + 5);
  }
  
  return {
    score: Math.round(totalScore),
    breakdown: {
      skills: skillsScore,
      category: categoryScore,
      title: titleScore,
      bonus: (job.hot || job.featured) ? 5 : 0
    }
  };
};

/**
 * GỢI Ý VIỆC LÀM DỰA TRÊN KỸ NĂNG USER
 * @param {Array} userSkills - Kỹ năng của user
 * @param {Array} allJobs - Tất cả jobs
 * @param {number} limit - Số lượng gợi ý tối đa
 * @param {number} minScore - Điểm tối thiểu (mặc định 30)
 * @returns {Array} Jobs đã được sắp xếp theo điểm match
 */
export const getRecommendationsBySkills = (userSkills, allJobs, limit = 10, minScore = 30) => {
  if (!userSkills?.length || !allJobs?.length) {
    return [];
  }
  
  // Tính điểm cho từng job
  const scoredJobs = allJobs.map(job => ({
    ...job,
    matchScore: calculateMatchScore(userSkills, job).score
  }));
  
  // Lọc job có điểm >= minScore
  const qualifiedJobs = scoredJobs.filter(job => job.matchScore >= minScore);
  
  // Sắp xếp theo điểm giảm dần
  qualifiedJobs.sort((a, b) => b.matchScore - a.matchScore);
  
  // Giới hạn số lượng
  return qualifiedJobs.slice(0, limit);
};

/**
 * TÌM VIỆC LÀM TƯƠNG TỰ (DỰA TRÊN JOB HIỆN TẠI)
 * @param {Object} currentJob - Job hiện tại
 * @param {Array} allJobs - Tất cả jobs
 * @param {number} limit - Số lượng gợi ý
 * @returns {Array} Jobs tương tự đã sắp xếp
 */
export const getSimilarJobsAI = (currentJob, allJobs, limit = 5) => {
  if (!currentJob || !allJobs?.length) return [];
  
  // Hàm tính độ tương đồng giữa 2 job
  const calculateJobSimilarity = (job1, job2) => {
    let score = 0;
    
    // 1. Category giống nhau (30 điểm)
    if (job1.category === job2.category) {
      score += 30;
    }
    
    // 2. SubCategory giống nhau (25 điểm)
    if (job1.subCategory === job2.subCategory) {
      score += 25;
    }
    
    // 3. Skills overlap (30 điểm)
    const commonSkills = job1.skills?.filter(skill => 
      job2.skills?.some(s => normalizeText(s) === normalizeText(skill))
    ).length || 0;
    const maxSkills = Math.max(job1.skills?.length || 1, job2.skills?.length || 1);
    const skillsScore = (commonSkills / maxSkills) * 30;
    score += skillsScore;
    
    // 4. Level tương đồng (10 điểm)
    const levelMap = { 'Junior': 1, 'Middle': 2, 'Senior': 3, 'Lead': 4 };
    const level1 = levelMap[job1.level?.split(' ').pop()] || 2;
    const level2 = levelMap[job2.level?.split(' ').pop()] || 2;
    const levelDiff = Math.abs(level1 - level2);
    if (levelDiff === 0) score += 10;
    else if (levelDiff === 1) score += 5;
    
    // 5. Salary range tương đồng (5 điểm)
    const extractSalary = (salary) => {
      const match = salary?.match(/(\d+)/g);
      return match ? parseInt(match[0]) : 0;
    };
    const salary1 = extractSalary(job1.salary);
    const salary2 = extractSalary(job2.salary);
    if (salary1 && salary2) {
      const diffPercent = Math.abs(salary1 - salary2) / Math.max(salary1, salary2);
      if (diffPercent < 0.2) score += 5;
      else if (diffPercent < 0.4) score += 3;
    }
    
    return Math.min(100, Math.round(score));
  };
  
  // Tính điểm tương đồng cho tất cả job khác
  const similarJobs = allJobs
    .filter(job => job.id !== currentJob.id)
    .map(job => ({
      ...job,
      similarityScore: calculateJobSimilarity(currentJob, job)
    }))
    .filter(job => job.similarityScore > 20) // Chỉ lấy job có độ tương đồng > 20%
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
  
  return similarJobs;
};

/**
 * GỢI Ý VIỆC LÀM HOT/PHỔ BIẾN
 * @param {Array} allJobs - Tất cả jobs
 * @param {number} limit - Số lượng
 * @returns {Array} Jobs hot nhất
 */
export const getPopularJobs = (allJobs, limit = 10) => {
  if (!allJobs?.length) return [];
  
  // Ưu tiên job hot, featured, mới đăng
  const scoredJobs = allJobs.map(job => ({
    ...job,
    popularityScore: (job.hot ? 30 : 0) + (job.featured ? 20 : 0)
  }));
  
  scoredJobs.sort((a, b) => b.popularityScore - a.popularityScore);
  return scoredJobs.slice(0, limit);
};

/**
 * TÌM KIẾM VIỆC LÀM THÔNG MINH
 * @param {string} keyword - Từ khóa tìm kiếm
 * @param {Array} allJobs - Tất cả jobs
 * @returns {Array} Jobs phù hợp
 */
export const smartSearch = (keyword, allJobs) => {
  if (!keyword || !allJobs?.length) return allJobs || [];
  
  const normalizedKeyword = normalizeText(keyword);
  const keywords = normalizedKeyword.split(' ');
  
  const scoredJobs = allJobs.map(job => {
    let score = 0;
    
    // Tìm trong title (40 điểm)
    const normalizedTitle = normalizeText(job.title);
    if (normalizedTitle.includes(normalizedKeyword)) score += 40;
    else {
      for (const kw of keywords) {
        if (normalizedTitle.includes(kw)) score += 20;
      }
    }
    
    // Tìm trong company (20 điểm)
    const normalizedCompany = normalizeText(job.company);
    if (normalizedCompany.includes(normalizedKeyword)) score += 20;
    
    // Tìm trong skills (30 điểm)
    const allSkills = job.skills?.map(s => normalizeText(s)).join(' ') || '';
    if (allSkills.includes(normalizedKeyword)) score += 30;
    
    // Tìm trong description (10 điểm)
    const normalizedDesc = normalizeText(job.description);
    if (normalizedDesc.includes(normalizedKeyword)) score += 10;
    
    return { ...job, searchScore: score };
  });
  
  // Lọc job có score > 0 và sắp xếp
  return scoredJobs
    .filter(job => job.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
};

/**
 * LẤY KỸ NĂNG ĐANG THỊNH HÀNH (TRENDING SKILLS)
 * @param {Array} allJobs - Tất cả jobs
 * @param {number} limit - Số lượng kỹ năng
 * @returns {Array} Danh sách kỹ năng phổ biến
 */
export const getTrendingSkills = (allJobs, limit = 20) => {
  if (!allJobs?.length) return [];
  
  const skillCount = new Map();
  
  for (const job of allJobs) {
    if (job.skills) {
      for (const skill of job.skills) {
        const normalized = normalizeText(skill);
        skillCount.set(normalized, (skillCount.get(normalized) || 0) + 1);
      }
    }
  }
  
  // Sắp xếp theo số lượng và lấy top N
  const sortedSkills = Array.from(skillCount.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
  
  return sortedSkills;
};

// Export mặc định
const aiRecommendation = {
  calculateMatchScore,
  getRecommendationsBySkills,
  getSimilarJobsAI,
  getPopularJobs,
  smartSearch,
  getTrendingSkills
};

export default aiRecommendation;