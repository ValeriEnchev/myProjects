console.log("tic tac toe");

let turn = -1;

function addStyleSelector(iText) {
	const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = iText;
    document.head.appendChild(styleSheet);
}

const cells = [];
const players = [
					{id: -1, shape: 'X', shapeId: 'shape-x'}, 
					{id: 1, shape: 'O', shapeId: 'shape-o'}
				];

function getPlayerID(id) {
	return players.filter(p => p.id === id)[0].id;
}
function getPlayerShape(id) {
	return players.filter(p => p.id === id)[0].shape;
}
function getPlayerShapeID(id) {
	return players.filter(p => p.id === id)[0].shapeId;
}

function cellGetStatByIdx(arr, index) {
	return arr[index].stat;
}
function cellGetStat(arr, id) {
	let k = cellGetIdx(arr, id);
	return cellGetStatByIdx(arr, k);
}
function cellSetStat(arr, id, s) {
	let k = cellGetIdx(arr, id);
	if (k < 0) {
       return false;
	} else { 
	   arr[k].stat = s;
	   return true;
    }
}
function cellGetID(arr, index) {
	return arr[index].id;
}
function cellGetIdx(arr, id) {
	for (let k = 0 ; k < arr.length ; k++) {
		if (arr[k].id === id) return k;
	}
	return -1;	
}
function cellGetX(arr, id) {
	let k = cellGetIdx(arr, id);
	return (k%3) + 1;
}
function cellGetY(arr, id) {
	let k = cellGetIdx(arr, id);
	return Math.floor(k/3) + 1;
}
function cellGetIdxFromXY(arr, x, y) {
	return (x - 1) + 3*(y - 1);
}

function hintPlayer(arr, id) {

	let hintColour ;
	switch (id) {
		case -1: 
			hintColour = 'red';
			break;
		case 1:  		  
			hintColour = 'black';
			break;
		default:
			hintColour = '#ccc';
			break;		
	}
	const hintStyle = document.querySelector('style'); // apllied on the first element only!
	hintStyle.innerHTML = `.hint { border: 2px solid ${hintColour}; }`;
}


function roundN(n, d=0){
	const e = Math.pow(10, d);
	return Math.round(n * e) / e;
}
function calcDistance(x1, y1, x2, y2) {
	return roundN(Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1)), 3);
}
function hasDeviation(d1, d2, d3){
	console.log(`D1 + D2 - D3 = ${roundN(d1 + d2 - d3,3)}`);
	return ( (d1 + d2 - d3) === 0 ) ? true : false; 
}	

function hasWinner(arr, id) {
	let curPlayerId = cellGetStat(arr, id);
	let curPlayerCells = arr.filter(c => c.stat === curPlayerId);

	console.log(`chekForWinner player '${getPlayerShape(curPlayerId)}'`);
	console.log(curPlayerCells);

    //console.log(`Player ${getPlayerShape(curPlayerId)} ${getPlayerShapeID(curPlayerId)}`);
    console.log("Analyze...");
	
	for ( let i = 0; i < curPlayerCells.length; i++) {
		const c1 = curPlayerCells[i];
		//console.log(c1.id);

		for (let j = i+1; j < curPlayerCells.length; j++) {
			const c2 = curPlayerCells[j];
			//console.log(c2.id);

			for (let k = j+1; k < curPlayerCells.length; k++) {
				const c3 = curPlayerCells[k];
				//console.log(c3.id);

				const x1 = cellGetX(cells, c1.id);
				const y1 = cellGetY(cells, c1.id);
				const x2 = cellGetX(cells, c2.id);
				const y2 = cellGetY(cells, c2.id);
				const x3 = cellGetX(cells, c3.id);
				const y3 = cellGetY(cells, c3.id);	

				const D1 = calcDistance(x1, y1, x2, y2);
				const D2 = calcDistance(x2, y2, x3, y3);	
				const D3 = calcDistance(x1, y1, x3, y3);					

				console.log(`[i:${i}-j:${j}] C1[${i}]:${c1.id} - C2[${j}]:${c2.id} ::: D1:${D1}  `);
			  	console.log(`[j:${j}-k:${k}] C2[${j}]:${c2.id} - C3[${k}]:${c3.id} ::: D2:${D2}  `);
			 	console.log(`[i:${i}-k:${k}] C1[${i}]:${c1.id} - C3[${k}]:${c3.id} ::: D3:${D3} ~`);
				
				if ( hasDeviation(D1, D2, D3) ) {
					console.log('Line!!!');
					addStyleSelector(`#${c1.id}, #${c2.id}, #${c3.id} { border: 3px solid lightgreen; }`);			

					return true;
				}
			}
		}
	}
	console.log('...done');

	return false;
}

