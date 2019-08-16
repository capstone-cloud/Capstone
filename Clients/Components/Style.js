import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA0A0',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#F6CC75',
    fontWeight: 'bold',
    fontSize: 60,
    paddingBottom: 30,
    fontFamily: 'ChalkboardSE-Bold'
  },
  container_signup_form: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  inputContainer: {
    margin: 30
  },
  textInput: {
    height: 30,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 10,
    fontSize: 24,
    borderWidth: 1,
    borderBottomColor: '#111111'
  },
  userPage: {
    color: 'yellow',
    fontSize: 30,
    flex: 2
  },
  modal: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 30
  },
  modalHeader: {
    fontSize: 30,
    paddingBottom: 20,

    alignSelf: 'center'
  },
  inputModalForm: {
    borderBottomColor: 'black',
    fontSize: 20,
    color: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1
  }
}));
