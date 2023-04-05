const config = {
  wethAddress: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  factoryAddress: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  routerAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  libraryAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  ethUsdcPair: "0xAF03AdEF79d9AF56A267a776c557E362C051F46E",
  ABIs: {
    ERC20Mintable: require("./abi/ERC20Mintable.json"),
    ArcadeSwapFactory: require("./abi/ArcadeSwapFactory.json"),
    ArcadeSwapPair: require("./abi/ArcadeSwapPair.json"),
    ArcadeSwapLibrary: require("./abi/ArcadeSwapLibrary.json"),
    ArcadeSwapRouter: require("./abi/ArcadeSwapRouter.json"),
  },
};

config.tokens = {};
config.tokens[config.wethAddress] = { symbol: "WETH" };
config.tokens["0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"] = {
  symbol: "USDC",
};
config.tokens["0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"] = { symbol: "BTC" };

export default config;