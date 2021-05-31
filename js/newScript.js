"use strict"

const stateScore = [];


//Звуки

    //Пуля Игрока
    let bullet = new Audio;
    bullet.src = '/audio/bullet_2.wav';

    //Звук двигателя Игрока
    let playerEngine = new Audio;
    playerEngine.src = '/audio/player_4.mp3';

    //Попадание в Врага 
    let boomEnemy = new Audio;
    boomEnemy.src = '/audio/boom_1.mp3';

    //Звук двигателя Врага
    let enemyEngine = new Audio;
    enemyEngine.src = '/audio/enemy_1.wav';

    //Звук попадание в Игрока
    let playPain = new Audio;
    playPain.src = '/audio/когда попал враг_2.wav';

    //Музыка фон игры
    let musicGame = new Audio;
    musicGame.src = '/audio/музыка для фона_1.mp3';

//Функции звуков

    //Звук пуль Игрока
    function audioBullet() {
        bullet.currentTime = 0; 
        bullet.play();
        bullet.volume = 0.3;
    };

    //Звук движение Игрока
    function audioPlayerEngine() {
        playerEngine.currentTime = 0; 
        playerEngine.play();
        playerEngine.volume = 0.1;
    };

    //Звук поподание в Игрока
    function audioPlayPain() {
        playPain.currentTime = 0; 
        playPain.play();
        playPain.volume = 0.8;
    };

    //Звук Врага
    function audioEnemeEngine() {
        enemyEngine.currentTime = 0;
        enemyEngine.play();
        // enemyEngine.loop = true;
        enemyEngine.volume = 0.1;
    };
    //Звук при взрыви врага
    function audioBoomEnemy() {
        boomEnemy.currentTime = 0; 
        boomEnemy.play();
};

    //Музыка фон
    function playMusic() {
        musicGame.currentTime = 0;
        musicGame.play();
        musicGame.volume = 0.6;
        musicGame.loop = true;
    };



//Обьект для сохранение
const objSave = {
    name:  null,
    score: stateScore.length
};


//Начальное меню
const containerGame = document.querySelector('.wrapper');
containerGame.classList.add('clear');


const startMenu = document.createElement('div');
startMenu.classList.add('startMenu');
startMenu.insertAdjacentHTML('afterbegin', 
    `  
        <div class="start_game_menu">
            <div class="start_menu_item">   
                <div class="titleGame">
                    <h2>Замочи Орионов</h2>
                </div>
                <div class="start_game__buttons">
                    <button class="btnStart">В бой</button>
                    <button class="btnTopPlayer">Список топ 10</button>
                    <button class="btnExite">Выйти</button>
                </div>
            </div>
        </div>
    `
    );  
document.body.appendChild(startMenu);


