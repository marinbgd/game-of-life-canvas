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


export const renderGrid = (canvas, ctx, grid, cellSize, width, height) => {
    const imageWidth = Math.floor(width / cellSize)
    const imageHeight = Math.floor(height / cellSize)
    const newImage = ctx.createImageData(imageWidth, imageHeight)
    const newImageData = newImage.data

    for (let i = 0; i < imageWidth; i += 1) {
        for (let j = 0; j < imageHeight; j += 1) {
            const cell = grid[j][i]
            const pixelIndex = (j * imageWidth + i) * 4;

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


    // scale image if cellSize is not 1
    if (cellSize !== 1) {
        ctx.globalCompositeOperation = 'copy';
        // now we can draw ourself over ourself.
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(
            canvas,
            0, 0, imageWidth, imageHeight, // grab the ImageData part
            0, 0, width, height // scale it
        )
    }
}


// older and slower method
/*const renderGridFill = (ctx, grid, cellSize) => {
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
}*/


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


export const getGridWithOscillator = (rows, cols, oscillator, isFill = false, fillSpaceBetween = 2) => {

    //check if grid can support oscillator width and height
    const oscillatorRows = oscillator.length
    const oscillatorCols = oscillator[0].length
    if (
        rows < oscillatorRows
        || cols < oscillatorCols
    ) {
        throw Error('Oscillator too big for this grid')
    }

    let grid = _getEmptyGrid(rows, cols)

    if (!isFill) {
        _addShapeToGrid(grid, oscillator, 0, 0) // adds only 1 element
        return grid
    }

    //calc how many oscillators can fit into the grid
    const oscillatorColsWithSpace = oscillatorCols + +fillSpaceBetween
    const oscillatorRowsWithSpace = oscillatorRows + +fillSpaceBetween
    const oscillatorFitsInColsCount = Math.floor(cols / oscillatorColsWithSpace)
    const oscillatorFitsInRowsCount = Math.floor(rows / oscillatorRowsWithSpace)

    for (let i = 0; i < oscillatorFitsInColsCount; i += 1) {
        for (let j = 0; j < oscillatorFitsInRowsCount; j += 1) {
            let x = j * oscillatorRowsWithSpace
            let y = i * oscillatorColsWithSpace
            _addShapeToGrid(grid, oscillator, x, y)
        }
    }
    return grid
}

/**
 * Mutates grid !
 * @param grid
 * @param shape
 * @param x
 * @param y
 * @private
 */
const _addShapeToGrid = (grid, shape, x, y) => {
    const shapeRows = shape.length
    const shapeCols = shape[0].length

    for (let i = 0; i < shapeCols; i += 1) {
        for (let j = 0; j < shapeRows; j += 1) {
            grid[j+x][i+y] = shape[j][i]
        }
    }
}

const _getEmptyGrid = (rows, cols) => {
    let grid = []

    for (let i = 0; i < cols; i += 1) {
        const row = []
        for (let j = 0; j < rows; j += 1) {
            row.push(false)
        }
        grid.push(row)
    }

    return grid
}
