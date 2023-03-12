import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";
import { Button, Text, View  } from "react-native";
import { TextInput } from "react-native-gesture-handler";


function CreateBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [doCreateBlogMutation, { data, loading, error }] =
    useMutation(CREATE_BLOG);

  async function doCreateBlog(e: any) {
    e.preventDefault()

    console.log('blog', { name, description })
    try {
      await doCreateBlogMutation({
        variables: {
          data: {
            name,
            description,
          },
        },
      });
      setName("");
      setDescription("");
    } catch { }
  }

  return (
    <View className={styles.main} >
      <form onSubmit={e => doCreateBlog(e)} className={styles.form}>
        <h3>Créer mon blog</h3>
        <TextInput
          disabled={loading}
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Nom du blog"
        />
        <TextInput
          disabled={loading}
          // type="textarea"
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
        />
        {error && (
          <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>
        )}
        <div className={styles.buttonBox}>
          <Button disabled={loading} title="Créer" />
        </div>
      </form>
    </View>
  );
}

export default CreateBlog;
