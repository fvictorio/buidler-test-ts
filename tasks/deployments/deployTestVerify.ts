import { task } from "@nomiclabs/buidler/config";

const deployContract = async (
  contractName: string,
  args: any[],
  BRE: any,
) =>
  ((await BRE.ethers.getContract(contractName)).deploy(
    ...args
  ));

export const deployTestVerify = async (BRE: any) => {
  const result = await deployContract('TestVerify', [], BRE);
  console.log(result.address);
  return result
}

task(`deploy-TestVerify`, `Deploys a TestVerify`).setAction(
  async ({}, localBRE) => {
    // await localBRE.run("set-bre");

    console.log(`Deploying TestVerify ...\n`);

    const testVerify = await deployTestVerify(localBRE);
    await testVerify.deployTransaction.wait();

    // await registerContractInJsonDb(`TestVerify`, testVerify);

    return testVerify;
  }
);
