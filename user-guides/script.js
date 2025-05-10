// Video selection

let title1 = document.getElementById('title-1');
let title2 = document.getElementById('title-2');
let title3 = document.getElementById('title-3');

let titles = [title1, title2, title3];
console.log(titles);

let video = document.getElementById('user-guides-video');

function handleTitleClicks() {
    title1.addEventListener('click', function(){
        video.setAttribute('src', 'https://www.youtube.com/embed/3KDM0j9LiQs?si=jzmxXK3HZDzMRp77?vq=hd720');
    })
    
    title2.addEventListener('click', function(){
        video.setAttribute('src', 'https://www.youtube.com/embed/-xSPk3mrbTg?si=pmoBFW2YpjShT1Gf?vq=hd720');
    })
    
    title3.addEventListener('click', function(){
        video.setAttribute('src', 'https://www.youtube.com/embed/3pjZjv1FoVA?si=ur6fW6HE3lRapoQ7?vq=hd720');
    })
}

handleTitleClicks();

function resetTitlesFontWeight() {
    for (let title of titles) {
            title.removeAttribute('class', 'selected-title');
            title.setAttribute('class', 'title-container')
        };
    }

function handleTitleFontWeight() {
    for (let title of titles) {
        title.addEventListener('click', function() {
            resetTitlesFontWeight();
            title.setAttribute('class', 'selected-title');
        })
    }
}

handleTitleFontWeight();