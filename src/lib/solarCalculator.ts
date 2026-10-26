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

export interface HeroTeaserEstimate {
  capacityKW: number;
  monthlyGenerationKWh: number;
  areaSqft: number;
  monthlySavingsRs: number;
  paybackYears: number;
  co2Tons: number;
  lifetimeSavingsRs: number;
  formatted25YrSavings: string;
}

export function calculateHeroTeaserEstimate(
  monthlyBill: number,
  propertyType: 'Residential' | 'Commercial' = 'Residential'
): HeroTeaserEstimate {
  const isResidential = propertyType === 'Residential';

  // Benchmark: ₹4,000 residential bill corresponds to 2.5 kW rooftop system
  const rawCapacity = isResidential
    ? (monthlyBill / 4000) * 2.5
    : (monthlyBill / 40000) * 20;

  const capacityKW = Math.max(1, Math.round(rawCapacity * 10) / 10);

  // 120 kWh generation per kW each month (4 kWh/day * 30 days)
  const monthlyGenerationKWh = Math.round(capacityKW * 120);

  // 72 sq ft required roof area per kW (modern high-efficiency mono PERC modules)
  const areaSqft = Math.round(capacityKW * 72);

  // Net metering offset: ~80% residential, ~85% commercial
  const savingsRatio = isResidential ? 0.8 : 0.85;
  const monthlySavingsRs = Math.round(monthlyBill * savingsRatio);

  // Payback period:
  // In reality, payback is NOT completely static across all bill amounts:
  // 1. Smaller bills (< ₹2,000) have lower tariff slabs and higher fixed inverter overhead -> payback is 5.2 - 5.8 yrs
  // 2. Medium bills (₹4,000 benchmark) -> exactly 4.8 yrs (matches reference design)
  // 3. Higher bills (> ₹8,000) displace peak tariff slabs (₹9-11/unit) -> faster payback down to 3.9 - 4.2 yrs
  const basePayback = isResidential ? 4.8 : 3.8;
  const billFactor = Math.log10(monthlyBill / (isResidential ? 4000 : 40000));
  const paybackYears = isResidential
    ? Math.max(3.8, Math.min(6.0, Number((basePayback - billFactor * 1.3).toFixed(1))))
    : Math.max(2.8, Math.min(4.8, Number((basePayback - billFactor * 1.0).toFixed(1))));

  // CO2 offset: 0.84 tons per kW-year
  const co2Tons = Number((capacityKW * 0.84).toFixed(1));

  // 25-year cumulative savings
  const lifetimeSavingsRs = monthlySavingsRs * 12 * 25;

  let formatted25YrSavings: string;
  if (lifetimeSavingsRs >= 10000000) {
    formatted25YrSavings = `₹${(lifetimeSavingsRs / 10000000).toFixed(1)}Cr`;
  } else if (lifetimeSavingsRs >= 100000) {
    formatted25YrSavings = `₹${(lifetimeSavingsRs / 100000).toFixed(1)}L`;
  } else {
    formatted25YrSavings = formatINR(lifetimeSavingsRs);
  }

  return {
    capacityKW,
    monthlyGenerationKWh,
    areaSqft,
    monthlySavingsRs,
    paybackYears,
    co2Tons,
    lifetimeSavingsRs,
    formatted25YrSavings,
  };
}
