# Get IT - Admin Dashboard UI

## Giới thiệu

Get IT Admin Dashboard là giao diện quản trị được xây dựng bằng Next.js, được thiết kế để quản lý nền tảng mua bán/rao vặt. Dashboard cung cấp các tính năng quản lý người dùng, bài đăng, báo cáo và phân tích dữ liệu.

## Tính năng chính

- 🔐 Xác thực & Phân quyền

  - Đăng nhập dành cho admin
  - Bảo vệ route với middleware
  - JWT authentication

- 👥 Quản lý người dùng

  - Xem danh sách người dùng
  - Tìm kiếm người dùng
  - Xóa người dùng và dữ liệu liên quan

- 📝 Quản lý bài đăng

  - Xem danh sách bài đăng
  - Tìm kiếm bài đăng
  - Xem chi tiết bài đăng
  - Xóa bài đăng

- 🚩 Quản lý báo cáo

  - Xem danh sách báo cáo vi phạm
  - Lọc báo cáo theo loại
  - Xử lý báo cáo

- 📊 Dashboard & Phân tích
  - Thống kê tổng quan
  - Biểu đồ phân tích theo thời gian
  - Theo dõi hoạt động người dùng

## Tech Stack

### Frontend

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Lucide React (Icons)
- Recharts (Charts)
- React Hook Form + Zod (Form handling)
- Next Themes (Dark/Light mode)

### Backend & Database

- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcrypt (Password hashing)

## Cấu trúc dữ liệu

### User

- Thông tin cơ bản: tên, số điện thoại, mật khẩu
- Vị trí địa lý (geolocation)
- Vai trò (role)
- Trạng thái xác thực

### Post

- Thông tin bài đăng: tiêu đề, mô tả, giá
- Danh mục
- Vị trí
- Hình ảnh
- Trạng thái bài đăng
- Thông tin liên hệ

### Report

- Bài đăng được báo cáo
- Lý do báo cáo
- Người báo cáo

### Conversation & Message

- Chat giữa người mua và người bán
- Lịch sử tin nhắn
- Thông tin bài đăng liên quan

## Cài đặt

1. Clone repository và cài đặt dependencies:

```bash
git clone <repository-url>
cd get-it-admin
pnpm install
```

2. Tạo file .env.local và thêm các biến môi trường:

```bash
MONGO_URI=your_mongodb_uri
MONGO_DB_NAME=your_db_name
THE_SECRET=your_jwt_secret
ACCESS_TOKEN_TTL_NUMBER=4
```

3. Khởi chạy development server:

```bash
pnpm dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

## Đóng góp

Dự án này là một giao diện frontend và có thể được mở rộng thành một ứng dụng fullstack hoàn chỉnh. Mọi đóng góp đều được chào đón!

## License

[MIT License](LICENSE)
