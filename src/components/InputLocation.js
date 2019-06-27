import React, { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';


export default class InputLocation extends Component {

    constructor(props) {
        super(props);

        this.state = { location: '' };
    }

    updateText = location => {
        this.setState({ location });
    }

    submitText = () => {
      this.props.onSubmit(this.state.location);
      this.setState({ location: '' });
    }

  render() {
    return ( 
        <View style={styles.searchBar}>
            <TextInput
                style={styles.TextInput}
                value={this.state.location}
                autoCorrect={false}
                placeholder={'Local'}
                clearButtonMode={'always'}
                onChangeText={this.updateText}
                onSubmitEditing={this.submitText}
            />
        </View>
    
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    paddingTop: 50,
  },

  TextInput: {
    borderRadius: 150 / 2,
    width: 300,
    height: 50,
    fontSize: 16,
    marginTop: 40,
    backgroundColor: '#eeeeee',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    color: 'black'
  }
});
