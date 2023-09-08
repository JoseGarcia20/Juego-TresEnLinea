import { winners_Combos } from "../constansts"

//Comprobar quien es el ganador
export const checkWinner = (boardToChekc) => {

    //Revisamos todas las combinaciones ganadoras
    for (const combo of winners_Combos){
      const [a,b,c] = combo
      if(
        boardToChekc[a] &&
        boardToChekc[a] == boardToChekc[b] &&
        boardToChekc[b] == boardToChekc[c]
      ){
        return boardToChekc[a]
      }
    }

    // Si no hay ganador
    return null
  }

export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíos
    // en el tablero
    return newBoard.every((square) => square !== null)
  }