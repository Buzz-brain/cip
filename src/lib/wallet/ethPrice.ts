/**
 * Fetch current ETH/USD exchange rate from CoinGecko API (free, no auth required)
 */
export async function getEthUsdPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    const data = await response.json();
    const ethPrice = data?.ethereum?.usd;
    if (typeof ethPrice !== 'number' || ethPrice <= 0) {
      throw new Error('Invalid ETH price from CoinGecko');
    }
    return ethPrice;
  } catch (err) {
    console.error('[getEthUsdPrice] failed to fetch ETH price:', err);
    throw new Error(`Unable to fetch ETH price: ${err instanceof Error ? err.message : String(err)}`);
  }
}

/**
 * Convert USD amount to ETH amount based on current exchange rate
 * @param usdAmount - Amount in USD
 * @returns Amount in ETH (as a string with up to 6 decimal places)
 */
export async function convertUsdToEth(usdAmount: number): Promise<string> {
  if (typeof usdAmount !== 'number' || usdAmount < 0) {
    throw new Error('USD amount must be a non-negative number');
  }
  
  // Handle free tier (0 USD)
  if (usdAmount === 0) {
    return '0';
  }

  const ethPrice = await getEthUsdPrice();
  const ethAmount = usdAmount / ethPrice;
  
  // Round to 6 decimal places to avoid precision issues
  const rounded = Math.round(ethAmount * 1_000_000) / 1_000_000;
  
  return rounded.toString();
}
