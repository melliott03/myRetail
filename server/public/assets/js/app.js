// register modal component
Vue.component('modal', {
    template: '#modal-template'
  })

new Vue({
    el: '#app',
    data () {
        return {
        showModal: false,
        catalogEntry: null,
        msg: null,
        allAlternateImages: null,
        alternateImagesDisplay: null,
        primaryImage: null,
        altImgStart: 0, 
        altImgEnd: 3,
        showLarrow: false,
        showRarrow: true,
        itemQuantity: 0,
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
        .then(response => {
            console.log('response.data::', response.data);
            this.catalogEntry = response.data;
            let arrayItm = response.data.CatalogEntryView[0].Images[0].AlternateImages;
            this.allAlternateImages = response.data.CatalogEntryView[0].Images[0].AlternateImages;
            this.primaryImage = response.data.CatalogEntryView[0].Images[0].PrimaryImage[0].image
            console.log('before for loop response.data,response.data.CatalogEntryView[0].Images[0].AlternateImages::', response.data.CatalogEntryView[0].Images[0].AlternateImages);
            console.log('arrayItm::', arrayItm);
            
            this.alternateImagesDisplay = this.allAlternateImages.slice(0, 3);
            
            console.log('after for loop response.data, this.allAlternateImages::', this.allAlternateImages );

        })
    },
    methods: {
        nextAlternateImageSet: function (direction, index) {
            if (index) {
                if(index < this.altImgStart){
                    direction = 'left'
                }else if (index > this.altImgStart){
                    direction = 'right'
                }
            }
            if (direction) {
                if (direction == 'right') {
                    this.altImgStart += 1, this.altImgEnd += 1;
                } else if (direction == 'left') {
                    this.altImgStart -= 1, this.altImgEnd -= 1;
                }
                if (this.altImgEnd >= this.allAlternateImages.length - 1) {
                    this.altImgEnd = this.allAlternateImages.length - 1;
                    this.altImgStart = this.altImgEnd - 3;
                    this.showLarrow = true;
                    this.showRarrow = false;
                }else{
                    this.showLarrow = true;
                    this.showRarrow = true;
                }
                if (this.altImgStart <= 0) {
                    this.altImgStart = 0;
                    this.altImgEnd = this.altImgStart + 3;
                    this.showLarrow = false;
                    this.showRarrow = true;
                }else{
                    this.showLarrow = true;
                    this.showRarrow = true;
                }
            }
            this.alternateImagesDisplay = this.allAlternateImages.slice(this.altImgStart, this.altImgEnd);
        },
        primaryImageSet: function(index){
            this.alternateImagesDisplay[index];
            this.primaryImage = this.alternateImagesDisplay[index].image;
            let direction = null;
            this.nextAlternateImageSet(direction, index)
        }
    }
})