//Кнопки начального меню игры

    //Старт
    let btnStartGame = document.querySelector('.btnStart').addEventListener('click', () => {
        startMenu.classList.add('clear');
        formModal();
    });

    //Топ Список
    let btnTopPlayer = document.querySelector('.btnTopPlayer').addEventListener('click', () => {
        startMenu.classList.add('clear');
        getSaveScorePlayer(); 
        const table  = document.querySelector('.tableDiv');
        table.classList.add('tableDivOpen')

    });

    //Выйти
    let exitGame = document.querySelector('.btnExite').addEventListener('click', () => {
        window.close();
    });


    //Form Окно
    function formModal() {
        const table  = document.querySelector('.tableDiv');
        const formModal = document.createElement('div');
        formModal.classList.add('formModal');
        formModal.insertAdjacentHTML('afterbegin', 
            `
                <div id="form" >
                    <p>Ввидите ваше имя</p>
                    <div class="form_item">
                        <input type="text" class="inputForm" required placholder="NamePlayer" name="Name" autocomplete="off">
                        <button class="btnStartGame">Погнали!</button>
                    </div>
                </div>
            `
        );
        document.body.appendChild(formModal);

        let inputForm = document.querySelector('.inputForm');

        //Кнопка
        let btnStartGameInForm = document.querySelector('.btnStartGame').addEventListener('click', () => {
            if(inputForm.value === '') {
                return;
            }
            const table  = document.querySelector('.tableDiv');
            const btnTable = document.querySelector('.btnTable');
            const titleTable = document.querySelector('.title_table');
            const btnExiteTableScore = document.querySelector('.btnExiteTableScore');
            btnExiteTableScore.classList.add('clear');
            table.classList.remove('tableDiv');
            titleTable.classList.add('clear');
            btnTable.classList.add('clear');
            formModal.classList.add('clear');
            containerGame.classList.add('open');
            startGame();
            pushName();
        });

        //Отпрвка имени игрока на сохранение
        function pushName() {
            objSave.name = inputForm.value
        };

        return formModal;
    };


    //Отпрвка очков в меню
    function pushScore() {
        let  totalScore = stateScore.length;
        return totalScore;
    };



    //Модал конец игры
    function openModalGameOver() {
        const modalGameOver = document.createElement('div');
        modalGameOver.classList.add('modal');
        modalGameOver.insertAdjacentHTML('afterbegin',
        `
            <div class="modal_overlay">
                <div class="modal_window">
                    <div class="modal_header ">
                        <span class="modal_title">Конец игры</span>
                    </div>
                    <div class="modal_content">
                    <p>Вы набрали: <span class="points">${pushScore()}</span> очков</p>
                    </div>
                    <div class="modal_footer">
                        <button data-save="true" class="btnSave">Сохранить</button>
                        <button data-menu="true">В меню</button>
                        <button data-exit="true">Выйти</button>
                    </div>
                </div>
            </div>
        `);
        document.body.appendChild(modalGameOver);

        document.querySelector('.btnSave').addEventListener('click', async () => {
            console.log('fetch')
            if(objSave) {
                let b = document.querySelector('.btnSave');
                const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({ objSave })
                });
        
                const table = await res.json();
                tableHTML(table);
            }
        });
        

        //Модал game over
        modalGameOver.addEventListener('click', e => {
            e.preventDefault();
            let event = e.target.dataset;

            if(event.save) {
                pushPoints();
            } else if(event.menu) {
                window.location.reload();
            } else if(event.exit) {
                window.close();
            }
        });

        
        function closeModal() {
            let modalOverlay = document.querySelector('.modal_overlay');
            modalOverlay.remove();
        };

        //Очик в копилку
        function pushPoints() {
            objSave.score = stateScore.length;
            return objSave;
        };
        return modalGameOver;
    };


    async function getSaveScorePlayer() {
        const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
        const scorePlayer = await res.json();

        scorePlayer.forEach(table => tableHTML(table));
    }
    

    function tableHTML({ name , score , id }) {
        const table  = document.querySelector('.tableDiv');
        const gameAtribut = document.querySelector('.gameAtribut');

        table.insertAdjacentHTML('beforeend', 
            `
            <div class="table_item" id="table${id}">
                Имя: <span class="namePlayer"> ${name}</span> Очки: <span class="pointsPlayer">${score}</span> <span class="table_icon"><i  onclick ="deleTableSave(${id})"class="fas fa-trash-alt"></i></span>
            </div>
            `
        );

        containerGame.classList.add('open');
        gameAtribut.classList.add('clear');


        //В меню из топ таблицы
        let btnMenuTableScore = document.querySelector('.btnMenuTableScore').addEventListener('click', () => {
            window.location.reload();
        });

        //Выйти из игры 
        let btnExiteTableScore = document.querySelector('.btnExiteTableScore').addEventListener('click', () => {
            window.close();
        });

        return table;
    };


    async function deleTableSave(id) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await res.json();
        console.log(data);

        if(data) {
            document.getElementById(`table${id}`).remove();
        }
    };




