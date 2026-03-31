// --- 1. การตั้งค่าเริ่มต้นเมื่อโหลดหน้าเว็บ ---
document.addEventListener('DOMContentLoaded', async () => {
    loadUserCoins();           // โชว์ค่าเก่าจากเครื่องก่อนเพื่อให้ดูไม่หน่วง
    await refreshUserCoinsInMission(); // ดึงค่า 25 จาก Server มาทับทันที
    loadMissionProgress();     // โหลดสถานะภารกิจ
});

// ฟังก์ชันดึงเหรียญจาก localStorage มาโชว์เบื้องต้น
function loadUserCoins() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        const coinDisplay = document.getElementById('user-coins');
        if (coinDisplay) {
            coinDisplay.innerText = (user.coin_balance || 0).toLocaleString();
        }
    }
}

// --- 2. ฟังก์ชันหลักสำหรับรับเหรียญ (ใช้ร่วมกันทุกปุ่ม) ---
async function handleClaimCoin(amount, source, missionId = null) {
    try {
        const response = await fetch('/api/user/add-coins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: JSON.parse(localStorage.getItem('user')).user_id,
                amount: amount,
                source: source,
                missionId: missionId
            })
        });

        const data = await response.json();

        if (data.success) {
            alert(`🎉 ยินดีด้วย! คุณได้รับ ${amount} เหรียญ`);
            // อัปเดตตัวเลขเหรียญบนหน้าจอ (ถ้ามีฟังก์ชันนี้)
            if (typeof refreshUserCoins === 'function') refreshUserCoins();
        } else {
            // 🎯 แก้ตรงนี้: ให้แสดง message ที่ส่งมาจาก Server (เช่น "วันนี้คุณรับไปแล้ว")
            alert(data.message || "เกิดข้อผิดพลาดในการบันทึก");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
}

// --- 3. ฟังก์ชันสำหรับทำภารกิจ (ปุ่ม "ทำเลย" / "เล่นต่อ") ---
async function doMission(missionId) {
    const userData = localStorage.getItem('user');
    if (!userData) return alert("กรุณาเข้าสู่ระบบ");
    const user = JSON.parse(userData);

    try {
        const response = await fetch('/api/user/missions?userId=' + user.user_id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: user.user_id,
                missionId: missionId 
            })
        });

        const data = await response.json();

        if (data.success) {
            // ถ้าทำครบตามจำนวนแล้ว (Server จะส่ง completed: true มา)
            if (data.completed) {
                alert("🎊 ภารกิจสำเร็จ! คุณได้รับเหรียญรางวัลแล้ว");
                location.reload();
            } else {
                // ถ้ายังไม่ครบ ให้โหลด Progress ใหม่เพื่ออัปเดตแถบพลัง
                loadMissionProgress();
                alert("บันทึกความคืบหน้าสำเร็จ!");
            }
        }
    } catch (error) {
        console.error("Mission Update Error:", error);
    }
}

