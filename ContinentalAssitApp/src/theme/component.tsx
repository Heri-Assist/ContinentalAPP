import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";

export const Style = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
	paddingVertical: 15 ,
	backgroundColor: PRIMARY_COLOR,
	alignContent: 'center',
	marginTop: 20,
	borderRadius: 10,
  },

	texto: {
		fontSize: 24,
		fontWeight: 'bold',
		color: BACKGROUND_COLOR,
		justifyContent: 'center',
	},
  
});  