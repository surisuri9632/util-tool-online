const express = require('express');
const router = express.Router();
const { parseString } = require('xml2js');

// 메인 페이지
router.get('/', (req, res) => {
  res.render('index', { title: '개발자 도구 모음' });
});


//#region JSON Formatter 페이지
// JSON Formatter 페이지
router.get('/json-formatter', (req, res) => {
  res.render('json-formatter', { title: 'JSON Formatter', formattedJSON: null, error: null });
});

router.post('/json-formatter', (req, res) => {
  const userInput = req.body.jsonInput;
  let formattedJSON = null;
  let error = null;

  try {
    const parsedJSON = JSON.parse(userInput);
    formattedJSON = JSON.stringify(parsedJSON, null, 2); // JSON 포매팅
  } catch (err) {
    error = '유효하지 않은 JSON 형식입니다.';
  }

  res.render('json-formatter', { title: 'JSON Formatter', formattedJSON, error });
});

//#endregion

//#region Base64 Encoder and Decoder 페이지
// Base64 Encoder and Decoder 페이지
router.get('/base64', (req, res) => {
  res.render('base64', { title: 'Base64 Encoder & Decoder', result: null, error: null });
});

router.post('/base64', (req, res) => {
  const { text, mode } = req.body;
  let result = null;
  let error = null;

  try {
    if (mode === 'encode') {
      result = Buffer.from(text).toString('base64'); // Base64 인코딩
    } else if (mode === 'decode') {
      result = Buffer.from(text, 'base64').toString('utf8'); // Base64 디코딩
    } else {
      error = '올바른 동작 모드를 선택하세요.';
    }
  } catch (err) {
    error = 'Base64 처리 중 오류가 발생했습니다. 입력값을 확인해주세요.';
  }

  res.render('base64', { title: 'Base64 Encoder & Decoder', result, error });
});

//#endregion

//#region XML to JSON 페이지
// XML to JSON 페이지
router.get('/xml-to-json', (req, res) => {
  res.render('xml-to-json', { title: 'XML to JSON Converter', result: null, error: null });
});

router.post('/xml-to-json', (req, res) => {
  const xmlInput = req.body.xmlInput;
  let result = null;
  let error = null;

  try {
    parseString(xmlInput, (err, jsonResult) => {
      if (err) {
        error = '유효하지 않은 XML 형식입니다.';
        res.render('xml-to-json', { title: 'XML to JSON Converter', result: null, error });
      } else {
        result = JSON.stringify(jsonResult, null, 2); // JSON 데이터 변환 및 포매팅
        res.render('xml-to-json', { title: 'XML to JSON Converter', result, error: null });
      }
    });
  } catch (err) {
    error = 'XML 변환 중 오류가 발생했습니다.';
    res.render('xml-to-json', { title: 'XML to JSON Converter', result: null, error });
  }
});

//#endregion

//#region URL Escape / Unescape 페이지
// URL Escape / Unescape 페이지
router.get('/url-escape-unescape', (req, res) => {
  res.render('url-escape-unescape', { title: 'URL Escape / Unescape Converter', result: null, error: null });
});

router.post('/url-escape-unescape', (req, res) => {
  const { text, mode } = req.body;
  let result = null;
  let error = null;

  try {
    if (mode === 'escape') {
      result = encodeURIComponent(text); // URL Escape
    } else if (mode === 'unescape') {
      result = decodeURIComponent(text); // URL Unescape
    } else {
      error = '올바른 동작 모드를 선택하세요.';
    }
  } catch (err) {
    error = '입력값 처리 중 오류가 발생했습니다.';
  }

  res.render('url-escape-unescape', { title: 'URL Escape / Unescape Converter', result, error });
});

//#endregion

//#region 글자수 세기 페이지
// 글자수 세기 페이지
router.get('/word-counter', (req, res) => {
  res.render('word-counter', { title: '글자수 세기 도구', text: null, charCount: null, withoutSpacesCount: null, wordCount: null, lineCount: null });
});

