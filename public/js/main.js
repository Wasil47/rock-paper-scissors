const classArr = document.querySelectorAll("#rock-paper-scissors > div");

// Create Array with ALL Class Names
const arrClassNames = (arr) => {
  const classNames = [];
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr[i].classList.length; j++) {
      const classN = arr[i].classList[j];
      classNames.push(classN);
    }
  }
  return classNames;
};

// Create Array with Selected Elements (input arr with class names)
const selectElements = (arrWithClassNames) => {
  const elements = [];
  for (let i=0; i<arrWithClassNames.length; i++) {
    const e = document.querySelector('.'+arrWithClassNames[i]);
    elements.push(e);
  }
  return elements;
};

// Create Object -> className : Element
const classObj = (key, value) => {
  const obj = {};
  if (key.length == value.length) {
    for (let i=0; i<key.length; i++) {
      obj[key[i]] = value[i];
    }
  } else {
    console.log(key.length+' is not equal '+value.length);    
  }
  return obj;
};

// Create myObj including all div class {className: DOMelement}
const classNames = arrClassNames(classArr);
const elements = selectElements(classNames);
const myObj = classObj(classNames, elements);

// Game code start here
const pickPosX = myObj.playerPick.offsetLeft;
const pickPosY = myObj.playerPick.clientHeight;
const arrPlayer = ['rp', 'pp', 'sp']; // players picks (class names)
const arrAI = ['ra', 'pa', 'sa']; // AI picks (class names)
let playerPoints = 0;
let AIpoints = 0;

let allowAnim = true;

// Game Brain
const movePicked = (e) => {   
    myObj[e].addEventListener('click', ()=>{   
      const ranP = arrAI[Math.floor(Math.random()*3)]; // RandomPick
      const moveX = pickPosX - myObj[e].offsetLeft;
      const moveY = -pickPosY;
      const AImoveX = pickPosX - myObj[ranP].offsetLeft;    
  
      if (allowAnim) { // one move at a time
        allowAnim = false;
        myObj[e].style.transform = `translate(${moveX}px, ${moveY}px)`;
        myObj[ranP].style.transform = `translate(${AImoveX}px, ${-moveY}px)`;

        if ( e[0] == ranP[0] ) {
          console.log('Draw');
        } else if ( 
          (e[0] == 'r' && ranP[0] == 's') || 
          (e[0] == 'p' && ranP[0] == 'r') || 
          (e[0] == 's' && ranP[0] == 'p')) {
          console.log('Win!');
          playerPoints++;
        } else {
          console.log('Lose!');
          AIpoints++;
        };
        myObj.playerPick.innerText = playerPoints;
        myObj.AIpick.innerText = AIpoints;
        setTimeout(()=>{ // back to start position
          myObj[e].style.transform = `translate(0px)`;
          myObj[ranP].style.transform = `translate(0px)`;
          allowAnim = true; // let next move
        }, 1300);
      };
    }); 
};

arrPlayer.forEach(movePicked);