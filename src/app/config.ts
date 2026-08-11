import type { CalculatorConfig } from "./config.types";

export const config: CalculatorConfig = {
  slug: "dyli",
  name: "DYLI",
  eyebrow: "DYLI · DIAMONDS",
  title: "DYLI Diamonds Calculator",
  accent: "#F2C500",
  accent2: "#FFF1A8",
  background: "#FFFDF4",
  surface: "#FFFFFF",
  text: "#17150C",
  muted: "#675F43",
  logo: "/logos/dyli.png",
  checkerMode: "official",
  checkerText: "Read the wallet's live Abstract ETH and USDC balances, transaction nonce and public DYLI-related Portal badges. Exact Diamonds remain account-private.",
  facts: [
    "Primary orders, Dabble buys, secondary buys and Fair Drops award 50% of the price in Diamonds.",
    "Secondary sales award 25%; redemptions award 30 Diamonds per item; creator sales award 3 each.",
    "Qualified referrals award 20 Diamonds and second-level referrals award 2, according to DYLI docs.",
  ],
  description: "Calculate DYLI Diamonds with the project's published rates and inspect the connected Abstract wallet without inventing private rewards.",
  officialUrl: "https://www.dyli.io/rewards",
  docsUrl: "https://docs.dyli.io/core-features/rewards",
  portalUrl: "https://alpha-tools-tau.vercel.app/",
  formulaLabel: "Published DYLI rates: 50% on eligible buys, 25% on secondary sales, plus fixed redemption, creator and referral rewards.",
  disclaimer: "The formula follows DYLI's published Rewards page. Exact account eligibility, qualifying purchases and the authoritative Diamonds balance remain controlled by DYLI.",
  fields: [
    { key: "primary", label: "Primary orders", hint: "Total item price paid on primary orders", unit: "$", defaultValue: 200, min: 0, step: 10 },
    { key: "dabble", label: "Dabble spend", hint: "Price or buyback value eligible for Diamonds", unit: "$", defaultValue: 100, min: 0, step: 10 },
    { key: "secondaryBuys", label: "Secondary purchases", hint: "Buyer-side secondary marketplace volume", unit: "$", defaultValue: 100, min: 0, step: 10 },
    { key: "secondarySales", label: "Secondary sales", hint: "Seller-side secondary marketplace volume", unit: "$", defaultValue: 100, min: 0, step: 10 },
    { key: "fairDrops", label: "Fair Drop spend", hint: "Total eligible Fair Drop purchase price", unit: "$", defaultValue: 50, min: 0, step: 10 },
    { key: "redeems", label: "Items redeemed", hint: "30 Diamonds per redeemed item", unit: "#", defaultValue: 1, min: 0, step: 1 },
    { key: "creatorSales", label: "Creator items sold", hint: "3 Diamonds per item sold from your drops", unit: "#", defaultValue: 0, min: 0, step: 1 },
    { key: "referrals", label: "Qualified referrals", hint: "20 Diamonds after a qualifying purchase", unit: "#", defaultValue: 2, min: 0, step: 1 },
    { key: "secondLevel", label: "Second-level referrals", hint: "2 Diamonds per qualifying referred referral", unit: "#", defaultValue: 0, min: 0, step: 1 },
  ],
  calculate: (v) => {
    const eligibleBuys = (v.primary + v.dabble + v.secondaryBuys + v.fairDrops) * 0.5;
    const secondarySales = v.secondarySales * 0.25;
    const redemptions = v.redeems * 30;
    const creator = v.creatorSales * 3;
    const referrals = v.referrals * 20 + v.secondLevel * 2;
    return {
      score: eligibleBuys + secondarySales + redemptions + creator + referrals,
      secondary: "Diamonds from published DYLI rates",
      breakdown: [
        { label: "Eligible buys", value: eligibleBuys },
        { label: "Secondary sales", value: secondarySales },
        { label: "Redemptions", value: redemptions },
        { label: "Creator sales", value: creator },
        { label: "Referrals", value: referrals },
      ],
    };
  },
};
