import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "70%",
    width: "80%",
    backgroundColor: "#FFA500",
    alignItems: "center",
    justifyContent: "center",
  },
  contentButton: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonNo: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonYes: {
    height: 70,
    width: 70,
    borderRadius: 70,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
});
