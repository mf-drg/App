import React, { useState ,useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import  { searchCategories, postCart, searchApiFav } from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('screen');
import { imagesCategories , imagesProducts } from '../../assets/connect';
const cardWidth = width / 2 - 20;

const FavoriteScreen = ({navigation}) => {
  const [userName,setUserName] = useState("")
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(""); //Hàm hook cập nhật giá trị cho biến State
  const [listProduct , setListProduct] = useState([])
  const [textSearch , setTextSearch] = useState("")
  const [listCategories , setListCategories] = useState([])

  const handleSearch = async ()=>{
    try {
      const req = await searchApiFav(textSearch,selectedCategoryIndex,userName)
      const data = req.listData.map((item)=>({
        ...item,
        image: imagesProducts[`${item.image}`]
      }))
      setListProduct(data)
    } catch (error) {
      
    }
  }
  const handleGetUserName = async()=>{
    const name = await AsyncStorage.getItem('userName')
    setUserName(name)
  }

  const handleSearchCategories = async ()=>{
    try {
      const req = await searchCategories()
      const data = req.listData.map((item)=>({
        ...item,
        image: imagesCategories[`${item.image}`]
      }))
      setListCategories(data)
    } catch (error) {
      
    }
  }

  const handlePostCart = async(id)=>{
    try {
      await postCart({userName ,idProduct:id})
    } catch (error) {
      
    }
  }


  useEffect(() => {
    // Your code here
    handleSearch()
    handleSearchCategories()
    handleGetUserName()
  }, []);

  const ListCategories = () => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {listCategories.map((category) => (
          <TouchableOpacity
            key={category._id}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(category._id)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == category._id
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == category._id
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={style.sortBtn}>
          <Icon name="close" size={28} color={COLORS.white} onPress={async ()=>{ setSelectedCategoryIndex("")}} />
        </View>
      </ScrollView>
    );
  };
  
  const Card = ({food}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', food)}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image source={food.image} style={{height: 120, width: 120}} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
            <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              ${food.price}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} onPress={()=>handlePostCart(food._id)}/>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  //home screen
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Xin chào,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              {userName}
            </Text>
          </View>
          <Text style={{ width:280 ,flexDirection: 'row', flexWrap:'wrap',  marginTop: 10, fontSize: 18, color: COLORS.grey}}>
            Bạn muốn chọn món gì cho hôm nay?
          </Text>
        </View>
        <Image
          source={require('../../assets/person.png')}
          style={{height: 80, width: 80, borderRadius: 40, marginRight:30}}
        />
      </View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
            onChangeText={(text) => setTextSearch(text)}
          />
        </View>
        <View style={style.sortBtn}>
          <Icon name="search" size={28} color={COLORS.white} onPress={()=>handleSearch()} />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={listProduct}
        renderItem={({item}) => <Card food={item} />}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 250,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteScreen;
