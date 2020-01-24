import CONFIG from './config'
import { getInitialGrid, getNextGrid, renderGrid, getGridWithOscillator } from './grid.helper'
import { PULSAR_GRID_ELEMENT, PENTA_DECATHLON_GRID_ELEMENT } from './grids.oscilators'
import { addButtonClickHandlers, CANVAS_ID } from './ui.helper'


function init() {

    addButtonClickHandlers({
        startCb: handleStartButtonClick,
        stopCb: handleStopButtonClick,
        nextCb: handleNextButtonClick,
        resetCb: handleResetButtonClick,
        fpsCb: handleFpsChange,
        cellSizeCb: handleCellSizeChange,
        pulsarCb: handlePulsarButtonClick,
        penthaDecathlonCb: handlePenthaDecathlonButtonClick,
    })

    const canvas = document.getElementById(CANVAS_ID)
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
            renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)

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
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    }

    function handleNextButtonClick() {
        isRunning = false
        grid = getNextGrid(grid)
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    }

    function handleCellSizeChange(event) {
        setCellSize(event.currentTarget.value)
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    }

    function handleFpsChange (event) {
        setFps(event.currentTarget.value)
    }

    function handlePulsarButtonClick () {
        isRunning = true
        grid = getGridWithOscillator(rows, cols, PULSAR_GRID_ELEMENT)
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    }

    function handlePenthaDecathlonButtonClick () {
        isRunning = true
        grid = getGridWithOscillator(rows, cols, PENTA_DECATHLON_GRID_ELEMENT)
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
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
    renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    loop()
}

init()
