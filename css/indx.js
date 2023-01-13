const EMPTY = ' ';
const X = 'X';
const O = 'O';
let whosMove = X;
let wins = [];

let area = [
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY]
];

function restart() {
  area = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
  ];

  for (let y = 1; y <= 3; y += 1) {
    for (let x = 1; x <= 3; x += 1) {
      console.log(y,x);
      let address = 'Z_' + y.toString() + '_' + x.toString();
      let elm = document.getElementById(address);
      elm.value = EMPTY;
    }
  }
}

function check(y,x,fig) {
  let sum = 0;
  
  //string
  for (let i = 0; i <= 2; i += 1) {
    if (area[y][i] == fig) {
      sum += 1;
    }
    if (sum == 3) {
      alert('congratulations, ' + fig + ' won!')
      restart();
      return true;
    }
  }

  //column
  sum = 0;
  for (let i = 0; i <= 2; i += 1) {
    if (area[i][x] == fig) {
      sum += 1;
    }
    if (sum == 3) {
      alert('congratulations, ' + fig + ' won!')
      restart();
      return true;
    }
  }

  //diagonal\
  if ((area[0][0] == fig) && (area[1][1] == fig) && (area[2][2] == fig)) {
    alert('congratulations, ' + fig + ' won!')
    restart();
    return true;
  }

  //diagonal/
  if ((area[0][2] == fig) && (area[1][1] == fig) && (area[2][0] == fig)) {
    alert('congratulations, ' + fig + ' won!')
    restart();
    return true;
  }

  return false;
}

function go(elm) {

  //check
  if (elm.value != EMPTY) {
    console.log('CANNOT PUT OVER YOURS');
    alert('CANNOT PUT OVER YOURS');
    return false;
  }

  //set value
  elm.value = whosMove;
  console.log(elm.id);
  let y, x;
  y = parseInt(elm.id[2]) - 1;
  x = parseInt(elm.id[4]) - 1;
  area[y][x] = whosMove;
  if (check(y,x,whosMove) == true) {
    wins.push(whosMove);
    let winsElm = document.getElementById('winers');
    winsElm.innerHTML = 'TOTAL WINS: ' + wins.join(', ');
    return true;
  };

  //swap
  if (whosMove == X) {
    whosMove = O;
  } else if (whosMove == O) {
    whosMove = X;
  } else {
    alert('INKNOW WHOSMOVE' + whosMove);
  }

  //info
  let infoElm = document.getElementById('info');
  infoElm.innerHTML = 'CURRENT TURN: ' + whosMove;
  console.log('\n' + area[0].join('') + '\n' + area[1].join(' ') + '\n' + area[2].join('') + '\n');
}