router.post('/word-counter', (req, res) => {
  const text = req.body.text || '';
  
  // 계산 로직
  const charCount = text.length; // 전체 글자 수
  const withoutSpacesCount = text.replace(/\s+/g, '').length; // 띄어쓰기를 제외한 글자 수
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length; // 단어 수
  const lineCount = text.split(/\r\n|\r|\n/).length; // 라인 수

  res.render('word-counter', { title: '글자수 세기 도구', text, charCount, withoutSpacesCount, wordCount, lineCount });
});

//#endregion

//#region 소문자를 대문자로 변환하는 페이지
// 소문자를 대문자로 변환하는 페이지
router.get('/to-uppercase', (req, res) => {
  res.render('to-uppercase', { title: '소문자 -> 대문자 변환 도구', text: null, result: null });
});

router.post('/to-uppercase', (req, res) => {
  const text = req.body.text || '';
  const result = text.toUpperCase(); // 소문자를 대문자로 변환
  res.render('to-uppercase', { title: '소문자 -> 대문자 변환 도구', text, result });
});

//#endregion

//#region 대문자를 소문자로 변환하는 페이지
// 대문자를 소문자로 변환하는 페이지
router.get('/to-lowercase', (req, res) => {
  res.render('to-lowercase', { title: '대문자 -> 소문자 변환 도구', text: null, result: null });
});

router.post('/to-lowercase', (req, res) => {
  const text = req.body.text || '';
  const result = text.toLowerCase(); // 대문자를 소문자로 변환
  res.render('to-lowercase', { title: '대문자 -> 소문자 변환 도구', text, result });
});

//#endregion

//#region 입력한 텍스트를 거꾸로 변환하는 페이지
// 입력한 텍스트를 거꾸로 변환하는 페이지
router.get('/reverse-text', (req, res) => {
  res.render('reverse-text', { title: '텍스트 거꾸로 변환 도구', text: null, result: null });
});

router.post('/reverse-text', (req, res) => {
  const text = req.body.text || '';
  const result = text.split('').reverse().join(''); // 텍스트를 뒤집음
  res.render('reverse-text', { title: '텍스트 거꾸로 변환 도구', text, result });
});

//#endregion

//#region XML to XSD

router.get('/xml-to-xsd', (req, res) => {
  res.render('xml-to-xsd', { title: 'XML to XSD Converter', text: null, result: null, error: null });
});

router.post('/xml-to-xsd', (req, res) => {
  const xmlInput = req.body.text || '';
  let result = '';
  let error = '';

  // XML to XSD 변환 로직
  try {
    parseString(xmlInput, (err, parsedXML) => {
      if (err) {
        error = '유효하지 않은 XML 형식입니다.';
        res.render('xml-to-xsd', { title: 'XML to XSD Converter', text: xmlInput, result: null, error });
      } else {
        // XML 데이터를 기반으로 XSD 생성 (간단히 루프 구현)
        result = generateXSD(parsedXML);
        res.render('xml-to-xsd', { title: 'XML to XSD Converter', text: xmlInput, result, error: null });
      }
    });
  } catch (e) {
    error = '변환 중 오류가 발생했습니다.';
    res.render('xml-to-xsd', { title: 'XML to XSD Converter', text: xmlInput, result: null, error });
  }
});

// 간단한 XML -> XSD 변환 함수
function generateXSD(parsedXML) {
  let xsd = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xsd += '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n';

  function traverse(obj, parentTag) {
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        xsd += `  <xs:element name="${key}" type="xs:string" />\n`;
        value.forEach(child => {
          if (typeof child === 'object') {
            traverse(child, key);
          }
        });
      } else if (typeof value === 'object') {
        xsd += `  <xs:complexType name="${parentTag}">\n`;
        traverse(value, key);
        xsd += `  </xs:complexType>\n`;
      } else {
        xsd += `  <xs:element name="${key}" type="xs:string" />\n`;
      }
    });
  }

  traverse(parsedXML, 'Root');
  xsd += '</xs:schema>';
  return xsd;
}

//#endregion


module.exports = router;
