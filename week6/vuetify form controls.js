const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify( )  
const app = createApp({

	data: () => ({     
		firstName: '', email: '',  sex:'F', 
		program:['P02'], 
		stateList:['VIC','NSW','WA'], 
		state:'VIC', comments:'',
		 
		nameRules: [
			v => !!v || 'Name is required',
			v => (v && v.length <= 10) || 'Name must be less than 10 characters' ,
			v => /^[a-zA-Z]+$/.test(v) || 'Name can only contain letters'
			],

		emailRules: [
			v => !!v || 'E-mail is required',
			v => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(v) || 'E-mail must be valid',
			]
		})
})
app.use(vuetify).mount('#app') 