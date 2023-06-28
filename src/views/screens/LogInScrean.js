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
  CheckBox,
  ImageBackground,
  TouchableOpacity 
} from 'react-native';
import {PrimaryButton} from '../components/Button';
import categories from '../../consts/categories';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const LogInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  //showpass
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlerLogin = () =>{
    //xu lu dang nhap
    console.log('Đăng nhập với tên người dùng hoặc Email:',username);
    console.log('Mật khẩu:',password);
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
              <Text style={style.title}>Đăng Nhập</Text>
            </View>
            
            <View style={{flex:3, justifyContent:'flex-start' }}>
              <Text style={{color:'red', fontSize: 15, fontWeight: 'bold'}}>Tài Khoản:</Text>
              <TextInput 
                style={style.input}
                placeholder="Nhập tên người dùng hoặc Email"
                placeholderTextColor="white"
                onChangeText={(text) => setUsername(text)}
                value={username}
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

              <TouchableOpacity onPress={toggleShowPassword}>
                <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}>{showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}</Text>
              </TouchableOpacity>
            </View>
        
            <View style={{flex:3, flexDirection:'column',alignContent:'space-around'}}>
              <View style={{flex:1}}>
              <PrimaryButton style={{ justifyContent:'center' }}
                  onPress={({handlerLogin}) => navigation.navigate('Home')}
                  title="Đăng nhập"
              />
              {/* <PrimaryButton title="Đăng nhập" onPress={handlerLogin} /> */}
              </View>

              <View style={{flex:3, justifyContent: 'space-around', paddingTop:20}}> 
                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                  <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>Bạn Quên Mật Khẩu?</Text>
                  
                    <TouchableOpacity onPress={() => navigation.navigate('ForgetPassScreen')}  >
                      <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}> Lấy lại ngay!</Text>
                    </TouchableOpacity>
                  
                </View>

                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                    <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>
                      Bạn chưa có Tài Khoản Đăng Nhập?           
                      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}  >
                        <Text style={{color:'orange', fontSize: 15, fontWeight: 'bold'}}> Hãy đăng ký ngay!</Text>
                      </TouchableOpacity>      
                    </Text>
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
    height: 560,
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

export default LogInScreen;