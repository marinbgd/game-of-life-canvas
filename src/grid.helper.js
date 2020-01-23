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

export const renderGrid = (ctx, grid, cellSize, width, height) => {
    if (+cellSize === 1){
        renderGridPixel(ctx, grid, width, height) // can render pixel by pixel
    } else {
        renderGridFill(ctx, grid, cellSize)
    }
}

const renderGridFill = (ctx, grid, cellSize) => {
    const totalRows = grid.length
    const totalCols = grid[0].length

    for (let i = 0; i < totalRows; i += 1) {
        for (let j = 0; j < totalCols; j += 1) {
            const cell = grid[i][j]

            ctx.fillStyle = cell ? 'black' : 'yellow'
            ctx.fillRect(
                i * cellSize,
                j * cellSize,
                cellSize,
                cellSize,
            )
        }
    }
}

const renderGridPixel = (ctx, grid, width, height) => {
    const newImage = ctx.createImageData(width, height)
    const newImageData = newImage.data

    for (let i = 0; i < width; i += 1) {
        for (let j = 0; j < height; j += 1) {
            const cell = grid[i][j]
            const pixelIndex = (j * width + i) * 4;

            // default is 0 for rgba, so set only if need to change, when need white/yellow - to color
            if (!cell) {
                newImageData[pixelIndex] = 255;     // Red
                newImageData[pixelIndex+1] = 255; // Green
                //newImageData[pixelIndex+2] = 255;  // Blue
            }
            newImageData[pixelIndex+3] = 255; //alpha
        }
    }
    ctx.putImageData(newImage, 0, 0)
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