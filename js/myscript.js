
function generaCelle( numeroCelle ){
    let contatore = 1;
    for(let i=0;i < numeroCelle; i++){

        tabella.innerHTML += `<div id="riga-${i}" class="d-flex flex-row justify-content-center align-items-center"></div>`;
        const riga = document.getElementById( "riga-" +i );
        
        for(let j=0;j < numeroCelle; j++){

                riga.innerHTML += 
                `<div id="cella-${i}-${j}" class="col-1 blocco">${ ( numeroCelle * i ) + j +1 } 
                </div> `;

                contatore++
        } 
        
    } 
}

function selezionaCelle(myArray){
    for (let index = 0; index < myArray.length; index++) { 

        myArray[index].addEventListener("click",function(){

            if( !gameEnded )
            {
                //this.classList.remove("blocco");
                this.classList.add("acqua");
            }
            
    
        });
    }   
}


function randomNum(numeroCelle){
    let num = Math.floor(Math.random()*numeroCelle);
    return num;
}

function generaBombe(num,colPerRow,sentinella){

    const bombePiazzate = [];

    while( bombePiazzate.length < num )   
    {
        let bombaRiga = randomNum(colPerRow);
        let bombaCol  = randomNum(colPerRow);
        let cellaBomba = document.getElementById("cella-"+bombaRiga+"-"+bombaCol);
        
        if( !bombePiazzate.includes( bombaRiga+"-"+bombaCol ) )
        {
            bombePiazzate.push(bombaRiga+"-"+bombaCol)

            cellaBomba.addEventListener("click",function(){

                if( !gameEnded )
                {
                    //this.classList.remove("blocco");
                    this.classList.add("red");
                    scopriBombe(bombePiazzate);
                }

                gameEnded = true 


            });
        }
        //--fine controllo
    }
    return bombePiazzate;
}


function scopriBombe(listabombe){
    const listaCelle = document.querySelectorAll(".blocco");
    for (let index = 0; index < listaCelle.length; index++) {
        const cella = listaCelle[index];
        
        if (listabombe.includes(cella.getAttribute("id").replace("cella-",""))){
            cella.classList.add("red");
        }
        
    }
}
// al click stabilizzo il livello e creo la tabella di gioco di conseguenza
let gameEnded = false 

document.getElementById("play").addEventListener("click",function(){
        
        //stabilizzo il livello e creo la tabella di gioco di conseguenza
        const lv = document.getElementById("modalita").value;
        let tabella = document.getElementById("tabella");
        let colPerRow = 10;

        //controllo difficoltà e creazione tabella di conseguenza

        tabella.innerHTML = "";
        if( lv == "facile" ) {            
            colPerRow = 10;            
        };
    
        if( lv == "media" ) {           
            colPerRow = 9;
        };

        if( lv == "difficile" ) {           
            colPerRow = 7;           
        };

        generaCelle( colPerRow ); 

        let myArray = document.getElementsByClassName("blocco");

        selezionaCelle(myArray);
        
        bombe = 16; 
        
        generaBombe(bombe,colPerRow,gameEnded)

});
