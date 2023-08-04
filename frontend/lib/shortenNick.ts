function shortenNick(nick: string): string {
  if (nick.length > 20) {
    return nick.slice(0, 20) + "...";
  } else {
    return nick;
  }
}

export default shortenNick;
