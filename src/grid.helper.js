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


export const getGridWithPattern = (rows, cols, pattern, isFill = false, fillSpaceBetween = 2, isCentered = false) => {

    //check if grid can support pattern width and height
    const patternRows = pattern.length
    const patternCols = pattern[0].length
    if (
        rows < patternRows
        || cols < patternCols
    ) {
        throw Error('Pattern too big for this grid')
    }

    let grid = _getEmptyGrid(rows, cols)

    if (!isFill) {  // adds only 1 element
        if (isCentered) {
            const x = Math.floor((rows/2)-(patternRows/2))
            const y = Math.floor((cols/2)-(patternCols/2))
            _addShapeToGrid(grid, pattern, x, y)

        } else {
            _addShapeToGrid(grid, pattern, 0, 0)
        }
        return grid
    }

    //calc how many oscillators can fit into the grid
    const patternColsWithSpace = patternCols + +fillSpaceBetween
    const patternRowsWithSpace = patternRows + +fillSpaceBetween
    const patternFitsInColsCount = Math.floor(cols / patternColsWithSpace)
    const patternFitsInRowsCount = Math.floor(rows / patternRowsWithSpace)


    let initialX = 0
    let initialY = 0
    if (isCentered) {
        initialX = Math.floor((cols - (patternColsWithSpace * patternFitsInColsCount)) / 2)
        initialY = Math.floor((rows - (patternRowsWithSpace * patternFitsInRowsCount)) / 2)
    }

    for (let i = 0; i < patternFitsInColsCount; i += 1) {
        for (let j = 0; j < patternFitsInRowsCount; j += 1) {
            const x = (j * patternRowsWithSpace) + initialX
            const y = (i * patternColsWithSpace) + initialY
            _addShapeToGrid(grid, pattern, x, y)
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
