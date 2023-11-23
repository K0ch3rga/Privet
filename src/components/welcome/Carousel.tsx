import {StyleSheet, View, Button, FlatList} from 'react-native';
import { useState } from 'react';
import CarouselItem, { CarouselItemProps } from './CarouselItem';

const Carousel = () => {
    const ITEMS_COUNT = 3;
    const [page, setPage] = useState(1);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    
    const data: CarouselItemProps[] = [
        { key: 1, imagePath: '../src/assets/cat/cat1.jpg'},
        { key: 2, imagePath: '/src/assets/cat/cat2.jpg'},
        { key: 3, imagePath: '/src/assets/cat/cat3.jpg'}
    ] 

    const prevPage = () => {
        setPage(page-1);

        if (page == 0) {
            setPrevDisabled(true);
            setNextDisabled(false);
        } else {
            setPrevDisabled(false);
            setNextDisabled(false);
        }
    }

    const nextPage = () => {
        setPage(page+1);
        if (page == ITEMS_COUNT) {
            setNextDisabled(true);
            setPrevDisabled(false);
        } else {
            setNextDisabled(false);
            setPrevDisabled(false);
        }
    }

    const renderItem = ({ item }: {item: CarouselItemProps}) => (
        <CarouselItem key={item.key} imagePath={item.imagePath} />
    );

    return(
        <View>    
            <Button title={'назад'} onPress={prevPage} disabled={prevDisabled}/>
            <FlatList data={data} renderItem={renderItem}/>
            <Button title={'вперёд'} onPress={nextPage} disabled={nextDisabled}/>
        </View>
    )
}

const style = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
    }
})

export interface CarouselProps {
    
}

export default Carousel;