function calculateSummonerPoints(tier, rank, leaguePoints) {
  let summonerPoints = leaguePoints;
  switch (rank) {
    case "IV":
      summonerPoints += 0;
      break;
    case "III":
      summonerPoints += 100;
      break;
    case "II":
      summonerPoints += 200;
      break;
    case "I":
      summonerPoints += 300;
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
      summonerPoints += 400;
      break;
    case "SILVER":
      summonerPoints += 800;
      break;
    case "GOLD":
      summonerPoints += 1200;
      break;
    case "PLATINUM":
      summonerPoints += 1600;
      break;
    case "EMERALD":
      summonerPoints += 2000;
      break;
    case "DIAMOND":
      summonerPoints += 2400;
      break;
    case "MASTER":
      summonerPoints += 2800;
      break;
    case "GRAND_MASTER":
      summonerPoints += 3200;
      break;
    case "CHALLENGER":
      summonerPoints += 3600;
      break;
    default:
      summonerPoints += 0;
      break;
  }
  return summonerPoints;
}
export default calculateSummonerPoints;
