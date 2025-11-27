import { expect } from "chai";
import { ethers } from "hardhat";

describe("ERC20", function () {
  it("should deploy with correct initial values", async function () {
    const [owner] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");
    const token = await ERC20.deploy("Test Token", "TEST", 18, 1000000);
    await token.deployed();

    expect(await token.name()).to.equal("Test Token");
    expect(await token.symbol()).to.equal("TEST");
    expect(await token.decimals()).to.equal(18);
    expect(await token.totalSupply()).to.equal(ethers.utils.parseUnits("1000000", 18));
    expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("1000000", 18));
  });

  it("should transfer tokens between accounts", async function () {
    const [owner, addr1] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");
    const token = await ERC20.deploy("Test Token", "TEST", 18, 1000000);
    await token.deployed();

    await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("100", 18));
  });

  it("should approve and transferFrom", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const ERC20 = await ethers.getContractFactory("ERC20");
    const token = await ERC20.deploy("Test Token", "TEST", 18, 1000000);
    await token.deployed();

    await token.approve(addr1.address, ethers.utils.parseUnits("50", 18));
    expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseUnits("50", 18));

    await token.connect(addr1).transferFrom(owner.address, addr2.address, ethers.utils.parseUnits("30", 18));
    expect(await token.balanceOf(addr2.address)).to.equal(ethers.utils.parseUnits("30", 18));
    expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseUnits("20", 18));
  });
});
