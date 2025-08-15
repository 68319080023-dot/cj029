document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('mainCarousel');
    const navbar = document.getElementById('mainNavbar');

    // ฟังก์ชันสำหรับกำหนดสีพื้นหลังของ Navbar
    function updateNavbarColor() {
        const activeItem = carousel.querySelector('.carousel-item.active img');
        if (activeItem) {
            const imgUrl = activeItem.src;
            // สร้าง Image Object เพื่อดึงค่าสีเฉลี่ยจากภาพ
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imgUrl;

            img.onload = function () {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(img);
                // กำหนดสีพื้นหลัง Navbar ด้วยค่าสีที่ได้
                // พร้อมความโปร่งใสเล็กน้อย (เช่น 0.8)
                navbar.style.backgroundColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.8)`;
                navbar.style.color = 'black'; // ตั้งค่าสีตัวอักษรให้ชัดเจน
            };
        }
    }

    // ตรวจจับเมื่อ Carousel เลื่อน
    carousel.addEventListener('slid.bs.carousel', updateNavbarColor);

    // เรียกใช้งานครั้งแรกเมื่อโหลดหน้า
    updateNavbarColor();

    // เมื่อเลื่อนหน้า (scroll) ให้ navbar กลับมามีสีขาวทึบ
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // เปลี่ยนค่า 50 เป็นระยะที่คุณต้องการ
            navbar.classList.add('navbar-scrolled');
            navbar.style.backgroundColor = ''; // ลบ style inline ออก
        } else {
            navbar.classList.remove('navbar-scrolled');
            updateNavbarColor(); // กลับไปใช้สีจาก carousel
        }
    });
});