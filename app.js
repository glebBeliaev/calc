// Функциональность очистки полей
document.querySelectorAll('.clear-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Сбросим текстовое поле на пустую строку
        const input = this.previousElementSibling; // Получаем предшествующий элемент (input)
        input.value = '';
        input.focus(); // Снова фокусируемся на поле ввода
        this.style.visibility = 'hidden'; // Скрываем кнопку после сброса
        calculateForm(); // Пересчитываем результат после очистки
    });
});

// Слушаем события изменения для показа/скрытия кнопки
document.querySelectorAll('.calc_input').forEach(input => {
    input.addEventListener('input', function() {
        const clearButton = this.nextElementSibling; // Ищем кнопку после input
        clearButton.style.visibility = this.value ? 'visible' : 'hidden'; // Показываем или скрываем кнопку
        calculateForm(); // Пересчитываем результат при вводе
    });
});

// Получаем все карточки и формы
const cards = document.querySelectorAll('.card');
const forms = document.querySelectorAll('.calc_form');

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        switchForm(this.dataset.form);
    });
});

function switchForm(formId) {
    // Скрываем все формы
    forms.forEach(form => {
        form.style.display = 'none';

        // Сбрасываем значения всех полей ввода в форме
        form.querySelectorAll('.calc_input').forEach(input => {
            input.value = ''; // Очищаем поле
            const clearButton = input.nextElementSibling; // Находим кнопку очистки
            clearButton.style.visibility = 'hidden'; // Скрываем кнопку
        });
    });

    // Отображаем нужную форму
    const activeForm = document.getElementById(formId);
    if (activeForm) {
        activeForm.style.display = 'block';

        // Проверяем видимость кнопок очистки в новой активной форме
        activeForm.querySelectorAll('.calc_input').forEach(input => {
            const clearButton = input.nextElementSibling; // Находим кнопку очистки
            clearButton.style.visibility = input.value ? 'visible' : 'hidden'; // Показываем или скрываем кнопку
        });
    }

    // Убираем активное состояние со всех карточек
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // Добавляем активное состояние к выбранной карточке
    const activeCard = document.getElementById('card_' + formId.replace('form_', ''));
    if (activeCard) {
        activeCard.classList.add('active');
    }

    // Сброс заголовка к значению по умолчанию
    const resultTitle = document.querySelector('.calc_result_title');
    resultTitle.textContent = 'Результат:'; // Устанавливаем заголовок по умолчанию

    // Пересчитываем результат для текущей формы (если нужно сбросить и результат)
    calculateForm();
}


// Изначально показываем только первую форму
switchForm('form_integer');

// Функция для расчета целого числа
function calculateFormInteger() {
    const resultTitle = document.querySelector('.calc_result_title');
    const numberInput = document.getElementById('form_integer_input_number');
    const percentInput = document.getElementById('form_integer_input_percent');
    const resultElement = document.querySelector('#form_integer .calc_result_number');

    const numberValue = parseFloat(numberInput.value) || 0;
    const percentValue = parseFloat(percentInput.value) || 0;

    if (percentValue !==0 && numberValue !== 0) {
        // Находим целое число: часть делим на процент (в виде доли)
        const result = numberValue / (percentValue / 100);
        resultElement.textContent = result.toFixed(2); // Округляем до 2 знаков после запятой
        resultTitle.textContent = `Если ${numberValue} составляет ${percentValue}%, то целое число:`; // Обновляем заголовок
    } else {
        resultElement.textContent = '0'; // Если процент 0, выводим 0
        resultTitle.textContent = 'Результат:'; // Сбрасываем заголовок на "Результат"
    }
}

function calculateFormPercent() {
    const formPercent = document.getElementById('form_percent'); // Получаем форму "Найти процент по числу"
    const resultTitle = formPercent.querySelector('.calc_result_title'); // Ищем заголовок в этой форме
    const number1Input = document.getElementById('form_percent_input_number_1');
    const number2Input = document.getElementById('form_percent_input_number_2');
    const resultElement = formPercent.querySelector('.calc_result_number');

    const number1Value = parseFloat(number1Input.value) || 0;
    const number2Value = parseFloat(number2Input.value) || 0;   

    if (number1Value !== 0 && number2Value !== 0) {
        // Находим целое число: часть делим на процент (в виде доли)
        const coefficient = number2Value / number1Value;
        const result = 100 / coefficient;
        resultElement.textContent = `${result.toFixed(2)}%`; // Округляем до 2 знаков после запятой
        
        // Обновляем заголовок
        resultTitle.textContent = `Число ${number1Value} составляет от ${number2Value}:`;        
    } else {
        resultElement.textContent = '0%'; // Если процент 0, выводим 0
        resultTitle.textContent = 'Результат:'; // Сбрасываем заголовок на "Результат"
    }
}

