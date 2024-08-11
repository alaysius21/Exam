// checkCalc.js

const { isEmpty, set } = require("lodash");
const scenarios = require("./scenarios.json");
const results = require("./results.json");
const calculateResults = require("./CBACalc.js");

const TOLERANCE = 0.01;
const NET_SURPLUS_TOLERANCE = 1;
const MAX_CAPACITY_TOLERANCE = 10;

function checkCalculator(scenarioIndex) {
    scenarioIndex = Number(scenarioIndex);

    const calc_results = calculateResults(scenarios[scenarioIndex]);
    const excel_results = results[scenarioIndex];

    let error = 0;
    const record = {};

    excel_results.income.forEach((a, i) => {
        Object.entries(a).forEach(([key, val], j) => {
            error = val - calc_results.income[i][key];
            if (Math.abs(error) > TOLERANCE) {
                set(record, `income.${i}.${key}`, error);
            }
        });
    });

    error = excel_results.net_annual_income - calc_results.net_annual_income;
    if (Math.abs(error) > TOLERANCE) {
        set(record, "net_annual_income", error);
    }

    excel_results.liability_repayments.forEach((a, i) => {
        error =
            a.total_repayments -
            calc_results.liability_repayments[i].total_repayments;
        if (Math.abs(error) > TOLERANCE) {
            set(record, `liability_repayments.${i}.total_repayments`, error);
        }
    });

    excel_results.home_loans.forEach((a, i) => {
        error =
            a.total_repayments - calc_results.home_loans[i].total_repayments;
        if (Math.abs(error) > TOLERANCE) {
            set(record, `home_loans.${i}.total_repayments`, error);
        }
    });

    error =
        excel_results.total_existing_repayments -
        calc_results.total_existing_repayments;
    if (Math.abs(error) > TOLERANCE) {
        set(record, "total_existing_repayments", error);
    }

    error =
        excel_results.total_proposed_repayments -
        calc_results.total_proposed_repayments;
    if (Math.abs(error) > TOLERANCE) {
        set(record, "total_proposed_repayments", error);
    }

    error = excel_results.net_cash_position - calc_results.net_cash_position;
    if (Math.abs(error) > NET_SURPLUS_TOLERANCE) {
        set(record, "net_cash_position", error);
    }

    error =
        excel_results.debt_to_income_ratio - calc_results.debt_to_income_ratio;
    if (Math.abs(error) > TOLERANCE) {
        set(record, "debt_to_income_ratio", error);
    }

    error =
        excel_results.maximum_borrowing_capacity -
        calc_results.maximum_borrowing_capacity;
    if (Math.abs(error) > MAX_CAPACITY_TOLERANCE) {
        set(record, "maximum_borrowing_capacity", error);
    }

    if (isEmpty(record)) {
        return "Success!";
    }
    return record;
}

module.exports = checkCalculator;

console.log(checkCalculator(process.argv[2]));
