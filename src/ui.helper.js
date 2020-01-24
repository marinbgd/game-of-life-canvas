const START_BUTTON_ID = 'start-button'
const STOP_BUTTON_ID = 'stop-button'
const NEXT_BUTTON_ID = 'next-button'
const RESET_BUTTON_ID = 'reset-button'
const CELL_SIZE_INPUT_ID = 'cell-size-input'
const FPS_INPUT_ID = 'fps-input'
const FILL_SPACE_BETWEEN_INPUT_ID = 'fill-space-between-input'
const PULSAR_BUTTON_ID = 'pulsar-button'
const PENTA_DECATHLON_BUTTON_ID = 'penta-decathlon-button'
const DIE_HARD_BUTTON_ID = 'die-hard-button'
const R_PENTOMINO_BUTTON_ID = 'r-pentomino-button'
const ACORN_BUTTON_ID = 'acorn-button'
const GUN_1_BUTTON_ID = 'gun1-button'
const FILL_CHECKBOX_ID = 'fill-checkbox'
export const CANVAS_ID = 'main-canvas'

export const addButtonClickHandlers = ({
                                           startCb,
                                           stopCb,
                                           nextCb,
                                           resetCb,
                                           cellSizeCb,
                                           fpsCb,
                                           pulsarCb,
                                           fillSpaceCb,
                                           pentaDecathlonCb,
                                           dieHardCb,
                                           rPentominoCb,
                                           acornCb,
                                           gun1Cb,
                                           fillCb,
}) => {
    document.getElementById(START_BUTTON_ID).addEventListener('click', startCb)
    document.getElementById(STOP_BUTTON_ID).addEventListener('click', stopCb)
    document.getElementById(NEXT_BUTTON_ID).addEventListener('click', nextCb)
    document.getElementById(RESET_BUTTON_ID).addEventListener('click', resetCb)

    document.getElementById(PULSAR_BUTTON_ID).addEventListener('click', pulsarCb)
    document.getElementById(PENTA_DECATHLON_BUTTON_ID).addEventListener('click', pentaDecathlonCb)
    document.getElementById(DIE_HARD_BUTTON_ID).addEventListener('click', dieHardCb)
    document.getElementById(R_PENTOMINO_BUTTON_ID).addEventListener('click', rPentominoCb)
    document.getElementById(ACORN_BUTTON_ID).addEventListener('click', acornCb)
    document.getElementById(FILL_CHECKBOX_ID).addEventListener('change', fillCb)

    document.getElementById(GUN_1_BUTTON_ID).addEventListener('click', gun1Cb)

    document.getElementById(CELL_SIZE_INPUT_ID).addEventListener('change', cellSizeCb)
    document.getElementById(FPS_INPUT_ID).addEventListener('change', fpsCb)
    document.getElementById(FILL_SPACE_BETWEEN_INPUT_ID).addEventListener('change', fillSpaceCb)
}