function calculateFormPart() {
    const formPart = document.getElementById('form_part'); // Получаем форму "Найти процент по числу"    
    const resultTitle = formPart.querySelector('.calc_result_title'); // Ищем заголовок в этой форме
    const numberInput = document.getElementById('form_part_input_number');
    const percentInput = document.getElementById('form_part_input_percent');
    const resultElement = formPart.querySelector('.calc_result_number');

    const numberValue = parseFloat(numberInput.value) || 0;
    const percentValue = parseFloat(percentInput.value) || 0;   

    if (numberValue !== 0 && percentValue !== 0) {
        // Находим целое число: часть делим на процент (в виде доли)
        const coefficient = numberValue / 100;
        const result = coefficient * percentValue;
        resultElement.textContent = result.toFixed(2); // Округляем до 2 знаков после запятой
        
        // Обновляем заголовок
        resultTitle.textContent = `${percentValue}% от ${numberValue} составляет:`;        
    } else {
        resultElement.textContent = '0'; // Если процент 0, выводим 0
        resultTitle.textContent = 'Результат:'; // Сбрасываем заголовок на "Результат"
    }
}

function calculateFormOperation() {
    const buttons = document.querySelectorAll('.operation-button');
    const formOperation = document.getElementById('form_operation'); // Получаем форму
    const resultTitle = formOperation.querySelector('.calc_result_title'); // Ищем заголовок в этой форме
    const numberInput = document.getElementById('form_operation_input_number');
    const percentInput = document.getElementById('form_operation_input_percent');
    const resultElement = formOperation.querySelector('.calc_result_number');

    let currentOperation = 'add';
    resultElement.textContent = '0'; // Если введено нулевое значение, выводим 0
    resultTitle.textContent = 'Результат:';
    resetButtons();

    function resetButtons() {
        buttons.forEach(btn => btn.classList.remove('active')); // Удаляем класс active со всех кнопок
        buttons[0].classList.add('active'); // Устанавливаем активной кнопку сложения
        currentOperation = 'add'; // По умолчанию сложение
    }

       // Устанавливаем текущую операцию при нажатии на кнопку
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем класс active со всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));   
            this.classList.add('active');    // Добавляем класс active на нажатую кнопку         
            currentOperation = this.getAttribute('data-operation');  // Сохраняем операцию из data-атрибута      
            calculateResult(); // Выполняем операцию
        });
    });

    // Функция для выполнения расчета
    function calculateResult() {
        const numberValue = parseFloat(numberInput.value) || 0;
        const percentValue = parseFloat(percentInput.value) || 0;   

        if (numberValue !== 0 && percentValue !== 0) {
            let result;

            // Вычисляем коэффициент
            const coefficient = numberValue / 100;
            const percentAmount = coefficient * percentValue;

            if (currentOperation === 'add') {
                // Прибавляем процент к числу
                result = numberValue + percentAmount;
                resultTitle.textContent = `Прибавить ${percentValue}% к числу ${numberValue}:`;
            } else if (currentOperation === 'subtract') {
                // Вычитаем процент из числа
                result = numberValue - percentAmount;
                resultTitle.textContent = `Вычесть ${percentValue}% из числа ${numberValue}:`;
            } 

            resultElement.textContent = result.toFixed(2); // Округляем до 2 знаков
        } else {
            resultElement.textContent = '0'; // Если введено нулевое значение, выводим 0
            resultTitle.textContent = 'Результат:';
        }
    }

    // Считаем результат при изменении входных данных
    numberInput.addEventListener('input', calculateResult);
    percentInput.addEventListener('input', calculateResult);

    formOperation.addEventListener('open', function() {
        resetButtons(); // Сбрасываем состояние кнопок
        calculateResult(); // Обновляем результат
    });
}




function calculateForm() {
    const activeForm = document.querySelector('.calc_form[style*="display: block"]'); // Ищем активную форму

    if (activeForm.id === 'form_integer') {
        calculateFormInteger();
    } else if (activeForm.id === 'form_percent') {
        calculateFormPercent();
    } else if (activeForm.id === 'form_part') {
        calculateFormPart();
    } else if (activeForm.id === 'form_operation') {
        calculateFormOperation();
    }
}

// Инициализация прослушивания событий для пересчета результата
document.querySelectorAll('.calc_input').forEach(input => {
    input.addEventListener('input', calculateForm); // Пересчет при вводе значений
});
