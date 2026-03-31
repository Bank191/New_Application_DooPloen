const express = require("express");
const path = require("path");
const axios = require('axios');
const mysql = require('mysql2');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// การเชื่อมต่อ Database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '13717701', // เปลี่ยนเป็นรหัสผ่านของคุณ
    database: 'mysql_nodejs'
});

// ==========================================
// 🔐 ระบบ User & Authentication
// ==========================================

app.post("/api/register", async (req, res) => { // 1. เพิ่มคำว่า async ตรงนี้
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    try {
        const sql = `INSERT INTO users (firstname, lastname, email, password, role, is_active, coin_balance, created_at, updated_at) 
                     VALUES (?, ?, ?, ?, 'user', 1, 0, NOW(), NOW())`;
        
        // 2. ใช้ .promise().query เพื่อให้รอการทำงานเสร็จก่อนไปบรรทัดถัดไป
        const [result] = await db.promise().query(sql, [firstname, lastname, email, password]);
        const newUserId = result.insertId;

        // 3. 🎯 เรียกใช้ภารกิจลงทะเบียน (สมมติว่า ID ภารกิจลงทะเบียนคือ 2)
        // เราจะสร้างฟังก์ชัน triggerRegistration หรือใช้ updateMission ก็ได้
        await triggerRegistrationMission(newUserId);

        res.json({ success: true, message: "ลงทะเบียนและรับรางวัลสมาชิกใหม่สำเร็จ!" });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: "อีเมลนี้ถูกใช้ไปแล้ว" });
        }
        console.error("❌ Register Error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// ฟังก์ชันมอบรางวัลลงทะเบียน (เพิ่มไว้ท้ายไฟล์ index.js)
async function triggerRegistrationMission(userId) {
    const missionId = 2;
    try {
        // ✨ เพิ่มจุดนี้: สร้างข้อมูลระดับสมาชิกเริ่มต้น (Welcome Level)
        // เพื่อให้ user_member ไม่ว่าง และเข้าใช้งานระบบได้
        await db.promise().query(
            "INSERT IGNORE INTO user_member (user_id, member_level_id, total_spending, coin_balance) VALUES (?, 1, 0.00, 0)",
            [userId]
        );

        // บันทึกภารกิจสำเร็จ
        await db.promise().query(
            "INSERT INTO mission_progress (user_id, mission_id, current_progress, status) VALUES (?, ?, 1, '2')",
            [userId, missionId]
        );

        // มอบเหรียญ 50 เหรียญ
        const reward = 50; 
        await db.promise().query(
            "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?",
            [reward, userId]
        );

        // บันทึกประวัติเหรียญ
        await db.promise().query(
            "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'earn', ?, 'รางวัลสมาชิกใหม่')",
            [userId, reward]
        );
        
        console.log(`✅ มอบสิทธิ์สมาชิกและรางวัลให้ User ID: ${userId} เรียบร้อย`);
    } catch (e) {
        console.error("⚠️ Error ในระบบสมาชิกใหม่:", e.message);
    }
}

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT user_id, firstname, role, coin_balance FROM users WHERE email = ? AND password = ? AND is_active = 1";
    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Server Error" });
        if (results.length > 0) {
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        }
    });
});

app.get('/api/user/profile', (req, res) => {
    const userId = req.query.userId;
    db.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ success: false, error: err.message });
        if (results.length === 0) return res.status(404).json({ success: false, error: "ไม่พบผู้ใช้" });
        res.json({ success: true, user: results[0] });
    });
});

// ==========================================
// 💳 ระบบสมัครสมาชิก (Subscription)
// ==========================================

app.post('/api/subscribe', async (req, res) => { 
    const userId = req.body.userId;
    const packageId = req.body.packageId;
    const type = req.body.type || req.body.paymentType; // 'COIN' หรือ 'CASH'

    // ปรับจำนวนเป็นตัวเลขจริงก่อนปัดเศษ
    const rawAmount = parseFloat(req.body.amount) || 0;
    const amount = Math.round(rawAmount); // ปัดเศษให้เป็นจำนวนเต็ม

    // ค่าที่ได้คือ 48.3, 69.3, 118.3, 244.3, 293.3 (จาก frontend) -> ปัดเป็น 48, 69, 118, 244, 293
    const rawBonusCoins = parseFloat(req.body.bonusCoins) || 0;
    const bonusCoins = Math.round(rawBonusCoins); 

    try {
        // 1. เช็กยอดเหรียญล่าสุด
        const [userData] = await db.promise().query(
            "SELECT IFNULL(coin_balance, 0) as coin_balance FROM users WHERE user_id = ?", 
            [userId]
        );

        if (userData.length === 0) {
            return res.status(404).json({ success: false, message: "ไม่พบผู้ใช้" });
        }

        const currentBalance = userData[0].coin_balance;

        // 2. ถ้าใช้เหรียญสมัคร แต่เหรียญไม่พอ
        if (type === 'COIN' && currentBalance < amount) {
            return res.status(400).json({ 
                success: false, 
                message: `เหรียญไม่พอ (คุณมี ${currentBalance} แต่ต้องใช้ ${amount})` 
            });
        }

        // 3. เช็กแพ็กเกจปัจจุบัน
        const [currentSub] = await db.promise().query(
            "SELECT package_id FROM subscription WHERE user_id = ? AND status = 'active'", 
            [userId]
        );

        if (currentSub.length > 0 && currentSub[0].package_id == packageId) {
            return res.status(400).json({ success: false, message: "คุณใช้งานแพ็กเกจนี้อยู่แล้ว" });
        }

        // --- 🔒 เริ่มต้น Transaction ---
        await db.promise().beginTransaction();

        try {
            // 4. กรณีชำระด้วยเหรียญ -> หักเหรียญออกจากระบบ
            if (type === 'COIN') {
                const [updateRes] = await db.promise().query(
                    "UPDATE users SET coin_balance = coin_balance - ? WHERE user_id = ? AND coin_balance >= ?", 
                    [amount, userId, amount]
                );
                
                if (updateRes.affectedRows === 0) {
                    throw new Error("หักเหรียญไม่สำเร็จ ยอดเงินอาจไม่เพียงพอ");
                }

                // บันทึกธุรกรรมการใช้เหรียญ (Spend)
                await db.promise().query(
                    "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'spend', ?, ?)",
                    [userId, amount, `สมัครแพ็กเกจ ID: ${packageId}`]
                );
            }

            // 🌟 5. เพิ่มเหรียญโบนัส (ถ้ามี) - ไม่ว่าจะจ่ายด้วย CASH หรือ COIN
            if (bonusCoins > 0) {
                // 1. อัปเดตตาราง users
                await db.promise().query(
                    "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?", 
                    [bonusCoins, userId]
                );

                // ✅ 2. เพิ่มบรรทัดนี้: อัปเดตตาราง user_member ให้ยอดตรงกัน
                await db.promise().query(
                    "UPDATE user_member SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?", 
                    [bonusCoins, userId]
                );

                // 3. บันทึกธุรกรรมการได้รับเหรียญ (Earn)
                await db.promise().query(
                    "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'earn', ?, ?)",
                    [userId, bonusCoins, `โบนัสจากแพ็กเกจ ID: ${packageId}`]
                );
                
                console.log(`🎁 เติมโบนัส ${bonusCoins} เหรียญให้ User ID: ${userId}`);
            }

            // 6. บันทึก/อัปเดตแพ็กเกจ
            const subSql = `
                INSERT INTO subscription (user_id, package_id, start_date, end_date, status) 
                VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'active')
                ON DUPLICATE KEY UPDATE 
                    package_id = VALUES(package_id),
                    start_date = NOW(),
                    end_date = DATE_ADD(NOW(), INTERVAL 30 DAY),
                    status = 'active'
            `;
            await db.promise().query(subSql, [userId, packageId]);

            // 7. บันทึกประวัติการจ่ายเงินลงตาราง payment
            await db.promise().query(
                "INSERT INTO payment (user_id, type, amount, status) VALUES (?, ?, ?, 'completed')",
                [userId, type, amount]
            );

            // 7.5 สำคัญมาก: อัปเดตยอดใช้จ่ายสะสมใน user_member
            await db.promise().query(
                "UPDATE user_member SET total_spending = total_spending + ? WHERE user_id = ?",
                [amount, userId]
            );

            await db.promise().query(
                "UPDATE users SET coin_balance = coin_balance + ? WHERE user_id = ?", 
                [amount, userId]
            );

            await db.promise().query(
                "UPDATE user_member SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?", 
                [amount, userId]
            );

            // --- ✅ ยืนยันทุกอย่างสำเร็จ ---
            await db.promise().commit();

            // 8. อัปเดตเลเวลทันที (ฟังก์ชันนี้จะไปเช็ค total_spending ที่เราเพิ่งอัปเดตไป)
            await updateMemberLevel(userId);

            res.json({ 
                success: true, 
                message: bonusCoins > 0 
                    ? `สมัครสมาชิกสำเร็จ! และได้รับโบนัส ${bonusCoins} เหรียญ` 
                    : "สมัครสมาชิกสำเร็จ!" 
            });

        } catch (innerError) {
            await db.promise().rollback();
            throw innerError;
        }
        
    } catch (error) {
        console.error("❌ Subscribe Error:", error.message);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด: " + error.message });
    }
});

