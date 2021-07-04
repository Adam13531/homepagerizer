export default function Footer() {
  return (
    <div className="flex flex-col text-indigo-900 text-sm items-center">
      <div>
        Homepagerizer was created by{" "}
        <a
          className="underline"
          href="https://twitch.tv/Adam13531"
          rel="noopener noreferrer"
        >
          Adam13531
        </a>{" "}
        (
        <a
          className="underline"
          href="https://discord.gg/AdamLearns"
          rel="noopener noreferrer"
        >
          come chat on Discord
        </a>
        !)
      </div>
      <div>
        <a
          href="https://github.com/Adam13531/homepagerizer"
          rel="noopener noreferrer"
        >
          <i className="lab la-github text-indigo-700 text-3xl"></i>
        </a>
      </div>
    </div>
  );
}
