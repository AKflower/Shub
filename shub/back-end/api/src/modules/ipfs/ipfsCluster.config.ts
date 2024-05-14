import * as ipfsCluster from "ipfs-cluster-api";

export const IpfsFactory = {
  provide: "IpfsCluster",
  useFactory: () => {
    return ipfsCluster('/ip4/172.20.209.39/tcp/9094');
  },
};