// ==========================================
// 🎬 ระบบจัดการ Content & Movies
// ==========================================

app.get('/api/movies', (req, res) => {
    const sql = `
        SELECT 
            content_id, 
            title, 
            description,
            type,
            release_year,
            -- 1. เติม URL ให้รูปภาพ
            CONCAT('https://image.tmdb.org/t/p/w500', poster_path) AS poster_path,
            -- 2. ส่งค่าว่างหลอกแทนคอลัมน์ที่ลบไป เพื่อให้ Frontend ไม่ Error
            '' AS video_url, 
            -- 3. เพิ่มค่าเหล่านี้เข้าไป (หน้าบ้านมักจะใช้เช็คป้าย FREE/VIP)
            0 AS is_premium, 
            1 AS is_free_trial,
            status
        FROM content 
        WHERE status = 'active'
        ORDER BY content_id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ SQL Error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        
        // ถ้าไม่มีข้อมูล ให้ส่ง Array ว่าง (ป้องกันหน้าบ้านค้าง)
        if (!results || results.length === 0) {
            return res.json([]); 
        }

        res.json(results);
    });
});

app.get("/api/check-access/:contentId", async (req, res) => {
    const { userId } = req.query; 
    const { contentId } = req.params;

    // ถ้าไม่มี userId ส่งมา ให้เด้งไปหน้าแพ็กเกจก่อนเลย
    if (!userId || userId === 'null' || userId === 'undefined') {
        return res.json({ canAccess: false, redirectTo: 'packages.html', message: 'กรุณาเข้าสู่ระบบ' });
    }

    try {
        // 1. เช็คว่าหนังเรื่องนี้เป็น Premium ไหม?
        const [contentResult] = await db.promise().query(
            "SELECT is_premium FROM content WHERE content_id = ?", 
            [contentId]
        );

        if (contentResult.length === 0) {
            return res.status(404).json({ success: false, message: "ไม่พบเนื้อหา" });
        }

        // ถ้าไม่ใช่ Premium (is_premium = 0) ให้ดูได้เลย
        if (contentResult[0].is_premium === 0) {
            return res.json({ canAccess: true });
        }

        // 2. ถ้าเป็น Premium -> เช็คสถานะ Subscription ของ User
        const subSql = `
            SELECT * FROM subscription 
            WHERE user_id = ? AND status = 'active' AND end_date >= NOW()
        `;
        const [subResult] = await db.promise().query(subSql, [userId]);

        if (subResult.length > 0) {
            // มีแพ็กเกจที่ยังไม่หมดอายุ
            res.json({ canAccess: true }); 
        } else {
            // ไม่มีแพ็กเกจ หรือหมดอายุแล้ว
            res.json({ canAccess: false, redirectTo: 'packages.html' }); 
        }

    } catch (err) {
        console.error("❌ Check Access Error:", err.message);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการตรวจสอบสิทธิ์" });
    }
});

// 🎬 1. API ดึงรายละเอียดหนังรายเรื่อง + รีวิว (เพิ่มต่อจาก check-access)
async function fetchAndShowReviews(movieId) {
    const display = document.getElementById('display-reviews'); // ตัวที่จะเอาไปโชว์ใน HTML
    if (!display) return;

    try {
        // 🚀 เรียกไปที่ API ที่คุณส่งมาตะกี้เลย
        const res = await fetch(`/api/movie-detail/${movieId}`);
        const data = await res.json();

        if (data.success && data.reviews.length > 0) {
            display.innerHTML = data.reviews.map(r => `
                <div style="background: #1a1a1a; padding: 12px; margin-bottom: 10px; border-radius: 8px; border-left: 3px solid #E50914;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <b style="color: white; font-size: 14px;">${r.firstname}</b>
                        <span style="color: gold; font-size: 12px;">${'⭐'.repeat(r.rating)}</span>
                    </div>
                    <p style="color: #ccc; font-size: 13px; margin: 8px 0 0 0;">${r.review_text}</p>
                </div>
            `).join('');
        } else {
            display.innerHTML = '<p style="color: #555; text-align: center;">ยังไม่มีรีวิวสำหรับเรื่องนี้</p>';
        }
    } catch (err) {
        console.error("❌ โหลดรีวิวไม่สำเร็จ:", err);
    }
}

// ✍️ 2. API สำหรับให้ User ส่งรีวิวใหม่
app.post('/api/add-review', async (req, res) => {
    const { userId, contentId, rating, reviewText } = req.body;
    
    if (!userId || !contentId || !rating) {
        return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบ" });
    }

    try {
        const sql = "INSERT INTO review (user_id, content_id, rating, review_text) VALUES (?, ?, ?, ?)";
        await db.promise().query(sql, [userId, contentId, rating, reviewText]);
        
        res.json({ success: true, message: "บันทึกรีวิวสำเร็จ!" });
    } catch (error) {
        console.error("❌ Add Review Error:", error.message);
        res.status(500).json({ success: false });
    }
});

// ดึงรายชื่อ Season ทั้งหมดของหนัง 1 เรื่อง
app.get('/api/seasons/:contentId', (req, res) => {
    const { contentId } = req.params;
    const sql = `SELECT * FROM season WHERE content_id = ? ORDER BY season_number ASC`;

    db.query(sql, [contentId], (err, results) => {
        if (err) return res.json({ success: false, seasons: [] });
        res.json({ success: true, seasons: results || [] });
    });
});

// แบบที่ 1: รับเฉพาะ contentId (สำหรับดึงทุกตอน)
// ดึงตอนทั้งหมดของหนังเรื่องนั้น
// ดึงตอนทั้งหมดของเรื่อง (รองรับการเรียกแบบ /api/episodes/ID)
app.get('/api/episodes/:contentId', (req, res) => {
    const { contentId } = req.params;
    const sql = 'SELECT * FROM episode WHERE content_id = ? ORDER BY season_id, episode_number';
    db.query(sql, [contentId], (err, results) => {
        if (err) return res.status(500).json({ success: false, episodes: [] });
        res.json({ success: true, episodes: results || [] });
    });
});

// ดึงตอนแยกตามซีซัน (รองรับการเรียกแบบ /api/episodes/ID/SeasonID)
app.get('/api/episodes/:contentId/:seasonId', (req, res) => {
    const { contentId, seasonId } = req.params;
    const sql = 'SELECT * FROM episode WHERE content_id = ? AND season_id = ? ORDER BY episode_number';
    db.query(sql, [contentId, seasonId], (err, results) => {
        if (err) return res.status(500).json({ success: false, episodes: [] });
        res.json({ success: true, episodes: results || [] });
    });
});

// ฟังก์ชันกลางสำหรับ Query (จะได้ไม่ต้องเขียน SQL ซ้ำสองรอบ)
function getEpisodes(contentId, seasonId, res) {
    let sql = 'SELECT episode_id, season_id, content_id, episode_number, title, video_url FROM episode WHERE content_id = ?';
    let params = [contentId];

    if (seasonId) {
        sql += ' AND season_id = ?';
        params.push(seasonId);
    }

    sql += ' ORDER BY episode_number ASC';

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error("❌ SQL Error:", err.message);
            return res.status(500).json({ success: false, episodes: [] });
        }
        res.json({ success: true, episodes: results || [] });
    });
}

// ==========================================
// 🪙 ระบบภารกิจ (Missions)
// ==========================================

app.post('/api/user/add-coins', async (req, res) => {
    // 1. รับค่าและแปลงเป็นตัวเลขทันที (ป้องกัน 100 + "50" = 10050 หรือ NULL)
    const userId = req.body.userId;
    const amount = parseInt(req.body.amount) || 0; 
    const source = req.body.source;
    const type = req.body.type || 'earn';
    const missionId = req.body.missionId;

    if (!userId || amount <= 0) {
        return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบหรือจำนวนเหรียญไม่ถูกต้อง" });
    }

    try {
        // 2. เช็คว่าวันนี้รับไปหรือยัง (ยกเว้นวงล้อ)
        const [rows] = await db.promise().query(
            "SELECT * FROM coin_transaction WHERE user_id = ? AND source = ? AND DATE(created_at) = CURDATE()", 
            [userId, source]
        );

        if (rows.length > 0 && source !== 'lucky_wheel_spin') {
            return res.status(400).json({ success: false, message: 'คุณได้รับเหรียญจากส่วนนี้ไปแล้ววันนี้' });
        }

        // --- 🔒 เริ่ม Transaction เพื่อความแม่นยำ ---
        await db.promise().beginTransaction();

        // 3. อัปเดตเหรียญในตาราง users
        await db.promise().query(
            "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?", 
            [amount, userId]
        );

        // 4. บันทึกประวัติลง coin_transaction
        await db.promise().query(
            "INSERT INTO coin_transaction (user_id, type, amount, source, created_at) VALUES (?, ?, ?, ?, NOW())", 
            [userId, type, amount, source]
        );

        // 5. ถ้าเป็นภารกิจ ให้ปิดสถานะเป็น completed
        if (missionId) {
            await db.promise().query(
                "UPDATE mission_progress SET status = 'completed', current_progress = required_count WHERE user_id = ? AND mission_id = ?", 
                [userId, missionId]
            );
        }

        await db.promise().commit();

        // 6. ดึงเหรียญล่าสุดกลับไปโชว์ที่หน้าเว็บ
        const [userRows] = await db.promise().query("SELECT coin_balance FROM users WHERE user_id = ?", [userId]);
        
        console.log(`✅ เติมเหรียญสำเร็จ: User ${userId} ได้รับ ${amount} เหรียญ`);
        res.json({ success: true, coin_balance: userRows[0].coin_balance });

    } catch (err) {
        await db.promise().rollback();
        console.error("❌ Add Coins Error:", err.message);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด: " + err.message });
    }
});

// ✨ API สำหรับดึง Progress (ปรับปรุงให้รองรับการวาดหลอดสีฟ้า)
// 📺 API สำหรับกดดูโฆษณาจบแล้วบันทึก (บวกแต้ม)
// ✅ แก้ไข/วางทับ เส้นนี้ใน index.js
app.post('/api/user/update-ad-progress', async (req, res) => {
    const { userId } = req.body; // POST ต้องใช้ req.body
    const missionId = 4;

    if (!userId) return res.status(400).json({ success: false, message: "Missing userId" });

    try {
        const [result] = await db.promise().query(`
            UPDATE mission_progress 
            SET current_progress = current_progress + 1 
            WHERE user_id = ? AND mission_id = ? AND current_progress < 10
        `, [userId, missionId]);

        if (result.affectedRows > 0) {
            console.log(`✅ User ${userId} ดูโฆษณาจบเพิ่ม 1 คลิป!`);
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Update failed" });
        }
    } catch (error) {
        console.error("❌ Update Ad Error:", error.message);
        res.status(500).json({ success: false });
    }
});

// 🔍 ท่อขากลับ: ดึงข้อมูลมาวาดหลอด (แก้ Error 404 บรรทัด 341)
app.get('/api/user/missions', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json([]);

    try {
        const [rows] = await db.promise().query(`
            SELECT 
                mp.mission_id, 
                mp.current_progress, 
                m.required_count, 
                m.name 
            FROM mission_progress mp
            JOIN mission m ON mp.mission_id = m.mission_id
            WHERE mp.user_id = ?
        `, [userId]);

        // 📢 แสดงใน Terminal เพื่อเช็คความถูกต้อง
        console.log(`📊 ดึงข้อมูลให้ User ${userId}: พบ ${rows.length} ภารกิจ`);
        
        res.json(rows); // ส่งกลับเป็น JSON เพื่อให้หน้าบ้านเอาไปวาดหลอด
    } catch (error) {
        console.error("❌ Get Missions Error:", error.message);
        res.status(500).json([]);
    }
});

// 💰 API สำหรับกดรับรางวัล 50 เหรียญ
app.post('/api/user/claim-reward', async (req, res) => {
    const { userId } = req.body;
    const missionId = 4; // ID ภารกิจโฆษณา
    const rewardAmount = 50;

    try {
        // 1. เช็คก่อนว่าดูครบ 10 จริงไหม
        const [mission] = await db.promise().query(
            "SELECT current_progress FROM mission_progress WHERE user_id = ? AND mission_id = ?", 
            [userId, missionId]
        );

        if (mission.length > 0 && mission[0].current_progress >= 10) {
            // 2. บวกเหรียญเข้าตาราง user (สมมติชื่อตาราง users และคอลัมน์ coin_balance)
            await db.promise().query(
                "UPDATE users SET coin_balance = coin_balance + ? WHERE user_id = ?", 
                [rewardAmount, userId]
            );

            // 3. รีเซ็ตภารกิจกลับไปเป็น 0 เพื่อให้เริ่มใหม่ (หรือจะตั้ง status เป็น 'completed' ก็ได้)
            await db.promise().query(
                "UPDATE mission_progress SET current_progress = 0 WHERE user_id = ? AND mission_id = ?", 
                [userId, missionId]
            );

            console.log(`🎁 User ${userId} รับรางวัล 50 เหรียญสำเร็จ!`);
            res.json({ success: true, message: "รับรางวัลสำเร็จ!" });
        } else {
            res.status(400).json({ success: false, message: "ยังดูไม่ครบ 10 คลิปนะจ๊ะ" });
        }
    } catch (error) {
        console.error("❌ Claim Reward Error:", error.message);
        res.status(500).json({ success: false });
    }
});

// ==========================================
// 📁 การส่งไฟล์หน้า HTML
// ==========================================

// 1. หน้าแรก (localhost:3000) -> ให้ไปหน้าหนัง (home.html)
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));

// 2. หน้าโปรไฟล์ (localhost:3000/index.html) -> บังคับให้เปิดหน้าโปรไฟล์สีแดง
app.get("/index.html", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));

// 3. หน้าอื่นๆ
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "public", "register.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "public", "login.html")));
app.get("/packages", (req, res) => res.sendFile(path.join(__dirname, "public", "packages.html")));

// 4. สุดท้ายค่อยบอกให้ไปหาไฟล์อื่นๆ (เช่น CSS, รูปภาพ) ในโฟลเดอร์ public
app.use(express.static("public"));

// ==========================================
// 🎁 ระบบสิทธิพิเศษ (Privileges) แยกตามระดับ
// ==========================================

app.get('/api/user/privileges-by-level/:levelId/:userId', (req, res) => {
    const { levelId, userId } = req.params;
    
    // SQL ใหม่: เพิ่มการนับจำนวนที่ User คนนี้เคยแลกไปแล้ว (redeemed_count)
    const sql = `
        SELECT 
            p.privilege_id, p.title, p.partner_name, p.coin_cost, 
            p.image_url, p.total_qty, p.remained_qty, 
            lpm.limit_per_user,
            (SELECT COUNT(*) FROM user_redemptions ur 
             WHERE ur.privilege_id = p.privilege_id AND ur.user_id = ?) as redeemed_count
        FROM privileges p
        JOIN level_privilege_map lpm ON p.privilege_id = lpm.privilege_id
        WHERE lpm.level_id = ?
    `;

    db.query(sql, [userId, levelId], (err, results) => {
        if (err) {
            console.error("❌ SQL Error (Privileges with Count):", err.message);
            return res.status(500).json({ success: false, message: err.message });
        }
        
        res.json({ 
            success: true, 
            privileges: results 
        });
    });
});

// ==========================================
// 👤 ระบบ Profile (ดึงข้อมูลแสดงหน้า Profile)
// ==========================================
// ดึงรายการโปรไฟล์ทั้งหมดของ User คนนี้
// 🔍 1. API สำหรับดึงโปรไฟล์ (GET) - ต้องมี /:userId ต่อท้าย
app.get('/api/profiles/:userId', (req, res) => {
    const userId = req.params.userId;
    // ใช้ชื่อตาราง 'profile' และคอลัมน์ 'name' ตามที่มึงมีใน DB
    const sql = "SELECT profile_id, name, is_kids FROM profile WHERE user_id = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ SQL Error:", err);
            return res.status(500).json({ success: false, error: err.message });
        }
        // สำคัญ: ต้องส่งกลับเป็น Object ที่มี key ชื่อ 'profiles'
        res.json({ success: true, profiles: results });
    });
});

// ➕ API สำหรับสร้างโปรไฟล์ใหม่ (POST)
app.post('/api/profiles', (req, res) => {
    const { user_id, name } = req.body;
    
    // 1. ลอง Console ดูว่าค่ามาถึงหลังบ้านจริงไหม
    console.log("📥 หลังบ้านได้รับ:", { user_id, name });

    const sql = "INSERT INTO profile (user_id, name, is_kids) VALUES (?, ?, 0)";
    
    db.query(sql, [user_id, name], (err, result) => {
        // ❌ ถ้า SQL พัง ต้องส่ง Error กลับไปบอกหน้าบ้านตรงนี้!
        if (err) {
            console.error("❌ SQL Error:", err);
            return res.status(500).json({ success: false, message: "SQL พัง: " + err.message });
        }

        // ✅ ต้องส่ง Success กลับไป "เฉพาะตอนที่" SQL รันผ่านแล้วเท่านั้น!
        console.log("✅ บันทึกลง DB สำเร็จ, ID ที่ได้คือ:", result.insertId);
        res.json({ success: true, message: "สร้างสำเร็จ" });
    });

    // ⛔ ห้ามมี res.json อยู่นอก db.query เด็ดขาด!
});

// 🎨 วิธีแก้เรื่อง CSS (MIME type)
// มึงต้องแน่ใจว่าวางไฟล์ style.css ไว้ในโฟลเดอร์ public และใช้คำสั่งนี้
app.use(express.static('public'));

// ==========================================
// 📺 API สำหรับภารกิจดูโฆษณา (Ads Mission)
// ==========================================

app.post('/api/user/update-mission', async (req, res) => {
    const { userId, missionId } = req.body;
    const requiredCount = 10; // จำนวนครั้งที่ต้องดู
    const rewardAmount = 100; // รางวัลเมื่อทำครบ 10 ครั้ง

    if (!userId || !missionId) {
        return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบถ้วน" });
    }

    try {
        await db.promise().beginTransaction();

        // 1. ดึงข้อมูล Progress ปัจจุบัน (ถ้าไม่มีให้สร้างใหม่)
        const [progressRows] = await db.promise().query(
            "SELECT * FROM mission_progress WHERE user_id = ? AND mission_id = ?",
            [userId, missionId]
        );

        let currentProgress = 0;
        let isCompleted = false;

        if (progressRows.length === 0) {
            // ถ้ายังไม่เคยทำภารกิจนี้ -> สร้างใหม่ (+1 ครั้ง)
            currentProgress = 1;
            await db.promise().query(
                "INSERT INTO mission_progress (user_id, mission_id, current_progress, required_count, status) VALUES (?, ?, 1, ?, '1')",
                [userId, missionId, requiredCount]
            );
        } else {
            // ถ้าเคยทำแล้ว -> เช็คสถานะ
            if (progressRows[0].status === '2') { // ถ้าสำเร็จไปแล้ว (status = '2')
                return res.status(400).json({ success: false, message: "คุณทำภารกิจนี้สำเร็จไปแล้ว" });
            }

            // เพิ่ม Progress (+1 ครั้ง)
            currentProgress = progressRows[0].current_progress + 1;
            await db.promise().query(
                "UPDATE mission_progress SET current_progress = ?, status = '1' WHERE user_id = ? AND mission_id = ?",
                [currentProgress, userId, missionId]
            );
        }

        // 2. เช็คว่าครบ 10 ครั้งหรือยัง
        if (currentProgress >= requiredCount) {
            isCompleted = true;

            // อัปเดตสถานะภารกิจเป็นสำเร็จ (status = '2')
            await db.promise().query(
                "UPDATE mission_progress SET status = '2', current_progress = required_count WHERE user_id = ? AND mission_id = ?",
                [userId, missionId]
            );

            // 🎁 มอบรางวัล (เติมเหรียญโบนัส 100 เหรียญ)
            // เติมทั้ง 2 ตารางเพื่อให้เลขตรงกัน (users และ user_member)
            await db.promise().query(
                "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?",
                [rewardAmount, userId]
            );
            await db.promise().query(
                "UPDATE user_member SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?",
                [rewardAmount, userId]
            );

            // บันทึกธุรกรรมเหรียญ (Earn)
            await db.promise().query(
                "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'earn', ?, 'รางวัลดูโฆษณาครบ 10 ครั้ง')",
                [userId, rewardAmount]
            );
            console.log(`🎁 มอบรางวัลดูโฆษณาครบ 10 ครั้งให้ User ID: ${userId} เรียบร้อย`);
        }

        await db.promise().commit();
        
        console.log(`📺 ดูโฆษณาสำเร็จ: User ${userId} +1 ครั้ง (รวม: ${currentProgress}/10)`);
        res.json({ 
            success: true, 
            current_progress: currentProgress, 
            completed: isCompleted,
            message: isCompleted ? "ภารกิจสำเร็จ!" : "+1 ครั้ง"
        });

    } catch (err) {
        await db.promise().rollback();
        console.error("❌ Update Ad Progress Error:", err.message);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด: " + err.message });
    }
});

// ==========================================
// 🎡 API สำหรับวงล้อเสี่ยงโชค (Spin Wheel)
// ==========================================
app.post('/api/spin-wheel', async (req, res) => {
    // 1. ตรวจสอบว่ามีข้อมูลส่งมาจริงไหม
    const { userId, rewardAmount } = req.body;
    
    if (!userId || rewardAmount === undefined) {
        return res.status(400).json({ success: false, message: "ข้อมูล UserId หรือรางวัลไม่ถูกต้อง" });
    }

    try {
        await db.promise().beginTransaction();

        // 2. อัปเดตเหรียญ (ใช้ IFNULL ป้องกันค่า NULL ใน DB)
        await db.promise().query(
            "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + ? WHERE user_id = ?", 
            [Number(rewardAmount), userId]
        );

        // 3. บันทึกธุรกรรม (เช็คว่าตารางชื่อนี้จริงๆ นะครับ)
        await db.promise().query(
            "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'earn', ?, 'วงล้อนำโชค')", 
            [userId, Number(rewardAmount)]
        );

        // 4. อัปเดตภารกิจ (เรียกฟังก์ชันที่เราเช็คกันเมื่อกี้)
        // มั่นใจนะว่าในตาราง mission มี ID: 1 อยู่แล้ว
        await updateMission(userId, 1); 

        await db.promise().commit();
        
        console.log(`🎡 บันทึกสำเร็จ: User ${userId} ได้รับ ${rewardAmount} เหรียญ`);
        res.json({ success: true, message: "บันทึกรางวัลสำเร็จ" });

    } catch (err) {
        await db.promise().rollback();
        // 🚩 จุดสำคัญ: ถ้า Error ให้ดูที่ Terminal จะเห็นสาเหตุที่แท้จริง
        console.error("❌ Spin Wheel Error Details:", err); 
        res.status(500).json({ success: false, message: "Internal Server Error: " + err.message });
    }
});

// API สำหรับดึงข้อมูลเหรียญและระดับสมาชิก
// แก้ไข API ตัวเดิมให้ส่งข้อมูลครบถ้วนขึ้น
app.get('/api/user-status/:userId', async (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT 
            u.firstname, u.lastname, u.coin_balance,
            IFNULL(um.member_level_id, 1) AS level_id,
            IFNULL(l.name, 'Welcome') AS level_name,
            IFNULL(um.total_spending, 0) AS total_spending
        FROM users u 
        LEFT JOIN user_member um ON u.user_id = um.user_id 
        LEFT JOIN member_level l ON um.member_level_id = l.member_level_id
        WHERE u.user_id = ?`;
    
    try {
        const [results] = await db.promise().query(sql, [userId]);
        if (results.length > 0) {
            res.json({ success: true, ...results[0] });
        } else {
            res.status(404).json({ success: false, message: "ไม่พบข้อมูลผู้ใช้" });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/user/privileges/:userId', (req, res) => {
    const userId = req.params.userId;
    
    // ดึงสิทธิ์ที่ User คนนี้ได้รับ ตาม level_id ของเขา
    const sql = `
        SELECT p.* FROM privileges p
        JOIN level_privilege_map lpm ON p.privilege_id = lpm.privilege_id
        JOIN user_member um ON lpm.level_id = um.member_level_id
        WHERE um.user_id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, privileges: results });
    });
});

app.get('/api/user-status/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT 
            u.firstname, 
            u.lastname, 
            u.coin_balance, 
            u.member_level_id, 
            l.name AS level_name, 
            IFNULL(um.total_spending, 0) AS total_spending
        FROM users u 
        LEFT JOIN user_member um ON u.user_id = um.user_id 
        LEFT JOIN member_level l ON u.member_level_id = l.member_level_id
        WHERE u.user_id = ?`;
    
    db.query(sql, [userId], (err, results) => {
        // 1. แก้ไข Error ให้ส่ง success: false เสมอ
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ 
                success: false, 
                message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล" 
            });
        }
        
        if (results.length > 0) {
            const user = results[0];
            res.json({ 
                success: true,
                firstname: user.firstname,
                lastname: user.lastname,
                coin_balance: user.coin_balance,
                level_id: user.member_level_id,
                level_name: user.level_name || 'Welcome',
                total_spending: user.total_spending
            });
        } else {
            // 2. ถ้าไม่พบผู้ใช้ ก็ต้องมี success: false
            res.json({ 
                success: false, 
                message: "ไม่พบข้อมูลผู้ใช้ในระบบ" 
            });
        }
    });
});

