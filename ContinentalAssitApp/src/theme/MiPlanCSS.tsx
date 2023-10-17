import { Platform, StyleSheet } from "react-native";
import { it } from '@jest/globals';

const PRIMARY_COLOR = "#00184C";
const SECONDARY_COLOR = "#F2DB85";
const BACKGROUND_COLOR = "#FFFFFF";
const BORDER_COLOR = "#D4D4D4";
const AZUL_CLARO_COLOR = "#69C8EF";

export const Style = StyleSheet.create({

	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		// paddingHorizontal: 10,
	},

	containerCalendar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		backgroundColor:BACKGROUND_COLOR,
		paddingVertical: 10,
	},
 
	container3: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
 
	container4: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: BORDER_COLOR,
		alignItems: 'center',
		backgroundColor:BACKGROUND_COLOR, 
		paddingHorizontal: 10,
	},

	column: {
		flex: 1,
	},

	separador:{
		borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
		borderRightWidth: 2,
		borderRightColor: BORDER_COLOR,
		paddingLeft: 10,
	},

	marginEspacio: {
		marginLeft: 10,
	},

	text: {
		fontSize: 16,
		marginTop: 10,
		color: PRIMARY_COLOR,
	},
	textBold: {
		fontSize: 16,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},

	textBold2: {
		fontSize: 20,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	textBoldAzul: {
		fontSize: 18,
		marginVertical: 10,	
		fontWeight: 'bold',
		color: AZUL_CLARO_COLOR,
	},
	textContainer: {
		flex: 1,
	},

	container2: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	icon: {
		marginRight: 10,
		marginLeft: 10,
		color: PRIMARY_COLOR,
		paddingVertical: 10,
	},

	title: {
		fontSize: 14,
		fontWeight: 'bold',
		color: PRIMARY_COLOR,
	},
	
	content: {
		fontSize: 14,
	},

	column1: {
		flex: 4,
		backgroundColor: AZUL_CLARO_COLOR,
		marginRight: 10,
		justifyContent: 'center',
		items: 'center',
		paddingVertical: 10,
	},

	column2: {
		flex: 6,
		marginLeft: 10,
	},

	slider: {
		marginVertical:20,
		width: '80%',
	},

});