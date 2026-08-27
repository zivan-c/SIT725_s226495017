/**
 * SIT725 – 5.3D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "Valid Title",
    author: "Valid Author",
    year: 2020,
    genre: "Other",
    summary: "Valid summary text that satisfies your rules.",
    price: "9.99",
    currency: "AUD"
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Title",
    author: "Updated Author",
    year: 2021,
    genre: "Other",
    summary: "Updated summary text.",
    price: "10.50",
    currency: "AUD"
  };
}

// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- T01 Valid CREATE ----
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ---- T02 Duplicate ID ----
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ---- T03 Immutable ID ----
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ---- T04 Unknown field CREATE ----
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now()+1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T05 Unknown field UPDATE ----
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  // =====================================
  // STUDENTS MUST ADD ADDITIONAL TESTS
  // =====================================
  //
  // Add tests covering:
  // - REQUIRED
  // - TYPE
  // - BOUNDARY
  // - LENGTH
  // - TEMPORAL
  // - UPDATE_FAIL
  //
  // Each test must include appropriate tags.
  //


 // ---- T06 Missing ID on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 1}`);
    delete book.id;

    await test({
      id: "T06",
      name: "Missing needed ID on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T07 Empty ID on CREATE ----
  await test({
    id: "T07",
    name: "Empty ID does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 2}`),
      id: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });


  // ============================================================
  // TITLE VALIDATION
  // ============================================================

  // ---- T08 Missing title on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 3}`);
    delete book.title;

    await test({
      id: "T08",
      name: "Missing title on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T09 Empty title on CREATE ----
  await test({
    id: "T09",
    name: "Title does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 4}`),
      title: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T10 Whitespace title on CREATE ----
  await test({
    id: "T10",
    name: "Whitespace-only title does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 5}`),
      title: "   "
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T11 Empty title on UPDATE ----
  await test({
    id: "T11",
    name: "Empty title rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      title: ""
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  // ============================================================
  // AUTHOR VALIDATION
  // ============================================================

  // ---- T12 Missing author on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 6}`);
    delete book.author;

    await test({
      id: "T12",
      name: "Missing required author on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T13 Empty author on CREATE ----
  await test({
    id: "T13",
    name: "Empty author does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 7}`),
      author: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T14 Whitespace author on CREATE ----
  await test({
    id: "T14",
    name: "Whitespace-only for author does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 8}`),
      author: "   "
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T15 Empty author on UPDATE ----
  await test({
    id: "T15",
    name: "Empty author field rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      author: ""
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  // ============================================================
  // YEAR VALIDATION
  // ============================================================

  // ---- T16 Missing year on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 9}`);
    delete book.year;

    await test({
      id: "T16",
      name: "Missing year field on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T17 Invalid year type on CREATE ----
  await test({
    id: "T17",
    name: "Invalid data type for year on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 10}`),
      year: "not-a-number"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ---- T18 Negative year on CREATE ----
  await test({
    id: "T18",
    name: "Negative year violates the minimum boundary",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 11}`),
      year: -1
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T19 Future year on CREATE ----
  await test({
    id: "T19",
    name: "Future year violates temporal constraint",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 12}`),
      year: new Date().getFullYear() + 1
    },
    tags: ["CREATE_FAIL", "TEMPORAL", "BOUNDARY"]
  });

  // ---- T20 Negative year on UPDATE ----
  await test({
    id: "T20",
    name: "Negative year rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      year: -1
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ---- T21 Future year on UPDATE ----
  await test({
    id: "T21",
    name: "Future year rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      year: new Date().getFullYear() + 1
    },
    tags: ["UPDATE_FAIL", "TEMPORAL", "BOUNDARY"]
  });

  // ---- T22 Invalid year type on UPDATE ----
  await test({
    id: "T22",
    name: "Invalid year type rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      year: "not-a-number"
    },
    tags: ["UPDATE_FAIL", "TYPE"]
  });


  // ============================================================
  // GENRE VALIDATION
  // ============================================================

  // ---- T23 Missing genre on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 13}`);
    delete book.genre;

    await test({
      id: "T23",
      name: "Missing genre field on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T24 Empty genre on CREATE ----
  await test({
    id: "T24",
    name: "Empty genre does not meet the minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 14}`),
      genre: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T25 Whitespace genre on CREATE ----
  await test({
    id: "T25",
    name: "Whitespace-only genre does not meet the minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 15}`),
      genre: "   "
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T26 Empty genre on UPDATE ----
  await test({
    id: "T26",
    name: "Empty genre rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      genre: ""
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  // ============================================================
  // SUMMARY VALIDATION
  // ============================================================

  // ---- T27 Missing summary on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 16}`);
    delete book.summary;

    await test({
      id: "T27",
      name: "Missing summary field on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T28 Empty summary on CREATE ----
  await test({
    id: "T28",
    name: "Empty summary does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 17}`),
      summary: ""
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T29 Whitespace summary on CREATE ----
  await test({
    id: "T29",
    name: "Whitespace-only summary does not meet minimum length",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 18}`),
      summary: "   "
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });

  // ---- T30 Empty summary on UPDATE ----
  await test({
    id: "T30",
    name: "Empty summary rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      summary: ""
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  // ============================================================
  // PRICE VALIDATION
  // ============================================================

  // ---- T31 Missing price on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 19}`);
    delete book.price;

    await test({
      id: "T31",
      name: "Missing price field on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }

  // ---- T32 Negative price on CREATE ----
  await test({
    id: "T32",
    name: "Negative price does not meet minimum boundary",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 20}`),
      price: "-5.00"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });

  // ---- T33 Invalid price type/value on CREATE ----
  await test({
    id: "T33",
    name: "Invalid price data type rejected on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 21}`),
      price: "not-a-number"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });

  // ---- T34 Negative price on UPDATE ----
  await test({
    id: "T34",
    name: "Negative price rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      price: "-10.00"
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });

  // ---- T35 Invalid price value on UPDATE ----
  await test({
    id: "T35",
    name: "Invalid price value rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      price: "not-a-number"
    },
    tags: ["UPDATE_FAIL", "TYPE"]
  });


  // ============================================================
  // CURRENCY VALIDATION
  // ============================================================

  // ---- T36 Missing currency on CREATE ----
  {
    const book = makeValidBook(`b${Date.now() + 22}`);
    delete book.currency;

    await test({
      id: "T36",
      name: "Missing currency field on CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body: book,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }


  // ============================================================
  // ADDITIONAL UPDATE VALIDATION
  // ============================================================

  // ---- T37 Immutable ID on UPDATE ----
  await test({
    id: "T37",
    name: "ID cannot be changed on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      id: "different-id"
    },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });


  // ---- T38 Unknown field CREATE ----
  await test({
    id: "T38",
    name: "Unknown field rejected on CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now() + 23}`),
      hack: true
    },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T39 Unknown field UPDATE ----
  await test({
    id: "T39",
    name: "Unknown field rejected on UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      hack: true
    },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}



run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
