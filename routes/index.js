const express = require("express");
const router = express.Router();
const crypto = require("crypto"); // Import the crypto library
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs'); //Import bcrypt library
const { parseString } = require("xml2js");
const { SitemapStream, streamToPromise } = require("sitemap"); // sitemap 생성 라이브러리

// Main page
router.get("/", (req, res) => {
  res.render("index", { title: "UTIL-TOOL-ONLINE" });
});

//#region JSON Formatter page
// JSON Formatter page
router.get("/json-formatter", (req, res) => {
  res.render("json-formatter", {
    title: "JSON Formatter",
    formattedJSON: null,
    error: null,
  });
});

router.post("/json-formatter", (req, res) => {
  const userInput = req.body.jsonInput;
  let formattedJSON = null;
  let error = null;

  try {
    const parsedJSON = JSON.parse(userInput);
    formattedJSON = JSON.stringify(parsedJSON, null, 2); // JSON formatting
  } catch (err) {
    error = "Invalid JSON format.";
  }

  res.render("json-formatter", {
    title: "JSON Formatter",
    formattedJSON,
    error,
  });
});

//#endregion

//#region Base64 Encoder and Decoder page
// Base64 Encoder and Decoder page
router.get("/base64", (req, res) => {
  res.render("base64", {
    title: "Base64 Encoder & Decoder",
    result: null,
    error: null,
  });
});

router.post("/base64", (req, res) => {
  const { text, mode } = req.body;
  let result = null;
  let error = null;

  try {
    if (mode === "encode") {
      result = Buffer.from(text).toString("base64"); // Base64 encoding
    } else if (mode === "decode") {
      result = Buffer.from(text, "base64").toString("utf8"); // Base64 decoding
    } else {
      error = "Please select a valid operation mode.";
    }
  } catch (err) {
    error = "An error occurred during Base64 processing. Please check your input.";
  }

  res.render("base64", { title: "Base64 Encoder & Decoder", result, error });
});

//#endregion

//#region XML to JSON page
// XML to JSON page
router.get("/xml-to-json", (req, res) => {
  res.render("xml-to-json", {
    title: "XML to JSON Converter",
    result: null,
    error: null,
  });
});

router.post("/xml-to-json", (req, res) => {
  const xmlInput = req.body.xmlInput;
  let result = null;
  let error = null;

  try {
    parseString(xmlInput, (err, jsonResult) => {
      if (err) {
        error = "Invalid XML format.";
        res.render("xml-to-json", {
          title: "XML to JSON Converter",
          result: null,
          error,
        });
      } else {
        result = JSON.stringify(jsonResult, null, 2); // JSON data conversion and formatting
        res.render("xml-to-json", {
          title: "XML to JSON Converter",
          result,
          error: null,
        });
      }
    });
  } catch (err) {
    error = "An error occurred during XML conversion.";
    res.render("xml-to-json", {
      title: "XML to JSON Converter",
      result: null,
      error,
    });
  }
});

//#endregion

//#region URL Escape / Unescape page
// URL Escape / Unescape page
router.get("/url-escape-unescape", (req, res) => {
  res.render("url-escape-unescape", {
    title: "URL Escape / Unescape Converter",
    result: null,
    error: null,
  });
});

router.post("/url-escape-unescape", (req, res) => {
  const { text, mode } = req.body;
  let result = null;
  let error = null;

  try {
    if (mode === "escape") {
      result = encodeURIComponent(text); // URL Escape
    } else if (mode === "unescape") {
      result = decodeURIComponent(text); // URL Unescape
    } else {
      error = "Please select a valid operation mode.";
    }
  } catch (err) {
    error = "An error occurred during input processing.";
  }

  res.render("url-escape-unescape", {
    title: "URL Escape / Unescape Converter",
    result,
    error,
  });
});

//#endregion

//#region Word Counter page
// Word Counter page
router.get("/word-counter", (req, res) => {
  res.render("word-counter", {
    title: "Word Counter Tool",
    text: null,
    charCount: null,
    withoutSpacesCount: null,
    wordCount: null,
    lineCount: null,
  });
});

