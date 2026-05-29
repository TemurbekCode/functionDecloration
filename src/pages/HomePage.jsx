import { useState, useEffect } from 'react';
import './HomePage.scss';

const quizQuestions = [
    {
        id: 'q1',
        title: '🧩 Savol 1 / 4',
        question: "Quyidagi kod nima chiqaradi?",
        code: `console.log(salomlash("Vali"));

function salomlash(ism) {
  return "Salom, " + ism;
}`,
        options: [
            { text: 'ReferenceError xatosi', correct: false, feedback: "❌ Xato! Function declaration hoistingga ega, shuning uchun xato chiqmaydi." },
            { text: 'Salom, Vali', correct: true, feedback: "✅ To'g'ri! Function declaration hoistingga ega — e'lon qilishdan oldin chaqirish mumkin." },
            { text: 'undefined', correct: false, feedback: "❌ Xato! undefined chiqmaydi — funksiya to'g'ri ishlaydi." },
            { text: 'null', correct: false, feedback: "❌ Xato! Bu hoisting tufayli ishlaydi." },
        ],
    },
    {
        id: 'q2',
        title: '🧩 Savol 2 / 4',
        question: "Arrow function uchun qaysi ifoda TO'G'RI?",
        options: [
            { text: 'Arrow function hoistingga ega', correct: false, feedback: "❌ Xato! Arrow function hoistingga EGA EMAS." },
            { text: 'Arrow functionda o\'z this\'i bor', correct: false, feedback: "❌ Xato! Arrow functionda o'z this'i bo'lmaydi." },
            { text: 'Callback uchun eng qulay', correct: true, feedback: "✅ To'g'ri! Arrow function callback sifatida — eng qisqa va qulay usul." },
            { text: 'new bilan ishlatiladi', correct: false, feedback: "❌ Xato! Arrow function konstruktor sifatida ishlatilmaydi." },
        ],
    },
    {
        id: 'q3',
        title: '🧩 Savol 3 / 4',
        question: "Quyidagi arrow functionni to'g'ri o'qing — natija nima?",
        code: `const natija = (x) => x * x;
console.log(natija(6));`,
        options: [
            { text: '12', correct: false, feedback: "❌ Xato! 6 * 6 = 36, 12 emas." },
            { text: '36', correct: true, feedback: "✅ To'g'ri! 6 * 6 = 36. Arrow function x ni kvadratga ko'taradi." },
            { text: '66', correct: false, feedback: "❌ Xato! x * x — bu ko'paytirish, qo'shish emas." },
            { text: 'SyntaxError', correct: false, feedback: "❌ Xato! Sintaksis to'g'ri, xato chiqmaydi." },
        ],
    },
    {
        id: 'q4',
        title: '🧩 Savol 4 / 4',
        question: "Function Expression va Function Declaration'ning asosiy farqi nima?",
        options: [
            { text: 'Expression parametr qabul qilmaydi', correct: false, feedback: "❌ Xato! Ikkalasi ham parametr qabul qila oladi." },
            { text: 'Declaration tezroq ishlaydi', correct: false, feedback: "❌ Xato! Tezlik jihatdan farq yo'q." },
            { text: 'Declaration hoistingga ega, Expression emas', correct: true, feedback: "✅ To'g'ri! Declaration hoistingga ega — e'lon qilishdan oldin chaqirish mumkin. Expression esa hoistingga ega emas." },
            { text: 'Expression o\'zgaruvchiga saqlanmaydi', correct: false, feedback: "❌ Xato! Ikkalasi ham o'zgaruvchiga saqlanishi mumkin." },
        ],
    },
];