function hasMoreTurns(arr) {
	let freeCells = arr.filter(c => c.stat === 0);
	//console.log(freeCells);
	console.log(`Number of free cells ::: ${freeCells.length}`);

	return (freeCells.length === 0) ? false : true;
}


const gameBoardDiv = document.getElementById("gameBoard");

for (let i = 0; i < 9; i++ ) {

	const newID = `item-${i+1}`;


	const itemDiv = document.createElement("div");
	itemDiv.id = newID;
	itemDiv.classList.add("item");
	gameBoardDiv.appendChild(itemDiv);		


	const svgShapeX = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgShapeX.setAttribute("viewBox", "0 0 100 100");
	svgShapeX.classList.add("shape-x");	
	itemDiv.appendChild(svgShapeX);	

	const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	svgPath.setAttribute("d", "M20,20 L80,80 Z M80,20 L20,80 Z");
	svgShapeX.appendChild(svgPath);	


	const svgShapeO = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgShapeO.setAttribute("viewBox", "0 0 100 100");
	svgShapeO.classList.add("shape-o");
	itemDiv.appendChild(svgShapeO);	
	
	const svgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	svgCircle.setAttribute("cx", "50");
	svgCircle.setAttribute("cy", "50");
	svgCircle.setAttribute("r", "32");
	svgShapeO.appendChild(svgCircle);	


	const dummyShape = document.createElement("svg");
	dummyShape.setAttribute("viewBox", "0 0 100 100");
	dummyShape.classList.add("dummy-shape");
	itemDiv.appendChild(dummyShape);
	
	const svgRect = document.createElement("rect");
	svgRect.setAttribute("x", "0");
	svgRect.setAttribute("y", "0");
	svgRect.setAttribute("width", "1");
	svgRect.setAttribute("height", "1");
	dummyShape.appendChild(svgRect);
	
	
	cells.push({stat:0, id:newID});
	
	
	//console.log(`id:::${cellGetID(cells,i)} stat:::${cellGetStatByIdx(cells,i)}`);
   
	//console.log(newID);
	//console.log(svgShapeX);
	//console.log(svgShapeO);
	//console.log(dummyShape);
	
}

//addStyleSelector("#item-9.item { background-color: yellow; }");
//addStyleSelector("#item-1 .shape-x { display:block; }");
//addStyleSelector("#item-4 .shape-o { display:block; }");

//cellSetStat(cells,'item-2', -1);
//cellSetStat(cells,'item-5', 1);

//console.log(cells);
//console.log(players);
//console.log(getPlayerID(-1));
//console.log(getPlayerShape(-1));
//console.log(getPlayerShapeID(-1));

gameBoardDiv.querySelectorAll('div').forEach(element => {
  element.addEventListener('click', () => {     

    const myID = element.getAttribute('id');
	//console.log(`::${myID} ::${cellGetStat(cells, myID)}`);
	const cellStatus = cellGetStat(cells, myID);
	if ( cellStatus === 0) {
		const myShape = getPlayerShapeID(turn);
		console.log(`myID=${myID}, myTurn=${turn}, myShape=${myShape} `);
		addStyleSelector(`#${myID} .${myShape} { display: block; }`);
		cellSetStat(cells, myID, turn);
		const currDiv = document.querySelector(`#${myID}`);
		currDiv.classList.remove("hint");
		let msg;
		if (hasWinner(cells, myID)) {
		    msg = `${getPlayerShape(turn)} has won!`;
			//console.log(msg);
		} else if (!hasMoreTurns(cells)) {
			msg = "Cats game!"
			//console.log(msg);
		}	
       	if (msg) {
			console.log(msg);
			setTimeout(function(){ 
				alert(msg); 
				// reload page
				window.location.href = window.location.href; 
			}, 10);
		}	
		turn = - turn;
		hintPlayer(cells, turn);
    } else {
		console.log('Pass');
	}
  })
})	

gameBoardDiv.querySelectorAll('div').forEach(element => {
  element.addEventListener('mouseover', () => { 

	const myID = element.getAttribute('id');
	const cellStatus = cellGetStat(cells, myID);
	const currDiv = document.querySelector(`#${myID}`);
	hintPlayer(cells, turn);
	if ( cellStatus === 0) {
		currDiv.classList.add("hint");
	} else {
		currDiv.classList.remove("hint");
	}
  
  })
})	

gameBoardDiv.querySelectorAll('div').forEach(element => {
  element.addEventListener('mouseout', () => { 

	const myID = element.getAttribute('id');
	const cellStatus = cellGetStat(cells, myID);
	const currDiv = document.querySelector(`#${myID}`);
	currDiv.classList.remove("hint");
  
  })
})	