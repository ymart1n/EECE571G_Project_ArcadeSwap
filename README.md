# ArcadeSwap - Future DeFi User Experience

![18291680686424_ pic_hd](https://user-images.githubusercontent.com/56213581/230039029-f31ad0f3-1842-4908-a9d2-01c3ab507b3c.jpg)
![18301680686459_ pic_hd](https://user-images.githubusercontent.com/56213581/230039047-13b44b80-f52b-45da-ba03-fd836b1bf33e.jpg)
![18311680686693_ pic_hd](https://user-images.githubusercontent.com/56213581/230039813-18078cfe-1104-496d-905a-deaa683a5751.jpg)
![18321680686710_ pic_hd](https://user-images.githubusercontent.com/56213581/230039829-238e02db-09b7-4816-a077-0c72b997f4b9.jpg)

<!---
![Frame 10](https://user-images.githubusercontent.com/56213581/227741678-c0352b46-2a54-4136-9c47-4f725ada1429.png)
![Frame 11](https://user-images.githubusercontent.com/56213581/227741690-9c921702-c0fb-405d-bf0f-874cd029cc6a.png)
![Frame 12](https://user-images.githubusercontent.com/56213581/227746937-88d5bcfc-fa28-4902-9cc9-020e7f732c1b.png)
-->

# Run it locally

Change the name of file `.env-example` to `.env` and run

```shell
source .env
```

Run Anvil local chain in the background (It will be at localhost:8545)

```shell
anvil
```

Run deployment script with private key of first account (0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266)

```shell
forge script scripts/DeployDevelopment.s.sol --broadcast --fork-url http://localhost:8545 --private-key $privateKey
```

## Interact with it through React app

To interact with the app in the browser, you need to first

### Add Localhost Network in Metamask app

<div style="inline">
<img width="250" alt="image" src="https://user-images.githubusercontent.com/56213581/230732991-fb1b4008-3b5f-448c-86c3-a23b5d2c68b0.png">

<img width="500" alt="image" src="https://user-images.githubusercontent.com/56213581/230733007-b42a465d-4a0c-476a-bc7d-67e13d7db50b.png">
</div>

Make sure `anvil` is running in the background, switch the network to the newly added `Localhost 8545` network. 

Install all dependencies and run the React app locally at http://localhost:3000/

```shell
npm i
npm run start
```

## Interact with it through CLI

Example of checking ETH token balance using `cast`

```shell
cast call $ethAddress "balanceOf(address)" $publicKey | cast --from-wei

>>> 2000.000000000000000000
```

Example of approve ArcadeSwapRouter to use our tokens

```shell
cast send $ethAddress "approve(address,uint256)" $routerAddress 1000000000000000000000 --private-key=$privateKey
```

```shell
cast send $usdcAddress "approve(address,uint256)" $routerAddress 1000000000000000000000 --private-key=$privateKey
```

Check allowances for Router contract

```shell
cast call $ethAddress "allowance(address,address)" $publicKey $routerAddress | cast --from-wei

>>> 1000.000000000000000000
```

Adding first liquidity

```shell
cast send $routerAddress "addLiquidity(address,address,uint256,uint256,uint256,uint256,address)" $ethAddress $usdcAddress 1000000000000000000 1000000000000000000 1000000000000000000 1000000000000000000 $publicKey --private-key=$privateKey
```

Check the reserves of the first pair (ETH-USDC)

```shell
cast call $factoryAddress "allPairs(uint256)" 0
>>> 0x000000000000000000000000af03adef79d9af56a267a776c557e362c051f46e

cast call 0xaf03adef79d9af56a267a776c557e362c051f46e "getReserves()(uint112,uint112,uint112)"
>>> 1000000000000000000
>>> 1000000000000000000
>>> 1680652794
```

Let's make our first swap!

Before we swap, let's calculate how much we can get by input **0.4 token 1**

```shell
cast call $libraryAddress "getAmountOut(uint256,uint256,uint256)" 400000000000000000 1000000000000000000 1000000000000000000 | cast --from-wei

>>> 0.285101515584786960
```

Sheesh! We can only get **~0.29 token 2** by selling **0.4 token 1** even if they are at the same price theoretically :(.

Now we know what's the minimum amount of token 2 to expect, so we can make a swap

```shell
cast send $routerAddress "swapExactTokensForTokens(uint256,uint256,address[],address)" 400000000000000000 285101515584786960 "[$ethAddress,$usdcAddress]" $publicKey --private-key=$privateKey
```

Check the reserves after the first swap

```shell
cast call $factoryAddress "allPairs(uint256)" 0
>>> 0x000000000000000000000000af03adef79d9af56a267a776c557e362c051f46e

cast call 0xaf03adef79d9af56a267a776c557e362c051f46e "getReserves()(uint112,uint112,uint112)"
>>> 1400000000000000000
>>> 714898484415213040
>>> 1680656171
```

Check our token balances

```shell
cast call $ethAddress "balanceOf(address)" $publicKey | cast --from-wei

>>> 1998.600000000000000000 // = 2000 - 1 - 0.4
```

```shell
cast call $usdcAddress "balanceOf(address)" $publicKey | cast --from-wei

>>> 1999.285101515584786960 // = 2000 - 1 + 0.285101515584786960
```
