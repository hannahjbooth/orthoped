let questions = Array.from(document.getElementsByClassName('accordeon-button'));
let answers = Array.from(document.getElementsByClassName('accordeon-content'));

for (question of questions) {
    question.addEventListener('click', () => {
        let parent = question.parentElement;
        let answer = parent.querySelector('accordeon-content');

        answer.classList.remove('hidden');
    })
}
