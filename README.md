# TravelScheduler 旅遊行程規劃系統

一個讓使用者能與家人或朋友建立群組，共同規劃未來旅遊行程的網頁應用程式。

## 功能介紹

- 使用 Google 帳號登入
- 建立群組，邀請家人或朋友加入
- 在群組內建立旅行計畫
- 透過 Google Maps 搜尋並新增景點至行程
- 為每個景點設定抵達與離開時間
- 查看景點詳細資訊（地址、評分、營業時間）

## 技術架構

| 層級 | 技術 |
|---|---|
| 前端 | React、Vite、Redux、Material UI |
| 後端 | Node.js、Express.js、RESTful API |
| 資料庫 | MySQL |
| 身分驗證 | Firebase（Google OAuth） |
| 地圖服務 | Google Maps JavaScript API（Places、Geocoding） |
| Session 管理 | express-session + MySQL session store |
| 套件管理 | pnpm |

## 前置需求

- Node.js v18 以上
- MySQL 8 以上
- pnpm（`npm install -g pnpm`）
- Firebase 專案（需啟用 Google 登入）
- Google Cloud 專案（需啟用以下 API）
  - Maps JavaScript API
  - Places API
  - Geocoding API

## 安裝與執行

### 1. Clone 專案

```bash
git clone https://github.com/Joshyu891221/TravelScheduler.git
cd TravelScheduler
```

### 2. 建立資料庫

```bash
mysql -u root -p -e "CREATE DATABASE TravelScheduler;"
mysql -u root -p TravelScheduler < sql/TravelScheduler.sql
```

### 3. 設定後端環境變數

在 `/backend/` 建立 `.env` 檔案：

```properties
PORT=3000
SECRET=自訂的隨機密鑰

DB_HOST=127.0.0.1
DB_USER=root
DB_PWD=你的MySQL密碼
DB_PORT=3306
DB_DATABASE=TravelScheduler
```

### 4. 啟動後端

```bash
cd backend
pnpm install
pnpm start
```

### 5. 設定前端環境變數

在 `/frontend/` 建立 `.env.local` 檔案：

```properties
VITE_HOST_URL="http://localhost:3000"
```

在 `/frontend/src/` 建立 `firebase.js`（填入你的 Firebase 專案設定）：

```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "你的apiKey",
  authDomain: "你的authDomain",
  projectId: "你的projectId",
  storageBucket: "你的storageBucket",
  messagingSenderId: "你的messagingSenderId",
  appId: "你的appId"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provide = new GoogleAuthProvider();
```

在 `/frontend/` 建立 `config.js`（填入你的 Google Maps API 金鑰）：

```js
window.REACT_APP_API_KEY = "你的Google Maps API金鑰";
```

### 6. 啟動前端

```bash
cd frontend
pnpm install
pnpm run dev
```

開啟瀏覽器前往 `http://localhost:5173`

## API 文件

詳見 [APIDOC.md](APIDOC.md)
