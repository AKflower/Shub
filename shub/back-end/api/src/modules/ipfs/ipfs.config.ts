import { create, IPFSHTTPClient } from "ipfs-http-client";

export const Ipfs = {
  provide: "IPFS_CONFIG",
  useFactory: () => {

    const ipfsClient: IPFSHTTPClient = create({ url: 'http://10.0.155.168:5001/api/v0' });

    return ipfsClient;
  },
};
