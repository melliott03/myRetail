new Vue({
    el: '#app',
    data () {
        return {
        catalogEntry: null,
        msg: null,
        allAlternateImages: null,
        alternateImagesDisplay: null,
        altImgStart: 0, 
        altImgEnd: 3,
        contact	: {
            firstname: '',
            lastname: '',
            email_address: '',
            address: '',
            phone: '',
            comments: ''
            },
            isOpen: false,
            slides: [{
                title: 'Seungri\'s Alleged',
                src: 'http://cdn.koreaboo.com/wp-content/uploads/2016/12/gugudan-sejeong-1-360x270.jpg',
                    desc: 'dummy description text here...'
                }, {
                    title: 'Emma',
                    src: 'http://img23.fansshare.com/media/content2/360x270_Charlbi-Dean-Kriek-star-continues-to-rise-in-US-as-model-and-actress-653940467.jpg',
                    desc: 'dummy description text here...'
                }, {
                    title: 'Kim Tae Hee',
                    src: 'https://lh4.googleusercontent.com/jviHIWcTfGcI1eZbu9qPYDjEwkLXoDkqT_b_VDSXw6GXh1Ij_sUi6YuxG0TWd1QB9jkEt1MPU4qHcUiDUWHIdJK4v2qW7NcwQ6xLUj0_3KWwYASxX9UdVSA_R1fR7sljkg',
                    desc: 'dummy description text here...'
                }, {
                    title: 'Kate',
                    src: 'http://img23.fansshare.com/media/content3/360x270_girl-of-the-day--romanian-model-beatrice-adochitei-5074.jpg',
                    desc: 'dummy description text here...'
                }, {
                    title: 'Sherry',
                    src: 'http://cdn.koreaboo.com/wp-content/uploads/2017/02/bbanana4-360x270.png',
                    desc: 'dummy description text here...'
            }],
        }
    },
    mounted () {
        axios
        .get('/item')
        // .then(response => (this.info = response))
        .then(response => {
            console.log('response.data::', response.data);
            this.catalogEntry = response.data;
            let arrayItm = response.data.CatalogEntryView[0].Images[0].AlternateImages;
            this.allAlternateImages = response.data.CatalogEntryView[0].Images[0].AlternateImages;

            console.log('before for loop response.data,response.data.CatalogEntryView[0].Images[0].AlternateImages::', response.data.CatalogEntryView[0].Images[0].AlternateImages);
            console.log('arrayItm::', arrayItm);
            
            this.alternateImagesDisplay = this.allAlternateImages.slice(0, 3);
            
            console.log('after for loop response.data, this.allAlternateImages::', this.allAlternateImages );

            // [].concat();
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
        },
        nextAlternateImageSet: function (direction) {
            console.log('nextAlternateImageSet:, direction:', direction);
            if (this.altImgEnd > this.allAlternateImages.length) {
                // this.altImgEnd = this.allAlternateImages.length;
                this.altImgEnd = this.allAlternateImages.length;

            }
            if (this.altImgStart < 0) {
                this.altImgStart = 0;
                this.altImgEnd = this.altImgStart + 3;
            }
            
            if (direction == 'right') {
                this.altImgStart += 1, this.altImgEnd += 1;
            } else {
                this.altImgStart -= 1, this.altImgEnd -= 1;
            }

            if (this.altImgEnd > this.allAlternateImages.length) {
                // this.altImgEnd = this.allAlternateImages.length;
                this.altImgEnd = this.allAlternateImages.length;

            } 
            if (this.altImgStart < 0) {
                this.altImgStart = 0;
                this.altImgEnd = this.altImgStart + 3;
            }
            
            this.alternateImagesDisplay = this.allAlternateImages.slice(this.altImgStart, this.altImgEnd);
            
        }
    },
    components: {
        'carousel-3d': Carousel3d.Carousel3d,
        'slide': Carousel3d.Slide
      }
})
