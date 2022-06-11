use anchor_lang::prelude::*;

declare_id!("7w1ncm2Y5yrztktG36Jmz2PJvXMpRNjGc9WCr46nxJcQ");

#[program]
pub mod solana_ipfs_gallery {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let gallery = &mut ctx.accounts.gallery;
        gallery.total_photos = 0;
        Ok(())
    }

    pub fn addphoto(ctx: Context<AddPhoto>, ipfs_link : String) -> Result<()> {
        let gallery = &mut ctx.accounts.gallery;
        let user = &ctx.accounts.user;

        let photo = PhotosStruct {
            ipfs_link: ipfs_link.to_string(),
            client_adress: *user.to_account_info().key,
        };

        gallery.photos.push(photo);
        gallery.total_photos += 1;  


        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 400)]
    pub gallery: Account<'info, Photos>,
    #[account(mut)]
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddPhoto<'info> {
    #[account(mut)]
    pub gallery: Account<'info, Photos>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct PhotosStruct {
    pub ipfs_link: String,
    pub client_adress: Pubkey,
}

#[account]
pub struct Photos {
    pub photos: Vec<PhotosStruct>,
    pub total_photos: u64,
    pub authority: Pubkey,
}

