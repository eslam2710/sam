import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    // محاكاة عملية تحميل البيانات
    setTimeout(() => {
      setUserMessage('مرحباً بكم في موهبتي! استمتع بتجربة اكتشاف المواهب.'); // رسالة ترحيبية
      setIsLoading(false); // إنهاء التحميل
    }, 2000); // وقت الانتظار (2 ثانية)
  }, []);

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <h1 className="profile-title">موهبتي</h1>
      </header>

      {/* Loading or Message Section */}
      <section className="profile-loading">
        {isLoading ? (
          <p>جاري تحميل المحتوى، يرجى الانتظار...</p> // عرض رسالة أثناء التحميل
        ) : (
          <p>{userMessage}</p> // عرض الرسالة بعد انتهاء التحميل
        )}
      </section>

      {/* About Section */}
      <section className="profile-description">
        <h2>عن موهبتي</h2>
        <p>
          موهبتي هي منصة لعرض وتطوير المواهب في مختلف المجالات، حيث يمكن للمستخدمين مشاركة مهاراتهم وابتكاراتهم مع العالم.
          تهدف موهبتي إلى تطوير وترويج المواهب المحلية، وتوفير مساحة للإبداع والتعاون، وتشجيع التفاعل والمشاركة بين
          المجتمع المحلي والدولي.
        </p>
      </section>

      {/* Services Section */}
      <section className="profile-services">
        <h2>الخدمات</h2>
        <ul>
          <li>ورش عمل وتدريبات في مختلف المجالات</li>
          <li>منصات عرض وترويج للمواهب</li>
          <li>مسابقات وجوائز للمواهب المميزة</li>
        </ul>
      </section>
    </div>
  );
}

export default Profile;
