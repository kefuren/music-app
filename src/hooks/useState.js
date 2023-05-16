import { ref } from "vue";

export default function useState(initialState) {
	const _state = createState(initialState);
	const _setState = createStateSetter(_state);

	return [ _state, _setState ];
}

function createState(initialState) {
	return ref(initialState);
}

function createStateSetter(state) {
	return function (newState) {
		if (typeof newState === "function") {
			state.value = newState(state);
		} else {
			state.value = newState;
		}
	}
}