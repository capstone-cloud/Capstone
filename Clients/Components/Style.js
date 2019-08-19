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
    fontSize: 60,
    paddingBottom: 30,
    fontFamily: 'Palatino-Bold'
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
    fontSize: 25,
    color: 'gray',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  addItem: {
    fontSize: 20,
    color: 'white'
  },
  // modalButton: {
  //   fontSize: 20,
  //   color: 'white',
  //   borderBottomColor: 'black'
  // }
  button: {
    backgroundColor: 'pink',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    color: 'white',
    fontSize: 20,
    width: '40%',
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 8,
    top: '50%',
    textAlign: 'center',
    alignSelf: 'center',
    position: 'relative'
  },

  modalButton: {
    backgroundColor: 'pink',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    color: 'white',
    fontSize: 20,
    // width: '5%',
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
    alignSelf: 'center',
    top: '40%',
    position: 'relative'
  },

  back: {
    paddingTop: 30,
    fontSize: 15,
    color: 'black',
    top: '30%',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  card: {
    paddingBottom: 40
  },
  total: {
    fontSize: 19,
    marginBottom: 20,
    top: '10%',
    fontFamily: 'Palatino-Bold'
  },

  login: {
    color: 'yellow',
    fontFamily: 'Palatino-Bold',
    alignSelf: 'center',
    fontSize: 20
  },

  name: {
    fontSize: 20,
    fontFamily: 'Palatino-Bold',
    top: '2%'
  }
}));