// --- 4. ฟังก์ชันโหลดความคืบหน้าจาก Server ---
async function loadMissionProgress() {
    try {
        const userData = localStorage.getItem('user');
        if (!userData) return;
        const user = JSON.parse(userData);

        const response = await fetch(`/api/user/missions?userId=${user.user_id}`);
        if (!response.ok) return;
        
        const data = await response.json();

        data.forEach(item => {
            const missionCard = document.querySelector(`[data-mission-id="${item.mission_id}"]`);
            if (missionCard) {
                updateProgressBar(missionCard, item.current_progress, item.required_count);

                if (item.status === 'completed') {
                    const btn = missionCard.querySelector('.btn-action');
                    if (btn) {
                        btn.innerText = 'สำเร็จแล้ว';
                        btn.style.backgroundColor = '#cccccc';
                        btn.disabled = true;
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading missions:', error);
    }
}

// ฟังก์ชันย่อยสำหรับวาดแถบ Progress
function updateProgressBar(missionCard, current, total) {
    const percent = Math.min((current / total) * 100, 100);
    const fillElement = missionCard.querySelector('.fill');
    const textElement = missionCard.querySelector('.progress-text');
    
    if (fillElement) fillElement.style.width = `${percent}%`;
    if (textElement) textElement.innerText = `(${current}/${total})`;
}

// --- 5. ฟังก์ชันสุ่มวงล้อ ---
async function spinWheel() {
    const wheel = document.getElementById('wheel');
    const btn = document.getElementById('btn-spin');
    
    // 1. เช็ค Login
    const userData = localStorage.getItem('user');
    if (!userData) return alert("กรุณาเข้าสู่ระบบก่อนหมุน");
    const user = JSON.parse(userData);

    // 2. ป้องกันกดซ้ำ
    if (btn.disabled) return;
    btn.disabled = true;

    const rewards = [1, 5, 10, 15, 20, 25, 50, 100]; // 8 ช่อง
    const totalSlots = rewards.length;
    const degreesPerSlot = 360 / totalSlots; 

    const randomIndex = Math.floor(Math.random() * totalSlots);
    const actualReward = rewards[randomIndex];

    // 3. สั่งหมุน (เพิ่ม 22.5 องศาเพื่อให้ลูกศรชี้กลางช่องพอดี)
    const rotateDegree = (360 * 10) - (randomIndex * degreesPerSlot); 
    wheel.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${rotateDegree}deg)`;

    // 4. รอวงล้อหยุดแล้วค่อยยิง API
    setTimeout(async () => {
        try {
            const response = await fetch('/api/spin-wheel', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    userId: user.user_id, 
                    rewardAmount: actualReward 
                })
            });

            const data = await response.json();
            if (data.success) {
                alert(`🎉 ยินดีด้วย! คุณได้รับ ${actualReward} เหรียญ`);
                if (typeof refreshUserCoinsInMission === "function") {
                    await refreshUserCoinsInMission(); 
                }
            } else {
                alert("เกิดข้อผิดพลาด: " + data.message);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        } finally {
            // เปิดให้กดใหม่ได้
            btn.disabled = false;
        }
    }, 4000);
}

// 1. ฟังก์ชันดึงยอดเหรียญล่าสุดจาก Database มาแสดงในหน้าภารกิจ
async function refreshUserCoinsInMission() {
    const userData = localStorage.getItem("user");
    if (!userData) return;

    const user = JSON.parse(userData);

    try {
        // ดึงจาก API ตัวเดียวกับหน้าหลักเพื่อให้ข้อมูล "ซิงค์" กัน
        const response = await fetch(`/api/user/profile/${user.user_id}`);
        const data = await response.json();

        if (data.success) {
            // 🎯 หาจุดที่โชว์ตัวเลขเหรียญในหน้าภารกิจ (เช็ค ID ใน HTML ให้ตรง)
            const coinDisplay = document.getElementById("user-coins");
            if (coinDisplay) {
                // ปัดเศษให้เป็นเลขกลมๆ เหมือนหน้าหลัก
                const currentCoins = Math.round(data.coin_balance);
                coinDisplay.innerText = `${currentCoins} เหรียญ`;

                // อัปเดต LocalStorage ให้เป็น 25 (ล่าสุด)
                user.coin_balance = currentCoins;
                localStorage.setItem("user", JSON.stringify(user));
            }
        }
    } catch (error) {
        console.error("Error syncing coins in mission page:", error);
    }
}

// 2. เรียกทำงานทันทีที่โหลดไฟล์นี้ในหน้าภารกิจ
window.addEventListener('load', refreshUserCoinsInMission);

// 3. (แถม) ถ้ามีฟังก์ชันกดรับเหรียญเช็คอิน ให้เรียก refresh อีกครั้งหลังรับสำเร็จ
async function handleClaimCheckIn(missionId, reward) {
    // ... โค้ด fetch('/api/user/add-coins') เดิมของคุณ ...
    
    // หลังจากได้รับ Response success แล้ว:
    if (result.success) {
        alert(`ยินดีด้วย! คุณได้รับ ${reward} เหรียญ`);
        
        // 🎯 สั่งดึงข้อมูลใหม่ทันที เลข 20 จะเปลี่ยนเป็น 25 บนหน้าจอเลย
        await refreshUserCoinsInMission(); 
    }
}

// --- ส่วนที่ 1: จัดการโฆษณา ---
// เพิ่มตัวแปรสถานะไว้ด้านบนสุดของไฟล์ (หรือนอกฟังก์ชัน)
let canEarnPoint = false;
let adTimer = null; // 👈 เพิ่มตัวเก็บค่า Timer เพื่อเคลียร์ของเก่า

function startAd() {
    const modal = document.getElementById('ad-modal');
    const timerBar = document.getElementById('ad-timer-bar');
    const statusText = document.getElementById('ad-status-text');
    const closeBtn = document.getElementById('close-ad-btn');

    // 1. 🟢 RESET ทุกอย่างก่อนเริ่มใหม่ (สำคัญมาก!)
    canEarnPoint = false;
    if (adTimer) clearTimeout(adTimer);
    closeBtn.style.display = 'block';
    closeBtn.style.pointerEvents = 'none'; // ปิด X จนกว่าจะดูโฆษณาจนครบ
    closeBtn.style.opacity = '0.4';

    statusText.innerText = 'กำลังรับชมโฆษณา...';

    // 2. ตั้งค่าหลอดวิ่งใหม่
    timerBar.style.transition = 'none'; // ปิด transition ก่อนเพื่อ reset หลอด
    timerBar.style.width = '0%';

    modal.style.display = 'flex';

    // 3. เริ่มนับเวลาใหม่
    setTimeout(() => {
        timerBar.style.transition = 'width 10s linear'; // 👈 ปรับวินาทีให้ตรงกับความต้องการ
        timerBar.style.width = '100%';
    }, 100);

    // 4. เมื่อดูครบกำหนด (เช่น 10 วินาที)
    adTimer = setTimeout(() => {
        canEarnPoint = true;
        closeBtn.style.pointerEvents = 'auto';
        closeBtn.style.opacity = '1';
        statusText.innerText = 'ดูจบแล้ว! กด X เพื่อรับแต้มและปิด';
    }, 10000); // 10000ms = 10 วินาที
}

async function closeAd() {
    // 0. ค่าปุ่มปิด
    const closeBtn = document.getElementById('close-ad-btn');

    // 1. ปิด Modal ทันที
    const adModal = document.getElementById('ad-modal');
    if (adModal) adModal.style.display = 'none';

    // 2. ยกเลิก timer ถ้ายังมี
    if (adTimer) {
        clearTimeout(adTimer);
        adTimer = null;
    }

    // 3. เช็คว่าดูจบจริงไหม และมีข้อมูล User หรือเปล่า
    if (canEarnPoint) {
        const userData = localStorage.getItem('user');
        if (!userData) {
            console.error("❌ ไม่พบข้อมูลผู้ใช้ใน System");
            alert("กรุณาเข้าสู่ระบบใหม่");
            canEarnPoint = false;
            return;
        }

        const user = JSON.parse(userData);
        if (!user.user_id) {
            console.error("❌ ข้อมูล User ID ไม่ถูกต้อง");
            canEarnPoint = false;
            return;
        }

        try {
            const response = await fetch('/api/user/update-ad-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.user_id })
            });

            const result = await response.json();
            if (result.success) {
                console.log("✅ บันทึกความคืบหน้าโฆษณาสำเร็จ!");
                if (typeof loadMissionProgress === 'function') {
                    await loadMissionProgress();
                }
            }
        } catch (err) {
            console.error("❌ เกิดข้อผิดพลาดในการอัปเดตภารกิจ:", err.message);
        }
    } else {
        alert("ยังไม่ครบเวลาโฆษณา กรุณาดูจนเต็มรอบก่อนกด X");
        return;
    }

    canEarnPoint = false;
    closeBtn.style.pointerEvents = 'none';
    closeBtn.style.opacity = '0.4';
}


// --- ส่วนที่ 2: บันทึกและอัปเดตหลอด (แก้ไขจากของเดิมของคุณ) ---
async function doMission(missionId) {
    // ... โค้ด fetch('/api/user/update-mission') เดิมของคุณ ...
    // เมื่อบันทึกสำเร็จ (data.success) ให้เรียก:
    loadMissionProgress(); // เพื่อให้หลอดขยับทันทีไม่ต้อง reload หน้า
}

// --- ส่วนที่ 3: โหลดข้อมูลมาวาดหลอด ---
async function loadMissionProgress() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.user_id) return;

    try {
        const response = await fetch(`/api/user/missions?userId=${user.user_id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json(); 
        
        data.forEach(mission => {
            const card = document.querySelector(`[data-mission-id="${mission.mission_id}"]`);
            if (card) {
                // 1. อัปเดตตัวเลข (0/10)
                const text = card.querySelector('.progress-text');
                if (text) text.innerText = `(${mission.current_progress}/${mission.required_count})`;

                // 2. อัปเดตหลอด
                const fill = card.querySelector('.fill');
                if (fill) {
                    const percent = Math.min((mission.current_progress / mission.required_count) * 100, 100);
                    fill.style.width = percent + '%';
                }

                // 3. 🎯 จัดการปุ่ม (ทำเลย / รับรางวัล)
                const btn = card.querySelector('button'); 
                if (btn) {
                    if (mission.current_progress >= mission.required_count) {
                        btn.innerText = "รับรางวัล";
                        btn.style.backgroundColor = "#28a745"; // สีเขียว
                        btn.style.color = "white";
                        btn.onclick = claimReward; // เปลี่ยนเป็นฟังก์ชันรับเงิน
                    } else {
                        btn.innerText = "ทำเลย";
                        btn.style.backgroundColor = ""; // กลับเป็นสีเดิม
                        // 📢 เช็คชื่อฟังก์ชันให้ตรงกับที่คุณตั้งไว้ (startAd หรือ openAdModal)
                        btn.onclick = () => startAd(); 
                    }
                }
            }
        });
    } catch (err) {
        console.error("❌ Error loading progress:", err);
    }
}

// เพิ่มฟังก์ชันนี้เข้าไปใน missions.js
async function claimReward() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    const response = await fetch('/api/user/claim-reward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.user_id })
    });

    const result = await response.json();
    if (result.success) {
        alert("🎉 ยินดีด้วย! คุณได้รับ 50 เหรียญแล้ว");
        loadMissionProgress(); // โหลดหน้าใหม่เพื่อให้หลอดกลับไปเป็น 0/10
    } else {
        alert(result.message);
    }
}

// และใน loadMissionProgress() ตรงส่วนที่วนลูป data ให้เพิ่มการเช็คปุ่ม:
data.forEach(mission => {
    const card = document.querySelector(`[data-mission-id="${mission.mission_id}"]`);
    if (card) {
        const btn = card.querySelector('button'); // หรือ class ของปุ่มคุณ
        if (mission.current_progress >= mission.required_count) {
            btn.innerText = "รับรางวัล";
            btn.style.backgroundColor = "#28a745"; // เปลี่ยนเป็นสีเขียว
            btn.onclick = claimReward; // เปลี่ยนคำสั่งคลิกเป็นการรับรางวัล
        } else {
            btn.innerText = "ทำเลย";
            btn.onclick = openAdModal; // ให้ดูโฆษณาเหมือนเดิม
        }
    }
});