router.post("/word-counter", (req, res) => {
  const text = req.body.text || "";

  // Calculation logic
  const charCount = text.length; // Total character count
  const withoutSpacesCount = text.replace(/\s+/g, "").length; // Character count without spaces
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length; // Word count
  const lineCount = text.split(/\r\n|\r|\n/).length; // Line count

  res.render("word-counter", {
    title: "Word Counter Tool",
    text,
    charCount,
    withoutSpacesCount,
    wordCount,
    lineCount,
  });
});

//#endregion

//#region To Uppercase page
// To Uppercase page
router.get("/to-uppercase", (req, res) => {
  res.render("to-uppercase", {
    title: "To Uppercase Converter",
    text: null,
    result: null,
  });
});

router.post("/to-uppercase", (req, res) => {
  const text = req.body.text || "";
  const result = text.toUpperCase(); // Convert to uppercase
  res.render("to-uppercase", {
    title: "To Uppercase Converter",
    text,
    result,
  });
});

//#endregion

//#region To Lowercase page
// To Lowercase page
router.get("/to-lowercase", (req, res) => {
  res.render("to-lowercase", {
    title: "To Lowercase Converter",
    text: null,
    result: null,
  });
});

router.post("/to-lowercase", (req, res) => {
  const text = req.body.text || "";
  const result = text.toLowerCase(); // Convert to lowercase
  res.render("to-lowercase", {
    title: "To Lowercase Converter",
    text,
    result,
  });
});

//#endregion

//#region Reverse Text page
// Reverse Text page
router.get("/reverse-text", (req, res) => {
  res.render("reverse-text", {
    title: "Reverse Text Converter",
    text: null,
    result: null,
  });
});

router.post("/reverse-text", (req, res) => {
  const text = req.body.text || "";
  const result = text.split("").reverse().join(""); // Reverse the text
  res.render("reverse-text", {
    title: "Reverse Text Converter",
    text,
    result,
  });
});

//#endregion

//#region XML to XSD

router.get("/xml-to-xsd", (req, res) => {
  res.render("xml-to-xsd", {
    title: "XML to XSD Converter",
    text: null,
    result: null,
    error: null,
  });
});

router.post("/xml-to-xsd", (req, res) => {
  const xmlInput = req.body.text || "";
  let result = "";
  let error = "";

  // XML to XSD conversion logic
  try {
    parseString(xmlInput, (err, parsedXML) => {
      if (err) {
        error = "Invalid XML format.";
        res.render("xml-to-xsd", {
          title: "XML to XSD Converter",
          text: xmlInput,
          result: null,
          error,
        });
      } else {
        // XML data-based XSD generation (simple loop implementation)
        result = generateXSD(parsedXML);
        res.render("xml-to-xsd", {
          title: "XML to XSD Converter",
          text: xmlInput,
          result,
          error: null,
        });
      }
    });
  } catch (e) {
    error = "An error occurred during conversion.";
    res.render("xml-to-xsd", {
      title: "XML to XSD Converter",
      text: xmlInput,
      result: null,
      error,
    });
  }
});

// Simple XML -> XSD conversion function
function generateXSD(parsedXML) {
  let xsd = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xsd += '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n';

  function traverse(obj, parentTag) {
    Object.entries(obj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        xsd += `  <xs:element name="${key}" type="xs:string" />\n`;
        value.forEach((child) => {
          if (typeof child === "object") {
            traverse(child, key);
          }
        });
      } else if (typeof value === "object") {
        xsd += `  <xs:complexType name="${parentTag}">\n`;
        traverse(value, key);
        xsd += `  </xs:complexType>\n`;
      } else {
        xsd += `  <xs:element name="${key}" type="xs:string" />\n`;
      }
    });
  }

  traverse(parsedXML, "Root");
  xsd += "</xs:schema>";
  return xsd;
}

//#endregion

