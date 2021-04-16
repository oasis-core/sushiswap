/* yhpark.
수시스왑에서 truffle 인하여 자동 생성되는 Migration 파일이 빠져서 추가함.
특정 툴(truffle)에 의존하지 않겠다는 의지라고 함.
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}