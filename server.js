const express = require('express');
const cors = require("cors");
const path = require("path");
const db = require('./config/db'); // ← เพิ่ม import db

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.static("public")); 

// --- API Routes (ต้องอยู่ก่อน app.listen) ---

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ใช้ API ตัวนี้อันเดียวครับ (ตรงตามโครงสร้าง SQL ของคุณ)
app.post('/api/user/add-coins', async (req, res) => {
    const { userId, amount, source, type, missionId } = req.body;

    // ตรวจสอบข้อมูลเบื้องต้น
    if (!userId) return res.status(400).json({ success: false, message: 'ไม่พบ ID ผู้ใช้' });

    let conn;
    try {
        conn = await db.getConnection(); // มั่นใจว่าตัวแปร db เชื่อมต่อสำเร็จแล้วนะครับ
        await conn.beginTransaction();

        // 1. อัปเดตยอดเหรียญรวม
        await conn.execute(
            'UPDATE user_member SET coin_balance = coin_balance + ? WHERE user_id = ?',
            [amount, userId]
        );

        // 2. บันทึกประวัติ (ตรงตามรูป SQL ของคุณ: user_id, type, amount, source)
        await conn.execute(
            'INSERT INTO coin_transaction (user_id, type, amount, source) VALUES (?, ?, ?, ?)',
            [userId, type || 'earn', amount, source] 
        );

        // 3. ถ้าเป็นภารกิจ ให้บันทึกสถานะ
        if (missionId) {
            await conn.execute(
                'UPDATE mission_progress SET status = "completed" WHERE user_id = ? AND mission_id = ?',
                [userId, missionId]
            );
        }

        await conn.commit();
        res.json({ success: true });

    } catch (error) {
        if (conn) await conn.rollback();
        console.error("SQL Error:", error); 
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (conn) conn.release();
    }
});

// ← เพิ่ม API routes ที่จำเป็นสำหรับ home.html

// API สำหรับโหลดรายการหนัง
app.get('/api/movies', async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const [movies] = await conn.execute('SELECT * FROM content ORDER BY created_at DESC');
        res.json({ success: true, movies });
    } catch (error) {
        console.error("Movies API Error:", error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (conn) conn.release();
    }
});

// API สำหรับตรวจสอบสิทธิ์การเข้าถึง
app.get('/api/check-access/:contentId', async (req, res) => {
    const { contentId } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
        return res.json({ canAccess: false, redirectTo: 'login.html' });
    }

    let conn;
    try {
        conn = await db.getConnection();
        
        // เช็คว่าหนังนี้เป็น VIP หรือไม่
        const [content] = await conn.execute(
            'SELECT is_premium FROM content WHERE content_id = ?',
            [contentId]
        );
        
        if (content.length === 0) {
            return res.json({ canAccess: false, redirectTo: 'packages.html' });
        }
        
        const isPremium = content[0].is_premium;
        
        if (isPremium == 1) {
            // เช็คสิทธิ์ VIP ของผู้ใช้
            const [user] = await conn.execute(
                'SELECT membership_type FROM user_member WHERE user_id = ?',
                [userId]
            );
            
            if (user.length === 0 || user[0].membership_type !== 'vip') {
                return res.json({ canAccess: false, redirectTo: 'packages.html' });
            }
        }
        
        res.json({ canAccess: true });
    } catch (error) {
        console.error("Access Check Error:", error);
        res.status(500).json({ canAccess: false, redirectTo: 'packages.html' });
    } finally {
        if (conn) conn.release();
    }
});

// API สำหรับโหลดตอน
app.get('/api/episodes/:contentId', async (req, res) => {
    const { contentId } = req.params;
    
    let conn;
    try {
        conn = await db.getConnection();
        const [episodes] = await conn.execute(
            'SELECT * FROM episodes WHERE content_id = ? ORDER BY season_id, episode_number',
            [contentId]
        );
        res.json({ success: true, episodes });
    } catch (error) {
        console.error("Episodes API Error:", error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        if (conn) conn.release();
    }
});

// --- สั่งเริ่มทำงาน (ต้องอยู่ล่างสุดเสมอ!) ---
app.listen(3000, () => {
  console.log("Server running on port 3000");
});