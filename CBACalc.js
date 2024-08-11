// CBACalc.js

const calculateResults = (scenario, index) => {
    // Extracting data from the scenario
    const { income, home_loans, self_employed_income, liabilities } = scenario;

    // 1. Calculate Gross Annual Income
    const grossAnnualIncome = income.reduce((acc, curr) => acc + curr.payg, 0);
   

    // 2. Calculate Income Tax and Medicare Levy
    const incomeTax = calculateIncomeTax(grossAnnualIncome);
    const medicareLevy = calculateMedicareLevy(grossAnnualIncome);

    // 3. Calculate Net Annual Income
    const netAnnualIncome = grossAnnualIncome - incomeTax - medicareLevy;
    const selfEmployedGrossIncome = self_employed_income.reduce((acc, curr) => acc + (curr.most_recent_year_details.net_profit_before_tax || 0), 0);

    // 4. Home Loan Calculation
    const homeLoan = home_loans[0]; // Assuming only one home loan
    const loanAmount = homeLoan.loan_amount;
    const interestRate = homeLoan.actual_rate;
    const term = homeLoan.term;

    const monthlyRepayment = calculateMonthlyRepayment(loanAmount, interestRate, term);
    const totalRepayments = monthlyRepayment * 12;

    //8. Liability Computation
    const totalLiabilityRepayments = liabilities.reduce((acc, curr) => acc + (curr.total_repayments || 0), 0);
    let totalExistingRepayments = 0;
    if (liabilities && liabilities.length > 0) {
        totalExistingRepayments = liabilities.reduce((acc, curr) => acc + (curr.total_repayments || 0), 0);
    }

    // 5. Calculate Debt-to-Income Ratio
    const totalProposedRepayments = homeLoan.total_repayments + totalExistingRepayments;
    const debtToIncomeRatio = totalProposedRepayments / grossAnnualIncome;

    // 6. Calculate Net Cash Position
    const netCashPosition = netAnnualIncome - totalProposedRepayments;

    // 7. Maximum Borrowing Capacity (example multiplier)
    const maximumBorrowingCapacity = netAnnualIncome * 4.5;

    

    return {
        income: [
            {
                rental_income: 0,
                self_employed_income: selfEmployedGrossIncome,
                gross_annual_income: income.gross_annual_income,
                income_tax:income.income_tax,
                medicare_levy: income.medicare_levy,
                negative_gearing_tax_effect: 0,
                self_employed_add_backs:self_employed_income.reduce((sum, income) => sum + (income.most_recent_year_details.personal_wages_before_tax || 0), 0),
            }
        ],
        net_annual_income: income.net_annual_income,
        liability_repayments: liabilities,
        home_loans: [
            {
                assessment_rate: 5.1,
                total_repayments: income.total_repayments
            }
        ],
        total_existing_repayments: liabilities.reduce((acc, curr) => acc + (curr.total_repayments || 0), 0),
        total_proposed_repayments: totalProposedRepayments,
        net_cash_position: income.net_cash_position,
        debt_to_income_ratio: income.debt_to_income_ratio,
        maximum_borrowing_capacity: income.maximum_borrowing_capacity
    };
};

// Helper functions
const calculateIncomeTax = (income) => {
    // Simplified example calculation
    return income * 0.173 + 1000; // Example formula
};

const calculateMedicareLevy = (income) => {
    // Simplified example calculation
    return income * 0.02; // Example formula
};

const calculateMonthlyRepayment = (loanAmount, interestRate, term) => {
    const monthlyRate = interestRate / 12 / 100;
    const numberOfPayments = term * 12;
    return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

const calculateMaximumBorrowingCapacity = (netAnnualIncome, totalProposedRepayments) => {
    // Example calculation
    return netAnnualIncome * 4.5; // Example multiplier
};

module.exports = calculateResults;
