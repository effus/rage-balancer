import ElectronStore from 'electron-store';

const Storage = new ElectronStore();

const DefaultStorage = {
    measures: []
};

const DefaultMeasure = {
    time: null,
    value: 0,
    max: 10
};

const User = {
    state: {
        storage: null,
        measures: []
    },
    getters: {
        getLastMeasure: (state) => {
            console.debug('getLastMeasure', state.measures);
            if (state.measures.length > 0) {
                return state.measures[state.measures.length - 1];
            }
            return DefaultMeasure;
        }
    },
    mutations: {
        NEW_STORAGE: (state) => {
            console.debug('NEW_STORAGE');
            state.storage = Object.assign({}, DefaultMeasure);
        },
        FROM_STORAGE: (state) => {
            console.debug('FROM_STORAGE');
            state.storage = Storage.get('rage-storage');
            if (state.storage && state.storage.measures) {
                state.measures = state.storage.measures;
            }
        },
        TO_STORAGE: (state) => {
            console.debug('TO_STORAGE');
            state.storage.measures = state.measures;
            Storage.set('rage-storage', state.storage);
        },
        NEW_MEASURE: (state) => {
            console.debug('NEW_MEASURE');
            let measure = Object.assign({}, DefaultMeasure);
            measure.time = new Date();
            state.measures.push(measure);
        },
        INCREASE_RAGE: (state, lastMeasure) => {
            console.debug('state.getters', lastMeasure);
            lastMeasure.value++;
            if (lastMeasure.value > lastMeasure.max) {
                lastMeasure.max = lastMeasure.value;
            }
            state.measures[state.measures.length - 1] = lastMeasure;
        }
    },
    actions: {
        LoadStorage: (state) => {
            state.commit('FROM_STORAGE');
            if (state.getters.getLastMeasure.time === null) {
                // новое хранилище
                state.commit('NEW_STORAGE');
                state.commit('TO_STORAGE');
                console.debug('New storage created');
            }
        },
        IncreaseRage: (state) => {
            if (state.getters.getLastMeasure.time === null) {
                state.commit('NEW_MEASURE');
                console.debug('NEW_MEASURE');
            }
            state.commit('INCREASE_RAGE', {
                lastMeasure: state.getters.getLastMeasure
            });
            state.commit('TO_STORAGE');
        }
    }
}
  
export default User;