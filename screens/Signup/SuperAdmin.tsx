import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "./../../components/FormSign/formSign.module.scss";
import { CREATE_SUPERADMIN } from "../../graphql/mutations";
import { Link } from "react-router-dom";
import { HAS_SUPERADMIN } from "../../graphql/queries";
import { TextInput } from "react-native-gesture-handler";
import { Button, View, Text } from "react-native";

const SuperAdminSignup = () => {
  const [email, setEmail] = useState("superadmin@mail.com");
  const [password, setPassword] = useState("test1234");
  const [pseudo, setPseudo] = useState("Superadmin");

  const [createSuperAdmin, { data, loading, error }] =
    useMutation(CREATE_SUPERADMIN);
  const { data: adminData } = useQuery(HAS_SUPERADMIN);

  async function doSignup() {
    try {
      await createSuperAdmin({
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
    <View className={styles.main}>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <div className={styles.form}>
        <h3>Création d'un Super Admin</h3>
        {adminData?.hasSuperAdmin ? (
          <>
            <Text className="text-center text-danger">
              Vous ne pouvez créer qu'un seul Super Admin depuis cette page
            </Text>
            <Text className="text-center">
              Veuillez vous <Link to={"/login"}>connecter</Link>
            </Text>
          </>
        ) : (
          <>
            <View className={styles.email}>
              <TextInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                placeholder="Votre email"
              />
            </View>
            <div className={styles.pseudo}>
              <TextInput

                value={pseudo}
                onChangeText={(e) => setPseudo(e)}
                placeholder="Votre pseudo"
              />
            </div>
            <div className={styles.password}>
              <TextInput
                value={password}
                onChangeText={(e) => setPassword(e)}
                placeholder="Votre mot de passe"
              />
            </div>
            <View className={styles.buttonBox}>
              <Button onPress={doSignup} title="Inscription" />

            </View>
            <View>
              <Text>
                Avez-vous déja un <Text href="X">compte?</Text>
              </Text>
            </View>
          </>
        )}
      </div>
    </View>
  );
};

export default SuperAdminSignup;
