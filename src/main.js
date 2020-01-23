import CONFIG from './config'
import { getInitialGrid, getNextGrid, renderGrid } from './grid.helper'
import { addButtonClickHandlers } from './ui.helper'


function init() {

    addButtonClickHandlers({
        startCb: handleStartButtonClick,
        stopCb: handleStopButtonClick,
        resetCb: handleResetButtonClick,
        fpsCb: handleFpsChange,
        cellSizeCb: handleCellSizeChange,
    })

    const canvas = document.getElementById('main-canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = CONFIG.WIDTH
    canvas.height = CONFIG.HEIGHT

    let cellSize
    let cols
    let rows
    let grid

    let isRunning = false
    let fps
    let now
    let startTime = Date.now()
    let interval
    let delta

    function loop () {
        window.requestAnimationFrame(loop)

        if (!isRunning) {
            return
        }


        now = Date.now()
        delta = now - startTime

        if (delta > interval) {
            grid = getNextGrid(grid)
            renderGrid(ctx, grid, cellSize)

            startTime = now - (delta % interval)
        }
    }

    function handleStartButtonClick() {
        isRunning = true
    }

    function handleStopButtonClick() {
        isRunning = false
    }

    function handleResetButtonClick() {
        isRunning = false
        grid = getInitialGrid({rows, cols})
        renderGrid(ctx, grid, cellSize)
    }

    function handleCellSizeChange(event) {
        setCellSize(event.currentTarget.value)
        renderGrid(ctx, grid, cellSize)
    }

    function handleFpsChange (event) {
        setFps(event.currentTarget.value)
    }

    function setFps(newFps = CONFIG.FPS) {
        fps = newFps
        interval = 1000 / fps
    }

    function setCellSize (newCellSize = CONFIG.CELL_SIZE) {
        cellSize = newCellSize
        cols = Math.ceil(CONFIG.WIDTH / cellSize)
        rows = Math.ceil(CONFIG.HEIGHT / cellSize)
        grid = getInitialGrid({rows, cols})
    }

    setCellSize()
    setFps()
    grid = getInitialGrid({rows, cols})
    renderGrid(ctx, grid, cellSize)
    loop(ctx, grid, cellSize)
}

init()