//#region RGB Converter
// RGB Color Converter Routes
router.get("/rgb-converter", (req, res) => {
  res.render("rgb-converter", { title: "RGB Color Converter" });
});

router.post("/rgb-converter", (req, res) => {
  const { r, g, b } = req.body;

  //Error Handling for invalid input
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
    return res.render("rgb-converter", {
      title: "RGB Color Converter",
      error: "Invalid RGB values. Please enter numbers between 0 and 255.",
    });
  }

  const hex = rgbToHex(r, g, b);
  const hsl = rgbToHsl(r, g, b);

  res.render("rgb-converter", {
    title: "RGB Color Converter",
    r,
    g,
    b,
    hex,
    hsl,
    error: null,
  });
});

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return { h, s, l };
}

//#endregion

//#region HTML Encode/Decode Routes
// HTML Encode/Decode Routes
router.get("/html-encode-decode", (req, res) => {
  res.render("html-encode-decode", { title: "HTML Encode/Decode" });
});
//#endregion

//#region Timestamp Converter
router.get("/timestamp-converter", (req, res) => {
  res.render("timestamp-converter", { title: "Timestamp Converter" });
});

//#endregion

//#region SHA-1
router.get("/sha1", (req, res) => {
  res.render("sha1", {
    title: "SHA-1 Hash Generator",
    hash: null,
    error: null,
  });
});

router.post("/sha1", (req, res) => {
  const text = req.body["input-text"];
  let hash;
  let error = null;

  try {
    const sha1 = crypto.createHash("sha1");
    sha1.update(text);
    hash = sha1.digest("hex");
  } catch (err) {
    error = "An error occurred. Please try again.";
  }

  res.render("sha1", { title: "SHA-1 Hash Generator", hash, error });
});
//#endregion

//#region SHA-256
router.get("/sha256", (req, res) => {
  res.render("sha256", {
    title: "SHA-256 Hash Generator",
    hash: null,
    error: null,
  });
});

router.post("/sha256", (req, res) => {
  const text = req.body["input-text"];
  let hash;
  let error = null;

  try {
    const sha256 = crypto.createHash("sha256");
    sha256.update(text);
    hash = sha256.digest("hex");
  } catch (err) {
    error = "An error occurred. Please try again.";
  }

  res.render("sha256", { title: "SHA-256 Hash Generator", hash, error });
});
//#endregion

//#region MD5

router.get("/md5", (req, res) => {
  res.render("md5", { title: "MD5 Hash Generator", hash: null, error: null });
});

router.post("/md5", (req, res) => {
  const text = req.body["input-text"];
  let hash;
  let error = null;

  try {
    const md5 = crypto.createHash("md5");
    md5.update(text);
    hash = md5.digest("hex");
  } catch (err) {
    error = "An error occurred. Please try again.";
  }

  res.render("md5", { title: "MD5 Hash Generator", hash, error });
});

//#endregion

//#region HMAC
router.get("/hmac", (req, res) => {
  res.render("hmac", { title: "HMAC Hash Generator", hmac: null, error: null });
});

router.post("/hmac", (req, res) => {
  const data = req.body.data;
  const key = req.body.key;
  const algorithm = req.body.algorithm;
  const outputFormat = req.body.outputFormat;
  let hmac;
  let error = null;

  try {
    const hmacObj = crypto.createHmac(algorithm, key);
    hmacObj.update(data);
    const hmac = hmacObj.digest(outputFormat); // Get the hash value
    res.render("hmac", { title: "HMAC Hash Generator", hmac, error: null });
  } catch (err) {
    console.error("Error generating HMAC:", err); // Log the error for debugging
    error = `An error occurred: ${err.message}`;
    res.render("hmac", { title: "HMAC Hash Generator", hmac: null, error });
  }
});
//#endregion

//#region JWT
router.get("/jwt", (req, res) => {
  res.render("jwt", { title: "JWT Generator", jwt: null, error: null });
});

