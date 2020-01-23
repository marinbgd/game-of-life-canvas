const getRandomLiveOrDeadCell = () => {
    return Math.round(Math.random())
}

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

export const renderGrid = (ctx, grid, resolution) => {
    grid.forEach( (col, colNo) => {
        col.forEach( (row, rowNo) => {
            const cell = grid[colNo][rowNo]

            console.log(getNearbyLivingCellCount(grid, colNo, rowNo))

            ctx.beginPath()
            ctx.rect(
                colNo * resolution,
                rowNo * resolution,
                resolution,
                resolution,
            )
            ctx.fillStyle = cell ? 'black' : 'white'
            ctx.fill()
            ctx.stroke()
        })
    })
}

const getNearbyLivingCellCount = (grid, cellCol, cellRow) => {
    let livingCount = 0

    for (let i = -1; i < 2; i++) {
        const col = cellCol + i

        if (typeof grid[col] === 'undefined') {
            continue
        }

        for (let j = -1; j < 2; j++) {
            const row = cellRow + 1

            if (
                row === cellRow
                && col === cellCol
            ) {
                continue
            }

            if (typeof grid[col][row] === 'undefined') {
                continue
            }

            if (grid[col][row]) {
                livingCount += 1
            }
        }
    }

    return livingCount
}