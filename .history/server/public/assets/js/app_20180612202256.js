new Vue({
    el: '#app',
    data () {
        return {
        catalogEntry: 'uoiuu',
        msg: null,
        contact	: {
            firstname: '',
            lastname: '',
            email_address: '',
            address: '',
            phone: '',
            comments: ''
            },
            isOpen: false
        }
    },
    mounted () {
        axios
        .get('/item')
        // .then(response => (this.info = response))
        .then(response => {
            console.log('response.data::', response.data);
            
            this.catalogEntry = response.data;
        })
    },
    methods: {
        toggle: function(){
            this.isOpen = !this.isOpen
        },
        greet: function (event) {
          // `this` inside methods points to the Vue instance
          alert('Hello ' + this.name + '!')
          // `event` is the native DOM event
          if (event) {
            alert(event.target.tagName)
          }
        },
        getCoindesk: function (event) {
            axios
            .get('https://jsonplaceholder.typicode.com/posts/1')
            .then((response) => {
                console.log('in getCoindesk, response::', response);
                this.msg = response.data.body;
            })
        }
        ,
        submitContact: function (data, object) {
            console.log('submitContact:, data:', data);
            console.log('submitContact:, object:', object);
            data.object = object
            axios
            .post('/contact', data)
            .then((response) => {
                console.log('in submitContact, response::', response);
                this.msg = response.data;
            })
        }
        ,
        submitVolunteer: function (data) {
            console.log('submitVolunteer:, data:', data);
            console.log('submitVolunteer:, VueStripeCheckout:', VueStripeCheckout);
            axios
            .post('/volunteer', data)
            .then((response) => {
                console.log('in submitVolunteer, response::', response);
                this.msg = response.data;
            })
        }
    }
})