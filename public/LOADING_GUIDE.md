# DooPloen Loading Animation

ระบบอนิเมชั่นโหลดที่สวยงามและใช้งานง่ายสำหรับแอป DooPloen

## 📁 ไฟล์ที่รวมอยู่

```
public/
├── loading.html          # หน้า Loading เฉพาะ (Full Page)
├── demo.html            # สาธิตการใช้งาน
├── css/
│   └── loading.css      # styles สำหรับ loader
└── js/
    └── loading.js       # Controller สำหรับ loader
```

## 🚀 วิธีการเริ่มต้นการใช้งาน

### 1. เพิ่ม CSS และ JS ลงในไฟล์ HTML

```html
<link rel="stylesheet" href="/css/loading.css">
<script src="/js/loading.js"></script>
```

### 2. ใช้งาน Loader ด้วยคำสั่ง

```javascript
// แสดง Loader
DooPloen.show();

// ซ่อน Loader
DooPloen.hide();

// แสดงแล้วซ่อนอัตโนมัติ (3 วินาที)
DooPloen.duration(3000);

// ใช้กับ API Fetch
DooPloen.fetch('/api/endpoint')
  .then(response => response.json())
  .then(data => console.log(data));

// ใช้กับ Promise/Async
DooPloen.waitFor(promise);
```

## 📋 คำสั่งที่มีให้

| คำสั่ง | คำอธิบาย | ตัวอย่าง |
|---------|---------|---------|
| `show()` | แสดง Loader | `DooPloen.show();` |
| `hide()` | ซ่อน Loader | `DooPloen.hide();` |
| `duration(ms)` | แสดงแล้วซ่อนอัตโนมัติ | `DooPloen.duration(2000);` |
| `fetch(url, options)` | ดึงข้อมูล + Loader | `DooPloen.fetch('/api/users')` |
| `waitFor(promise)` | รอ Promise + Loader | `DooPloen.waitFor(asyncTask)` |

## 🎨 ลักษณะการออกแบบ

- **สีหลัก**: `#e63946` (แดง)
- **สีเน้น**: `#d4af37` (ทอง)
- **พื้นหลัง**: `#1a1a2e` ถึง `#16213e` (Gradient สีเข้ม)
- **โลโก้**: DooPloen ที่มีโลโกไตรมความ

## ✨ คุณสมบัติ

- ✅ อนิเมชั่นแบบเรียบและลื่นไหล
- ✅ รองรับ Mobile Responsive
- ✅ Fade In/Out Effects
- ✅ Progress Bar Animation
- ✅ Spinner ที่ซับซ้อน
- ✅ ทำงานกับ Fetch API
- ✅ ทำงานกับ Promise/Async-Await
- ✅ ไม่มี Dependencies ภายนอก

## 👀 ดูตัวอย่าง

เปิดไฟล์ `demo.html` เพื่อดูการสาธิตและทดลองใช้งาน:
```
http://localhost:3000/demo.html
```

## 📚 ตัวอย่างการใช้งาน

### ตัวอย่าง 1: แสดง Loader ขณะโหลดข้อมูล

```javascript
async function loadUsers() {
  DooPloen.show();
  
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
  } finally {
    DooPloen.hide();
  }
}
```

### ตัวอย่าง 2: ซ่อน Loader อัตโนมัติ

```javascript
// แสดง Loader 2 นาที แล้วซ่อนเองโดยอัตโนมัติ
DooPloen.duration(2000);
```

### ตัวอย่าง 3: ใช้ Fetch Helper

```javascript
// ดึงข้อมูลและแสดง Loader อัตโนมัติ
DooPloen.fetch('/api/movies')
  .then(response => response.json())
  .then(data => console.log(data));
```

### ตัวอย่าง 4: ใช้กับ Event

```javascript
document.getElementById('submitBtn').addEventListener('click', async () => {
  DooPloen.show();
  
  // ทำการประมวลผลบางอย่าง
  await processData();
  
  DooPloen.hide();
});
```

## 🔧 การปรับแต่ง

### เปลี่ยนเวลาแอนิเมชั่น

แก้ไขไฟล์ `css/loading.css` และค้นหา:
```css
@keyframes loaderSpin {
  to { transform: rotate(360deg); }
}
```

เปลี่ยน `1.5s` ในการประกาศ `animation`:
```css
animation: loaderSpin 1s linear infinite; /* เร็วขึ้น */
```

### เปลี่ยนสี

แก้ไข CSS variables:
```css
:root {
  --primary-color: #e63946;  /* สีแดง */
  --gold-color: #d4af37;     /* สีทอง */
}
```

## 📱 Responsive Design

- Desktop: Loader size = 120px
- Mobile (< 768px): Loader size = 80px

## 🌐 Browser Support

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 📝 หมายเหตุ

- Loader จะแสดงแบบ Fixed ทั้งหน้าจออพปลิเคชั่น
- สามารถแสดงหลายตัวพร้อมกัน (แต่แนะนำแค่ 1 ตัว)
- Z-index = 9999 (อยู่ด้านบนสุดของหน้า)

## 🎯 Case ใช้งาน

1. **ขณะโหลดหน้า** → `DooPloen.duration(3000)`
2. **ขณะดึงข้อมูล API** → `DooPloen.fetch(url)`
3. **ขณะประมวลผล** → `DooPloen.waitFor(promise)`
4. **ขณะส่งแบบฟอร์ม** → ใช้ `show/hide` ตามเหมาะ

---

🚀 **สร้างโดยระบบ DooPloen Loading Animation** เวอร์ชั่น 1.0