app.post('/api/redeem-privilege', async (req, res) => {
    const { userId, privilegeId } = req.body; // coinCost ไม่ต้องใช้จาก body แล้ว เพราะเราดึงจาก DB

    try {
        // 1. ตรวจสอบระดับสมาชิกปัจจุบัน
        const [userStatus] = await db.promise().query(`
            SELECT u.coin_balance, um.member_level_id 
            FROM users u 
            LEFT JOIN user_member um ON u.user_id = um.user_id 
            WHERE u.user_id = ?`, [userId]);

        if (userStatus.length === 0) return res.status(404).json({ success: false, message: "ไม่พบข้อมูลผู้ใช้" });

        // 2. ตรวจสอบสิทธิ์ตามระดับสมาชิก และดึงโควตา (limit_per_user)
        const [allowed] = await db.promise().query(
            "SELECT limit_per_user FROM level_privilege_map WHERE level_id = ? AND privilege_id = ?",
            [userStatus[0].member_level_id, privilegeId]
        );

        if (allowed.length === 0) {
            return res.status(403).json({ success: false, message: "ระดับสมาชิกของคุณไม่ได้รับสิทธิ์นี้" });
        }

        // --- 🆕 ขั้นตอนที่ 2.5: เช็กว่าเคยแลกไปแล้วหรือยัง? ---
        const [history] = await db.promise().query(
            "SELECT COUNT(*) as count FROM user_redemptions WHERE user_id = ? AND privilege_id = ? AND status = 'used'",
            [userId, privilegeId]
        );

        if (history[0].count >= allowed[0].limit_per_user) {
            return res.status(400).json({ 
                success: false, 
                message: `คุณใช้สิทธิ์ครบ ${allowed[0].limit_per_user} ครั้งแล้ว` 
            });
        }
        // ----------------------------------------------

        // 3. ดึงข้อมูลของรางวัล (ราคาและจำนวนคงเหลือ)
        const [priv] = await db.promise().query("SELECT remained_qty, coin_cost, title FROM privileges WHERE privilege_id = ?", [privilegeId]);

        if (priv.length === 0) return res.status(404).json({ success: false, message: "ไม่พบของรางวัล" });
        if (priv[0].remained_qty <= 0) return res.status(400).json({ success: false, message: "ของรางวัลนี้หมดแล้ว" });

        // 4. ตรวจสอบเหรียญ
        const realCost = priv[0].coin_cost; 
        if (userStatus[0].coin_balance < realCost) {
            return res.status(400).json({ success: false, message: "เหรียญของคุณไม่เพียงพอ" });
        }

        // 5. เริ่ม Transaction (หักเงิน/ลดสิทธิ์/บันทึกประวัติ)
        await db.promise().beginTransaction();

        try {
            // 5.1 หักเหรียญ
            await db.promise().query(
                "UPDATE users SET coin_balance = coin_balance - ? WHERE user_id = ?", 
                [realCost, userId]
            );

            // 5.2 ลดจำนวนของรางวัลคงเหลือ
            await db.promise().query(
                "UPDATE privileges SET remained_qty = remained_qty - 1 WHERE privilege_id = ?", 
                [privilegeId]
            );

            // 5.3 บันทึกประวัติการแลก
            await db.promise().query(
                "INSERT INTO user_redemptions (user_id, privilege_id, status) VALUES (?, ?, 'used')", 
                [userId, privilegeId]
            );

            // 5.4 บันทึกธุรกรรมเหรียญ
            await db.promise().query(
                "INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, 'spend', ?, ?)", 
                [userId, realCost, `แลกรางวัล: ${priv[0].title}`]
            );

            await db.promise().commit();
            res.json({ success: true, message: "แลกสิทธิ์สำเร็จ!" });

        } catch (error) {
            await db.promise().rollback();
            throw error;
        }

    } catch (err) {
        console.error("Redeem Error:", err.message);
        res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในการแลกสิทธิ์" });
    }
});

