import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Home.module.scss";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/Card/Card";
import { GET_BLOGS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

export type BlogProps = {
  name: string;
  description: string;
  updated_at: string;
  id: number;
};

function Home () {
  // Getting current user from context
  const user = useContext(UserContext);
  const { loading, data } = useQuery<{ getBlogs: BlogProps[] }>(GET_BLOGS);
  const navigate = useNavigate();

  return (
    <main className={styles.homeMain}>
      <section className={styles.banniere}>
        <div className={styles.banniere_box_img}>
          <img src="./imgbanniere.png" alt="" />
        </div>
        <div className={styles.contentBanniere}>
          <h1>
            Créez votre <br></br>blog super facilement
          </h1>
          <Link to={user ? "/blog/create" : "/login"}>
            <button>Commencer mon blog</button>
          </Link>
        </div>
      </section>
      <section className={styles.carroussel}>
        <h2>Les blogs les plus aimés</h2>

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block"
              src="https://picsum.photos/1200/400?random=3"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Alan's Blog</h3>
              <p className={styles.carrousselDescription}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              src="https://picsum.photos/1200/400?random=2"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Félicie's Blog</h3>
              <p className={styles.carrousselDescription}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              src="https://picsum.photos/1200/400?random=2"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Soufiane's Blog</h3>
              <p className={styles.carrousselDescription}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              src="https://picsum.photos/1200/400?random=5"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Clément's Blog</h3>
              <p className={styles.carrousselDescription}>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
      <h1>Parcourir les blogs</h1>
      <section className={styles.container}>
        {loading === true && "Chargement..."}
        {data?.getBlogs.map((blog) => {
          return (
            <Card
              title={blog.name}
              description={blog.description}
              image="futur lien image"
              updated_at={blog.updated_at}
              onClick={() => {
                navigate(`/blog/${blog.id}`);
              }}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Home;
