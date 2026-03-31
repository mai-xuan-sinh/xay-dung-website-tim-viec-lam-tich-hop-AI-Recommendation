import React, { useState, useEffect } from 'react';
import { XMarkIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Dữ liệu câu hỏi theo ngành
const quizData = {
  it: {
    title: 'Bài test đánh giá năng lực IT',
    description: 'Hoàn thành bài test để chúng tôi đánh giá kiến thức chuyên môn của bạn',
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: 'ReactJS sử dụng loại kiến trúc nào?',
        options: ['MVC', 'MVVM', 'Component-based', 'Flux'],
        correct: 2 // Component-based (index 2)
      },
      {
        id: 2,
        question: 'Hook nào dùng để quản lý state trong React functional component?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correct: 1
      },
      {
        id: 3,
        question: 'Vòng đời component trong React gồm mấy giai đoạn chính?',
        options: ['2', '3', '4', '5'],
        correct: 1 // 3 giai đoạn
      },
      {
        id: 4,
        question: 'Từ khóa nào dùng để khai báo biến trong JavaScript (ES6)?',
        options: ['var', 'let', 'const', 'Cả B và C'],
        correct: 3
      },
      {
        id: 5,
        question: 'REST API là viết tắt của?',
        options: ['Representational State Transfer', 'Remote State Transfer', 'Request State Transfer', 'Response State Transfer'],
        correct: 0
      },
      {
        id: 6,
        question: 'Git là công cụ dùng để làm gì?',
        options: ['Quản lý cơ sở dữ liệu', 'Quản lý phiên bản mã nguồn', 'Kiểm thử tự động', 'Triển khai ứng dụng'],
        correct: 1
      },
      {
        id: 7,
        question: 'HTML là viết tắt của?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correct: 0
      },
      {
        id: 8,
        question: 'CSS dùng để làm gì?',
        options: ['Tạo cấu trúc trang web', 'Tạo kiểu dáng cho trang web', 'Xử lý dữ liệu', 'Kết nối database'],
        correct: 1
      },
      {
        id: 9,
        question: 'Trong React, props là gì?',
        options: ['Dữ liệu truyền từ component cha sang con', 'State nội bộ của component', 'API gọi từ server', 'Kiểu dữ liệu'],
        correct: 0
      },
      {
        id: 10,
        question: 'Redux dùng để làm gì?',
        options: ['Quản lý state toàn cục', 'Xử lý API', 'Tạo component', 'Kiểm thử'],
        correct: 0
      }
    ]
  },
  tourism: {
    title: 'Bài test đánh giá năng lực Du lịch - Khách sạn',
    description: 'Đánh giá kiến thức về ngành du lịch và kỹ năng phục vụ khách hàng',
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: 'Trong khách sạn, bộ phận nào chịu trách nhiệm đón tiếp và làm thủ tục cho khách?',
        options: ['Housekeeping', 'F&B', 'Front Office', 'Sales'],
        correct: 2
      },
      {
        id: 2,
        question: 'Khi khách hàng phàn nàn, điều quan trọng nhất là gì?',
        options: ['Biện minh', 'Lắng nghe và thấu hiểu', 'Đổ lỗi cho bộ phận khác', 'Bỏ qua'],
        correct: 1
      },
      {
        id: 3,
        question: 'Tiêu chuẩn 5 sao của khách sạn bao gồm yếu tố nào?',
        options: ['Giá rẻ', 'Dịch vụ cao cấp', 'Vị trí xa trung tâm', 'Số phòng ít'],
        correct: 1
      },
      {
        id: 4,
        question: 'Điểm du lịch nổi tiếng nhất Đà Nẵng là?',
        options: ['Phố cổ Hội An', 'Bà Nà Hills', 'Biển Mỹ Khê', 'Cả A, B, C'],
        correct: 3
      },
      {
        id: 5,
        question: 'Kỹ năng nào quan trọng nhất đối với nhân viên lễ tân?',
        options: ['Nấu ăn', 'Giao tiếp và ngoại ngữ', 'Lái xe', 'Kế toán'],
        correct: 1
      },
      {
        id: 6,
        question: 'Cụm từ "Check-in" trong khách sạn có nghĩa là gì?',
        options: ['Trả phòng', 'Nhận phòng', 'Đặt phòng', 'Hủy phòng'],
        correct: 1
      },
      {
        id: 7,
        question: 'Khi gặp khách hàng khó tính, thái độ phù hợp là?',
        options: ['Cáu gắt', 'Kiên nhẫn và chuyên nghiệp', 'Phớt lờ', 'Nhờ quản lý xử lý ngay'],
        correct: 1
      },
      {
        id: 8,
        question: 'Tiếng Anh chuyên ngành "Reservation" có nghĩa là gì?',
        options: ['Hủy phòng', 'Đặt phòng', 'Thanh toán', 'Nhận phòng'],
        correct: 1
      },
      {
        id: 9,
        question: 'Trong nhà hàng, "upselling" là gì?',
        options: ['Giảm giá', 'Tư vấn khách mua thêm sản phẩm', 'Phục vụ nhanh', 'Dọn bàn'],
        correct: 1
      },
      {
        id: 10,
        question: 'Điều gì tạo ấn tượng đầu tiên với khách hàng khi đến khách sạn?',
        options: ['Giá phòng', 'Thái độ nhân viên', 'Vị trí khách sạn', 'Thương hiệu'],
        correct: 1
      }
    ]
  },
  business: {
    title: 'Bài test đánh giá năng lực Kinh doanh',
    description: 'Đánh giá kỹ năng bán hàng, tư vấn và chăm sóc khách hàng',
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: 'Kỹ năng quan trọng nhất của nhân viên bán hàng là gì?',
        options: ['Ngoại hình', 'Giao tiếp và thuyết phục', 'Kỹ thuật', 'Tin học'],
        correct: 1
      },
      {
        id: 2,
        question: 'Khi khách hàng từ chối mua hàng, bạn nên làm gì?',
        options: ['Bỏ đi', 'Tìm hiểu lý do và giải đáp', 'Ép khách mua', 'Không quan tâm'],
        correct: 1
      },
      {
        id: 3,
        question: 'SPIN là phương pháp bán hàng dựa trên?',
        options: ['Tình huống, vấn đề, ảnh hưởng, giải pháp', 'Giá cả, chất lượng, dịch vụ', 'Khuyến mãi, quà tặng', 'Thương hiệu'],
        correct: 0
      },
      {
        id: 4,
        question: 'Telesales là gì?',
        options: ['Bán hàng qua điện thoại', 'Bán hàng trực tiếp', 'Bán hàng online', 'Bán hàng qua email'],
        correct: 0
      },
      {
        id: 5,
        question: 'Khi chăm sóc khách hàng, điều gì quan trọng nhất?',
        options: ['Giá rẻ', 'Sự quan tâm và hậu mãi', 'Sản phẩm đa dạng', 'Vị trí thuận tiện'],
        correct: 1
      },
      {
        id: 6,
        question: 'KPI trong kinh doanh là viết tắt của?',
        options: ['Key Performance Indicator', 'Keep Product Information', 'Knowledge Process Integration', 'None'],
        correct: 0
      },
      {
        id: 7,
        question: 'CRM trong kinh doanh là gì?',
        options: ['Quản lý quan hệ khách hàng', 'Quản lý nhân sự', 'Quản lý tài chính', 'Quản lý kho'],
        correct: 0
      },
      {
        id: 8,
        question: 'Khi khách hàng phàn nàn về sản phẩm, bạn nên?',
        options: ['Xin lỗi và tìm cách khắc phục', 'Đổ lỗi cho bộ phận khác', 'Bỏ qua', 'Tranh luận'],
        correct: 0
      },
      {
        id: 9,
        question: '"Up-selling" trong bán hàng là gì?',
        options: ['Giảm giá', 'Bán sản phẩm cao cấp hơn', 'Bán thêm sản phẩm kèm', 'Hủy đơn'],
        correct: 1
      },
      {
        id: 10,
        question: 'Cross-selling là gì?',
        options: ['Bán sản phẩm chính', 'Bán sản phẩm bổ trợ', 'Giảm giá', 'Khuyến mãi'],
        correct: 1
      }
    ]
  },
  construction: {
    title: 'Bài test đánh giá năng lực Xây dựng',
    description: 'Đánh giá kiến thức về an toàn lao động và kỹ thuật xây dựng cơ bản',
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: 'Trên công trường, bắt buộc phải đội mũ bảo hộ để làm gì?',
        options: ['Đẹp', 'An toàn', 'Thể hiện chuyên nghiệp', 'Theo yêu cầu'],
        correct: 1
      },
      {
        id: 2,
        question: 'Vật liệu xây dựng cơ bản nhất là gì?',
        options: ['Gạch, xi măng, cát, đá', 'Gỗ, nhựa', 'Kính, nhôm', 'Sắt, thép'],
        correct: 0
      },
      {
        id: 3,
        question: 'Khi thi công trên cao, cần sử dụng thiết bị gì để đảm bảo an toàn?',
        options: ['Dây an toàn', 'Găng tay', 'Kính mát', 'Ủng'],
        correct: 0
      },
      {
        id: 4,
        question: 'Bản vẽ kỹ thuật dùng để làm gì?',
        options: ['Trang trí', 'Hướng dẫn thi công', 'Lưu trữ', 'Báo cáo'],
        correct: 1
      },
      {
        id: 5,
        question: 'Công việc của thợ hồ chính là gì?',
        options: ['Xây tường, trát', 'Điện nước', 'Sơn', 'Lắp cửa'],
        correct: 0
      },
      {
        id: 6,
        question: 'Khi phát hiện nguy cơ mất an toàn lao động, cần làm gì?',
        options: ['Bỏ qua', 'Báo cáo ngay', 'Tự xử lý', 'Chờ chỉ đạo'],
        correct: 1
      },
      {
        id: 7,
        question: 'Bê tông là hỗn hợp của?',
        options: ['Xi măng + cát + đá + nước', 'Xi măng + nước', 'Cát + đá', 'Đá + nước'],
        correct: 0
      },
      {
        id: 8,
        question: 'Khi làm việc với máy móc, cần lưu ý điều gì?',
        options: ['Đeo găng tay', 'Đọc hướng dẫn và an toàn', 'Làm nhanh', 'Không cần chú ý'],
        correct: 1
      },
      {
        id: 9,
        question: 'Đơn vị đo diện tích phổ biến trong xây dựng là?',
        options: ['m²', 'm³', 'm', 'km'],
        correct: 0
      },
      {
        id: 10,
        question: 'An toàn lao động là trách nhiệm của ai?',
        options: ['Chỉ của chủ thầu', 'Chỉ của giám sát', 'Của tất cả mọi người', 'Của công an'],
        correct: 2
      }
    ]
  },
  service: {
    title: 'Bài test đánh giá năng lực Dịch vụ',
    description: 'Đánh giá kỹ năng phục vụ và chăm sóc khách hàng',
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: 'Khi phục vụ khách, thái độ nào là phù hợp?',
        options: ['Lạnh lùng', 'Thân thiện, vui vẻ', 'Nóng vội', 'Thờ ơ'],
        correct: 1
      },
      {
        id: 2,
        question: 'Khi khách hàng yêu cầu đặc biệt, bạn nên?',
        options: ['Từ chối', 'Cố gắng đáp ứng nếu có thể', 'Làm ngơ', 'Báo xấu'],
        correct: 1
      },
      {
        id: 3,
        question: 'Trong ngành dịch vụ, yếu tố nào quan trọng nhất?',
        options: ['Giá rẻ', 'Sự hài lòng của khách hàng', 'Sản phẩm đẹp', 'Vị trí'],
        correct: 1
      },
      {
        id: 4,
        question: 'Khi khách hàng phàn nàn, cách xử lý tốt nhất là?',
        options: ['Xin lỗi và khắc phục', 'Biện minh', 'Đổ lỗi', 'Bỏ qua'],
        correct: 0
      },
      {
        id: 5,
        question: 'Giao tiếp phi ngôn ngữ bao gồm?',
        options: ['Lời nói', 'Cử chỉ, nét mặt', 'Email', 'Điện thoại'],
        correct: 1
      },
      {
        id: 6,
        question: 'Khi khách hàng đến muộn, bạn nên?',
        options: ['Từ chối phục vụ', 'Đón tiếp bình thường', 'Mắng khách', 'Làm ngơ'],
        correct: 1
      },
      {
        id: 7,
        question: 'Tiêu chí 5S trong dịch vụ là gì?',
        options: ['Sàng lọc, sắp xếp, sạch sẽ, săn sóc, sẵn sàng', 'Sản phẩm, sức khỏe', 'Giá, chất lượng', 'Không biết'],
        correct: 0
      },
      {
        id: 8,
        question: 'Khi gặp khách hàng khó tính, bạn nên?',
        options: ['Kiên nhẫn và lắng nghe', 'Cãi lại', 'Bỏ đi', 'Gọi bảo vệ'],
        correct: 0
      },
      {
        id: 9,
        question: 'Dịch vụ khách hàng tốt giúp?',
        options: ['Giữ chân khách hàng', 'Tăng doanh thu', 'Tạo uy tín', 'Tất cả các ý trên'],
        correct: 3
      },
      {
        id: 10,
        question: 'Khi kết thúc buổi phục vụ, nên làm gì?',
        options: ['Cảm ơn khách', 'Dọn dẹp ngay', 'Tính tiền', 'Không cần'],
        correct: 0
      }
    ]
  }
};

