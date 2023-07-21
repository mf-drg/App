import React, { useEffect,  useState } from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';
import { deleteCart, getCart, postCart } from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  imagesProducts } from '../../assets/connect';

const CartScreen = ({navigation}) => {
  const [userName,setUserName] = useState("")
  const [listProduct , setListProduct] = useState([])
  const [sum , setSum] = useState(0)
  const handleSearch = async()=>{
    try {
      const res = await getCart({userName})
      setListProduct(res.listData)
      setSum(res.sum)
    } catch (error) {
      
    }
  }
  const handleGetUserName = async()=>{
    const name = await AsyncStorage.getItem('userName')
    setUserName(name)
  }

  const handlePostCart = async(id)=>{
    try {
      await postCart({userName ,idProduct:id})
      handleSearch()
    } catch (error) {
      
    }
  }


  const handleDeleteCart = async(id)=>{
    try {
      await deleteCart({userName ,idProduct:id})
      handleSearch()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // Your code here
    handleSearch()
    handleGetUserName()
  }, []);


  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={imagesProducts[`${item.product.image}`]} style={{height: 80, width: 80}} />
        <View
          style={{

            height: 120,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.product.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.product.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.product.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text>
          <View style={style.actionBtn}>
            <Icon name="remove" size={25} color={COLORS.white} onPress={()=>handleDeleteCart(item.product._id)}/>
            <Icon name="add" size={25} color={COLORS.white}  onPress={()=>handlePostCart(item.product._id)}/>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
        <Icon name="refresh" size={28} onPress={()=>handleSearch()}/>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={listProduct}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{sum}</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <PrimaryButton title="CHECKOUT" />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 130,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CartScreen;
