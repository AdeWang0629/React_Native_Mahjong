import { ReactNode } from "react";

export interface IRateAccordion{
    children: ReactNode;
    title: string;
    source: any;
    right_item?: any;
    expandedRate: boolean;
    setExpandedRate: any;
    setExpandedChip: any;
}