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
    // const { showTooltip, seeItemDetails, enterPromoCode } = this.state;

    const { objectInCart, discountCode } = this.props;
    const { name, details, imageURL, priceItem, quantity, tax, pickupSavings, priceItemWithPickup, priceFull, priceFinal, discountAmount } = objectInCart;

    console.log(64,this.state);
    console.log(65,this.props);

    const toolTip =  this.state.showTooltip ? 
      <Text style={styles.containerToolTip}>
        Picking up your order in the store helps cut costs, and we pass the savings on to you.
      </Text> : 
      null;

    const itemDetails = this.state.seeItemDetails ? 
      <View>
        <View style={styles.containerRow}>
          <Text style={styles.underline}>Hide item details</Text>
          <Text> -</Text>
        </View>
        <View style={styles.containerFlex}>
          <Image 
            source={{uri: this.props.objectInCart.imageURL}}
            style={styles.containerImage}
          />
          <View >
            <Text style={styles.containerFlexWidth}>{name}</Text>
            <View style={styles.containerFlexWidthPriceQuantity}>
              <Text style={styles.containerBold}>${priceItemWithPickup}</Text>
              <Text>Qty: {quantity}</Text>
            </View>
              <Text style={styles.containerStrikeThrough}>${priceItem}</Text>
          </View>
        </View>
      </View> :
      <View style={styles.containerRow}>
        <Text style={styles.underline}>See item details</Text>
        <Text> +</Text>
      </View> 

    const promoCode = this.state.enterPromoCode ?
      <View>
        <View style={styles.containerRow}>
          <Text style={styles.underline}>Hide promo code</Text>
          <Text> -</Text>
        </View>
        <Text>Promo Code</Text>
        <View style={styles.containerFlex}>
          <TextInput 
            onChangeText={(text)=> this.props.updateDiscountCode(text)}
            value={discountCode}
            style={styles.containerTextInput}
          />
          <TouchableOpacity onPress={this.applyPromoCode}>
            <Text style={styles.containerButton}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View> :
      <View style={styles.containerRow}>
        <Text style={styles.underline}>Apply promo code</Text>
        <Text> +</Text>
      </View>
      

    return (
      <View style={styles.container}>
      
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={styles.containerFlex}>
            <Text>Subtotal</Text>
            <Text style={styles.containerBold}>${priceItem}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.openTooltip} style={styles.containerFlex}> 
              <Text style={styles.underline}>Pickup savings</Text>
              <Text style={styles.containerBoldRed}>-${pickupSavings}</Text>
            </TouchableOpacity>
            <View>{toolTip}</View>
            
          </View>
          <View style={styles.containerFlex}>
            <View>
              <Text>Est. taxes & fees</Text>
              <Text>(Based on 94085)</Text>
            </View>
            <Text style={styles.containerBold}>${tax}</Text>
          </View>
          <View style={styles.containerLineBreak}></View>
          <View style={styles.containerFlex}>
            <Text style={styles.containerBold}>Est. total</Text>
            <Text style={styles.containerBold}>${priceFinal}</Text>
          </View>
          <View style={styles.containerFlex}>
            <TouchableOpacity onPress={this.openItemDetails}> 
              {itemDetails}
            </TouchableOpacity>     
          </View>
          <View style={styles.containerLineBreak}></View>
          <View style={styles.containerFlex}>
            <TouchableOpacity onPress={this.openPromoCode}>
              {promoCode}
            </TouchableOpacity>
          </View>

        </ScrollView>
 
      </View>
    );
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 30,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  containerToolTip: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  containerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerFlexWidth: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  containerFlexWidthPriceQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerTextInput: {
    height: 40, 
    width: 200,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 2,
  },
  containerButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    paddingLeft: 15,
    marginLeft: 20,
    height: 40,
    fontWeight: 'bold',
  },
  containerImage: {
    width: 120, 
    height: 110,
  },
  containerStrikeThrough: {
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  containerBold: {
    fontWeight: 'bold',
  },
  containerBoldRed: {
    fontWeight: 'bold',
    color: 'red',
  },
  containerLineBreak: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },

  underline: {
    textDecorationLine: 'underline',
  },
});
