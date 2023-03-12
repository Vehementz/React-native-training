import "react-native-gesture-handler";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "./hooks/user.context";
import Router from "./Router";
import { NavigationContainer } from "@react-navigation/native";

const httpLink = createHttpLink({
  uri: "http://192.168.152.32",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function Main() {
  const [user, setUser] = useState(null);
  const { data, refetch, error } = useQuery(GET_LOGGED_USER);

  useEffect(() => {
    if (error) {
      setUser(null);
    }
  }, [error]);

  async function onTokenChange(token?: string) {
    // console.log(token)
    if (token) {
      localStorage.setItem("token", token);
      console.log("logged in");
    } else {
      localStorage.removeItem("token");
      console.log("logged out");
    }
    console.log("refetching");
    try {
      const { data } = await refetch();
      setUser(data?.loggedUser);
    } catch (err: any) {
      if (err.message.includes("Access denied!")) {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    console.log("useEffect loggedUser", data?.loggedUser);
    setUser(data?.loggedUser);
  }, [data]);

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout onTokenChange={onTokenChange} />}>
            {user ? (
              <>
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<Login onTokenChange={onTokenChange} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/super-admin"
                  element={<SuperAdminSignup />}
                ></Route>
              </>
            )}
            <Route path="/" element={<Home />} />
            {user && <Route path="/blog/create" element={<CreateBlog />} />}
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route path="/post" element={<Post />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}


function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <UserProvider>
          <Router />
        </UserProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
