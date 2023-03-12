import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export const CREATE_SUPERADMIN = gql`
mutation CreateSuperAdmin($data: UserInput!) {
  createSuperAdmin(data: $data) {
    id
  }
}
`;

export const LOGIN = gql`
mutation login($data: UserInput!) {
  login(data: $data)
}
`

export const CREATE_BLOG = gql`
mutation CreateBlog($data: BlogInput!) {
  createBlog(data: $data) {
    name
  }
}`

export const CREATE_USER_BY_ROLE = gql`
mutation CreateUser($data: UserInput!) {
  createUserByRole(data: $data) {
    id
    email
    password
    role
  }
}`

export const CREATE_BLOG_BY_USER = gql`
mutation CreateBlogByUser($data: BlogInput!) {
  createBlogByUser(data: $data) {
    name
    description
    user {
      id
      email
    }
  }
}`
