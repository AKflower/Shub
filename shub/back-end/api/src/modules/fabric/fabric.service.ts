import { Inject } from "@nestjs/common";
 import { Fabric } from "./fabric.type";

 export class FabricService {
   constructor(@Inject("FABRIC_CONFIG") private readonly fabric: Fabric) {}

   getContract(classContractName: string) {
     // if (!process.env.FABRIC_CHAINCODE_NAME) throw Error("FABRIC_CHAINCODE_NAME environment variable is required");
     return this.fabric.network.getContract('basic',classContractName);

 }
 }