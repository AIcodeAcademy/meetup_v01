import { CompoundingFrequency, GrowthTableRow, InputParameters } from '../types/interest-calculator-types';

/**
 * Service for calculating compound interest and generating growth tables
 */
export class CompoundInterestService {
    #getCompoundingPeriodsPerYear(frequency: CompoundingFrequency): number {
        switch (frequency) {
            case CompoundingFrequency.Daily:
                return 365;
            case CompoundingFrequency.Monthly:
                return 12;
            case CompoundingFrequency.Quarterly:
                return 4;
            case CompoundingFrequency.Annually:
                return 1;
        }
    }

    /**
     * Calculates compound interest and returns a year-by-year growth table
     * Formula: A = P(1 + r/n)^(nt)
     * where:
     * A = Final amount
     * P = Principal amount
     * r = Annual interest rate (decimal)
     * n = Number of times interest is compounded per year
     * t = Time in years
     */
    calculateCompoundInterest(params: InputParameters): GrowthTableRow[] {
        const {
            principalAmount,
            annualInterestRate,
            compoundingFrequency,
            timePeriod
        } = params;

        const n = this.#getCompoundingPeriodsPerYear(compoundingFrequency);
        const r = annualInterestRate / 100;
        const growthTable: GrowthTableRow[] = [];

        let currentPrincipal = principalAmount;

        for (let year = 1; year <= timePeriod; year++) {
            const startingPrincipal = currentPrincipal;
            const endingPrincipal = principalAmount * Math.pow(1 + r / n, n * year);
            const interestEarned = endingPrincipal - startingPrincipal;

            growthTable.push({
                year,
                startingPrincipal,
                interestEarned,
                endingPrincipal
            });

            currentPrincipal = endingPrincipal;
        }

        return growthTable;
    }
} 