async function updateMemberLevel(userId) {
    try {
        // 1. ดึงข้อมูลที่จำเป็นจากทั้งสองตาราง
        const [rows] = await db.promise().query(`
            SELECT um.total_spending, u.created_at 
            FROM user_member um 
            JOIN users u ON um.user_id = u.user_id 
            WHERE um.user_id = ?`, [userId]);

        if (rows.length === 0) return;
        
        const total = parseFloat(rows[0].total_spending) || 0;
        const signupDate = new Date(rows[0].created_at);
        const now = new Date();

        // คำนวณวันสมาชิกเพื่อเช็คเงื่อนไข
        const diffTime = Math.max(now - signupDate, 0);
        const daysActive = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // 2. กำหนดระดับตามเกณฑ์จริง (Double Criteria)
        let newLevelId = 1; 
        if (total >= 6399 && daysActive >= 720) newLevelId = 4; // Platinum
        else if (total >= 5099 && daysActive >= 360) newLevelId = 3; // Gold
        else if (total >= 3449 && daysActive >= 180) newLevelId = 2; // Silver

        // 3. 🚩 อัปเดตข้อมูลให้ตรงกันทั้ง 2 ตาราง
        // อัปเดตตาราง user_member
        await db.promise().query(
            "UPDATE user_member SET member_level_id = ? WHERE user_id = ?", 
            [newLevelId, userId]
        );

        // อัปเดตตาราง users
        await db.promise().query(
            "UPDATE users SET member_level_id = ? WHERE user_id = ?", 
            [newLevelId, userId]
        );
        
        console.log(`✅ ข้อมูลตรงกันแล้ว: User ${userId} -> Level ${newLevelId}`);
    } catch (err) {
        console.error("❌ Sync Error:", err.message);
    }
}

