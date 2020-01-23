/**
 * At each step in time, the following transitions occur:

 Any live cell with fewer than two live neighbours dies, as if by underpopulation.
 Any live cell with two or three live neighbours lives on to the next generation.
 Any live cell with more than three live neighbours dies, as if by overpopulation.
 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

 Any live cell with two or three neighbors survives.
 Any dead cell with three live neighbors becomes a live cell.
 All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 * @param cellValue
 * @param surroundingLiveCellCount
 * @returns {number|*}
 */

export const getCellValue = (cellValue, surroundingLiveCellCount) => {
    if (cellValue) {
        if (surroundingLiveCellCount === 2 || surroundingLiveCellCount === 3) {
            return 1
        } else {
            return 0
        }
    } else {
        if (surroundingLiveCellCount === 3) {
            return 1
        } else {
            return 0
        }
    }
}

export const getRandomLiveOrDeadCell = () => {
    return Math.round(Math.random())
}
