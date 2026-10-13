export interface SolarConstants {
  UNITS_PER_KW_PER_DAY: number;
  DAYS_PER_YEAR: number;
  TARIFF_RATE_PER_UNIT: number;
  CO2_TONS_PER_KW_YEAR: number;
  TREES_PER_KW_YEAR: number;
  AREA_SQFT_PER_KW: number;
  MIN_SYSTEM_KW: number;
  COST_PER_KW_RS: number;
  LIFETIME_YEARS: number;
}

export const SOLAR_CONSTANTS: SolarConstants = {
  UNITS_PER_KW_PER_DAY: 4,
  DAYS_PER_YEAR: 365,
  TARIFF_RATE_PER_UNIT: 8.5,
  CO2_TONS_PER_KW_YEAR: 4,
  TREES_PER_KW_YEAR: 149,
  AREA_SQFT_PER_KW: 100,
  MIN_SYSTEM_KW: 1,
  COST_PER_KW_RS: 55000,
  LIFETIME_YEARS: 25,
};

export interface SolarEstimateResult {
  capacityKW: number;
  annualGenerationKWh: number;
  annualSavingsRs: number;
  monthlySavingsRs: number;
  systemCostRs: number;
  paybackYears: number;
  lifetimeSavingsRs: number;
  co2Tons: number;
  trees: number;
  areaSqft: number;
}

export function calculateSolarEstimate(
  monthlyBill: number,
  propertyType: string = 'Residential'
): SolarEstimateResult {
  const {
    UNITS_PER_KW_PER_DAY,
    DAYS_PER_YEAR,
    TARIFF_RATE_PER_UNIT,
    CO2_TONS_PER_KW_YEAR,
    TREES_PER_KW_YEAR,
    AREA_SQFT_PER_KW,
    MIN_SYSTEM_KW,
    COST_PER_KW_RS,
    LIFETIME_YEARS,
  } = SOLAR_CONSTANTS;

  const annualGenerationPerKW = UNITS_PER_KW_PER_DAY * DAYS_PER_YEAR;
  const annualSavingsPerKW = annualGenerationPerKW * TARIFF_RATE_PER_UNIT;

  const monthlyUnitsConsumed = monthlyBill / TARIFF_RATE_PER_UNIT;
  const monthlyGenerationPerKW = UNITS_PER_KW_PER_DAY * 30;
  let capacityKW = Math.max(
    MIN_SYSTEM_KW,
    Math.ceil(monthlyUnitsConsumed / monthlyGenerationPerKW)
  );

  if (propertyType === 'Industrial' || propertyType === 'Commercial') {
    capacityKW = Math.ceil(capacityKW * 1.05);
  }

  const annualSavingsRs = capacityKW * annualSavingsPerKW;
  const systemCostRs = capacityKW * COST_PER_KW_RS;
  const paybackYears = annualSavingsRs > 0 ? systemCostRs / annualSavingsRs : 0;
  const lifetimeSavingsRs = Math.max(
    0,
    annualSavingsRs * LIFETIME_YEARS - systemCostRs
  );

  return {
    capacityKW,
    annualGenerationKWh: capacityKW * annualGenerationPerKW,
    annualSavingsRs,
    monthlySavingsRs: annualSavingsRs / 12,
    systemCostRs,
    paybackYears,
    lifetimeSavingsRs,
    co2Tons: capacityKW * CO2_TONS_PER_KW_YEAR,
    trees: capacityKW * TREES_PER_KW_YEAR,
    areaSqft: capacityKW * AREA_SQFT_PER_KW,
  };
}

export function formatINR(amount: number): string {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
}
