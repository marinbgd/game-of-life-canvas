import { getCellValue, getRandomLiveOrDeadCell } from './cell.helper'


export const getInitialGrid = ({rows, cols}) => {
    let grid = []

    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            row.push(getRandomLiveOrDeadCell())
        }
        grid.push(row)
    }

    return grid
}

export const getNextGrid = grid => {
    let newGrid = []

    grid.forEach( (row, rowNo) => {
        const newRow = []
        row.forEach((col, colNo) => {
            const cell = grid[rowNo][colNo]
            const nearbyLivingCellCount = getNearbyLivingCellCount(grid, rowNo, colNo)
            const newCell = getCellValue(cell, nearbyLivingCellCount)
            newRow.push(newCell)
        })
        newGrid.push(newRow)
    })

    return newGrid
}

export const renderGrid = (ctx, grid, cellSize) => {
    grid.forEach( (row, rowNo) => {
        row.forEach( (col, colNo) => {
            const cell = grid[rowNo][colNo]

            ctx.beginPath()
            ctx.rect(
                colNo * cellSize,
                rowNo * cellSize,
                cellSize,
                cellSize,
            )
            ctx.fillStyle = cell ? 'black' : 'white'
            ctx.fill()
        })
    })
}

const getNearbyLivingCellCount = (grid, cellRow, cellCol) => {
    let livingCount = 0

    for (let i = -1; i < 2; i++) {
        const row = cellRow + i

        if (!grid[row]) {
            continue
        }

        for (let j = -1; j < 2; j++) {
            const col = cellCol + j

            if (
                row === cellRow
                && col === cellCol
            ) {
                continue
            }

            if (grid[row][col]) {
                livingCount += 1
            }
        }
    }

    return livingCount
}