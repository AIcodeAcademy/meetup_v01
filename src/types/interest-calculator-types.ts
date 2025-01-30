export enum CompoundingFrequency {
    Daily = "Daily",
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    Annually = "Annually",
}

export type InputParameters = {
    principalAmount: number;
    annualInterestRate: number;
    compoundingFrequency: CompoundingFrequency;
    timePeriod: number;
}

export type GrowthTableRow = {
    year: number;
    startingPrincipal: number;
    interestEarned: number;
    endingPrincipal: number;
} 