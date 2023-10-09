import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export interface IAccordion{
    children: ReactNode;
    title: string;
    source: ImageSourcePropType;
    right_item?: any;
    action ?: string;
    decimal ?: boolean
}