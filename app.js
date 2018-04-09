var score, roundScore, activePlayer, gamePlaying, A = 0;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){   
    if(gamePlaying){
		// 1. Random number
        var dadu1 = Math.floor(Math.random() * 6) + 1;
        var dadu2 = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
        var daduDOM = document.querySelector('.dadu1');
        var daduDOM2 = document.querySelector('.dadu2');
        daduDOM.style.display = 'block';
        daduDOM2.style.display = 'block';
        daduDOM.src = 'dice-' + dadu1 + '.png';
        daduDOM2.src = 'dice-' + dadu2 + '.png';
        
        var simpan = document.createTextNode("[" + dadu2 + "," + dadu1 + "]");
        document.getElementById('history').appendChild(simpan);
		//3. Update the round IF the rolled number was not a 1
        if (dadu1 !==1 && dadu2 !== 1)
        {
			//Add score
            roundScore += dadu1 + dadu2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
			if(dadu1===6 || dadu2 === 6){
				A += 1;
				if(A === 2){
					scores[activePlayer] = 0;
					document.querySelector('#score-' + activePlayer).textContent = 0;
					nextPlayer();
				}
			}
			else{
				A = 0;
			}
        }
        else{
			//next player
			A = 0;
			nextPlayer();
        }
        
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){    
    if(gamePlaying){
		var batas = document.querySelector('.skorakhir').value;
		//Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
        
		//Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		var skorakhir;
		
		//Check if player won the game
		if(batas){
			skorakhir = batas;
		}
		else{
			skorakhir = 100;
		}
        if (scores[activePlayer] >= skorakhir){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dadu1').style.display = 'none';
			document.querySelector('.dadu2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            gamePlaying = false;
        }
        else{
			//Next player
			nextPlayer();
        }
    }
});

function nextPlayer(){
	//Nexy player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
	A = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
}
document.querySelector('.btn-new').addEventListener('click', init);
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;    
    document.querySelector('.dadu1').style.display = 'none';
    document.querySelector('.dadu2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
