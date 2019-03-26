import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { connect } from 'react-redux';
import { applyDiscount, updateDiscountCode } from '../actions/index';

const mapStateToProps = state => (
  state
);

const mapDispatchToProps = 
  {
    applyDiscount,
    updateDiscountCode,
  }

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      seeItemDetails: false,
      enterPromoCode: false,
    }
    this.openTooltip = this.openTooltip.bind(this);
    this.openItemDetails = this.openItemDetails.bind(this);
    this.openPromoCode = this.openPromoCode.bind(this);
    this.applyPromoCode = this.applyPromoCode.bind(this);
  }

  openTooltip() {
    console.log(28,this.state.showTooltip)
    if (this.state.showTooltip) {
      this.setState({ showTooltip: false });

    } else {
      this.setState({ showTooltip: true });
    }
  }

  openItemDetails() {
    console.log(42,this.state.seeItemDetails)
    if (this.state.seeItemDetails) {
      this.setState({ seeItemDetails: false });

    } else {
      this.setState({ seeItemDetails: true });
    }
  }

  openPromoCode() {
    console.log(65,this.state.enterPromoCode)
    if (this.state.enterPromoCode) {
      this.setState({ enterPromoCode: false });

    } else {
      this.setState({ enterPromoCode: true });
    }
  }

  applyPromoCode() {
    console.log(79)
    // event.preventDefault();
    if (this.props.discountCode === 'DISCOUNT') {
      console.log(82)
      this.props.applyDiscount(this.props.objectInCart.priceFinal);
    }
  }

  render() {
    const { showTooltip, seeItemDetails, enterPromoCode } = this.state;

    const { objectInCart, discountCode } = this.props;
    const { name, details, imageURL, priceItem, tax, pickupSavings, priceFull, priceFinal, discountAmount } = objectInCart;

    console.log(64,this.state);
    console.log(65,this.props)
    let z =  this.state.showTooltip ? 
      <Text>Picking up your order in the store helps cut costs, and we pass the savings on to you.</Text> : 
      <Text></Text>;

    const itemDetails = this.state.seeItemDetails ? 
      <View>
        <Text>Hide item details -</Text>
        <Image 
          source={{uri: this.props.objectInCart.imageURL}}
          style={{width: 66, height: 58}}
        />
      </View> : 
      <Text>See item details +</Text>

    const promoCode = this.state.enterPromoCode ?
      <Text>Apply promo code +</Text> :
      <View>
        <Text>Hide promo code -</Text>
        <Text>Promo Code</Text>
        <TextInput 
          onChangeText={(text)=> this.props.updateDiscountCode(text)}
          value={discountCode}
          
          // value={`${priceFinal}`} 
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
        <Button title='Apply' onPress={this.applyPromoCode}></Button>
      </View>
      

    return (
      <View style={styles.container}>
      
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps='handled'>
          <View style={styles.containerFlex}>
            <Text>Subtotal</Text>
            <Text>${priceItem}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.openTooltip}> 
              <Text>Pickup savings</Text>
            </TouchableOpacity>
            <View>{z}</View>
            
            <Text>${pickupSavings}</Text>
          </View>
          <View style={styles.containerFlex}>
            <Text>Est. taxes & fees (Based on 94085)</Text>
            <Text>${tax}</Text>
          </View>
          <View style={styles.containerFlex}>
            <Text>Est. total</Text>
            <Text>${priceFinal}</Text>
          </View>
          <View style={styles.containerFlex}>
            <TouchableOpacity onPress={this.openItemDetails}> 
              {itemDetails}
            </TouchableOpacity>
            
          </View>
          <View style={styles.containerFlex}>
            <TouchableOpacity onPress={this.openPromoCode}>
              {promoCode}
            </TouchableOpacity>
          </View>

          

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            
          
            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
