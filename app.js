const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser 설정 (라우터 설정 전에 추가)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 설정
const routes = require('./routes/index');
app.use('/', routes);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