router.post("/jwt", (req, res) => {
  const header = JSON.parse(req.body.header);
  const payload = JSON.parse(req.body.payload);
  const secret = req.body.secret;
  const algorithm = req.body.algorithm;
  let jwtToken;
  let error = null;

  try {
    jwtToken = jwt.sign(payload, secret, { algorithm, header });
  } catch (err) {
    error = `An error occurred: ${err.message}`;
  }

  res.json({ jwt: jwtToken || null, error: error || null });
});
//#endregion

//#region Sitemap 라우트
// Sitemap 라우트
// Robots.txt 처리
router.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(
    `User-agent: *\nDisallow:\n\nSitemap: https://util-tool-online.com/sitemap.xml`
  );
});

// Sitemap 동적 생성
router.get("/sitemap.xml", async (req, res) => {
  try {
    const hostname = "https://util-tool-online.com";
    const links = [
      { url: "/", changefreq: "monthly", priority: 1.0 }, // 홈페이지
      { url: "/json-formatter", changefreq: "monthly", priority: 0.8 },
      { url: "/base64", changefreq: "monthly", priority: 0.8 },
      { url: "/word-counter", changefreq: "monthly", priority: 0.7 },
      { url: "/xml-to-json", changefreq: "monthly", priority: 0.6 },
      { url: "/xml-to-xsd", changefreq: "monthly", priority: 0.6 },
      { url: "/to-uppercase", changefreq: "monthly", priority: 0.5 },
      { url: "/to-lowercase", changefreq: "monthly", priority: 0.5 },
      { url: "/reverse-text", changefreq: "monthly", priority: 0.5 },
      { url: "/url-escape-unescape", changefreq: "monthly", priority: 0.5 },
      { url: "/rgb-converter", changefreq: "monthly", priority: 0.5 },
      { url: "/html-encode-decode", changefreq: "monthly", priority: 0.5 },
      { url: "/timestamp-converter", changefreq: "monthly", priority: 0.5 },
      { url: "/sha1", changefreq: "monthly", priority: 0.6 },
      { url: "/sha256", changefreq: "monthly", priority: 0.6 },
      { url: "/md5", changefreq: "monthly", priority: 0.6 },
      { url: "/hmac", changefreq: "monthly", priority: 0.6 },
      { url: "/jwt", changefreq: "monthly", priority: 0.6 },
      { url: "/bcrypt", changefreq: "monthly", priority: 0.6 },
      { url: "/loan-calculator", changefreq: "monthly", priority: 0.7 },
      
    ];

    const stream = new SitemapStream({ hostname });
    links.forEach((link) => stream.write(link));
    stream.end();

    const sitemap = await streamToPromise(stream).then((data) =>
      data.toString()
    );

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  } catch (err) {
    console.error("Sitemap 생성 실패:", err);
    res.status(500).end();
  }
});

module.exports = router;

//#endregion

//#region bycrypt
router.get("/bcrypt", (req, res) => {
  res.render("bcrypt", {
    title: "Bcrypt Hash Generator",
    hash: null,
    error: null,
  });
});

router.post("/bcrypt", async (req, res) => {
  const text = req.body["input-text"];
  const saltRounds = parseInt(req.body["salt-rounds"], 10);
  let hash;
  let error = null;

  if (isNaN(saltRounds) || saltRounds < 8 || saltRounds > 12) {
    error = "Invalid salt rounds. Please select a value between 8 and 12.";
  } else {
    try {
      hash = await bcrypt.hash(text, saltRounds);
    } catch (err) {
      error = "An error occurred. Please try again.";
    }
  }

  res.render("bcrypt", { title: "Bcrypt Hash Generator", hash, error });
});

//#endregion

//#region loan-calculator
router.get("/loan-calculator", (req, res) => {
  res.render("loan-calculator", { title: "Loan Calculator" });
});

