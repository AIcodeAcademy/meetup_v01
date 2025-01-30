import { CompoundingFrequency, InputParameters } from '../types/interest-calculator-types';
import { formatCurrency, formatPercentage } from '../utils/formatter';

/**
 * Callback function type for handling form submission with input parameters
 */
type CompoundInterestFormCallback = (params: InputParameters) => void;

/**
 * Creates a compound interest calculator form component
 * @param onSubmit - Callback function that handles form submission with validated input parameters
 * @returns HTMLElement - The form element with all inputs and event handlers attached
 * 
 * @example
 * ```ts
 * const form = createCompoundInterestForm((params) => {
 *   const result = calculateCompoundInterest(params);
 *   displayResults(result);
 * });
 * document.body.appendChild(form);
 * ```
 */
export function createCompoundInterestForm(onSubmit: CompoundInterestFormCallback): HTMLElement {
    const formData: InputParameters = {
        principalAmount: 1000,
        annualInterestRate: 5,
        compoundingFrequency: CompoundingFrequency.Annually,
        timePeriod: 5
    };

    const form = document.createElement('form');
    form.className = 'compound-interest-form';

    const header = document.createElement('header');
    const title = document.createElement('h2');
    title.textContent = 'Compound Interest Calculator';
    header.appendChild(title);

    const formGrid = document.createElement('section');
    formGrid.className = 'form-grid';

    // Principal Amount Input
    const principalGroup = createFormGroup({
        id: 'principalAmount',
        label: 'Principal Amount',
        type: 'number',
        min: '0',
        step: '100',
        value: formData.principalAmount.toString(),
        helpText: `Current value: ${formatCurrency(formData.principalAmount)}`,
        onChange: (value) => {
            formData.principalAmount = Number(value);
            principalGroup.querySelector('small')!.textContent = 
                `Current value: ${formatCurrency(formData.principalAmount)}`;
        }
    });

    // Interest Rate Input
    const interestGroup = createFormGroup({
        id: 'annualInterestRate',
        label: 'Annual Interest Rate (%)',
        type: 'number',
        min: '0',
        max: '100',
        step: '0.1',
        value: formData.annualInterestRate.toString(),
        helpText: `Current value: ${formatPercentage(formData.annualInterestRate)}`,
        onChange: (value) => {
            formData.annualInterestRate = Number(value);
            interestGroup.querySelector('small')!.textContent = 
                `Current value: ${formatPercentage(formData.annualInterestRate)}`;
        }
    });

    // Compounding Frequency Select
    const frequencyGroup = createFrequencySelect(
        formData.compoundingFrequency,
        (value) => {
            formData.compoundingFrequency = value as CompoundingFrequency;
        }
    );

    // Time Period Input
    const timeGroup = createFormGroup({
        id: 'timePeriod',
        label: 'Time Period (Years)',
        type: 'number',
        min: '1',
        max: '50',
        value: formData.timePeriod.toString(),
        helpText: 'Enter a value between 1 and 50 years',
        onChange: (value) => {
            formData.timePeriod = Number(value);
        }
    });

    formGrid.append(principalGroup, interestGroup, frequencyGroup, timeGroup);

    const footer = document.createElement('footer');
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Calculate';
    footer.appendChild(submitButton);

    form.append(header, formGrid, footer);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onSubmit(formData);
    });

    return form;
}

/**
 * Options for creating a form group element
 */
type FormGroupOptions = {
    /** Unique identifier for the input element */
    id: string;
    /** Label text for the input */
    label: string;
    /** HTML input type */
    type: string;
    /** Minimum value for number inputs */
    min?: string;
    /** Maximum value for number inputs */
    max?: string;
    /** Step value for number inputs */
    step?: string;
    /** Initial value for the input */
    value: string;
    /** Help text displayed below the input */
    helpText?: string;
    /** Callback function when input value changes */
    onChange: (value: string) => void;
};

/**
 * Creates a form group with label, input, and optional help text
 * @param options - Configuration options for the form group
 * @returns HTMLElement - The form group element
 */
function createFormGroup(options: FormGroupOptions): HTMLElement {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = options.id;
    label.textContent = options.label;

    const input = document.createElement('input');
    input.type = options.type;
    input.id = options.id;
    input.value = options.value;
    input.required = true;

    if (options.min) input.min = options.min;
    if (options.max) input.max = options.max;
    if (options.step) input.step = options.step;

    if (options.helpText) {
        const help = document.createElement('small');
        help.id = `${options.id}-help`;
        help.textContent = options.helpText;
        input.setAttribute('aria-describedby', help.id);
        group.append(label, input, help);
    } else {
        group.append(label, input);
    }

    input.addEventListener('input', (e) => {
        options.onChange((e.target as HTMLInputElement).value);
    });

    return group;
}

/**
 * Creates a select element for compound frequency options
 * @param initialValue - Initial selected frequency
 * @param onChange - Callback function when selection changes
 * @returns HTMLElement - The select form group element
 */
function createFrequencySelect(
    initialValue: CompoundingFrequency,
    onChange: (value: string) => void
): HTMLElement {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = 'compoundingFrequency';
    label.textContent = 'Compounding Frequency';

    const select = document.createElement('select');
    select.id = 'compoundingFrequency';
    select.required = true;

    Object.values(CompoundingFrequency).forEach(frequency => {
        const option = document.createElement('option');
        option.value = frequency;
        option.textContent = frequency;
        if (frequency === initialValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        onChange((e.target as HTMLSelectElement).value);
    });

    group.append(label, select);
    return group;
} 