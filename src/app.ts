import { createCompoundInterestForm } from './components/CompoundInterestForm';
import { createGrowthTable } from './components/GrowthTable';
import { CompoundInterestService } from './services/CompoundInterestService';
import { InputParameters } from './types/interest-calculator-types';

export class InterestCalculator {
    #container: HTMLElement;
    #service: CompoundInterestService;
    #tableContainer: HTMLElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container element with id '${containerId}' not found`);
        }
        
        this.#container = container;
        this.#service = new CompoundInterestService();
        this.#tableContainer = document.createElement('div');
        this.#init();
    }

    #init(): void {
        // Create and append the form
        const form = createCompoundInterestForm(this.#handleCalculate.bind(this));
        this.#container.appendChild(form);

        // Create and append the table container
        this.#container.appendChild(this.#tableContainer);
    }

    #handleCalculate(params: InputParameters): void {
        const results = this.#service.calculateCompoundInterest(params);
        
        // Clear previous table
        this.#tableContainer.innerHTML = '';
        
        // Create and append new table
        const table = createGrowthTable(results);
        this.#tableContainer.appendChild(table);
    }
} 