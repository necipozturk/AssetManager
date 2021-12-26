import React from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import Firebase from "../Firebase";
import prettyDate from "../utils/PrettyDate";
import { StackActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default class Login extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    loading: false,
  };

  signUpApp = () => {
    this.setState({ loading: true });

    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((auth) => {
        let uid = auth.user.uid;
        this.createUser(uid);

        auth.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        Alert.alert("Oops", "Kayıt Olunamadı. Lütfen tekrar deneyiniz.", [
          { text: "Tamam" },
        ]);
      });
  };

  createUser = (uid) => {
    Firebase.database()
      .ref("users")
      .child(uid)
      .set({
        email: this.state.email,
        uid: uid,
        name: this.state.name,
        token: "ExponentPushToken[nzTMf-IgzDsIhdx8P5OVFJ]",
        role: "user",
      })
      .then(() => {
        Firebase.database()
          .ref("hesaplar/" + uid + "/")
          .push({
            currency: "TL",
            createdAt: prettyDate(),
            desc: "Nakit Hesabı",
            name: "Nakit",
            total: 0,
          })
          .then((data) => {
            console.log("Hesap hareki eklendi");
            console.log("data ", data);
          })
          .catch((error) => {
            //error callback
            console.log("error ", error);
          });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#003f5c",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: width, height: 15 }} />
          <View style={{ width: width, alignItems: "center" }}>
            <Icon
              name="wallet-plus-outline"
              size={200}
              type="material-community"
              color="goldenrod"
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color:"#fb5b5a",
                fontSize: 40,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              AssetManager
            </Text>
          </View>
          <View style={{ width: width, paddingLeft: 20, marginTop: 20 ,  alignItems: "center"}}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", textAlign: "center" }}>Kayıt Ol</Text>
            <TextInput
              placeholder="Ad Soyad"
              style={{
                width: 299, 
                height: 40,
                backgroundColor: '#ede8e8', 
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: '#991172',
                marginVertical: 9
              }}
              underlineColorAndroid="transparent"
              onChangeText={(name) => this.setState({ name: name })}
              value={this.state.name}
              placeholderTextColor="gray"
            />
            <TextInput
              placeholder="E-posta"
              style={{
                width: 299, 
                height: 40,
                backgroundColor: '#ede8e8', 
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: '#991172',
                marginVertical: 9
              }}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email: email })}
              value={this.state.email}
              keyboardType="email-address"
              placeholderTextColor="gray"
            />
            <TextInput
              placeholder="Şifre"
              style={{
                width: 299, 
                height: 40,
                backgroundColor: '#ede8e8', 
                borderRadius: 24,
                paddingHorizontal: 15,
                fontSize: 15,
                color: '#991172',
                marginVertical: 9
              }}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry
              placeholderTextColor="gray"
            />
          </View>
          <View style={{ width: width, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.signUpApp()}>
              <View
                style={{width: width, alignItems: "center",backgroundColor: "#fb5b5a", borderRadius: 16, width: 100, height: 40, justifyContent: "center", marginTop: 20, fontWeight: "bold",fontSize: 20, color: "white", marginBottom: 20}}
              >
                <Text style={{ fontSize: 16, color: "white" }}>Kayıt Ol</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(StackActions.pop(1))
              }
            >
              <Text style={{ fontSize: 12, color: "white" }}>
                Hesabınız var mı?{" "}
                <Text
                  style={{ fontWeight: "bold", fontSize: 12, color: "white" }}
                >
                  Giriş Yap
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
