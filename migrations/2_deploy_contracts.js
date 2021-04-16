const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');

// yhpark. 동영상 튜토리얼에서는 이름이 다름. 
// 원래는 mockERC20.sol 이였으나, 최신버전에는 폴더를 이동하면서 파일명도 변경됨.
const ERC20Mock = artifacts.require('mocks/ERC20Mock.sol');

const SushiToken = artifacts.require('SushiToken.sol');
const MasterChef = artifacts.require('MasterChef.sol');
const SushiBar =  artifacts.require('SushiBar.sol');
const SushiMaker = artifacts.require('SushiMaker.sol');

const Migrator = artifacts.require('Migrator.sol');

module.exports = async function (deployer, _network, addresss) {
    const [admin, _] = addresss;

    await deployer.deploy(WETH);
    const weth = await WETH.deployed();
    const tokenA = await ERC20Mock.new('Token A', 'TKA', web3.utils.toWei('1000'));
    const tokenB = await ERC20Mock.new('Token B', 'TKB', web3.utils.toWei('1000'));
    
    await deployer.deploy(Factory, admin);
    const factory = await Factory.deployed();
    await factory.createPair(weth.address, tokenA.address);
    await factory.createPair(weth.address, tokenB.address);
    await deployer.deploy(Router, factory.address, weth.address);
    const router = await Router.deployed();

    await deployer.deploy(SushiToken);
    const sushiToken = await SushiToken.deployed();

    await deployer.deploy(
        MasterChef,
        sushiToken.address,
        admin,
        web3.utils.toWei('100'),
        1,
        1
    );
    const masterChef = await MasterChef.deployed();
    await sushiToken.transferOwnership(masterChef.address);

    await deployer.deploy(SushiBar, sushiToken.address);
    const sushiBar = await SushiBar.deployed();

    await deployer.deploy(
        SushiMaker,
        factory.address,
        sushiBar.address,
        sushiToken.address,
        weth.address
    );
    const sushiMaker = await SushiMaker.deployed();
    await factory.setFeeTo(sushiMaker.address);

    await deployer.deploy(
      Migrator,
      masterChef.address,
      // 메인넷에 배포된 유니스왑 컨트랙트 주소.
      '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      factory.address,
      1
  )
};