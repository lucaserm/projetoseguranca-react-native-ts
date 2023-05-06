import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type MainBottomTabParamList = {
	Home: undefined;
	Search: undefined;
	Add: undefined;
	Rel: undefined;
	Profile: undefined;
};

export type propsBottom = NativeStackNavigationProp<MainBottomTabParamList>;
