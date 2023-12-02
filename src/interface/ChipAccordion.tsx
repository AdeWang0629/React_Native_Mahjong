import { ReactNode } from "react";

export interface IChipAccordion{
    children: ReactNode;
    title: string;
    source: any;
    right_item?: any;
    expandedChip: boolean;
    setExpandedChip: any;
    setExpandedRate: any;
}