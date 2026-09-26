// script.js - كود الحسابات التفاعلية للحاسبة

document.addEventListener('DOMContentLoaded', () => {
  // الحصول على عناصر المدخلات من الصفحة
  const loanAmountInput = document.getElementById('loanAmount');
  const monthlyPaymentInput = document.getElementById('monthlyPayment');
  const interestRateInput = document.getElementById('interestRate');
  const loanTermInput = document.getElementById('loanTerm');

  // الحصول على عناصر المخرجات والنتائج
  const remainingBalanceEl = document.getElementById('remainingBalance');
  const totalPaidEl = document.getElementById('totalPaid');
  const totalMonthsEl = document.getElementById('totalMonths');

  // دالة حساب نتائج التمويل
  function calculateLoan() {
    const principal = parseFloat(loanAmountInput.value) || 0;
    const monthlyPayment = parseFloat(monthlyPaymentInput.value) || 0;
    const annualRate = parseFloat(interestRateInput.value) || 0;
    const years = parseFloat(loanTermInput.value) || 0;

    const totalMonths = years * 12;
    const monthlyRate = (annualRate / 100) / 12;

    if (principal <= 0 || years <= 0) {
      remainingBalanceEl.textContent = '0.00 ر.س';
      totalPaidEl.textContent = '0 ر.س';
      totalMonthsEl.textContent = '0 شهر';
      return;
    }

    let remainingBalance = principal;
    let totalPaid = 0;

    if (monthlyPayment > 0) {
      // حساب التمويل بناءً على القسط المدفوع
      for (let i = 0; i < totalMonths; i++) {
        const interestForMonth = remainingBalance * monthlyRate;
        remainingBalance += interestForMonth;
        
        if (remainingBalance >= monthlyPayment) {
          remainingBalance -= monthlyPayment;
          totalPaid += monthlyPayment;
        } else {
          totalPaid += remainingBalance;
          remainingBalance = 0;
          break;
        }
      }
    } else {
      // إذا لم يحدد قسط شهري، يتم حساب القسط التقريبي تلقائياً
      if (monthlyRate > 0) {
        const calculatedPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                                  (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPaid = calculatedPayment * totalMonths;
      } else {
        totalPaid = principal;
      }
      remainingBalance = 0;
    }

    // تنسيق الأرقام وعرضها للمستخدم
    remainingBalanceEl.textContent = remainingBalance.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
    totalPaidEl.textContent = totalPaid.toLocaleString('ar-SA', { maximumFractionDigits: 0 }) + ' ر.س';
    totalMonthsEl.textContent = totalMonths + ' شهر';
  }

  // إضافة مستمعين للأحداث للتحديث الفوري عند الكتابة
  loanAmountInput.addEventListener('input', calculateLoan);
  monthlyPaymentInput.addEventListener('input', calculateLoan);
  interestRateInput.addEventListener('input', calculateLoan);
  loanTermInput.addEventListener('input', calculateLoan);

  // تشغيل الحساب الأولية عند التحميل
  calculateLoan();
});
