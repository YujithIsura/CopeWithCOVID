import React, { Component } from "react";
import { Image, Modal, StyleSheet, ScrollView,Picker,TextInput } from "react-native";
import { Block, Button, Text, Utils } from "expo-ui-kit";
import { View } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';
// constants
import { images, theme, servers } from "../constants";
const { icons } = images;

// theme
const { rgba } = Utils;
const { SIZES, COLORS } = theme;



export default class VPN extends Component {
  state = {
    connected: false,
    server: null,
    show: false,
    automatic: {
      name: "Automatic",
      icon: icons.automatic
    },
    index: 0,
    routes: [
      { key: 'first', title: 'HOME' },
      { key: 'second', title: 'LOG' },
    ],
    user:'',
    password:''
  };
  updateUser = (user) => {
    this.setState({ user: user })
 }
  handleConnect() {
    const { connected } = this.state;
    this.setState({ connected: !connected });
  }

  handleServer(server) {
    this.setState({ server, connected: false, show: false });
  }

  renderServer() {
    const { server, automatic } = this.state;
    const connection = server || automatic;

    return (
      <Block flex={false} row center middle>
        <Image source={connection.icon} />
        <Text margin={[0, 10, 0, 20]}>{connection.name}</Text>
        <Image source={icons.dropdown} />
      </Block>
    );
  }

  renderServers() {
    const { show, server, automatic } = this.state;
    const connection = server || automatic;

    return (
      <Modal visible={show} animationType="fade" transparent>
        <Block bottom color={rgba(COLORS.gray, 0.2)}>
          <Block flex={false} white middle padding={[SIZES.padding, 0]}>
            <Text subtitle center gray>
              Pick your Server
            </Text>
            <ScrollView>
              {servers.map(item => {
                const isConnected = connection.name === item.name;
                const isChecked = icons[isConnected ? "checked" : "unchecked"];
                return (
                  <Button
                    transparent
                    key={`server-${item.name}`}
                    onPress={() => this.handleServer(item)}
                  >
                    <Block
                      flex={false}
                      row
                      center
                      space="between"
                      margin={[SIZES.padding, SIZES.padding]}
                    >
                      <Block flex={false} row center>
                        <Image source={item.icon} />
                        <Text padding={[0, SIZES.h3]}>{item.name}</Text>
                      </Block>
                      <Image source={isChecked} />
                    </Block>
                  </Button>
                );
              })}
            </ScrollView>
          </Block>
        </Block>
      </Modal>
    );
  }

  render() {
    const { connected } = this.state;
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    const FirstRoute = () => (
      // <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
      <View>
      <Dropdown
        label='  PREMIUM'
        data={data}
        fontSize = {20}
      />
      <Dropdown
        label='  Germany'
        data={data}
        fontSize = {20}
      />
      <Dropdown
        label='  France | Syma'
        data={data}
        fontSize = {20}
      />
      {/* <View style={styles.passwordContainer}>
      <Icon
    name='user'
    color='#000'
    size={24}
  />
  <TextInput
    style={styles.inputStyle}
      autoCorrect={false}
      secureTextEntry
      placeholder="Password"
      value={this.state.password}
      onChangeText={this.onPasswordEntry}
    />
  
</View> */}

<Input
inputStyle={styles.inputStyle}
        placeholder='Username'
        leftIcon={
          <Icon
          // style={styles.inputStyle}
            name='user'
            size={24}
            color='black'
          />
        }
      />
      <Input
inputStyle={styles.inputContainerStyle}
inputComponent={Dropdown}
// inputContainerStyle={styles.inputContainerStyle}
        data={data}
        style={styles.inputContainerStyle}
        fontSize = {20}
        placeholder='Username'
        leftIcon={
          <Icon
          // style={styles.inputStyle}
            name='user'
            size={24}
            color='black'
          />
        }
      />
      </View>

    );
    
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
    );

    return (
      // <Block safe center space="between">
      //   <Block flex={false} padding={[SIZES.h3, 0]}>
      //     <Text title semibold>
      //       VPN
      //     </Text>
      //   </Block>
        

      //   <Block center flex={false}>
      //     <Block
      //       flex={false}
      //       row
      //       center
      //       middle
      //       white
      //       shadow
      //       radius={SIZES.radius}
      //       padding={[SIZES.base, SIZES.padding]}
      //     >
      //       <Text theme={theme} subtitle semibold gray height={SIZES.h3}>
      //         {connected ? "Connected" : "Disconnected"}
      //       </Text>
      //       <Block
      //         flex={false}
      //         radius={SIZES.base}
      //         style={styles.status}
      //         color={connected ? COLORS.success : rgba(COLORS.gray, 0.5)}
      //       />
      //     </Block>

      //     <Image
      //       style={styles.image}
      //       source={icons[connected ? "online" : "offline"]}
      //     />

      //     <Button
      //       theme={theme}
      //       outlined={connected}
      //       style={[styles.connect, connected && styles.connected]}
      //       onPress={() => this.handleConnect()}
      //     >
      //       <Text
      //         caption
      //         center
      //         bold
      //         white={!connected}
      //         margin={[SIZES.padding / 2, 0]}
      //       >
      //         {connected ? "DISCONNECT" : "CONNECT NOW"}
      //       </Text>
      //     </Button>
      //   </Block>

      //   <Block flex={false} middle white shadow style={styles.servers}>
      //     <Button transparent onPress={() => this.setState({ show: true })}>
      //       {this.renderServer()}
      //     </Button>
      //   </Block>
      //   {this.renderServers()}
      // </Block>
      <View style={{ 
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
      }}>
        {/* <View style={{height: 150, backgroundColor: 'steelblue'}} /> */}
        <Image style={{height: 150}} source={require('./wall.jpg')} />
        <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: 100,height:100 }}
      />
      {/* <BottomNavigation></BottomNavigation> */}
      
      </View>
      
      
    );
  }
}

const styles = StyleSheet.create({
  connect: {
    width: SIZES.width / 2
  },
  connected: {
    borderColor: COLORS.black
  },
  image: {
    width: 180,
    height: 180,
    marginVertical: 20
  },
  status: {
    width: SIZES.base,
    height: SIZES.base,
    marginLeft: SIZES.small
  },
  servers: {
    width: SIZES.width,
    height: SIZES.base * 9,
    shadowOffset: {
      width: 0,
      height: -5
    },
    shadowOpacity: 0.05,
    shadowRadius: SIZES.base / 2
  },
  scene: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#fff',
    paddingBottom: 15,
    paddingTop: 15,
  },
  inputStyle: {
    flex: 1,
    marginLeft:20,
    backgroundColor:"red"
    },
    inputContainerStyle: {
      backgroundColor:"red",
      width:3000
      },
    
});
