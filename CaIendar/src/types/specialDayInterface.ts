export interface SpecialDayInterface {
    date: string;
    specialDayContent: string;
    idOfUser: number
    language: string
}

export interface SpecialDayFromBackendInterface {
    id: number;

    specialDayName: string;

    specialDayDate: string;
}