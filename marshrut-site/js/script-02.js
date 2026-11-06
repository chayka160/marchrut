
  (function () {
    var QUESTIONS = [
      { q: "Что тебе интереснее всего делать на переменах или после уроков?", opts: [
        { t: "Разбираться, как устроены гаджеты, программы и игры", k: "tech" },
        { t: "Рисовать, снимать видео, придумывать что-то своё", k: "creative" },
        { t: "Общаться, помогать друзьям, объяснять сложное простыми словами", k: "social" },
        { t: "Читать, ставить опыты, искать ответы на вопросы «почему»", k: "science" }
      ]},
      { q: "Какую задачу ты бы выбрал для школьного проекта?", opts: [
        { t: "Собрать робота или сделать сайт", k: "tech" },
        { t: "Снять фильм или оформить выставку", k: "creative" },
        { t: "Провести опрос и рассказать всем о результатах", k: "social" },
        { t: "Провести эксперимент и доказать гипотезу", k: "science" }
      ]},
      { q: "Тебе больше нравится работа, где нужно…", opts: [
        { t: "Настраивать и улучшать технику и системы", k: "tech" },
        { t: "Придумывать образы и воплощать идеи в жизнь", k: "creative" },
        { t: "Работать с людьми и командой", k: "social" },
        { t: "Анализировать данные и делать выводы", k: "science" }
      ]},
      { q: "Представь: ты попал в VR-пространство. Какую профессию примеришь первой?", opts: [
        { t: "Программиста или инженера", k: "tech" },
        { t: "Дизайнера или архитектора", k: "creative" },
        { t: "Врача или учителя", k: "social" },
        { t: "Учёного в лаборатории", k: "science" }
      ]},
      { q: "Что для тебя важнее в будущей профессии?", opts: [
        { t: "Создавать работающие вещи и технологии", k: "tech" },
        { t: "Видеть результат своего творчества", k: "creative" },
        { t: "Приносить пользу конкретным людям", k: "social" },
        { t: "Открывать новое и понимать мир глубже", k: "science" }
      ]}
    ];

    var RESULTS = {
      tech: { label: "Технологии и инженерия", title: "Твоё направление — технологии", text: "Тебе близко создавать и настраивать: техника, программы, роботы. В интерактивной зоне надень VR-очки и примерь профессию программиста или инженера — начни с теоретической зоны, чтобы понять основы." },
      creative: { label: "Творчество и дизайн", title: "Твоё направление — творчество", text: "Ты мыслишь образами и любишь воплощать идеи. Попробуй в VR профессию дизайнера или архитектора, а на мастер-классах прокачай навыки руками." },
      social: { label: "Люди и помощь", title: "Твоё направление — работа с людьми", text: "Тебе важно общение и польза для других. Примерь в VR профессию врача или учителя, а на встречах со спикерами задай вопросы профессионалам напрямую." },
      science: { label: "Наука и исследования", title: "Твоё направление — наука", text: "Ты любишь задавать вопросы и искать ответы. В VR-зоне побывай в роли учёного, а в теоретической зоне узнай, как выглядят реальные лаборатории и исследования." }
    };

    var app = document.getElementById("quizApp");
    if (!app) return;
    var screensBox = document.getElementById("quizScreens");
    var progress = document.getElementById("quizProgress");
    var answers = {};

    function buildScreens() {
      screensBox.innerHTML = "";
      QUESTIONS.forEach(function (item, i) {
        var s = document.createElement("div");
        s.className = "quiz-screen";
        var h = document.createElement("p");
        h.className = "quiz-q";
        h.textContent = (i + 1) + ". " + item.q;
        s.appendChild(h);
        var box = document.createElement("div");
        box.className = "quiz-opts";
        item.opts.forEach(function (o) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "quiz-opt";
          b.textContent = o.t;
          b.addEventListener("click", function () {
            answers[i] = o.k;
            markProgress(i + 1);
            show(i + 1);
          });
          box.appendChild(b);
        });
        s.appendChild(box);
        screensBox.appendChild(s);
      });
      var r = document.createElement("div");
      r.className = "quiz-screen";
      r.id = "quizResult";
      screensBox.appendChild(r);
    }

    function markProgress(n) {
      var dots = progress.querySelectorAll("span");
      dots.forEach(function (d, i) { d.classList.toggle("is-done", i < n); });
    }

    function show(n) {
      var screens = screensBox.querySelectorAll(".quiz-screen");
      screens.forEach(function (s, i) { s.classList.toggle("is-active", i === n); });
      if (n === QUESTIONS.length) renderResult();
    }

    function renderResult() {
      var score = { tech: 0, creative: 0, social: 0, science: 0 };
      Object.keys(answers).forEach(function (k) { score[answers[k]]++; });
      var best = "tech";
      Object.keys(score).forEach(function (k) { if (score[k] > score[best]) best = k; });
      var res = RESULTS[best];
      var r = document.getElementById("quizResult");
      r.innerHTML = "";
      var badge = document.createElement("span");
      badge.className = "quiz-result-badge";
      badge.textContent = res.label;
      var t = document.createElement("h3");
      t.className = "quiz-result-title";
      t.textContent = res.title;
      var p = document.createElement("p");
      p.className = "quiz-result-text";
      p.textContent = res.text;
      var again = document.createElement("button");
      again.type = "button";
      again.className = "quiz-restart";
      again.textContent = "Пройти тест заново";
      again.addEventListener("click", function () {
        answers = {}; markProgress(0); show(0);
      });
      var next = document.createElement("div");
      next.className = "quiz-next-step";
      var invitation = document.createElement("p");
      invitation.textContent = "Узнай больше о своих интересах";
      var detailed = document.createElement("a");
      detailed.className = "quiz-deep-link";
      detailed.href = window.getDetailedCareerTestUrl();
      detailed.target = "_blank";
      detailed.rel = "noopener";
      var linkText = document.createElement("span");
      linkText.textContent = "Пройти подробный профориентационный тест";
      var arrow = document.createElement("span");
      arrow.className = "quiz-deep-link-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      detailed.appendChild(linkText);
      detailed.appendChild(arrow);
      var details = document.createElement("small");
      details.textContent = "30 вопросов · 7–10 минут · откроется в новой вкладке";
      next.appendChild(invitation);
      next.appendChild(detailed);
      next.appendChild(details);
      r.appendChild(badge); r.appendChild(t); r.appendChild(p); r.appendChild(next); r.appendChild(again);
    }

    buildScreens();
    show(0);
  })();
  