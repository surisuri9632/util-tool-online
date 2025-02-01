const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sitemap 포함 라우트 설정
const routes = require('./routes/index');
app.use('/', routes);

// 정적 파일 경로 설정 (Sitemap 라우트 뒤에 추가)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
