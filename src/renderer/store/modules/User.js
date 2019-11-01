import ElectronStore from 'electron-store';

const User = {
    state: {
        storage: null,
        measures: [],
        startedAt: null,
        maxRageLevel: 0,
        currentRageLevel: 0
    },
    getters: {
        getCurrentRageLevel: (state) => {
            return state.currentRageLevel;
        },
        getMaxRageLevel: (state) => {
            return state.maxRageLevel;
        },
        getStartedAt: (state) => {
            return state.startedAt;
        },
        getStorage: (state) => {
            return state.storage;
        },
        getMeasures: (state) => {
            return state.measures;
        }
    },
    mutations: {
        RESET_CURRENT_RAGE_LEVEL: (state) => {
            state.currentRageLevel = 0;
            state.startedAt = new Date();
        },
        INCREMENT_CURRENT_RAGE_LEVEL: (state) => {
            state.currentRageLevel++;
            if (state.currentRageLevel > state.maxRageLevel) {
                state.maxRageLevel = state.currentRageLevel;
            }
        },
        SET_MAX_RAGE_LEVEL: (state, payload) => {
            state.maxRageLevel = payload;
        },
        ADD_MEASURMENT: (state, payload) => {
            state.measures.push({
                startedAt: payload.startedAt,
                level: payload.level,
                max: payload.max
            });
        },
        SET_MEASURMENT: (state, payload) => {
            state.measures = payload;
        },
        UPDATE_STORAGE: (state) => {
            state.storage.set('measures', state.measures);
        },
        LOAD_STORAGE: (state) => {
            if (state.storage === null) {
                state.storage = new ElectronStore();
            }
            const measures = state.storage.get('measures');
            state.measures = Array.isArray(measures) ? measures : [];
        }
    },
    actions: {
        loadStorage: (state) => {
            state.$commit('LOAD_STORAGE');
        },
        startNewMetering: (state) => {
            /*if (state.getters.currentRageLevel > 0) {
                state.$commit('ADD_MEASURMENT', {
                    startedAt: state.getters.getStartedAt,
                    level: state.getters.getCurrentRageLevel,
                    max: state.getters.getMaxRageLevel
                });
                state.$commit('UPDATE_STORAGE');
                state.$commit('RESET_CURRENT_RAGE_LEVEL');
            }*/
        },
        incrementRage: (state) => {
            const measures = state.getters.getStorage.get('measures');
            if (typeof measures === 'undefined') {
                state.$commit('SET_MEASURMENT', []);
                state.$commit('SET_MEASURMENT', []);
                state.maxRageLevel = 10;
            }
            state.$commit('INCREMENT_CURRENT_RAGE_LEVEL');
        }
    }
}
  
export default User;