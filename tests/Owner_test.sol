// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "remix_tests.sol";
import "hardhat/console.sol";
import "../contracts/2_Owner.sol";

contract OwnerTest {
    Owner ownerToTest;
    address currentOwner;
    
    function beforeAll () public {
        ownerToTest = new Owner();
        currentOwner = address(this);
    }
    
    function checkInitialOwner () public {
        console.log("Running checkInitialOwner");
        Assert.equal(ownerToTest.getOwner(), currentOwner, "initial owner should be deployer");
    }
    
    function checkChangeOwner () public {
        console.log("Running checkChangeOwner");
        address newOwner = address(0x123);
        ownerToTest.changeOwner(newOwner);
        Assert.equal(ownerToTest.getOwner(), newOwner, "owner should be changed");
    }
}