//Cтарт игры
function startGame() {

    playMusic();
    //Хранилище
    const state = {
        player: document.querySelector('#player'),
        lifesIcon: document.querySelector('#lifes'),
        game: document.querySelector('.wrapper'),
        positionPlayerY: 0, 
        lifesPLayer: 3,
        speedPlayer: 70,
        speedBullet: 20,
        speedEnemy: 15,
        score: 0,
        fps: 1000/60,
    };



    //Дебоунс 
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        };
    };

    let returnedFunction = debounce(createBullet, 200);


        //Управление игрока
        document.addEventListener('keydown', (e) => {
            e.preventDefault()
            switch(e.keyCode) {
                //Кнопка W - вверх
                case 87:
                    if(audioPlayerEngine === null) {
                        return;
                    }
                    audioPlayerEngine();
                    speedPlayUp();
                    break;
                //Кнопка S - вниз
                case 83:
                    if(audioPlayerEngine === null) {
                        return;
                    }
                    audioPlayerEngine();
                    speedPlayDown();
                    break;
                //Выстрел - пробел 
                case 32:
                    if(returnedFunction === null) {
                        return;
                    }
                    returnedFunction();
                    break;
            }
        });

          //Конец игры
    function gameOver() {
        containerGame.remove();
        openModalGameOver();
        returnedFunction = null;
        audioPlayerEngine =  null; 
        playerEngine.pause();
        musicGame.pause();
    };


    //Движение вверх Игрок
    function speedPlayUp() {
        let timerSpeedUp = setInterval(()=> {
            state.player.style.top = state.player.offsetTop - state.speedPlayer + 'px';
            if(state.player.offsetTop < 0) {
                state.player.style.top = 0;
            }
            clearInterval(timerSpeedUp);
        }, state.fps)
    };


    //Движение вниз Игрок
    function speedPlayDown() {
        let timerSpeedUp = setInterval(()=> {
            state.player.style.top = state.player.offsetTop + state.speedPlayer + 'px';
            if(state.player.offsetTop + state.player.offsetHeight > document.body.clientHeight) {
                state.player.style.top = document.body.clientHeight - state.player.offsetHeight + 'px';
            }
            clearInterval(timerSpeedUp);
        }, state.fps)
    };


    //Пуля
    function createBullet() {
        let bullet = document.createElement('div');
            bullet.className = 'bullet';
            bullet.style.top = state.player.offsetTop + 50 + 'px';
            document.body.appendChild(bullet);
            moveBullet(bullet);
            audioBullet();
    };


    //Движение пули
    function moveBullet(bullet) {
        let timerId = setInterval(()=> {
            bullet.style.left = bullet.offsetLeft + state.speedBullet + 'px';
            hitInEnemy(bullet, timerId);
            if(bullet.offsetLeft > document.body.clientWidth) {
                bullet.remove();
                clearInterval(timerId);
            };
        }, 10);
    };


    //Создание Врага
    function createEnemy() {
        let enemy = document.createElement('div');
            enemy.className = 'enemy';
            enemy.style.top = random(50, document.body.offsetHeight - 100) + 'px';
            document.body.appendChild(enemy);

        let timerId = setInterval(()=> {
            enemy.style.left = (enemy.offsetLeft - state.speedEnemy) + 'px';
            if(enemy.offsetLeft + enemy.offsetWidth < 0) {
                clearInterval(timerId);
                enemy.remove();
                createEnemy();
                // takeLife();
            } else if ( state.lifesPLayer === 0) {
                createEnemy = undefined;
            }
            inPlayer(); 
        }, 100);
        enemy.dataset.timer = timerId; 
    };


    //Попал во Врага
    function hitInEnemy(bullet, timer) {

        let enemy = document.querySelector('.enemy');

        let topBullet = bullet.offsetTop;
        let bottomBullet =  topBullet + bullet.offsetHeight;

        if(enemy != null) {
            let topEnemy = enemy.offsetTop;
            let bottomEnemy = topEnemy + enemy.offsetHeight;
        
            let leftBullet = bullet.offsetLeft;
            let leftEnemy = enemy.offsetLeft;
        
            if(topBullet >= topEnemy && bottomBullet <= bottomEnemy && leftBullet >= leftEnemy) {
                enemy.className = 'boom';
                enemy.style.top = (topEnemy - 90) + 'px';
                enemy.style.left = (leftEnemy - 80) + 'px';
                audioBoomEnemy();
                
                clearInterval(enemy.dataset.timer);
                setTimeout(()=> {
                    scorePlus();
                    enemy.remove();
                    bullet.remove();
                    createEnemy();
                    clearInterval(timer);
                }, 1000);
            }; 
        };     
    };


    //Рандом вылета Врага
    function random(min, max) {
        let rand = min + Math.random() * (max + 1 - min)
        return Math.floor(rand)
    };


    //Попадание в Игрока
    function inPlayer() {
        let enemy = document.querySelector('.enemy');

        if(enemy.offsetTop > state.player.offsetTop &&
            enemy.offsetTop < state.player.offsetTop + state.player.offsetHeight &&
            enemy.offsetLeft <= state.player.offsetLeft + state.player.offsetWidth) {

                enemy.className = 'boomPlayer';
                enemy.style.top = (state.player.offsetTop - 100) + 'px';
                enemy.style.left = (state.player.offsetLeft - 20) + 'px';
                clearInterval(enemy.dataset.timer);

                setTimeout(()=> {
                    if(state.lifesPLayer > 0) {
                        enemy.remove();
                        createEnemy();
                    }
                    if(state.lifesPLayer === 0) {
                        enemy.remove();
                        state.lifesIcon.classList.add('clear')
                    };
                }, 500);
                takeLife();
                audioPlayPain();
        };
    };


    //Потеря жизнией Игрока
    function takeLife() {
        state.lifesPLayer--;
        if(state.lifesPLayer != 0) {
            let live = state.lifesIcon.querySelector('span');
            live.remove();
        } else {
            gameOver();
        };
    };

    //Очки
    function scorePlus() {
        let score =  state.score++;
        let comber = document.querySelector('.comber');
        let setComber = `
            <label class='comber'> Очки: ${score + 1}</label>
        `;
        comber.innerHTML = setComber;
        stateScore.push(score);


    //Модальное окно уровней
    function firstModal(words) {
        let word = document.createElement('div');
        word.classList.add('wordFirst');
        word.insertAdjacentHTML('afterbegin',
            `
                <h2>${words}</h2>
            `
        );
        document.body.appendChild(word);
        setTimeout(() => {
            word.remove();
        }, 1500);

        return word;
    };


    //Уровень сложности от Очков
    switch(score) {
        case 10:
            state.speedEnemy++
            firstModal('Уровень 2');
            setTimeout(() => {
                createEnemy();
            },1000)
            console.log('Уровень 2');  
            break;
        case 25:
            state.speedEnemy++
            firstModal('Уровень 3');
            setTimeout(() => {
                createEnemy();
            },800)
            console.log('Уровень 3');  
            break;
        case 50:
            state.speedEnemy++
            firstModal('Уровень 4');
            setTimeout(() => {
                createEnemy();
            },600)
            console.log('Уровень 4');  
            break;
        case 100:
            state.speedEnemy++
            firstModal('Уровень 5');
            setTimeout(() => {
                createEnemy();
            },400)
            console.log('Уровень 5');  
            break;
        case 150:
            state.speedEnemy++
            firstModal('Уровень 6');
            setTimeout(() => {
                createEnemy();
            },200)
            console.log('Уровень 6');  
            break;
        };
    };
    createEnemy();    
};
