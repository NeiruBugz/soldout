import { SET_PLAYING } from '../actionTypes';
import { typedAction } from "../helpers/typedAction";

type gameState = {
    isPlaying: boolean;
};

export const setPlaying = (flag: boolean) => {
    return typedAction(SET_PLAYING, flag)
};

type gameAction = ReturnType<typeof setPlaying>

const initialState: gameState = { isPlaying: false };

export function gameReducer(
    state = initialState,
    action: gameAction
): gameState {
    switch (action.type) {
        case "SET_PLAYING":
            return { isPlaying: action.payload };
        default:
            return state;
    }
}
