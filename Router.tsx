import { createStackNavigator } from "@react-navigation/stack";
import { Dashboard } from "./screensaurelienfolder/Dashboard";
import { Signin } from "./screensaurelienfolder/Signin";
import { Signup } from "./screensaurelienfolder/Signup";

const Stack = createStackNavigator<{
  Signup: undefined;
  Signin: undefined;
  Dashboard: undefined;
}>();

function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

export default Router;
