export interface SpecialDayInterface {
    date: string;
    specialDayContent: string;
    idOfUser: number
}

export interface SpecialDayFromBackendInterface {
    id: number;

    specialDayName: string;

    specialDayDate: string;
}