import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity 
} from 'react-native';
import {PrimaryButton} from '../components/Button';

import COLORS from '../../consts/colors';
import { forgotPass } from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgetPassScreen = ({navigation}) => {
  const [userName, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const handlerForgotPass = async () =>{
    //xu lu dang nhap
    console.log('Tên người dùng hoặc Email sử dụng  ể đăng nhập:',userName);
    try {
      const res = await forgotPass({userName,password,phone})
      alert(res.message)
      if (res.status === 0){
        return
      }
      AsyncStorage.setItem('userName',res.userName)
      navigation.navigate('Home')
    } catch (error) {
      
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ImageBackground
            style={[style.backgroundLogin]}
            resizemode = "cover"
            source={require('../../assets/backgroud/backgroud_log2.png')}
      >
        < View style={[style.container]}>

          <View style={[style.containerLogin]}>

            <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
              <Text style={style.title}>Lấy lại mật khẩu</Text>
            </View>
            
            <View style={{flex:2, justifyContent:'center' }}>
              <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Tài Khoản Đăng Nhập:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập tên người dùng hoặc Email"
                placeholderTextColor="white"
                onChangeText={(text) => setUsername(text)}
                value={userName}
              />
            </View>

            <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Số điện thoại:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="white"
                onChangeText={(text) => setPhone(text)}
                value={phone}
              />

              <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Mật khẩu:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập mật khẩu"
                placeholderTextColor="white"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
        
            <View style={{flex:2, flexDirection:'column',alignContent:'space-around'}}>
              <View style={{flex:1}}>
              <PrimaryButton style={{ justifyContent:'center' }}
                  onPress={handlerForgotPass}
                  title="Xác nhận"
              />
              {/* <PrimaryButton title="Đăng nhập" onPress={handlerLogin} /> */}
              </View>
              
              <View style={{flex:3, justifyContent: 'center', paddingTop:50}}>
                <View style={{flex:2, flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
                    <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>Quay lại màn hình đăng nhập</Text>    
                      <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}  >
                        <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}> Đăng Nhập!</Text>
                      </TouchableOpacity>
                </View>
              </View>

            </View>

          </View>     
        </View>
      </ImageBackground>
    </SafeAreaView>
    
  );
};

const style = StyleSheet.create({
  backgroundLogin:{
    flex:1,
    
  },
  container:{
    flex: 1,
    //marginTop: 0,
    justifyContent: 'center',
    alignItems:'center',
  },
  containerLogin:{
    position:'absolute',
    width: 330,
    height: 500,
    marginTop: 0,
    padding: 30,
    borderRadius: 30,
    flexDirection:'column',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    backgroundColor:'rgba(0, 0, 0, 0.7)',
    borderColor:'red',
  },
  
  title: {
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color:'orange',
    //marginTop: 100,
  },
  input:{
    height: 40,
    color:'white',
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ForgetPassScreen;