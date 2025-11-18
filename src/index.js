import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs"; // WAJIB ADA

// ===== ROUTES =====
import authRoutes from "./routes/auth.js";
import pengaduanRoutes from "./routes/pengaduan.js";
import adminRoutes from "./routes/admin.js";
import masterRoutes from "./routes/master.js";
import kategoriRoutes from "./routes/kategori.js";
import fileRoutes from "./routes/file.js";
import dashboardRoutes from "./routes/dashboard.js";
import notifikasiRoutes from "./routes/notifikasi.js";
import pengumumanRoute from "./routes/pengumumanRoute.js";

import prisma from "./utils/prisma.js";
import config from "./config/index.js";

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// 🕵️‍♂️ DEBUGGER GAMBAR (Kode Khusus untuk Melacak Error)
// ============================================================
app.get("/uploads/:filename", (req, res) => {
  const rawFilename = req.params.filename;
  const decodedFilename = decodeURIComponent(rawFilename); // Ubah %20 jadi spasi

  console.log("\n--- 🔍 DEBUG REQUEST GAMBAR ---");
  console.log("1. URL Request:", rawFilename);
  console.log("2. Nama File Asli:", decodedFilename);

  // Cek Path Public
  const pathPublic = path.join(process.cwd(), "public", "uploads", decodedFilename);
  const existPublic = fs.existsSync(pathPublic);
  console.log(`3. Cek di Public: ${pathPublic}`);
  console.log(`   > Status: ${existPublic ? "✅ ADA" : "❌ TIDAK ADA"}`);

  if (existPublic) {
    return res.sendFile(pathPublic);
  }

  // Cek Path Root (Uploads biasa)
  const pathRoot = path.join(process.cwd(), "uploads", decodedFilename);
  const existRoot = fs.existsSync(pathRoot);
  console.log(`4. Cek di Root:   ${pathRoot}`);
  console.log(`   > Status: ${existRoot ? "✅ ADA" : "❌ TIDAK ADA"}`);

  if (existRoot) {
    return res.sendFile(pathRoot);
  }

  console.log("---------------------------------\n");
  return res.status(404).send("File tidak ditemukan di server (Cek Terminal).");
});
// ============================================================


// 3. Fallback Static Files
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

// ===== REAL ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/pengaduan", pengaduanRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifikasi", notifikasiRoutes);
app.use("/api/pengumuman", pengumumanRoute);

console.log("\n🔍 Registered Routes Loaded.");

// ===== PRISMA =====
prisma.$connect().then(() => console.log("✅ Prisma connected successfully"));

// ===== RUN SERVER =====
app.listen(config.port, () =>
  console.log(`🔥 Server running on PORT ${config.port}`)
);