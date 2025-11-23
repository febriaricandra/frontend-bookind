# Migrasi Endpoint Upload File dari Next.js ke Express + TypeScript

## 1. Instalasi Dependency

```bash
npm install express multer @aws-sdk/client-s3 dotenv
npm install --save-dev typescript @types/express @types/multer
```

## 2. Setup AWS S3 Client (R2 Compatible)

`src/utils/r2Client.ts`
```typescript
import { S3Client } from '@aws-sdk/client-s3';

export const r2 = new S3Client({
  region: process.env.R2_REGION,
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});
```

## 3. Setup Multer untuk File Upload

`src/middleware/upload.ts`
```typescript
import multer from 'multer';
export const upload = multer({ storage: multer.memoryStorage() });
```

## 4. Implementasi Endpoint Upload di Express

`src/controllers/uploadController.ts`
```typescript
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2 } from '../utils/r2Client';
import { Request, Response } from 'express';

export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileName = `${Date.now()}-${file.originalname}`;
  try {
    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));
    const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;
    return res.status(200).json({ url: publicUrl });
  } catch (error: any) {
    return res.status(500).json({ error: 'Upload failed', details: error?.message || error });
  }
};
```

## 5. Setup Route Express

`src/routes/upload.ts`
```typescript
import { Router } from 'express';
import { upload } from '../middleware/upload';
import { uploadFile } from '../controllers/uploadController';

const router = Router();
router.post('/', upload.single('file'), uploadFile);
export default router;
```

## 6. Integrasi ke Express App

`src/app.ts`
```typescript
// ...existing code...
import uploadRoutes from './routes/upload';
app.use('/api/upload', uploadRoutes);
// ...existing code...
```

## 7. Environment Variable

Tambahkan ke `.env`:
```
R2_REGION=...
R2_ENDPOINT=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...
R2_PUBLIC_URL=...
```

---

# Daftar API Backend BookKind & Migrasi Auth ke JWT

## 1. API yang Perlu Dipersiapkan

### 1.1. Auth & User
- `POST /api/auth/register` — Registrasi user baru
- `POST /api/auth/login` — Login user, return JWT
- `GET /api/auth/profile` — Get profile user (protected, JWT required)
- `PUT /api/auth/profile` — Update profile user (protected)
- `POST /api/auth/logout` — Logout (opsional, bisa di client)

### 1.2. Books
- `GET /api/books` — List semua buku
- `GET /api/books/:id` — Detail buku
- `POST /api/books` — Tambah buku (protected)
- `PUT /api/books/:id` — Edit buku (protected, hanya owner)
- `DELETE /api/books/:id` — Hapus buku (protected, hanya owner)

### 1.3. Transactions
- `POST /api/transactions` — Buat transaksi pembelian/donasi (protected)
- `GET /api/transactions` — List transaksi user (protected)
- `GET /api/transactions/:id` — Detail transaksi (protected)

### 1.4. Reviews
- `POST /api/reviews` — Tambah review (protected)
- `GET /api/reviews/:bookId` — List review buku

### 1.5. Communities
- `GET /api/communities` — List komunitas
- `POST /api/communities` — Buat komunitas (protected)
- `POST /api/communities/:id/join` — Join komunitas (protected)

### 1.6. File Upload
- `POST /api/upload` — Upload file/gambar buku (protected)

---

## 2. Migrasi Auth: Supabase ke JWT

### 2.1. Registrasi & Login
- Saat register/login, generate JWT menggunakan secret backend.
- Simpan JWT di client (localStorage/cookie).

### 2.2. Middleware JWT
- Buat middleware untuk verifikasi JWT di setiap endpoint protected.
- Contoh Express middleware:
  ```typescript
  import jwt from 'jsonwebtoken';
  import { Request, Response, NextFunction } from 'express';

  export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = user;
      next();
    } catch {
      return res.status(403).json({ error: 'Invalid token' });
    }
  }
  ```

### 2.3. Generate JWT saat Login/Register
  ```typescript
  import jwt from 'jsonwebtoken';

  function generateToken(user: any) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
  ```

### 2.4. Protect Endpoint
- Tambahkan middleware `authenticateJWT` di route yang butuh proteksi.

### 2.5. Struktur User di JWT
- Simpan minimal: `id`, `email`, dan role/akses jika perlu.

---

## 3. Environment Variable
Tambahkan ke `.env`:
```
JWT_SECRET=your_jwt_secret
```

---

## 4. Catatan
- Pastikan semua endpoint yang mengubah data user/buku/transaksi menggunakan JWT middleware.
- Untuk logout, cukup hapus JWT di client.
- Untuk refresh token, bisa tambahkan endpoint khusus jika diperlukan.

---

Markdown ini dapat digunakan sebagai referensi migrasi endpoint upload file dari Next.js ke Express + TypeScript serta persiapan API dan migrasi auth ke JWT untuk backend BookKind. Silakan sesuaikan untuk endpoint lain sesuai kebutuhan. Jika butuh contoh kode lebih detail, silakan minta!