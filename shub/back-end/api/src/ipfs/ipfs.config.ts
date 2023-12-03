import { create, IPFSHTTPClient } from "ipfs-http-client";

export const Ipfs = {
  provide: "IPFS_CONFIG",
  useFactory: () => {
    const ipfsClient: IPFSHTTPClient = create({ url: 'http://127.0.0.1:5001/api/v0' });
    return ipfsClient;
  },
};