router.post("/loan-calculator", (req, res) => {
  const loanAmount = parseFloat(req.body.loanAmount);
  const interestRate = parseFloat(req.body.interestRate) / 100;
  const loanTermYears = parseFloat(req.body.loanTerm);
  const loanTermMonths = parseFloat(req.body.loanTerm); //Loan term is now in months
  const repaymentMethod = req.body.repaymentMethod;
  const gracePeriod = req.body.gracePeriod ? parseInt(req.body.gracePeriod) : 0;
  let results = {};
  let error = null;

  if (
    isNaN(loanAmount) ||
    isNaN(interestRate) ||
    isNaN(loanTermMonths) ||
    loanAmount <= 0 ||
    interestRate <= 0 ||
    loanTermMonths <= 0
  ) {
    error = "Invalid input. Please check your loan details.";
  } else {
    try {
      results = calculateLoan(
        loanAmount,
        interestRate,
        loanTermMonths * 12,
        repaymentMethod,
        gracePeriod
      );
    } catch (err) {
      error = `An error occurred: ${err.message}`;
    }
  }

  res.json({ results, error }); // Send JSON response
});

function calculateLoan(loanAmount, annualInterestRate, loanTermMonths, repaymentMethod, gracePeriod) {
  const monthlyInterestRate = annualInterestRate / 12;
  let results = {};

  switch (repaymentMethod) {
      case "principalAndInterest":
          results = calculatePrincipalAndInterest(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod);
          break;
      case "principalRepayment":
          results = calculatePrincipalRepayment(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod);
          break;
      case "bullet":
          results = calculateBulletPayment(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod);
          break;
      default:
          throw new Error("Invalid repayment method selected.");
  }
  return results;
}

function calculatePrincipalAndInterest(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod) {
  const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths) / (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

  let amortizationSchedule = [];
  let balance = loanAmount;
  for (let i = 1; i <= loanTermMonths; i++) { 
      let payment = i <= gracePeriod ? 0 : monthlyPayment;
      let interest = balance * monthlyInterestRate;
      let principal = payment - interest;
      if (principal < 0) principal = 0;
      let newBalance = balance - principal;
      if (newBalance < 0) newBalance = 0;

      amortizationSchedule.push({
          month: i,
          beginningBalance: balance,
          payment: payment,
          interest: interest,
          principal: principal,
          endingBalance: newBalance
      });
      balance = newBalance;
  }

  return {
      monthlyPayment: monthlyPayment,
      amortizationSchedule: amortizationSchedule
  };
}

function calculatePrincipalRepayment(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod) {
  const monthlyPayment = loanAmount / loanTermMonths;
  let amortizationSchedule = [];
  let balance = loanAmount;
  for (let i = 1; i <= loanTermMonths; i++) { 
      let payment = i <= gracePeriod ? 0 : monthlyPayment;
      let principal = payment;
      let interest = balance * monthlyInterestRate;
      let newBalance = balance - principal;
      if (newBalance < 0) newBalance = 0;

      amortizationSchedule.push({
          month: i,
          beginningBalance: balance,
          payment: payment,
          interest: interest,
          principal: principal,
          endingBalance: newBalance
      });
      balance = newBalance;
  }

  return {
      monthlyPayment: monthlyPayment,
      amortizationSchedule: amortizationSchedule
  };
}

function calculateBulletPayment(loanAmount, monthlyInterestRate, loanTermMonths, gracePeriod) {
  const totalInterest = loanAmount * monthlyInterestRate * (loanTermMonths + gracePeriod);
  const finalPayment = loanAmount + totalInterest;
  let monthlyPayment = 0;
  let amortizationSchedule = [];
  let balance = loanAmount;

  for (let i = 1; i <= loanTermMonths + gracePeriod; i++) {
      let payment = i === loanTermMonths + gracePeriod ? finalPayment : 0;
      let interest = balance * monthlyInterestRate;
      let principal = payment - interest;
      if (principal < 0) principal = 0;
      let newBalance = balance - principal;

      amortizationSchedule.push({
          month: i,
          beginningBalance: balance,
          payment: payment,
          interest: interest,
          principal: principal,
          endingBalance: newBalance
      });
      balance = newBalance;
  }
  return {
      monthlyPayment: monthlyPayment,
      amortizationSchedule: amortizationSchedule
  };
}
//#endregion
module.exports = router;