// ฟังก์ชันสำหรับเพิ่มความคืบหน้าภารกิจ
async function updateMission(userId, missionId) {
    // 1. ตรวจสอบชื่อตาราง 'mission_progress' ให้ตรงกับในรูป
    const sql = `
        INSERT INTO mission_progress (user_id, mission_id, current_progress, status)
        VALUES (?, ?, 1, '1')
        ON DUPLICATE KEY UPDATE current_progress = current_progress + 1
    `;
    await db.promise().query(sql, [userId, missionId]);

    // 2. เปลี่ยน 'missions' เป็น 'mission' (ตามรูป ER Diagram ของคุณ)
    const [rows] = await db.promise().query(
        "SELECT mp.current_progress, m.required_count FROM mission_progress mp JOIN mission m ON mp.mission_id = m.mission_id WHERE mp.user_id = ? AND mp.mission_id = ?",
        [userId, missionId]
    );
    
    // 3. เช็คค่า ENUM ในตาราง mission_progress คอลัมน์ status
    // ถ้าใน DB ตั้งเป็น ENUM('1','2') ให้ใช้เลข '2' แทนคำว่า 'completed'
    if (rows.length > 0 && rows[0].current_progress >= rows[0].required_count) {
        await db.promise().query(
            "UPDATE mission_progress SET status = '2' WHERE user_id = ? AND mission_id = ?",
            [userId, missionId]
        );
    }
}

