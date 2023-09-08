//Cuadrado del tablero
export const Square = ({ children, isSelected, updateBoard, index }) => {

    //Depende del valor de isSelected, determina si escoge la clase is-select o no elige nada
    const className = `square ${isSelected ? 'is-selected': ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }