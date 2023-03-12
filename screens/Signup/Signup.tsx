import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import styles from "./../../components/FormSign/formSign.module.scss";
import { CREATE_USER } from "../../graphql/mutations";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { navigate } = useNavigation();


function Signup() {
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("test1234");
  const [pseudo, setPseudo] = useState("Testdu34");

  const [doSignupMutation, { data, loading, error }] = useMutation(CREATE_USER);

  async function doSignup(e: any) {
    e.preventDefault(e);
    try {
      e.preventDefault();
      await doSignupMutation({
        variables: {
          data: {
            email,
            pseudo,
            password,
          },
        },
      });
      setEmail("");
      setPassword("");
      setPseudo("");
    } catch {}
  }

  return (
    <main className={styles.main}>
      {error && (
        <Text style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</Text>
      )}
      <form className={styles.form}>
        <h3>Inscription</h3>
        <div className={styles.email}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Votre email"
          />
        </div>
        <div className={styles.pseudo}>
          <TextInput
            value={pseudo}
            onChangeText={(text) => setPseudo(text)}
            placeholder="Votre pseudo"
          />
        </div>
        <div className={styles.password}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Votre mot de passe"
          />
        </div>
        <div className={styles.buttonBox}>
          <Button disabled={loading} onPress={doSignup} title ="Inscription" />
        </div>
        <div>
          <Button disabled={loading} onPress={() => navigate("Signup")}>
             Avez-vous déja un <a href="X">compte?</a>
          </Button>
        </div>
      </form>
    </main>
  );
}

export default Signup;
