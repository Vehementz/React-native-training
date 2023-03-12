import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { GET_BLOG } from "../../graphql/queries";
import styles from "./Blog.module.scss";

type getBlog = {
  id: number;
  name: string;
  description: string;
  updated_at: string;
  user: {
    id: number;
    email: string;
  };
  posts: {
    id: number;
    title: string;
    summary: string;
    content: string;
    image: string;
    updated_at: string;
  }[];
};

function Blog() {
  const { blogId } = useParams();

  const { loading, data } = useQuery<{ getBlog: getBlog }>(GET_BLOG, {
    variables: {
      getBlogId: blogId,
    },
  });

  console.log(data);

  return (
    <main className={styles.blogmain}>
      <h1>Bienvenue {blogId}</h1>
      <section className={styles.container}>
        {loading === true && "Chargement..."}
        {data?.getBlog.posts.map((post) => {
          return (
            <div key={post.id}>
              <Card
                title={post.title}
                description={post.summary}
                image={post.image}
                updated_at={post.updated_at}
                onClick={() => {}}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Blog;
