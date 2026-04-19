// Placeholder tiles used until an Instagram Basic Display API access token is wired in.
// To connect real posts: obtain a long-lived token via instagram.com/developers,
// then fetch from https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=TOKEN
// and replace this array with the live data.
export const IG_PLACEHOLDERS = [
  { grad: 'linear-gradient(135deg,#1a2e10 0%,#2a4012 55%,rgba(190,110,20,0.5) 100%)', caption: 'Western Ghats · monsoon' },
  { grad: 'linear-gradient(150deg,#100a02,rgba(195,95,18,0.55),#0e1404)',               caption: 'Golden hour · 600mm' },
  { grad: 'linear-gradient(120deg,rgba(38,100,55,0.75),#05100a,#182808)',               caption: 'Forest canopy' },
  { grad: 'linear-gradient(140deg,#12080a,rgba(175,88,15,0.55),#141204)',               caption: 'Spotted deer' },
  { grad: 'linear-gradient(160deg,#0a1803,rgba(50,120,65,0.6),#08100a)',                caption: 'Tree frog · macro' },
  { grad: 'linear-gradient(130deg,rgba(180,100,15,0.45),#100e04,#0e1a08)',              caption: 'Eagle in flight' },
];
