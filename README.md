# BookKind - Platform Buku Preloved Inklusif

BookKind adalah platform marketplace untuk buku preloved yang dirancang dengan pendekatan SHARE: **Sustainable**, **Human-centered**, **Accessible**, **Resilient**, dan **Empathetic**.

## 🚀 Fitur Utama

### 🔐 Authentication & User Management
- **Login/Register** dengan email dan password
- **Profile Management** dengan preferensi aksesibilitas
- **Session Management** menggunakan Supabase Auth
- **Protected Routes** dengan middleware

### 📚 Marketplace Features
- **Explore Books** dengan filter dan pencarian canggih
- **Book Details** dengan "Story Behind the Book"
- **Shopping Cart** dengan donasi otomatis
- **Sell Books** dengan upload foto dan cerita
- **Donate Books** untuk Program Buku Berbagi

### ♿ Accessibility Features
- **Dyslexia-friendly Font** (OpenDyslexic)
- **Voice Reader** untuk deskripsi buku
- **Text Scaling** (85% - 135%)
- **High Contrast** dan navigasi keyboard
- **Screen Reader Support**

### 🌱 Sustainability Features
- **Circular Economy** untuk buku preloved
- **Carbon Footprint Tracking** pengiriman
- **Green Logistics** partnership
- **Impact Measurement** dan reporting

### 👥 Community Features
- **Forum Diskusi** dan review buku
- **Book Communities** berdasar kategori
- **Event Calendar** untuk workshop literasi
- **Achievement Badges** dan gamification

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL dengan Row Level Security

## 📦 Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd next-com-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` dan tambahkan Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com)
   - Copy URL dan keys ke `.env.local`
   - Import database schema (akan disediakan)

5. **Run development server**
   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout dengan AuthProvider
│   ├── page.tsx           # Home page
│   └── login/             # Authentication pages
├── components/
│   ├── auth/              # Authentication components
│   │   ├── auth-provider.tsx
│   │   └── auth-form.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── book-kind-app.tsx  # Main application component
├── lib/
│   ├── supabase/          # Supabase client configuration
│   │   ├── client.ts      # Browser client
│   │   ├── server.ts      # Server client
│   │   └── middleware.ts  # Auth middleware
│   └── utils.ts           # Utility functions
└── middleware.ts          # Next.js middleware
```

## 🎯 Key Features Implementation

### Authentication Flow
1. User akses aplikasi
2. Jika belum login → redirect ke AuthForm
3. Login/Register via Supabase Auth
4. Session dikelola dengan middleware
5. Protected routes untuk user actions

### Accessibility Implementation
- **Font Dyslexia**: Toggle OpenDyslexic font
- **Voice Reader**: Web Speech API untuk TTS
- **Text Scaling**: CSS custom properties
- **Keyboard Navigation**: Focus management
- **Screen Reader**: Proper ARIA labels

### Shopping Cart & Donation
- **Add to Cart**: Local state management
- **Donation Slider**: 0-20% dari subtotal
- **Checkout Flow**: Integrasi payment gateway
- **Order Tracking**: Real-time status update

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Basic authentication
- [x] Book marketplace
- [x] Accessibility features
- [x] Shopping cart

### Phase 2 (Next)
- [ ] Supabase database integration
- [ ] Real book data management
- [ ] File upload for book images
- [ ] Payment gateway integration

### Phase 3 (Future)
- [ ] Real-time chat
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] AI-powered book recommendations

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Frontend Developer**: Implementasi UI/UX dan fitur aksesibilitas
- **Backend Developer**: Supabase integration dan API design
- **UX Designer**: Research dan design system
- **Product Manager**: Feature planning dan user stories

---

**BookKind** - *Empowering Stories, Sharing Kindness* 📚✨
