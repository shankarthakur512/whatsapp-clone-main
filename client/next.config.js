/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // env:{
  //   NEXT_PUBLIC_ZEGO_APP_ID : 1777022950,
  //   NEXT_PUBLIC_ZEGO_SERVER_ID :"ffc4a2221ae80ca91a51fa2f3294eeeb"
  // },
  images : {
    domains : ["localhost"]
  }
};

module.exports = nextConfig;
