import { create, IPFSHTTPClient } from "ipfs-http-client";

export const Ipfs = {
  provide: "IPFS_CONFIG",
  useFactory: () => {
    const ipfsClient: IPFSHTTPClient = create({ url: 'http://10.0.112.161:5001/api/v0' });
    return ipfsClient;
  },
};
