export const CONTRACTS = {
  "ADMIN": "tz1UJPFiywU6uGeMpZnPrY4w7zNhLekvJaUo",
  "CONTRACT.token": "KT1WuNaA5HEujWvXXFNe5kyDLdsVfXdTW1FV",
  "CONTRACT.reward": "KT1L9dPozLBsg554S2U8KPxCFyLmWHuHDzb8",
  "CONTRACT.main": "KT1XXjDco86pHU9Jwas5EubiaSHKwv9ZWggQ",
  "CONTRACT.adapter": "KT1WRh4bdwDcsbPFhhLqrQCyoJMCU8Xy34Dj"
}

export function getContract(name) {
  return CONTRACTS[`CONTRACT.${name}`]
}

