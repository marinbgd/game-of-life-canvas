import { getCellValue, getRandomLiveOrDeadCell } from './cell.helper'


export const getInitialGrid = ({rows, cols}) => {
    let grid = []

    for (let i = 0; i < rows; i += 1) {
        const row = []
        for (let j = 0; j < cols; j += 1) {
            row.push(getRandomLiveOrDeadCell())
        }
        grid.push(row)
    }

    return grid
}

export const getNextGrid = grid => {
    let newGrid = grid.slice()

    const totalRows = grid.length
    const totalCols = grid[0].length

    for (let i = 0; i < totalRows; i += 1) {
        const newRow = grid[i].slice()
        for (let j = 0; j < totalCols; j += 1) {
            const cell = grid[i][j]
            const nearbyLivingCellCount = getNearbyLivingCellCount(grid, i, j)
            newRow[j] = getCellValue(cell, nearbyLivingCellCount)
        }
        newGrid[i] = newRow
    }

    return newGrid
}

export const renderGrid = (ctx, grid, cellSize) => {
    const totalRows = grid.length
    const totalCols = grid[0].length

    for (let i = 0; i < totalRows; i += 1) {
        for (let j = 0; j < totalCols; j += 1) {
            const cell = grid[i][j]

            ctx.beginPath()
            ctx.fillStyle = cell ? 'black' : 'white'
            ctx.fillRect(
                i * cellSize,
                j * cellSize,
                cellSize,
                cellSize,
            )
        }
    }
}

const getNearbyLivingCellCount = (grid, cellRow, cellCol) => {
    let livingCount = 0

    for (let i = -1; i < 2; i += 1) {
        const row = cellRow + i

        if (!grid[row]) {
            continue
        }

        for (let j = -1; j < 2; j += 1) {
            if ( !i && !j ) {
                continue
            }

            if (grid[row][cellCol + j]) {
                livingCount += 1
            }
        }
    }

    return livingCount
}