// ฟังก์ชันสำหรับภารกิจลงทะเบียน (ทำครั้งเดียวจบ)
async function triggerRegistrationMission(userId) {
    const missionId = 2; 
    try {
        // --- ส่วนที่ 1: บังคับสร้างข้อมูลใน user_member ---
        // มั่นใจนะว่าในตาราง member_level มี ID 1 อยู่แล้ว
        const sqlMember = `
            INSERT INTO user_member (user_id, member_level_id, total_spending, coin_balance) 
            VALUES (?, 1, 0.00, 0)
        `;
        const [memberResult] = await db.promise().query(sqlMember, [userId]);
        console.log("✅ สร้างข้อมูลใน user_member สำเร็จ:", memberResult);

        // --- ส่วนที่ 2: บันทึกภารกิจ ---
        await db.promise().query(
            "INSERT IGNORE INTO mission_progress (user_id, mission_id, current_progress, status) VALUES (?, ?, 1, '2')",
            [userId, missionId]
        );

        // --- ส่วนที่ 3: มอบเหรียญรางวัลในตาราง users ---
        await db.promise().query(
            "UPDATE users SET coin_balance = IFNULL(coin_balance, 0) + 50 WHERE user_id = ?",
            [userId]
        );

    } catch (err) {
        // 🚩 ถ้าไม่เก็บข้อมูล มันจะด่าที่ตรงนี้ครับ!
        console.error("❌ ERROR ใน triggerRegistrationMission:", err.message);
    }
}

