const emitter = mitt()

const inputComponent = {
    props: ['placeholder'],
    emits: ['add-note'],
    data() {
        return {
            input: ''
        }
    },
    methods: {
        monitorEnterKey() {
            emitter.emit('add-note', {
                note: this.input,
                timestamp: new Date().toLocaleString()
            })
            this.input = ''
        }
    },
    template: `<input class="input is-small" type="text" :placeholder='placeholder' v-model='input' @keyup.enter='monitorEnterKey' />`
}



const app = {
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent
    },
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    methods: {
        addNote(event) {
            this.notes.push(event.note),
            this.timestamps.push(event.timestamp)
        }
    },
    created() {
        emitter.on('add-note', (e) => this.addNote(e))
    }
}
Vue.createApp(app).mount('#app');