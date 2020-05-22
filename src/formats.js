export const formatInt = x => x.toLocaleString('en-GB', {
  maximumFractionDigits: 0
})

export const formatDec = x => {
  const d = x < 10 ? 2 : (x < 100 ? 1 : 0)
  return x.toLocaleString('en-GB', {
    minimumFractionDigits: d,
    maximumFractionDigits: d
  })
}

export const formatPerc = (x) => `${formatDec(x * 100)}%`
