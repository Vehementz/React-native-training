import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_LOGGED_USER } from "../../graphql/queries";



function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, data } = useQuery(GET_LOGGED_USER);

  return (
    <>
      <h1>Mon compte</h1>
      <form>
        <label>
          Email :
          <input
            disabled={loading}
            type="text"
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder={data?.loggedUser.email}
          />
        </label>
        {/* <button disabled={loading} onClick={doSignup}>
          Sauvegarder
        </button> */}
        <label>
          Nouveau mot de passe :
          <input
            type="text"
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="De préférence compliqué"
          />
        </label>
        <input type="submit" value="Sauvegarder" />
      </form>
    </>
  );
}

export default Profile;
