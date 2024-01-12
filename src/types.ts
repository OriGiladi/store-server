type color = "red" | "blue"| "yellow" | "green"  | "white";

export interface Note {
    title: string;
    creation_date: Date;
    color: color;
    body?: string;
    do_to_date?: Date;   
}