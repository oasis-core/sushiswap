# SushiSwap 포크 - 박연호

## 0. 튜토리얼 영상
https://www.youtube.com/watch?v=J4g8jQoZkrY&t=467s
주로 디플로이 코드를 다룸

## 1. 프로젝트 셋팅 ( yarn )
기본적으로 package.json 이 있음
프로젝트 셋팅. yarn 을 쓰겠음

```
> yarn
yarn install v1.22.10
[1/4] Resolving packages...
[2/4] Fetching packages...
info fsevents@2.3.2: The platform "win32" is incompatible with this module.
info "fsevents@2.3.2" is an optional dependency and failed compatibility check. Excluding it from installation.
info fsevents@2.1.3: The platform "win32" is incompatible with this module.
info "fsevents@2.1.3" is an optional dependency and failed compatibility check. Excluding it from installation.
[3/4] Linking dependencies...
warning " > @sushiswap/sdk@4.1.1" has unmet peer dependency "@ethersproject/address@^5.0.0-beta".
warning " > @sushiswap/sdk@4.1.1" has unmet peer dependency "@ethersproject/contracts@^5.0.0-beta".
warning " > @sushiswap/sdk@4.1.1" has unmet peer dependency "@ethersproject/networks@^5.0.0-beta".
warning " > @sushiswap/sdk@4.1.1" has unmet peer dependency "@ethersproject/providers@^5.0.0-beta".
warning " > @sushiswap/sdk@4.1.1" has unmet peer dependency "@ethersproject/solidity@^5.0.0-beta".
warning "hardhat-gas-reporter > eth-gas-reporter@0.2.21" has unmet peer dependency "@codechecks/client@^0.1.0".
[4/4] Building fresh packages...
Done in 21.94s.
```
## solidity 소스 작성

### Migration.sol 파일 추가
특정 툴(truffle)에 의존하지 않도록하기 위해 언제부턴가 소스에서 빠져있음
truffle 로 인해 자동 생성되는 파일인 Migration.sol 을 추가

### WETH.sol 파일 추가
디플로이 할 때, 토큰 샘플 토큰 2개를 생성하는데,
이 ERC-20 토큰을 생성하는 솔리디티 코드 추가

## 디플로이 코드 작성

### 1_initial_migration.js 
트러플로 자동 생성되는 코드.

### 2_deploy_contracts.js
실제 배포 코드들 작성됨.
동영상 튜토리얼 때의 버전에서는 ERC20Mock.sol 이었지만 
mocks/ERC20Mock.sol 로 리네임됨.

## 배포

### truffle 셋팅
```
> truffle.cmd init
contracts already exists in this directory...
? Overwrite contracts? (y/N)
Starting init...
================
? Overwrite contracts? No
migrations already exists in this directory...
? Overwrite migrations? No
test already exists in this directory...
? Overwrite test? No

> Copying project files to C:\work\fork-sushiswap\sushiswap-org

Init successful, sweet!
```

### truffle 환경설정
truffle 환경설정 변경[ 솔리디티 컴파일러 버전, 가스리밋 에러 관련 ]

### ganache-cli 띄워놓기 ( 로컬 테스트넷 )
이더리움 메잇넷이 아닌 로컬 테스트넷을 쉽게 해주는 ganache-cli 를 설치( npm yarn 등으로 )한다. 

실제 트러플로 배포를 해보면,
컨트랙트 소스의 양이 많아서 가스 리밋 에러가 발생한다.
동영상에는 잘 안쓰는 펑션을 주석처리해서 소스 양을 줄여서 피해간다.

하지만, 여기서는 주석처리 하지 않고, 
ganache-cli 커맨드 옵션과 truffle-config.js 설정 파일에서 
파라메터를 변경하여 문제를 해결한다.

> ganache-cli.cmd --allowUnlimitedContractSize -l 9000000

### 빌드 및 배포
truffle.cmd migrate --reset
에러가 발생하지 않으면 컴파일 후에 자동 배포됨.

# 아래부터는 오리지널 readme 파일

# SushiSwap

https://sushi.com/

## Deployed Contracts

https://dev.sushi.com/sushiswap/contracts

## Docs

[Development](docs/DEVELOPMENT.md)

[Deployment](docs/DEPLOYMENT.md)

[History](docs/HISTORY.md)

## Security

[Security Policy](SECURITY.md)

## License

[MIT](LICENSE.txt)
