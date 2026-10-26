import { LightningElement } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    percentage = 10
    carouselData=[{
                src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
                header: "First Card", 
                description:"First card description." ,
                alternativetext:"First card accessible description." ,
                href:"http://www.example.com"
            },
            {
                src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
                header: "Second Card", 
                description:"Second card description." ,
                alternativetext:"Second card accessible description." ,
                href:"http://www.example.com"
            },
            {
                src:"https://v1.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
                header: "Third Card", 
                description:"Third card description." ,
                alternativetext:"Third card accessible description." ,
                href:"http://www.example.com"
            }
        ];

        handleChange(event){
            this.percentage = event.target.value;
            //console.log(`=== VALUE OF PERCENTAGE === ${this.ercentage}`);
        }

        handleClick(){
            this.refs.child.resetSlider();
        }
}