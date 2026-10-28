/*
  ليه أضفت Promise.resolve()؟
   عشان تتعامل مع نتيجة الدالة باعتبارها Promise，
    وتلتقط أخطاء الرفض، وكذلك الأخطاء المتزامنة التي تحصل أثناء استدعاء fn داخل Promise.resolve لا تُلتقط بهذه الصيغة إذا وقع الخطأ قبل إنشاء الـ Promise

*/

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (Object.keys(error) == 0) {
      return next(new Error(error.message, { cause: 500 }));
    }
    return next(error);
  });
};