function HomePage() {
    const [answers, setAnswers] = useState({});

    const copyCode = (text, btnId) => {
        navigator.clipboard.writeText(text).then(() => {
            const button = document.getElementById(btnId);
            if (button) {
                button.textContent = "ko'chirildi!";
                button.style.color = '#34d399';
                setTimeout(() => {
                    button.textContent = 'nusxa';
                    button.style.color = '';
                }, 1800);
            }
        });
    };

    const answerQuestion = (questionId, optionIndex) => {
        if (answers[questionId]) return;
        const question = quizQuestions.find((item) => item.id === questionId);
        const option = question.options[optionIndex];
        setAnswers((prev) => ({
            ...prev,
            [questionId]: {
                selected: optionIndex,
                correct: option.correct,
                message: option.feedback,
            },
        }));
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.reveal');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <section className="hero-page">
                <div className="hero-badge">🎓 Dasturlash kursi · JavaScript · 0-daraja</div>
                <h1 className="hero-title">
                    JavaScript'da<br />
                    <span className="highlight">Funksiyalar</span>
                </h1>
                <p className="hero-sub">
                    Function Declaration, Expression va Arrow — uchala turni sifatdan o'rgan, farqlarini tush va amalda qo'lla.
                </p>

                <div className="hero-chips">
                    <div className="chip c1">⚡ function declaration</div>
                    <div className="chip c2">📦 function expression</div>
                    <div className="chip c3">➡️ arrow function</div>
                </div>

                <div className="hero-mini-code">
                    <div className="dots">
                        <div className="dot r"></div>
                        <div className="dot y"></div>
                        <div className="dot g"></div>
                    </div>
                    <pre>{`// 1. Declaration
function salom(ism) { return "Salom, " + ism; }

// 2. Expression
const salom = function(ism) { return "Salom!"; };

// 3. Arrow
const salom = (ism) => "Salom, " + ism;`}</pre>
                </div>
            </section>

            <main>
                <section className="section reveal" id="declaration">
                    <div className="section-label">
                        <div className="section-num">01</div>
                        <div style={{ width: '3px', height: '1.5rem', background: '#38bdf8', borderRadius: '2px' }} />
                        <h2 className="section-title">Function Declaration</h2>
                    </div>

                    <div className="card blue">
                        <div className="card-header">
                            <div className="card-title">Nima bu?</div>
                            <span className="tag blue">Asosiy tur</span>
                        </div>
                        <p className="card-desc">
                            <strong style={{ color: '#e2e8f0' }}>Function Declaration</strong> — bu JavaScriptda funksiya yaratishning eng klassik usuli. <code style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82em', color: '#38bdf8' }}>function</code> kalit so'zi bilan boshlanadi va funksiyaga nom beriladi. Bu tur boshqa barcha funksiyalardan farqli ravishda <strong style={{ color: '#38bdf8' }}>hoisting</strong> xususiyatiga ega — ya'ni uni e'lon qilishdan oldin ham chaqirish mumkin!
                        </p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-declaration"
                                onClick={() => copyCode(`function qoshish(a, b) {\n  return a + b;\n}\n\nlet natija = qoshish(5, 3);\nconsole.log(natija);`, 'copy-declaration')}
                            >
                                nusxa
                            </button>
                            <pre>{`// Funksiyani e'lon qilish
function qoshish(a, b) {
  return a + b;
}

// Funksiyani chaqirish
let natija = qoshish(5, 3);
console.log(natija); // ➜ 8`}</pre>
                        </div>
                        <div className="alert info">
                            <span className="alert-icon">💡</span>
                            <span><strong>Hoisting nima?</strong> JavaScript kodni o'qishdan oldin barcha function declaration'larni "yuqoriga ko'taradi". Shuning uchun siz funksiyani e'lon qilishdan OLDIN ham uni chaqira olasiz — xato bo'lmaydi!</span>
                        </div>
                    </div>

                    <div className="card blue">
                        <div className="card-header">
                            <div className="card-title">Hoisting — amalda ko'rish</div>
                            <span className="tag blue">Muhim xususiyat</span>
                        </div>
                        <p className="card-desc">Quyidagi kod ishlaydi, chunki <code style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82em', color: '#38bdf8' }}>function declaration</code> hoistingga ega:</p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-hoisting"
                                onClick={() => copyCode(`console.log(salom("Ali"));\n\nfunction salom(ism) {\n  return "Salom, " + ism + "!";\n}`, 'copy-hoisting')}
                            >
                                nusxa
                            </button>
                            <pre>{`// Chaqirish — e'londan OLDIN ✅
console.log(salom("Ali")); // ➜ "Salom, Ali!"

// E'lon — chaqirishdan KEYIN
function salom(ism) {
  return "Salom, " + ism + "!";
}`}</pre>
                        </div>
                        <div className="alert warn">
                            <span className="alert-icon">⚠️</span>
                            <span>Hoisting qulaylik bo'lsa-da, yaxshi kod yozish uchun funksiyalarni ishlatishdan OLDIN e'lon qilish odatini shakllantiring.</span>
                        </div>
                    </div>

                    <div className="card blue">
                        <div className="card-header">
                            <div className="card-title">Amaliy misol — Kalkulyator</div>
                        </div>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-calculator"
                                onClick={() => copyCode(`function ayirish(a, b) {\n  return a - b;\n}\n\nfunction kopaytirish(a, b) {\n  return a * b;\n}\n\nfunction bolish(a, b) {\n  if (b === 0) return \"Nolga bo'lib bo'lmaydi!\";\n  return a / b;\n}\n\nconsole.log(ayirish(10, 4));\nconsole.log(kopaytirish(3, 7));\nconsole.log(bolish(10, 0));`, 'copy-calculator')}
                            >
                                nusxa
                            </button>
                            <pre>{`function ayirish(a, b) {
  return a - b;
}

function kopaytirish(a, b) {
  return a * b;
}

function bolish(a, b) {
  if (b === 0) return "Nolga bo'lib bo'lmaydi!";
  return a / b;
}

console.log(ayirish(10, 4));     // ➜ 6
console.log(kopaytirish(3, 7));  // ➜ 21
console.log(bolish(10, 0));     // ➜ "Nolga bo'lib bo'lmaydi!"`}</pre>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="section reveal" id="expression">
                    <div className="section-label">
                        <div className="section-num">02</div>
                        <div style={{ width: '3px', height: '1.5rem', background: '#818cf8', borderRadius: '2px' }} />
                        <h2 className="section-title">Function Expression</h2>
                    </div>

                    <div className="card purple">
                        <div className="card-header">
                            <div className="card-title">Nima bu?</div>
                            <span className="tag purple">O'zgaruvchiga saqlash</span>
                        </div>
                        <p className="card-desc">
                            <strong style={{ color: '#e2e8f0' }}>Function Expression</strong> — funksiyani o'zgaruvchiga qiymat sifatida saqlaydigan usul. Bu yerda funksiya nom bo'lmasligi ham mumkin (anonymous). Asosiy farq: <strong style={{ color: '#818cf8' }}>hoisting yo'q</strong> — funksiyani e'lon qilishdan oldin chaqira olmaysiz!
                        </p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-expression"
                                onClick={() => copyCode(`const qoshish = function(a, b) {\n  return a + b;\n};\n\nconsole.log(qoshish(4, 6));`, 'copy-expression')}
                            >
                                nusxa
                            </button>
                            <pre>{`// Function Expression — o'zgaruvchiga saqlash
const qoshish = function(a, b) {
  return a + b;
};

console.log(qoshish(4, 6));  // ➜ 10`}</pre>
                        </div>
                        <div className="alert warn">
                            <span className="alert-icon">🚫</span>
                            <span><strong>Hoisting yo'q!</strong> Function Expression e'lon qilishdan OLDIN chaqirilsa — <code style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85em' }}>ReferenceError</code> xatosi chiqadi.</span>
                        </div>
                    </div>

                    <div className="card purple">
                        <div className="card-header">
                            <div className="card-title">Funksiyani argument sifatida berish</div>
                            <span className="tag purple">Callback</span>
                        </div>
                        <p className="card-desc">Function Expression ning kuchli tomoni — uni boshqa funksiyaga <strong style={{ color: '#818cf8' }}>argument (callback)</strong> sifatida berib yuborish mumkin:</p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-callback"
                                onClick={() => copyCode(`const sonlar = [1, 2, 3, 4, 5];\n\nconst ikkilashtir = function(son) {\n  return son * 2;\n};\n\nconst natija = sonlar.map(ikkilashtir);\nconsole.log(natija);  // ➜ [2, 4, 6, 8, 10]`, 'copy-callback')}
                            >
                                nusxa
                            </button>
                            <pre>{`// Massiv elementlarini ikkilashtirish
const sonlar = [1, 2, 3, 4, 5];

const ikkilashtir = function(son) {
  return son * 2;
};

const natija = sonlar.map(ikkilashtir);
console.log(natija);  // ➜ [2, 4, 6, 8, 10]`}</pre>
                        </div>
                    </div>

                    <div className="card purple">
                        <div className="card-header">
                            <div className="card-title">Nomlangan Function Expression</div>
                            <span className="tag purple">Named Expression</span>
                        </div>
                        <p className="card-desc">Funksiyaga ichki nom berib, rekursiya (o'zini-o'zi chaqirish) qilish mumkin:</p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-named-expression"
                                onClick={() => copyCode(`const faktorial = function hisopla(n) {\n  if (n <= 1) return 1;\n  return n * hisopla(n - 1);\n};\n\nconsole.log(faktorial(5));  // ➜ 120`, 'copy-named-expression')}
                            >
                                nusxa
                            </button>
                            <pre>{`const faktorial = function hisopla(n) {
  if (n <= 1) return 1;
  return n * hisopla(n - 1);
};

console.log(faktorial(5));  // ➜ 120`}</pre>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="section reveal" id="arrow">
                    <div className="section-label">
                        <div className="section-num">03</div>
                        <div style={{ width: '3px', height: '1.5rem', background: '#34d399', borderRadius: '2px' }} />
                        <h2 className="section-title">Arrow Function</h2>
                    </div>

                    <div className="card green">
                        <div className="card-header">
                            <div className="card-title">Nima bu?</div>
                            <span className="tag green">ES6 yangilik</span>
                        </div>
                        <p className="card-desc">
                            <strong style={{ color: '#e2e8f0' }}>Arrow Function</strong> — ES6 (2015) da qo'shilgan, qisqaroq va zamonaviy funksiya yozish usuli. <code style={{ fontFamily: 'JetBrains Mono', fontSize: '0.82em', color: '#34d399' }}>{'=>'}</code> belgisi bilan yoziladi. Bir qatorlik oddiy funksiyalar uchun juda qulay va kodni o'qishni osonlashtiradi.
                        </p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-arrow-intro"
                                onClick={() => copyCode(`const qoshish = function(a, b) { return a + b; };
const qoshish = (a, b) => a + b;`, 'copy-arrow-intro')}
                            >
                                nusxa
                            </button>
                            <pre>{`// OLDIN (function expression)
const qoshish = function(a, b) { return a + b; };

// KEYIN (arrow function)
const qoshish = (a, b) => a + b;
console.log(qoshish(3, 7));  // ➜ 10`}</pre>
                        </div>
                    </div>

                    <div className="card green">
                        <div className="card-header">
                            <div className="card-title">Qisqartirish qoidalari</div>
                            <span className="tag green">Sintaksis</span>
                        </div>
                        <p className="card-desc">Arrow function yozishda bir nechta qisqartirish usullari mavjud:</p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-arrow-shorthand"
                                onClick={() => copyCode(`const ikkilashtir = son => son * 2;
const salom = () => "Assalomu alaykum!";
const tekshir = (son) => {
  if (son > 0) return "Musbat";
  if (son < 0) return "Manfiy";
  return "Nol";
};`, 'copy-arrow-shorthand')}
                            >
                                nusxa
                            </button>
                            <pre>{`// 1. Bitta parametr → qavslar ixtiyoriy
const ikkilashtir = son => son * 2;
console.log(ikkilashtir(5));  // ➜ 10

// 2. Parametrsiz → bo'sh qavslar shart
const salom = () => "Assalomu alaykum!";
console.log(salom());  // ➜ "Assalomu alaykum!"

// 3. Ko'p qatorli → {} va return kerak
const tekshir = (son) => {
  if (son > 0) return "Musbat";
  if (son < 0) return "Manfiy";
  return "Nol";
};
console.log(tekshir(-3));  // ➜ "Manfiy"`}</pre>
                        </div>
                    </div>

                    <div className="card green">
                        <div className="card-header">
                            <div className="card-title">Arrow + massivlar — juda qulay!</div>
                            <span className="tag green">Amaliy foyda</span>
                        </div>
                        <p className="card-desc">Arrow function ayniqsa massiv metodlari bilan juda chiroyli va ixcham ko'rinadi:</p>
                        <div className="code-block">
                            <button
                                className="copy-btn"
                                id="copy-arrow-arrays"
                                onClick={() => copyCode(`const baholar = [85, 92, 45, 78, 60];
const yaxshi = baholar.filter(b => b >= 70);
const jami = baholar.reduce((sum, b) => sum + b, 0);
const ortacha = jami / baholar.length;
console.log(yaxshi);
console.log(ortacha);`, 'copy-arrow-arrays')}
                            >
                                nusxa
                            </button>
                            <pre>{`const baholar = [85, 92, 45, 78, 60];

// Faqat yaxshi baholarni olish (≥70)
const yaxshi = baholar.filter(b => b >= 70);
console.log(yaxshi);  // ➜ [85, 92, 78]

// O'rtacha bahoni hisoblash
const jami = baholar.reduce((sum, b) => sum + b, 0);
const ortacha = jami / baholar.length;
console.log(ortacha);  // ➜ 72`}</pre>
                        </div>
                        <div className="alert success">
                            <span className="alert-icon">✅</span>
                            <span>Arrow function hoisting yo'q va uning <strong style={{ color: '#34d399' }}>o'z this'i bo'lmaydi</strong> — bu ba'zi hollarda aynan kerakli xususiyat!</span>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="section reveal" id="compare">
                    <div className="section-label">
                        <div className="section-num">04</div>
                        <div style={{ width: '3px', height: '1.5rem', background: '#fb923c', borderRadius: '2px' }} />
                        <h2 className="section-title">Taqqoslash jadvali</h2>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Uchala tur — bir ko'rinishda</div>
                        </div>
                        <p className="card-desc">Quyidagi jadval uchala funksiya turini asosiy xususiyatlari bo'yicha solishtiradi:</p>
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Xususiyat</th>
                                    <th>Declaration</th>
                                    <th>Expression</th>
                                    <th>Arrow</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sintaksis</td>
                                    <td><code style={{ color: '#38bdf8' }}>{'function f(){}'}</code></td>
                                    <td><code style={{ color: '#818cf8' }}>{'const f = function(){}'}</code></td>
                                    <td><code style={{ color: '#34d399' }}>{'const f = () => {}'}</code></td>
                                </tr>
                                <tr>
                                    <td>Hoisting</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="no">❌ Yo'q</td>
                                    <td className="no">❌ Yo'q</td>
                                </tr>
                                <tr>
                                    <td>O'z this'i</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="no">❌ Yo'q</td>
                                </tr>
                                <tr>
                                    <td>arguments ob'ekti</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="no">❌ Yo'q</td>
                                </tr>
                                <tr>
                                    <td>Konstruktor sifatida</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="yes">✅ Ha</td>
                                    <td className="no">❌ Yo'q</td>
                                </tr>
                                <tr>
                                    <td>Qisqa yozish</td>
                                    <td className="partial">➖ O'rtacha</td>
                                    <td className="partial">➖ O'rtacha</td>
                                    <td className="yes">✅ Eng qisqa</td>
                                </tr>
                                <tr>
                                    <td>Nom (o'zi)</td>
                                    <td className="yes">✅ Shart</td>
                                    <td className="partial">➖ Ixtiyoriy</td>
                                    <td className="no">❌ Yo'q</td>
                                </tr>
                                <tr>
                                    <td>Callback uchun</td>
                                    <td className="partial">➖ Yaxshi</td>
                                    <td className="yes">✅ Yaxshi</td>
                                    <td className="yes">✅ Eng yaxshi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <div className="card-title">Qachon qaysinisini ishlatamiz?</div>
                        </div>
                        <div className="steps">
                            <div className="step">
                                <div className="step-num" style={{ color: '#38bdf8', borderColor: 'rgba(56,189,248,0.3)' }}>01</div>
                                <div className="step-content">
                                    <h4>Function Declaration ishlataman — asosiy funksiyalar uchun</h4>
                                    <p>Dasturning asosiy ishchi funksiyalarini, modulning eksport funksiyalarini declaration bilan yozing. Hoisting tufayli kodni qulay tarzda tashkil qilish mumkin.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num" style={{ color: '#818cf8', borderColor: 'rgba(129,140,248,0.3)' }}>02</div>
                                <div className="step-content">
                                    <h4>Function Expression — shartli funksiyalar uchun</h4>
                                    <p>Funksiyani shartga qarab belgilash, boshqa funksiyaga argument sifatida uzatish, yoki o'zgaruvchida saqlash kerak bo'lganda Expression qulayroq.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num" style={{ color: '#34d399', borderColor: 'rgba(52,211,153,0.3)' }}>03</div>
                                <div className="step-content">
                                    <h4>Arrow Function — callback va qisqa funksiyalar uchun</h4>
                                    <p>map(), filter(), forEach(), reduce() kabi massiv metodlarida callback sifatida ishlatish, yoki bir qatorli oddiy funksiyalar yozish uchun eng qulay.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                <section className="section reveal" id="quiz">
                    <div className="section-label">
                        <div className="section-num">05</div>
                        <div style={{ width: '3px', height: '1.5rem', background: '#f472b6', borderRadius: '2px' }} />
                        <h2 className="section-title">O'zingizni sinab ko'ring</h2>
                    </div>

                    {quizQuestions.map((item) => (
                        <div className="quiz-card" id={item.id} key={item.id} style={{ marginTop: item.id !== 'q1' ? '1rem' : 0 }}>
                            <div className="quiz-title">{item.title}</div>
                            <p className="quiz-question">{item.question}</p>
                            {item.code && <div className="quiz-code"><pre>{item.code}</pre></div>}
                            <div className="quiz-options">
                                {item.options.map((option, optionIndex) => {
                                    const answered = answers[item.id];
                                    const isCorrect = answered?.correct;
                                    const selected = answered?.selected === optionIndex;
                                    return (
                                        <button
                                            key={optionIndex}
                                            className={`quiz-opt ${answered ? (selected ? (isCorrect ? 'correct' : 'wrong') : '') : ''}`}
                                            onClick={() => answerQuestion(item.id, optionIndex)}
                                            disabled={Boolean(answered)}
                                        >
                                            {option.text}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className={`quiz-feedback ${answers[item.id] ? 'show' : ''} ${answers[item.id]?.correct ? 'ok' : 'bad'}`}>
                                {answers[item.id]?.message}
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <footer>
                <p>JavaScript Funksiyalar kursi · <strong>0-daraja uchun</strong> · O'zbek tilida</p>
                <p style={{ marginTop: '0.5rem', fontSize: '0.72rem' }}>Function Declaration · Function Expression · Arrow Function</p>
            </footer>
        </>
    );
}

export default HomePage;