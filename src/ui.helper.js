const START_BUTTON_ID = 'start-button'
const STOP_BUTTON_ID = 'stop-button'
const RESET_BUTTON_ID = 'reset-button'
const CELL_SIZE_INPUT_ID = 'cell-size-input'
const FPS_INPUT_ID = 'fps-input'

export const addButtonClickHandlers = ({ startCb, stopCb, resetCb, cellSizeCb, fpsCb }) => {
    document.getElementById(START_BUTTON_ID).addEventListener('click', startCb)
    document.getElementById(STOP_BUTTON_ID).addEventListener('click', stopCb)
    document.getElementById(RESET_BUTTON_ID).addEventListener('click', resetCb)

    document.getElementById(CELL_SIZE_INPUT_ID).addEventListener('change', cellSizeCb)
    document.getElementById(FPS_INPUT_ID).addEventListener('change', fpsCb)
}
