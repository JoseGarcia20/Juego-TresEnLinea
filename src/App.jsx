import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { turns, winners_Combos } from './constansts.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage'

function App() {

  //Tablero del juego Array de 9 casillas
    //Manejo de estados (Estado para actualizar el tablero)
  const [board, setBoard] = useState(() => {
    
    //Hacer el guardado en el localStorage
    const boardFromStorage = window.localStorage.getItem('board')

    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  //Estado para saber de quien es el turno (Empezara con la x)
  const [turn, setTurn] = useState(() => {
    
    //Hacer el guardado en el localStorage
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? turns.x
  })
  
  //Estado para detectar si el jugador gano o no 
  // |null = no hay ganador , false = Empate|
  const [winner, setWinner] = useState(null)

  //EMPEZAR DE NUEVO
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)

    resetGameStorage()
  }

  //Funcion para actualizar tablero, turnos, etc.
  const updateBoard = (index) => {

    // Si ya hay algo en la casilla, no actualizar
    // Si hay un ganador, no actualizar
    if(board[index] || winner ) return

    //Nuevo boar el cual guardara la posisicon del turno actual al dar clic en el, por ultimo se lo pasamos al estado del board
    const newBoard = [...board] //copia del board
    newBoard[index] = turn // X u O
    setBoard(newBoard)

    //Si el turno es X el siguiente turno será O, o si es al contrario
    const newTurn =  turn === turns.x ? turns.O : turns.x
    setTurn(newTurn)

    //guardar partida en localStorage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(() => {
        confetti()
        setWinner(newWinner)
      })
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
  }



  return (
    <main className='board'>
      <h1>Juego Tic Tac Toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      
      <section className='game'>
        {
          //Reenderizamos el indice
            //En el prop de updateBoard, le pasamos la funcion completa para ejecutarla cada vez que la necesitemos
            //Es la primera posicion
          board.map((square, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board [index]}
              </Square>
            )
          })
        }
      </section>



      {/* Cambiar el contenido de un componente, teniendo en cuenta el estado del mismo
          si el estado de turn, es x, se mostrara el contenido de x, si el estado es O, se mostrara el contenido de O
      */}
      <section className='turn'>
        
        <h1>Turnos del Jugador</h1>

        <Square isSelected={turn == turns.x}>{turns.x}</Square>
        <Square isSelected={turn == turns.O}>{turns.O}</Square>

      </section>

      
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
