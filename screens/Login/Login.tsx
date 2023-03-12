import React, { FormEventHandler, useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./../../components/FormSign/formSign.module.scss";
import { LOGIN } from "../../graphql/mutations";
// import { useNavigate } from "react-router-dom";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";


function Login(props: { onTokenChange: (token?: string) => void }) {
  // Redirects to dashboard if there's a user logged in
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");

  const [doSignInMutation, { data, loading, error }] = useMutation(LOGIN);

  async function doSignIn(e: any) {
    e.preventDefault();
    try {
      const result = await doSignInMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (result.data) {
        props.onTokenChange(result.data.login);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View className={styles.main}>
      <form onSubmit={(e) => doSignIn(e)} className={styles.form}>
        <h3>Connexion</h3>
        <div className={styles.email}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Votre email"
          />
        </div>
        <div className={styles.password}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Votre mot de passe"
          />
        </div>
        {error && <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>}
        <div className={styles.buttonBox}>
          <Button disabled={loading} onPress={doSignIn} title="Me connecter" />
        </div>
        {/* <div>
          <p className={styles.forbidenMdpLink}>
            Avez-vous déja un <a href="X">compte?</a>
          </p>
        </div> */}
      </form>
    </View>
  );
}

export default Login;