const QuizModal = ({ isOpen, onClose, job, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  // Lấy quiz theo ngành
  const getQuizByCategory = () => {
    const category = job?.category || 'it';
    return quizData[category] || quizData.it;
  };

  const quiz = getQuizByCategory();
  const totalQuestions = quiz.questions.length;

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Tính điểm
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setScore(finalScore);
    setSubmitted(true);
    setLoading(true);

    try {
      // Gọi API lưu kết quả
      await onSubmit({
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        score: finalScore,
        answers: answers,
        totalQuestions: totalQuestions,
        correctAnswers: correctCount
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    onClose();
  };

  if (!isOpen) return null;

  const currentQ = quiz.questions[currentQuestion];
  const selectedAnswer = answers[currentQ?.id];
  const isAnswered = selectedAnswer !== undefined;
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto modal-scroll">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {job?.title} - {job?.company}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {!submitted ? (
          <div className="p-6">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Câu {currentQuestion + 1}/{totalQuestions}</span>
                <span>Đã trả lời: {answeredCount}/{totalQuestions}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {currentQ?.question}
              </h3>
              <div className="space-y-3">
                {currentQ?.options.map((option, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selectedAnswer === idx
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={idx}
                      checked={selectedAnswer === idx}
                      onChange={() => handleAnswer(currentQ.id, idx)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Câu trước
              </button>
              {!isLastQuestion ? (
                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Câu tiếp theo
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answeredCount !== totalQuestions}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Nộp bài
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${score >= quiz.passingScore ? 'bg-green-100' : 'bg-orange-100'
              }`}>
              {loading ? (
                <ArrowPathIcon className="h-10 w-10 text-blue-600 animate-spin" />
              ) : (
                <CheckCircleIcon className={`h-10 w-10 ${score >= quiz.passingScore ? 'text-green-600' : 'text-orange-600'
                  }`} />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kết quả bài test</h3>
            <div className="text-4xl font-bold text-blue-600 mb-4">{score}%</div>
            <p className="text-gray-600 mb-2">
              Bạn đã trả lời đúng {Math.round((score / 100) * totalQuestions)}/{totalQuestions} câu
            </p>
            {score >= quiz.passingScore ? (
              <p className="text-green-600 bg-green-50 p-3 rounded-lg mb-6">
                🎉 Chúc mừng! Bạn đã vượt qua bài test. HR sẽ liên hệ lại trong thời gian sớm nhất.
              </p>
            ) : (
              <p className="text-orange-600 bg-orange-50 p-3 rounded-lg mb-6">
                📚 Bạn chưa đạt yêu cầu. Hãy ôn tập thêm và thử lại sau nhé!
              </p>
            )}
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;