import { Image } from 'react-native';

const CarouselItem = (props: CarouselItemProps) => {
    console.log(props.imagePath);
    const img = require(props.imagePath);
    console.log(img);
    return(
        <Image 
            source={img}
        />
    )
}

export interface CarouselItemProps{
    key: number
    imagePath: string;
}

export default CarouselItem;