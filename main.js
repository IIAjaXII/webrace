const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div'),
hiscore = document.querySelector('.hiscore'),
left = document.querySelector('.left'),
right = document.querySelector('.right');






car.classList.add('car');

start.addEventListener('click',startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}
const setting = {
    start:false,
    score: 0,
    speed: 3,
    traffic: 3,
    hiscore: 0,
    touchleft:0,
    touchright:0
}
function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement +1;
}



function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    

    for(let i = 0; i<getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100)+'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for(let i = 0; i < getQuantityElements( 100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50))+'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url('./image/enemy2.png') center / cover no-repeat`;
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.speed =3;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}


function playGame(){
    
    if(setting.start){
        if(setting.score >= setting.hiscore ){
            setting.hiscore = setting.score;
        }
        if(setting.score>3000){
            setting.speed = Math.floor(setting.score/1000);
        }
        
        setting.score += setting.speed;
        score.innerHTML = 'Текущий заезд<br> ' +setting.score;
        hiscore.innerHTML = 'Лучший заезд<br> ' + setting.hiscore;
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x>0 || setting.touchleft && setting.x>0 ){
            setting.x -= 10;
        }
        if(keys.ArrowRight && setting.x<(gameArea.offsetWidth-50) || setting.touchright && setting.x<(gameArea.offsetWidth-50) ){
            setting.x += 10;
        }
        if(keys.ArrowDown && setting.y<(gameArea.offsetHeight-car.offsetHeight)){
            setting.y += 10;
        }
        if(keys.ArrowUp && setting.y>0){
            setting.y -= 10;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';


        requestAnimationFrame(playGame);
    }
    
}



left.addEventListener('touchstart',()=>{
    setting.touchleft = 1;
    });
left.addEventListener('touchend',()=>{
    setting.touchleft = 0;
   })

right.addEventListener('touchstart',()=>{
    setting.touchright = 1;
    });
right.addEventListener('touchend',()=>{
    setting.touchright = 0;
   })


function startRun(event){
    
    if(keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = true;
    }
    
    
}


function stopRun(event){
    
    if(keys.hasOwnProperty(event.key)){
        event.preventDefault();
        keys[event.key] = false;
    }
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y+'px';

        if(line.y >= document.documentElement.clientHeight){
            line.y = -100;
        }
    })
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if(carRect.top<= enemyRect.bottom && 
            carRect.right >= enemyRect.left && 
            carRect.left <= enemyRect.right && 
            carRect.bottom >= enemyRect.top){
            setting.start = false;
            start.classList.remove('hide');
            start.style.top = start.offsetHeight;
        }

        item.y += setting.speed/2;
        item.style.top = item.y + 'px';
        if(item.y>= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth-50))+'px';
        }
    })
   
}