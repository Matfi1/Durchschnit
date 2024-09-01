// Изменения внесены Матфеем

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gradesForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const gradesInput = document.getElementById('grades').value.trim();
        const gradesArray = gradesInput.split(',').map(grade => parseFloat(grade));

        // Фильтрация нечисловых значений и пустых строк
        const validGrades = gradesArray.filter(grade => !isNaN(grade) && grade >= 0);

        if (validGrades.length === 0) {
            result.textContent = `Пожалуйста, введите правильные оценки.`;
            return;
        }

        const average = calculateAverage(validGrades, country);

        // Обновляем результат с добавлением смайлика 💩 и применением анимации
        result.innerHTML = `Ваш средний балл: ${average.toFixed(2)} <span class="poop">💩</span>`;
    });
});

function calculateAverage(grades, country) {
    let total = grades.reduce((acc, grade) => acc + grade, 0);
    let average = total / grades.length;

    switch (country) {
        case 'de':
            // Преобразование из 5-балльной системы в немецкую (1.0 - 5.0)
            average = 6 - average; // 5 становится 1, 4 становится 2, и так далее
            average = average.toFixed(2);
            break;
        case 'ua':
        case 'ru':
            // 5-балльная система, преобразование не требуется
            average = average.toFixed(2);
            break;
        case 'es':
            // Преобразование из 10-балльной системы в 5-балльную систему
            average = (average / 10) * 5; // 10 становится 5, 0 становится 0
            average = average.toFixed(2);
            break;
        default:
            average = average.toFixed(2);
            break;
    }

    return parseFloat(average); // Конвертируем в число с плавающей запятой для точности
}
