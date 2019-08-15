import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 30
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    
  }
}));
