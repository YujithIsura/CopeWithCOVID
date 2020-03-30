import { createAppContainer, createSwitchNavigator } from "react-navigation";

// import screens
import Welcome from "../screens/Welcome";
import BottomNavigation from "../screens/BottomNavigation";

const Screens = createSwitchNavigator({
  Welcome,
  BottomNavigation
});

export default createAppContainer(Screens);