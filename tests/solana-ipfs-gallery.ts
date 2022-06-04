import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaIpfsGallery } from "../target/types/solana_ipfs_gallery";

describe("solana-ipfs-gallery", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaIpfsGallery as Program<SolanaIpfsGallery>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
