document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return window.location.href = '/login.html';

    fetch(`/api/profile/${userId}`)
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                const user = response.data;
                
                // --- ข้อมูลพื้นฐาน ---
                document.getElementById('userName').innerText = `${user.first_name} ${user.last_name}`;
                document.getElementById('userEmail').innerText = user.email;
                document.getElementById('memberLevel').innerText = user.level_name || 'ทั่วไป';
                document.getElementById('totalSpending').innerText = user.total_spending.toLocaleString();
                document.getElementById('coinBalance').innerText = user.coin_balance.toLocaleString();

                // --- ส่วนที่แก้ไขใหม่: Logic 2 เงื่อนไข (เงิน + เวลา) ---
                const currentSpending = user.total_spending || 0;
                const signupDate = new Date(user.created_at); // วันที่สมัครสมาชิกจาก DB
                const now = new Date();
                
                // 1. คำนวณอายุการใช้งาน (หน่วย: เดือน)
                const monthsActive = (now.getFullYear() - signupDate.getFullYear()) * 12 + (now.getMonth() - signupDate.getMonth());

                // 2. กำหนดเกณฑ์ตามตาราง "เก็บลูกค้า"
                let targetSpend = 0;
                let targetMonths = 0;
                let nextLevelName = "";

                // เช็คว่าตอนนี้อยู่ Level ไหน เพื่อหาเป้าหมายถัดไป
                if (user.member_level_id === 1) { // Welcome -> Silver
                    targetSpend = 3449;
                    targetMonths = 6;
                    nextLevelName = "Silver";
                } else if (user.member_level_id === 2) { // Silver -> Gold
                    targetSpend = 5099;
                    targetMonths = 12;
                    nextLevelName = "Gold";
                } else if (user.member_level_id === 3) { // Gold -> Platinum
                    targetSpend = 6399;
                    targetMonths = 24;
                    nextLevelName = "Platinum";
                }

                // 3. คำนวณเปอร์เซ็นต์ (%) แยกกัน 2 เงื่อนไข
                const spendPercent = Math.min((currentSpending / targetSpend) * 100, 100);
                const timePercent = Math.min((monthsActive / targetMonths) * 100, 100);

                // 4. อัปเดตหลอดความคืบหน้าใน HTML
                // หลอดเงิน
                const spendBar = document.getElementById('spend-progress-fill');
                if (spendBar) spendBar.style.width = `${spendPercent}%`;

                // หลอดเวลา
                const timeBar = document.getElementById('time-progress-fill');
                if (timeBar) timeBar.style.width = `${timePercent}%`;

                // 5. อัปเดตข้อความแจ้งเตือน "อีกกี่บาท/อีกกี่เดือน"
                const infoElem = document.getElementById('remaining-info');
                if (infoElem) {
                    const remainingSpend = Math.max(targetSpend - currentSpending, 0);
                    const remainingMonths = Math.max(targetMonths - monthsActive, 0);
                    
                    if (remainingSpend > 0 || remainingMonths > 0) {
                        infoElem.innerText = `อีก ฿${remainingSpend.toLocaleString()} และอีก ${remainingMonths} เดือน เพื่อเป็น ${nextLevelName}`;
                    } else {
                        infoElem.innerText = `คุณทำครบเงื่อนไขของระดับ ${nextLevelName} แล้ว!`;
                    }
                }
            }
        })
        .catch(err => console.error("❌ Profile Error:", err));
});