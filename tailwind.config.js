// tailwind.config.js หรือ tailwind.config.cjs

module.exports = {
  content: [
    // ระบุ path ของไฟล์ทั้งหมดที่มีการใช้คลาส Tailwind
    // ในโปรเจกต์ Next.js มักจะเป็นแบบนี้:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '7': '1.75rem', 
        '8': '2.00rem', 
        '9': '2.25rem',
      }
    },
  },
  plugins: [],
}