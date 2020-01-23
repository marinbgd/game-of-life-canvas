console.log('INDEX.JS')
import CONFIG from './config'
import { getInitialGrid, renderGrid } from './grid.helper'


function init() {
    console.log('init')

    const canvas = document.getElementById('main-canvas')
    const ctx = canvas.getContext('2d')

    const COLS = Math.ceil(CONFIG.WIDTH / CONFIG.RESOLUTION)
    const ROWS = Math.ceil(CONFIG.HEIGHT / CONFIG.RESOLUTION)

    canvas.width = CONFIG.WIDTH
    canvas.height = CONFIG.HEIGHT

    const grid = getInitialGrid({rows: ROWS, cols: COLS})
    loop(ctx, grid, CONFIG.RESOLUTION)

    function loop (ctx, grid, resolution) {
        window.requestAnimationFrame(() => {
            const grid = getInitialGrid({rows: ROWS, cols: COLS})
            renderGrid(ctx, grid, resolution)
            // loop(ctx, grid, resolution)
        })
    }
}

init()
