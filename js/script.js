"use strict"


//Хранилище
const state = {
    player: document.querySelector('#player'),
    lifesIcon: document.querySelector('#lifes'),
    game: document.querySelector('.wrapper'),
    positionPlayerY: 0, 
    lifesPLayer: 3,
    speedPlayer: 70,
    speedBullet: 20,
    speedEnemy: 100,
    score: 0,
    fps: 1000/60,
};


function launchingGame() {

        const containerGame = document.querySelector('.wrapper');

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

        //Кнопки начального меню
        document.querySelector('.btnStart').addEventListener('click', openFormModal);
        document.querySelector('.btnTopPlayer').addEventListener('click', startTable);
        document.querySelector('.btnExite').addEventListener('click', exitGame);


        function closeStartMenu() {
            startMenu.remove()
        }

        function openFormModal() {
            closeStartMenu();
            startWindowFormModal();
            beginningGame();
        }


        //FormModal имя игрока
        function startWindowFormModal() {
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


            //Проверка input
            let inputForm = document.querySelector('.inputForm'); 

            function infoOfForm() {
                if(!inputForm.value) {
                    return;
                }
                displayTableScores();
                inputForm.value = "";
            };

            return formModal;
        }




        //Обьект для хронения данных игрока
        function pushData() {
            const objectSavePlayer = {
                name: inputForm.value,
                score: statePlayer.length,
            };
            return console.log(objectSavePlayer)
        };

          


      
        //Функция для работы с GET
        // function sendRequestGet(url, method) {
        //     return fetch(url).then(response => response.json())
        // };


        //Функция для работы с POST
        // function sendRequestPost(url, method, body = null) {
        //     const headers = { 
        //         'Content-Type':'application/json'
        //     };
        //     return fetch(url, {
        //         method: method,
        //         body: JSON.stringify(body),
        //         headers: headers
        //     })
        //     .then(response => response.json())
        // };



        // sendRequestGet('GET', url)
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))

        
        // function go() {
        //     sendRequestPost('POST', url, objectSavePlayer)
        //     .then(data => console.log(data))
        //     .catch(err => console.log(err))
        // }


        //Запуск игры
        // document.querySelector('.btnStartGame').addEventListener('click', beginningGame);


        // //Открыть окноForm
        // function openModalForm() {
        //     formModal.classList.add('formModalOpen');
        // };


        //Старт игры с меню
        function beginningGame () {
            infoOfForm();
            formModal.remove();
            containerGame.classList.add('wrapper_open');
            startMenu.classList.add('startMenuClose');
            startGame();
        };


        //Блок таблицы очков игроков
        let tableDiv = document.createElement('div');
        tableDiv.classList.add('tableScore');
        tableDiv.insertAdjacentHTML('afterbegin',
            `   
                <div class="tableScore_blackLinz">
                    <h2 class="tableScore_title"> Топ 10 </h2>
                    <div class="tableScore_item">
                        <ul id="tableUl">
                            <li> Игрок 1  Игрок 1  Игрок 1 </li>
                            <li> Игрок 2 </li>
                            <li> Игрок 3 </li>
                            <li> Игрок 4 </li>
                            <li> Игрок 5 </li>
                            <li> Игрок 6 </li>
                            <li> Игрок 7 </li>
                            <li> Игрок 8 </li>
                            <li> Игрок 9 </li>
                            <li> Игрок 10 </li>
                        </ul>
                    </div>
                    <div class="tableScore_buttons">
                        <button class="btnStartGameTableScore">В бой</button>
                        <button class="btnMenuTableScore">В меню</button>
                        <button class="btnExiteTableScore">Выйти</button>
                    </div>
                </div>
            `
        );
        document.body.appendChild(tableDiv);


        //В бой когда в табоице игроков
        document.querySelector('.btnStartGameTableScore').addEventListener('click', ()=> {
            tableDiv.remove();
            beginningGame();
        });

        //В меню в таблицы
        document.querySelector('.btnMenuTableScore').addEventListener( 'click', () => {
            window.location.reload();
        });
    
        //Выйти из игры в таблице Игроков
        document.querySelector('.btnExiteTableScore').addEventListener('click', exitGame);


        //Запуск таблицы игроков
        function startTable() {
            tableDiv.classList.add('tableScoreOpen');
        };
    

        //Создание списка очков и игроков
        function displayTableScores() {

            let tableUl = document.querySelector('#tableUl');
            let table = "";
            statePlayer.forEach((item , i) => {
            table += 
            `
                <li> ${i + 1} - Игрок: ${inputForm} Очки: 10  </li>
            `;
            tableUl.innerHTML = table;  
            });
        };


        //Выход из игры
        function exitGame() {
            window.close();
        };


        //Старт игры
        function startGame() {

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

        //Управление Игрока


        //Движение вверх Игрок
        function speedPlayUp() {
            let timerSpeedUp = setInterval(()=> {
                state.player.style.top = state.player.offsetTop - state.speedPlayer + 'px';
                if(state.player.offsetTop < 0) {
                    state.player.style.top = 0;
                }
                clearInterval(timerSpeedUp)
            }, state.fps)
        };


        //Движение вниз Игрок
        function speedPlayDown() {
            let timerSpeedUp = setInterval(()=> {
                state.player.style.top = state.player.offsetTop + state.speedPlayer + 'px';
                if(state.player.offsetTop + state.player.offsetHeight > document.body.clientHeight) {
                    state.player.style.top = document.body.clientHeight - state.player.offsetHeight + 'px';
                }
                clearInterval(timerSpeedUp)
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


        //Очки
        function scorePlus() {
            let score =  state.score++;
            let comber = document.querySelector('.comber');
            let setComber = `
                <label class='comber'> Очки: ${score + 1}</label>
            `;
            comber.innerHTML = setComber;
            statePlayer.push(score);


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
                    firstModal('Level 2');
                    createEnemy();
                    console.log('Level 2');  
                    break;
                case 25:
                    state.speedEnemy++
                    firstModal('Level 3');
                    createEnemy();
                    createEnemy();
                    console.log('Level 3');  
                    break;
                case 50:
                    state.speedEnemy++
                    firstModal('Level 4');
                    createEnemy();
                    createEnemy();
                    createEnemy();
                    console.log('Level 4');  
                    break;
                case 100:
                    state.speedEnemy++
                    firstModal('Level 5');
                    createEnemy();
                    createEnemy();
                    createEnemy();
                    createEnemy();
                    console.log('Level 5');  
                    break;
        };
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
                    audioPlayPain();

                    setTimeout(()=> {
                        enemy.remove();
                        createEnemy();
                        enemyEngine.pause();
                    }, 500);
                    takeLife();
                    enemyEngine.pause();
            }
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
                    takeLife();
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

        
        //Потеря жизнией Игрока
        function takeLife() {
            let enemy = document.querySelector('.enemy');
            state.lifesPLayer--;
            if(state.lifesPLayer != 0) {
                let live = state.lifesIcon.querySelector('span');
                live.remove();
            } else {
                gameOver();
                createEnemy = undefined;
                enemy.remove();
                enemyEngine.pause();
            }
        };


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

     

        //Музыка фон
        function playMusic() {
            musicGame.currentTime = 0;
            musicGame.play();
            musicGame.volume = 0.6;
            musicGame.loop = true;
        };

        playMusic();


        //Конец игры
        function gameOver() {
            stopGame();
            openModalGameOver();
            pushData();
            enemyEngine.pause();
            musicGame.pause();
            playerEngine.pause();
            audioEnemeEngine = undefined;
            createEnemy = undefined;
            inPlayer = undefined;
            takeLife = undefined;
        };

        //Стоп игра
        function stopGame() {
            state.game.classList.add('startMenuClose');
        };

        //Пушим в массив очки
        function pushScore() {
            let  totalScore = statePlayer.length;
            return totalScore;
        };


        //Враги
        createEnemy();


    //Окно меню при конце игры
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
                            <button data-restart="true">Снова в бой</button>
                            <button data-topPlayer="true">Список топ 10</button>
                            <button data-menu="true">В меню</button>
                            <button data-exit="true">Выйти</button>
                        </div>
                    </div>
                </div>
            `);
            document.body.appendChild(modalGameOver);
    
            modalGameOver.addEventListener('click', e => {
                e.preventDefault();
                let event = e.target.dataset;
    
                if(event.restart) {
                    closeModal();
                    beginningGame();
                }  if(event.topplayer) {
                    startTable();
                } else if(event.menu) {
                    window.location.reload();
                } else if(event.exit) {
                    window.close();
                }
            });
    
            function closeModal() {
                modalGameOver.classList.add('modalClose');
            };
            return modalGameOver;
        };
    };//Конец кнопка старт
};

launchingGame();