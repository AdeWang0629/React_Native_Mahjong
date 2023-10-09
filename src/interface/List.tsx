import { ImageSourcePropType } from "react-native";

export interface IList{
    title: string;
    source: ImageSourcePropType;
    action ?: string;
}