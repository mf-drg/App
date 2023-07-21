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
import { registerApi } from '../../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegisterScreen = ({navigation}) => {
  const [userName, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //showpass
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handlerRegister = async () =>{
    //xu lu dang nhap
    console.log('Đăng ki với tên người dùng hoặc Email:',userName);
    console.log('Mật khẩu:',password);
    try {
      if(password !== confirmPass ){
        alert('Hai mật khẩu phải giống nhau') 
        return
      } 
      const res = await registerApi({userName,password,phone})
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
            <View style={{flex:1, justifyContent:'flex-start', alignItems:'center' }}>
              <Text style={style.title}>Đăng Ký</Text>
            </View>
            
            <View style={{flex:5, justifyContent:'flex-start' }}>
              <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Tài Khoản Đăng Nhập:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập tên người dùng hoặc Email"
                placeholderTextColor="white"
                onChangeText={(text) => setUsername(text)}
                value={userName}
              />

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
                secureTextEntry={!showPassword}
                placeholderTextColor="white"
                onChangeText={(text) => setPassword(text)}
                value={password}
              />

              <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Xác nhận mật khẩu:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={!showPassword}
                placeholderTextColor="white"
                onChangeText={(text) => setConfirmPass(text)}
                value={confirmPass}
              />
              
              <TouchableOpacity onPress={toggleShowPassword}>
                <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}>{showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}</Text>
              </TouchableOpacity>
            </View>
        
            <View style={{flex:2, flexDirection:'column',alignContent:'space-around'}}>
              <View style={{flex:2, marginTop:10}}>
              <PrimaryButton style={{ justifyContent:'center' }}
                  onPress={handlerRegister}
                  title="Đăng Ký"
              />
              {/* <PrimaryButton title="Đăng nhập" onPress={handlerLogin} /> */}
              </View>
              
              <View style={{flex:3, justifyContent: 'center', paddingTop:50}}> 

                <View style={{flex:2, flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
                    <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>Bạn Đã có Tài Khoản Đăng Nhập?</Text>
                    
                      <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}  >
                        <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}> Hãy đăng nhập ngay!</Text>
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
    height: 600,
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

export default RegisterScreen;