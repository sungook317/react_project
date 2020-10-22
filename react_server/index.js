const express = require('express'); // express 라이브러리를 가져옴(import)

const app = express(); // express 객체 생성
const port = process.env.PORT || 5000; // 5000번 포트를 사용하기 위한 코드

// 테스트를 하기 위해 생성하는 데이터
const data = [
    {
        id : 1,
        content : 'html',
        desc : 'html is hyper text markup language ....'
    }
    ,
    {
        id: 2,
        content : 'css',
        desc : 'css is ....'
    }
];

// 함수 선언(function)
app.get('/api/todo', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

// node index.js 로 실행한 후 무중단 서비스는 PM2 참고(서버 실행중에도 코드 수정 및 자동 반영 가능)