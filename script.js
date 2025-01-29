// عرض الصفحة المختارة
function showPage(page) {
    document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

// التبديل بين الوضع الداكن والوضع الفاتح
function toggleDarkMode() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// تغيير اللغة بين العربية والإنجليزية
function changeLang() {
    const lang = document.documentElement.lang;
    if (lang === "ar") {
        document.documentElement.lang = "en";
        alert("Language changed to English!");
    } else {
        document.documentElement.lang = "ar";
        alert("تم تغيير اللغة إلى العربية!");
    }
}

// تغيير لون الخلفية بناءً على الاختيار
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

// عرض نموذج تسجيل الدخول بناءً على الاختيار (البريد الإلكتروني، فيسبوك، جوجل)
function showLoginForm(type) {
    document.querySelectorAll('.login-form').forEach(form => form.style.display = 'none');
    document.getElementById(`${type}-form`).style.display = 'block';
}

// التحقق من بيانات تسجيل الدخول
function validateLogin(type) {
    alert(`تم تسجيل الدخول بنجاح عبر ${type}!`);
    document.getElementById('loginLogoutButton').textContent = 'تسجيل الخروج';
    showPage('home');
}

// التبديل بين تسجيل الدخول وتسجيل الخروج
function toggleLogin() {
    const button = document.getElementById('loginLogoutButton');
    if (button.textContent === 'تسجيل الدخول') {
        showPage('login');
    } else {
        alert('تم تسجيل الخروج!');
        button.textContent = 'تسجيل الدخول';
    }
}
