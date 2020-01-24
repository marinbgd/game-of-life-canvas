import CONFIG from './config'
import { getInitialGrid, getNextGrid, renderGrid, getGridWithPattern } from './grid.helper'
import {
    PULSAR_GRID_ELEMENT,
    PENTA_DECATHLON_GRID_ELEMENT,
    DIE_HARD_GRID_ELEMENT,
    R_PENTOMINO_GRID_ELEMENT,
    ACORN_GRID_ELEMENT,
} from './patterns.oscilators'
import { INFINITE_GUN_1, PUFFER_TRAIN_1 } from './patterns.guns'
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
        pentaDecathlonCb: handlePentaDecathlonButtonClick,
        fillCb: handleFillChange,
        fillSpaceCb: handleFillSpaceBetweenChange,
        dieHardCb: handleDieHardButtonClick,
        acornCb: handleAcornButtonClick,
        rPentominoCb: handleRPentominoButtonClick,
        gun1Cb: handleGun1ButtonClick,
        pufferTrain1Cb: handlePufferTrain1ButtonClick,
    })

    const canvas = document.getElementById(CANVAS_ID)
    const ctx = canvas.getContext('2d')

    canvas.width = CONFIG.WIDTH
    canvas.height = CONFIG.HEIGHT

    let cellSize
    let cols
    let rows
    let grid
    let isFill = false
    let fillSpaceBetween

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
        setGridWithPattern(PULSAR_GRID_ELEMENT)
    }

    function handlePentaDecathlonButtonClick () {
        setGridWithPattern(PENTA_DECATHLON_GRID_ELEMENT)
    }

    function handleDieHardButtonClick () {
        setGridWithPattern(DIE_HARD_GRID_ELEMENT)
    }

    function handleAcornButtonClick () {
        setGridWithPattern(ACORN_GRID_ELEMENT)
    }
    function handleRPentominoButtonClick () {
        setGridWithPattern(R_PENTOMINO_GRID_ELEMENT)
    }

    function handleGun1ButtonClick () {
        setGridWithPattern(INFINITE_GUN_1)
    }

    function handlePufferTrain1ButtonClick () {
        setGridWithPattern(PUFFER_TRAIN_1)
    }

    function handleFillChange (event) {
        isFill = event.currentTarget.checked
    }

    function handleFillSpaceBetweenChange (event) {
        fillSpaceBetween = event.currentTarget.value
    }

    function setFps(newFps = CONFIG.FPS) {
        fps = newFps
        interval = 1000 / fps
    }

    function setCellSize (newCellSize = CONFIG.CELL_SIZE) {
        cellSize = newCellSize
        cols = Math.floor(CONFIG.WIDTH / cellSize)
        rows = Math.floor(CONFIG.HEIGHT / cellSize)
        grid = getInitialGrid({rows, cols})
    }

    function setGridWithPattern (pattern) {
        isRunning = false
        grid = getGridWithPattern(rows, cols, pattern, isFill, fillSpaceBetween)
        renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    }

    setCellSize()
    setFps()
    grid = getInitialGrid({rows, cols})
    renderGrid(canvas, ctx, grid, cellSize, CONFIG.WIDTH, CONFIG.HEIGHT)
    loop()
}

init()
