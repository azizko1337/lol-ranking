function calculateSummonerPoints(tier, rank, leaguePoints) {
  let summonerPoints = leaguePoints;
  switch (rank) {
    case "V":
      summonerPoints += 0;
      break;
    case "IV":
      summonerPoints += 100;
      break;
    case "III":
      summonerPoints += 200;
      break;
    case "II":
      summonerPoints += 300;
      break;
    case "I":
      summonerPoints += 400;
      break;
    default:
      summonerPoints += 0;
      break;
  }
  switch (tier) {
    case "IRON":
      summonerPoints += 0;
      break;
    case "BRONZE":
      summonerPoints += 500;
      break;
    case "SILVER":
      summonerPoints += 1000;
      break;
    case "GOLD":
      summonerPoints += 1500;
      break;
    case "PLATINUM":
      summonerPoints += 2000;
      break;
    case "DIAMOND":
      summonerPoints += 2500;
      break;
    case "EMERALD":
      summonerPoints += 3000;
      break;
    case "MASTER":
      summonerPoints += 3500;
      break;
    case "GRAND_MASTER":
      summonerPoints += 4000;
      break;
    case "CHALLENGER":
      summonerPoints += 4000;
      break;
    default:
      summonerPoints += 0;
      break;
  }
  return summonerPoints;
}

export default calculateSummonerPoints;
