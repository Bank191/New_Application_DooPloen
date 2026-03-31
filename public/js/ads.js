// ads.js
const CONFIG = {
    userId: 7, // ดึงจาก Session หรือ LocalStorage ของคุณ
    adDuration: 10, // วินาที
    missionId: 3,
    apiUrl: 'http://localhost:3000/api/mission/update-ad-progress'
};

let adTimer;
let canEarnPoint = false;

// รายชื่อรูปภาพ (เปลี่ยนเป็นไฟล์ .png ในเครื่องคุณได้)
const adImages = [
    'assets/ads/promo1.png',
    'assets/ads/promo2.png',
    'https://via.placeholder.com/600x300?text=Premium+Member+Sale'
];

function startAd() {
    const modal = document.getElementById('ad-modal');
    const progressBar = document.getElementById('ad-progress-bar');
    const closeBtn = document.getElementById('close-ad-btn');
    const imgContainer = document.getElementById('ad-image-container');

    // 1. สุ่มรูปและโชว์ Modal
    const randomImg = adImages[Math.floor(Math.random() * adImages.length)];
    imgContainer.style.backgroundImage = `url(${randomImg})`;
    modal.style.display = 'flex';

    // 2. รีเซ็ตสถานะ
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    closeBtn.style.display = 'none';
    canEarnPoint = false;

    // 3. เริ่มวิ่ง Progress Bar
    setTimeout(() => {
        progressBar.style.transition = `width ${CONFIG.adDuration}s linear`;
        progressBar.style.width = '100%';
    }, 100);

    // 4. จับเวลาดูจบ
    adTimer = setTimeout(() => {
        canEarnPoint = true;
        closeBtn.style.display = 'block';
        document.getElementById('ad-status-text').innerText = 'สำเร็จ! กดปิดเพื่อรับแต้ม';
    }, CONFIG.adDuration * 1000);
}

// ในไฟล์โฆษณาของคุณ (ที่มี Modal รูปภาพ)
async function closeAd() {
    document.getElementById('ad-modal').style.display = 'none';
    if (canEarnPoint) {
        // เปลี่ยนจาก 3 เป็น 4 เพื่อให้ตรงกับ "ดูโฆษณา" ใน DB
        await doMission(4); 
    }
}

async function submitProgress() {
    try {
        const response = await fetch(CONFIG.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: CONFIG.userId,
                missionId: CONFIG.missionId
            })
        });
        const data = await response.json();
        
        if (data.success) {
            document.getElementById('display-count').innerText = data.current_progress;
            if (data.completed) alert('🎉 ภารกิจสำเร็จ! รับรางวัลเรียบร้อย');
        }
    } catch (err) {
        console.error('API Error:', err);
    }
}