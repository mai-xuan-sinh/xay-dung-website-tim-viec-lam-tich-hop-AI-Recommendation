import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Tôi có cần trả phí để sử dụng ĐANANG WORK không?",
      a: "Hoàn toàn miễn phí! ĐANANG WORK cung cấp tất cả tính năng cơ bản cho người tìm việc mà không thu bất kỳ khoản phí nào."
    },
    {
      q: "Làm thế nào để AI gợi ý việc làm chính xác?",
      a: "AI sẽ phân tích hồ sơ của bạn (kỹ năng, kinh nghiệm, học vấn) để gợi ý việc làm phù hợp. Hãy cập nhật đầy đủ thông tin để nhận gợi ý tốt nhất."
    },
    {
      q: "Tôi có thể ứng tuyển bao nhiêu công việc?",
      a: "Không giới hạn! Bạn có thể ứng tuyển vào bất kỳ công việc nào phù hợp với năng lực của mình."
    },
    {
      q: "Làm sao để biết nhà tuyển dụng đã xem hồ sơ của tôi?",
      a: "Bạn sẽ nhận được thông báo khi nhà tuyển dụng xem hồ sơ hoặc cập nhật trạng thái đơn ứng tuyển của bạn."
    },
    {
      q: "Tôi có thể chỉnh sửa hồ sơ sau khi đã tạo không?",
      a: "Có, bạn có thể cập nhật hồ sơ bất cứ lúc nào trong phần 'Hồ sơ cá nhân'."
    },
    {
      q: "Làm thế nào để tải lên CV?",
      a: "Trong phần 'Hồ sơ cá nhân', bạn có thể tải lên CV của mình (hỗ trợ PDF, DOC, DOCX)."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">Câu hỏi thường gặp</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;