// ==========================================
// 🔵 ส่วนที่ 1: API บันทึกประวัติการดู (POST)
// ==========================================
app.post('/api/watch-history', async (req, res) => {
    const { user_id, profile_id, content_id, episode_id, progress_percent } = req.body;

    if (!user_id || !content_id) {
        return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบ" });
    }

    // ใช้คำสั่ง SQL แบบ "ถ้ามีแล้วให้เขียนทับ" (Upsert)
    const sql = `
        INSERT INTO watch_history (user_id, profile_id, content_id, episode_id, progress_percent, is_completed, watched_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
        ON DUPLICATE KEY UPDATE
            episode_id = VALUES(episode_id),
            progress_percent = VALUES(progress_percent),
            is_completed = VALUES(is_completed),
            watched_at = NOW()
    `;

    try {
        const is_completed = progress_percent >= 95 ? 1 : 0;
        await db.promise().query(sql, [user_id, profile_id || null, content_id, episode_id || null, progress_percent || 0, is_completed]);
        res.json({ success: true, message: "บันทึกเรียบร้อย" });
    } catch (err) {
        console.error("❌ Error saving history:", err.message);
        res.status(500).json({ success: false });
    }
});

// ==========================================
// 🔵 ส่วนที่ 2: API ดึงรายการที่ดูค้างไว้ (GET)
// ==========================================
app.get('/api/continue-watching/:userId', async (req, res) => {
    const { userId } = req.params;

    const sql = `
        SELECT h.*, c.title, c.poster_path, e.title as ep_title, e.episode_number
        FROM watch_history h
        JOIN content c ON h.content_id = c.content_id
        LEFT JOIN episode e ON h.episode_id = e.episode_id
        WHERE h.user_id = ?
        ORDER BY h.watched_at DESC
        LIMIT 10
    `;

    try {
        const [results] = await db.promise().query(sql, [userId]);
        res.json({ success: true, history: results });
    } catch (err) {
        console.error("❌ Error fetching history:", err.message);
        res.status(500).json({ success: false });
    }
});

const TMDB_KEY = '2d3377c2f89bb428a540c7ce6515fcd0'; 

