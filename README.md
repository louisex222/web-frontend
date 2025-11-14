# Frontend Engineer Exam

## 專案簡介
這是一個基於 React 18 的前端工作列表應用程式，提供工作搜尋、篩選、分頁和詳細資訊查看功能。專案使用 Material-UI 作為 UI 框架，並透過 MirageJS 模擬後端 API。

## 技術棧
- **前端框架**: React 18.2.0
- **建置工具**: Vite 5.4.10
- **UI 框架**: Material-UI (MUI) 5.15.4
- **路由管理**: React Router DOM 6
- **API Mock**: MirageJS 0.1.48
- **裝置檢測**: react-device-detect 2.2.3
- **輪播組件**: Swiper 12.0.3

## 環境需求
- Node.js: v20.10.0
- 套件管理工具: Yarn

## 安裝與執行

### 1. 設定 Node 版本
請使用 nvm 進行 node 版本管理：

```bash
nvm use v20.10.0
```

### 2. 安裝相關依賴
```bash
yarn install
```

### 3. 啟動開發伺服器
```bash
yarn start
```

### 4. 建置專案
```bash
yarn build
```

## 專案架構

```
web-frontend/
├── public/                      # 靜態資源目錄
│   ├── favicon.ico             # 網站圖示
│   ├── index.html              # HTML 模板
│   ├── logo192.png             # PWA 圖示 (192x192)
│   ├── logo512.png             # PWA 圖示 (512x512)
│   ├── manifest.json           # PWA 配置檔
│   └── robots.txt              # 搜尋引擎爬蟲設定
│
├── src/                        # 原始碼目錄
│   ├── assets/                 # 靜態資源
│   │   ├── css/
│   │   │   └── reset.css      # CSS 重置樣式
│   │   └── image/             # 圖片資源
│   │       ├── background.jpg  # 背景圖片
│   │       ├── lefteye.png    # 左眼圖示
│   │       ├── righteye.png   # 右眼圖示
│   │       ├── person.png     # 人物圖示
│   │       ├── person-white.png # 人物圖示（白色）
│   │       └── text.png       # 文字圖片
│   │
│   ├── components/             # React 元件
│   │   ├── JobBackGround.js   # 背景元件（含動畫效果）
│   │   ├── JobCard.js         # 工作卡片元件
│   │   ├── JobDetailDialog.js # 工作詳情彈窗元件
│   │   └── JobFilters.js      # 篩選條件元件
│   │
│   ├── constants/              # 常數定義
│   │   ├── educationList.js   # 教育程度列表資料
│   │   ├── jobList.js         # 工作列表資料
│   │   └── salaryList.js      # 薪資範圍列表資料
│   │
│   ├── pages/                  # 頁面元件
│   │   └── JobListPage.js     # 工作列表頁面
│   │
│   ├── services/               # API 服務層
│   │   └── api.js             # API 請求函數封裝
│   │
│   ├── App.js                  # 應用程式主元件
│   └── index.js                # 應用程式入口（含 MirageJS 設定）
│
├── .nvmrc                      # Node 版本設定檔
├── index.html                  # Vite 入口 HTML
├── package.json                # 專案依賴配置
├── vite.config.js              # Vite 建置配置
├── yarn.lock                   # Yarn 鎖定檔
└── README.md                   # 專案說明文件
```

## 核心功能模組

### 1. 路由系統 (`App.js`)
- 使用 React Router DOM 進行路由管理
- 配置 Material-UI 主題（包含主色、次要色、字體等）
- 提供全域 CSS 重置

### 2. API Mock 服務 (`index.js`)
使用 MirageJS 模擬後端 API，提供以下端點：
- `GET /api/v1/jobs` - 取得工作列表（支援篩選與分頁）
- `GET /api/v1/jobs/:id` - 取得單一工作詳情
- `GET /api/v1/educationLevelList` - 取得教育程度選項
- `GET /api/v1/salaryLevelList` - 取得薪資範圍選項

### 3. 頁面元件

#### JobListPage (`pages/JobListPage.js`)
工作列表主頁面，功能包括：
- 工作列表展示（響應式網格佈局）
- 篩選條件（公司名稱、教育程度、薪資範圍）
- 分頁功能（桌面版每頁 6 筆，手機版每頁 4 筆）
- URL 參數同步（支援書籤與分享）
- 載入狀態與錯誤處理
- 響應式設計（桌面版與手機版不同佈局）

### 4. UI 元件

#### JobCard (`components/JobCard.js`)
工作卡片元件，顯示：
- 職位名稱
- 公司名稱
- 工作預覽描述
- 教育程度標籤
- 薪資範圍標籤
- Hover 動畫效果

#### JobFilters (`components/JobFilters.js`)
篩選條件元件，提供：
- 公司名稱搜尋（文字輸入）
- 教育程度篩選（下拉選單）
- 薪資範圍篩選（下拉選單）
- 清除篩選按鈕
- 套用篩選按鈕

#### JobDetailDialog (`components/JobDetailDialog.js`)
工作詳情彈窗元件，顯示：
- 完整工作描述
- 公司照片
- 公司名稱與職位
- 關閉按鈕

#### JobBackGround (`components/JobBackGround.js`)
背景裝飾元件，包含：
- 背景圖片
- 動畫效果（眼睛跟隨滑鼠移動）
- 響應式佈局

### 5. API 服務層 (`services/api.js`)
封裝所有 API 請求：
- `getJobList(params)` - 取得工作列表
- `getEducationLevelList()` - 取得教育程度列表
- `getSalaryLevelList()` - 取得薪資範圍列表
- `getJobDetail(id)` - 取得工作詳情

### 6. 常數資料 (`constants/`)
- `jobList.js` - 工作資料（公司名稱、職位、描述等）
- `educationList.js` - 教育程度選項
- `salaryList.js` - 薪資範圍選項

## 特色功能

### 響應式設計
- 使用 Material-UI 的 Grid 系統
- 透過 `react-device-detect` 偵測裝置類型
- 桌面版與手機版不同的佈局與功能

### URL 狀態管理
- 使用 React Router 的 `useSearchParams`
- 篩選條件與分頁狀態同步至 URL
- 支援書籤與分享功能

### 效能優化
- 使用 `useCallback` 避免不必要的重新渲染
- 圖片資源優化
- Vite 快速建置與熱更新

### 使用者體驗
- 載入狀態提示（CircularProgress）
- 錯誤訊息顯示（Alert）
- 卡片 Hover 動畫效果
- 平滑的頁面過渡

## 開發注意事項

### Vite 配置
- 生產環境 base path: `/web-frontend/`
- 支援 JSX 語法（.js 檔案）
- ESBuild 優化

### Material-UI 主題
- 主色: `#1976d2`
- 次要色: `#dc004e`
- 自訂字體家族

### 分頁設定
- 桌面版: 每頁 6 筆
- 手機版: 每頁 4 筆



