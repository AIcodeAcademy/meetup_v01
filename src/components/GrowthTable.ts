import { GrowthTableRow } from '../types/interest-calculator-types';
import { formatCurrency } from '../utils/formatter';

/**
 * Creates and returns a growth table element
 */
export function createGrowthTable(rows: GrowthTableRow[]): HTMLElement {
    if (!rows.length) {
        return document.createElement('div');
    }

    const section = document.createElement('section');
    section.className = 'growth-table-container';

    const title = document.createElement('h3');
    title.textContent = 'Investment Growth Table';
    section.appendChild(title);

    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-responsive';

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th scope="col">Year</th>
                <th scope="col">Starting Principal</th>
                <th scope="col">Interest Earned</th>
                <th scope="col">Ending Principal</th>
            </tr>
        </thead>
        <tbody>
            ${rows.map(row => `
                <tr>
                    <td>${row.year}</td>
                    <td>${formatCurrency(row.startingPrincipal)}</td>
                    <td>${formatCurrency(row.interestEarned)}</td>
                    <td>${formatCurrency(row.endingPrincipal)}</td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot>
            <tr>
                <th scope="row">Total Return</th>
                <td>${formatCurrency(rows[0].startingPrincipal)}</td>
                <td>${formatCurrency(rows[rows.length - 1].endingPrincipal - rows[0].startingPrincipal)}</td>
                <td>${formatCurrency(rows[rows.length - 1].endingPrincipal)}</td>
            </tr>
        </tfoot>
    `;

    tableWrapper.appendChild(table);
    section.appendChild(tableWrapper);

    return section;
} 