// --- ฟังก์ชันดึงหมวดหมู่จาก TMDB ---
async function syncAllGenres() {
    try {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=th`;
        const res = await axios.get(url);
        const genres = res.data.genres;

        for (const g of genres) {
            await db.promise().query(
                "INSERT IGNORE INTO genre (genre_id, name) VALUES (?, ?)",
                [g.id, g.name]
            );
        }
        console.log("✅ Sync หมวดหมู่ (Genres) เรียบร้อย!");
    } catch (err) {
        console.error("❌ Sync Genre พลาด:", err.message);
    }
}

async function syncSuperData() {
    try {
        console.log("⏳ กำลังเริ่มดึงข้อมูล (โหมดประหยัด - ดึงโครงสร้าง TMDB 100%)...");

        const categories = [
            { type: 'movie', url: `https://api.themoviedb.org/3/movie/popular` },
        ];

        for (const cat of categories) {
            const tmdbRes = await axios.get(`${cat.url}?api_key=${TMDB_KEY}&language=th&page=1`);
            const items = tmdbRes.data.results;

            for (const item of items) {
                const title = item.title || item.name;
                const releaseYear = (item.release_date || item.first_air_date || '2024').split('-')[0];

                // 1. ✅ บันทึกลงตาราง content (ตัวหลัก)
                // เพิ่ม video_url เข้าไปใน INSERT เผื่อกรณีหนังที่เคยมีลิงก์อยู่แล้วจะได้ไม่หาย
                await db.promise().query(
                    `INSERT INTO content (content_id, title, description, type, release_year, poster_path, status) 
                     VALUES (?, ?, ?, ?, ?, ?, 'active') 
                     ON DUPLICATE KEY UPDATE 
                        title=VALUES(title), 
                        description=VALUES(description), 
                        poster_path=VALUES(poster_path)`,
                    [item.id, title, item.overview, cat.type, releaseYear, item.poster_path]
                );

                if (cat.type === 'tv') {
                    // --- ส่วนของ TV Series ---
                    const tvDetail = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${TMDB_KEY}&language=th`);
                    
                    for (const s of tvDetail.data.seasons) {
                        if (s.season_number !== 1) continue;

                        // 2. ✅ บันทึก Season
                        const [sResult] = await db.promise().query(
                            `INSERT INTO season (content_id, season_number, title) 
                             VALUES (?, ?, ?) 
                             ON DUPLICATE KEY UPDATE 
                                season_id = LAST_INSERT_ID(season_id), 
                                title = VALUES(title)`,
                            [item.id, s.season_number, s.name || `Season ${s.season_number}`]
                        );
                        
                        const seasonId = sResult.insertId; 
                        const epRes = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}/season/${s.season_number}?api_key=${TMDB_KEY}&language=th`);
                        
                        for (const ep of epRes.data.episodes) {
                            // ใช้ NULL เพื่อประหยัด Quota YouTube (ค่อยมาเติมทีหลังได้)
                            const videoUrl = null; 

                            // 3. ✅ บันทึก Episode (อ้างอิงคอลัมน์ตาม Screenshot ที่คุณเคยส่งมา)
                            await db.promise().query(
                                `INSERT INTO episode (season_id, content_id, episode_number, title, video_url, duration_minutes, is_free_trial) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?) 
                                 ON DUPLICATE KEY UPDATE 
                                    title=VALUES(title),
                                    duration_minutes=VALUES(duration_minutes)`,
                                [
                                    seasonId,           // season_id
                                    item.id,            // content_id
                                    ep.episode_number,  // episode_number
                                    ep.name,            // title
                                    videoUrl,           // video_url (null)
                                    24,                 // duration_minutes
                                    0                   // is_free_trial
                                ]
                            );
                        }
                    }
                } else {
                    // --- ส่วนของ Movie ---
                    // กรณีหนัง เราจะไม่สั่ง UPDATE video_url เป็น NULL ทันที เพื่อป้องกันลิงก์เดิมหาย
                    // แต่ถ้ายังไม่เคยมีคอลัมน์นี้ ข้อมูลก็จะว่างไว้ตามปกติ
                }
                console.log(`✅ ซิงค์โครงสร้างสำเร็จ: ${title}`);
            }
        }
        console.log("🌟 ซิงค์ข้อมูล TMDB ครบถ้วน (ข้ามขั้นตอน YouTube เพื่อความเร็ว)!");
    } catch (error) {
        console.error("❌ เกิดข้อผิดพลาดร้ายแรง:", error.message);
    }
}

// ลองเพิ่มบรรทัดนี้ใน index.js ตรงไหนก็ได้
db.query('SELECT DATABASE() as db_name', (err, rows) => {
   console.log("📍 มึงกำลังใช้ Database ชื่อ:", rows[0].db_name);
});

app.post('/process-payment', (req, res) => {
    const { package_id, amount } = req.body;
    const userId = 1; // สมมติว่าเป็น User ID 1 (ในงานจริงต้องดึงจาก Session)

    // 1. บันทึกลงตาราง payment
    const paymentSql = "INSERT INTO payment (user_id, type, amount, status) VALUES (?, 'QR_PromptPay', ?, 'Success')";
    
    db.query(paymentSql, [userId, amount], (err, result) => {
        if (err) throw err;

        // 2. บันทึกลงตาราง subscription (สมมติว่าต่ออายุ 30 วัน)
        const subSql = "INSERT INTO subscription (user_id, package_id, start_date, end_date, status) VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'Active')";
        
        db.query(subSql, [userId, package_id], (err, subResult) => {
            if (err) throw err;
            
            // เมื่อเสร็จแล้วให้กลับไปหน้าโฮม หรือหน้าโปรไฟล์
            res.redirect('/home.html');
        });
    });
});

// ค้นหาหนัง (ใน server.js)
// ในไฟล์ server.js
// ตัวอย่าง: ถ้าในฐานข้อมูลตารางของคุณจริงๆ ชื่อว่า 'movies'
// แก้ไขใน server.js
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.json([]);
    }

    // เปลี่ยนจาก FROM media เป็น FROM content
    const sql = "SELECT * FROM content WHERE title LIKE ?"; 
    const queryValue = `%${searchTerm}%`;

    db.query(sql, [queryValue], (err, results) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results); // ส่งข้อมูลที่เจอในตาราง content กลับไป
    });
});

// API สำหรับดึงรายละเอียดหนังรายเรื่อง
app.get('/api/movie-detail/:id', (req, res) => {
    const movieId = req.params.id;
    
    // คำสั่ง SQL สำหรับดึงข้อมูลจากตาราง content
    // หากต้องการ URL วิดีโอด้วย อาจต้อง JOIN กับตาราง episode ตาม ER Diagram ของคุณ
    const sql = `
        SELECT c.*, e.video_url 
        FROM content c
        LEFT JOIN episode e ON c.content_id = e.content_id
        WHERE c.content_id = ?
        LIMIT 1
    `;

    db.query(sql, [movieId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Movie not found" });
        }
        res.json(result[0]); // ส่งข้อมูลหนังกลับไปเป็น JSON
    });
});

// การเรียกใช้งานใน Listen
app.listen(port, async () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    try {
        await syncAllGenres(); 
        await syncSuperData(); 
        console.log("🌟 ระบบพร้อมทำงาน ข้อมูลพื้นฐานครบถ้วน!");
    } catch (err) {
        console.error("❌ ล้มเหลวขณะเริ่มต้นระบบ:", err.message);
    }
});