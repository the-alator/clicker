let canvas = document.getElementById("mainCanv");
let draw = canvas.getContext("2d");
let horizontalPagePart = document.documentElement.clientWidth/8;
let verticalPagePart = document.documentElement.clientHeight/20;

let elementActions = [];
let colors = ["#02440c", "#e4d565", "#40becd", "#f3f5e7", "#f891a0", "#a0a50d", "#564726", "#fecf67", "#d2b3b7", "#2f5c33", "#f46500", "#8B4513",
              "#a20417", "#FFD000", "#37FF00", "#00FFFF", "#0040FF", "#A754FF", "#FF00BB", "#FF0000", "#000000", "#ffffff", "#FFFFF0", "#008080"];

let elements = [];

////////////////////

// let testActionsArrival = 0;
fillActions();
createElements();


document.addEventListener("mousedown", mouseClicked);

repaint();

//////////////////////
function repaint(){
    draw.clearRect(0,0,canvas.width,canvas.height);
    for(let e of elements){
        if(e != undefined)
            e.draw();
    }
}


function mouseClicked(event){
    if(event.x > horizontalPagePart && event.x < horizontalPagePart + canvas.width && event.y > verticalPagePart && event.y < verticalPagePart + canvas.height) {
        for (let e of elements) {
            if(e != undefined)
                e.onclick(event.x - horizontalPagePart, event.y - verticalPagePart);
        }
    }
    repaint();
    console.log("MOUSECLICKED");
}

function Element(){
    console.log(elementActions.length);
    this.action = randInt(0,elementActions.length);
    this.color = colors[randInt(0,colors.length)];
}

function Circle(i){
    Element.call(this);

    this.index = i;
    this.radius = randInt(10,150);
    this.x = randInt(this.radius, canvas.width - this.radius);
    this.y = randInt(this.radius, canvas.height - this.radius);
    this.onclick = function(x,y){
        // console.log("click circle 1");
        if(Math.sqrt(Math.pow((this.x - x),2) + Math.pow((this.y - y),2)) < this.radius) {
            console.log("action: " + this.action);
            elementActions[this.action](this);
        }
    };
    this.draw = function(){
        draw.beginPath();
        draw.fillStyle = this.color;
        draw.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        draw.fill();
        draw.closePath();
    };
}

function Rectangle(i){
    Element.call(this);

    this.index = i;
    this.height = randInt(20,150);
    this.width = randInt(20,150);
    this.x = randInt(0, canvas.width - this.width);
    this.y = randInt(0, canvas.height - this.height);
    this.onclick = function(x,y){
        // console.log("click rectangle 1");
        if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            console.log("action: " + this.action);
            elementActions[this.action](this);
        }
    };
    this.draw = function(){
        draw.beginPath();
        draw.fillStyle = this.color;
        draw.fillRect(this.x,this.y,this.width,this.height);
        draw.closePath();
    }
}

function createElements(){
    let maxElements = randInt(10,50);
    for(let a = 0; a < maxElements; a++){
        switch (randInt(0, 2)){
            case 0:
                elements[a] = new Circle(a);
                break;
            case 1:
                elements[a] = new Rectangle(a);
                break;
        }

    }
}

function fillActions(){
    elementActions[0] = function(p){
        p.x += 5;
    };
    elementActions[1] = function(p){
        p.x -= 5;
    };
    elementActions[2] = function(p){
        p.y += 5;
    };
    elementActions[3] = function(p){
        p.y -= 5;
    };
    elementActions[4] = function(p){
        if(p.radius === undefined)
            p.width += 5;
        else
            p.radius += 5;
    };
    elementActions[5] = function(p){
        if(p.radius === undefined)
            p.width -= 5;
        else
            p.radius -= 5;
    };
    elementActions[6] = function(p){
        if(p.radius === undefined)
            p.height += 5;
        else
            p.radius += 5;
    };
    elementActions[7] = function(p){
        if(p.radius === undefined)
            p.height -= 5;
        else
            p.radius -= 5;
    };

    elementActions[10] = function(p){
        p.color = colors[randInt(0,colors.length)];
    };
    elementActions[11] = function(){
        canvas.style.background = colors[randInt(0,colors.length)];
    };
    elementActions[9] = function(p){
        elements[p.index] = undefined;
    };
    elementActions[8] = function(p){
        if(p.radius !== undefined){
            p.x = randInt(0, canvas.width - p.width);
            p.y = randInt(0, canvas.height - p.height);
        }else{
            p.x = randInt(p.radius, canvas.width - p.radius);
            p.y = randInt(p.radius, canvas.height - p.radius);
        }

    }
}

function randInt(min,max){
    return (Math.floor(Math.random() * max)) + min;
}

