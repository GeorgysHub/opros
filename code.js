// Функция, которая показывает текущий вопрос и варианты ответа
function showQuestion() {
    // Находим элементы вопроса и ответа на странице
    const question = document.querySelector('.question');
    const answer = document.querySelector('.answer');
    
    // Задаем текст текущего вопроса
    question.textContent = quiz[step]['q'];
    
    // Генерируем HTML-разметку для вариантов ответа и вставляем ее в блок ответа
    answer.innerHTML = '';
    for (let key in quiz[step]['a']) {
      const li = document.createElement('li');
      li.classList.add('answer-variant');
      li.setAttribute('data-v', key);
      li.textContent = quiz[step]['a'][key];
      answer.appendChild(li);
    }
  }
  
  // Функция, которая показывает результаты теста
  function showResult() {
    // Находим ключ ответа с наибольшим количеством голосов
    let maxKey = Object.keys(result)[0];
    for (let key in result) {
      if (result[key] > result[maxKey]) {
        maxKey = key;
      }
    }
    
    // Создаем элемент результата и выводим описание наиболее подходящего ответа
    const div = document.createElement('div');
    div.classList.add('result');
    div.textContent = answers[maxKey]['description'];
    document.querySelector('main').appendChild(div);
  }
  
  // Обработчик клика на варианте ответа
  document.onclick = function(event) {
    // Если клик не на варианте ответа или тест закончился, то выходим из обработчика
    if (!event.target.classList.contains('answer-variant') || step >= quiz.length) {
      return;
    }
    
    // Увеличиваем счетчик голосов для выбранного варианта ответа
    const selectedAnswer = event.target.dataset.v;
    result[selectedAnswer] = (result[selectedAnswer] || 0) + 1;
    
    // Переходим к следующему вопросу или показываем результаты
    step++;
    if (step === quiz.length) {
      document.querySelector('.question').remove();
      document.querySelector('.answer').remove();
      showResult();
    } else {
      showQuestion(step);
    }
  }
  
  // Начинаем тест с первого вопроса
  let result = {};
  let step = 0;
  showQuestion(step);
  
  