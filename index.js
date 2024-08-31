document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('gradesForm');
    const result = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const country = document.getElementById('country').value;
        const gradesInput = document.getElementById('grades').value;
        const gradesArray = gradesInput.split(',').map(Number);

        const validGrades = gradesArray.filter(grade => !isNaN(grade));
        const average = calculateAverage(validGrades, country);

        result.textContent = `Ваш средний балл: ${average.toFixed(2)}`;
        result.classList.add('visible');
    });
});

function calculateAverage(grades, country) {
    let total = grades.reduce((acc, grade) => acc + grade, 0);
    let average = total / grades.length;

    if (country === 'de') {
        // Пример: Преобразование оценок в немецкую систему (1.0 - 5.0)
        average = 6 - average; // предположим, что оценки введены в обратной системе
    } else if (country === 'ua' || country === 'ru') {
        // Пример: для Украины и России 5-балльная система
        // Преобразование не требуется, если оценки в диапазоне 1-5
    } else if (country === 'es') {
        // Пример: Испанская 10-балльная система
        average = average / 10 * 5; // Преобразование в 5-балльную систему
    }

    return average;
}
