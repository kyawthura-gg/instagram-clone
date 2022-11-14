import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Tab: NavigatorScreenParams<BottomTabType>;
  Comment: undefined;
  EditProfile: undefined;
  Profile: { id: string } | undefined;
  CreatePost: {
    image?: string;
    images?: string[];
    video?: string;
  };
  UpdatePost: {
    id: string;
  };
} & AuthStackType;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type BottomTabType = {
  Home: undefined;
  Search: undefined;
  Post: undefined;
  Notification: undefined;
  MyProfile: undefined;
};

type AuthStackType = {
  SignIn: undefined;
  SignUp: undefined;
  ConfirmEmail: { email?: string };
  ForgotPassword: undefined;
  NewPassword: undefined;
};

export type BottomTabNavScreenProps<T extends keyof BottomTabType> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabType, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

type AllStackParamList = RootStackParamList & BottomTabType;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AllStackParamList {}
  }
}
